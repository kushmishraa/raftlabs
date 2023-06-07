const mongoose =  require('mongoose');
require('../db/conn')
const bcrypt = require('bcrypt');
const multer  = require('multer')
const express = require('express')
const router = express.Router();
const loginValidation = require('../middleware/loginValidation')
const User = require('../model/userSchema');
const jwt = require('jsonwebtoken')

const uploadToCloudinary = require('../middleware/upload');
const user = require('../model/userSchema');

try{
    var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage })

router.post('/register-user' , async (req , res)=>{
    const {fname , lname , email , number , password} = req.body
    try{
        const userExists = await User.findOne({email : email});
        if(userExists){
            return res.status(403).json({message : "User already Exits"});
        }

        else
        {

        const newUser = new User({fname , lname , email , number , password});

        //password encryption

        const userRegistered = newUser.save();
        if(userRegistered){
            return res.status(201).json({message : "User registered Successfully"});
        }
        else{
            return res.status(500).json({message : "Unable to add user at this time"});
        }

        }
        
    }
    catch(err){
        console.log(err);
    }
});

router.get("/upload" , loginValidation , (req , res)=>{
    res.send(req.validUser);
})

router.get('/home' , loginValidation , (req,res)=>{
    res.send(req.validUser)
})

router.post('/login-validation' , async (req , res) =>{
    const {email , password} = req.body;
    console.log(email,password);
    const userExist = await User.findOne({email : email});
    console.log(userExist)
    if(userExist){
       const validUser= await bcrypt.compare(password , userExist.password);
       if(validUser){
        const token = await userExist.generateAuthToken();
        console.log("token=>" , token);
        res.cookie('jwtToken' , token , {
            expires : new Date(Date.now() + 2592000000),
            httpOnly : true,
          })
       return res.status(201).json({message : "User verified successfully"});
       }
       else{
        console.log("line 50")
        return res.status(400).json({message : "Invalid Credential"})
       }
        
    }
    else{
        console.log("line 57")
        res.status(400).json({message : "Invalid Credentials"});
    }
})

router.post("/upload", upload.single('image') , async (req , res)=>{
    
    
    if(req.file == undefined) return res.status(402).json({message : "no body failed"});
    const localFilePath = req.file.path;
    const result = await uploadToCloudinary(localFilePath,req.file);
    if(result){
        if(req.body.isProfilePic == "true"){
            const selectedUser = await User.findOne({email : req.body.email})
            selectedUser.profilePicture = result.url;
            console.log(selectedUser);
            const profilPicChanged = selectedUser.save()
            if(profilPicChanged){
                return res.status(201).json({message : "Profile pic updated"})
            }
            else{
                return res.status(400).json({message : 'Unable to updated profile pic'})
            }
        }
       const userToken = req.cookies.jwtToken;
       const verifyToken = jwt.verify(userToken , process.env.SECRETKEY);
       if(verifyToken){
        const selectedUser = await User.findOne({"authToken" : userToken});
        if(selectedUser){
            selectedUser.userPost.postContainer.push({image : result.url})
            selectedUser.save();
           res.status(201).json({message : "image added successfully"})
        }
       }else{
        return res.status(201).json({message : "unable to authenticate"})
       }

    }else{
        return res.status(400).json({message : "unable to upload image"})
    }
})
}




catch(err){
    console.log(err);
}


module.exports = router;