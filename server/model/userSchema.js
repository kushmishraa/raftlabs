const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fname :{
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true
    },
    number : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    authToken : {
        type : String,
        required : false
    },
    userPost : {
                postContainer : [
                    {
                        image : {
                            type : String,
                            required : false
                        },
                        caption : {
                            type : String,
                            required : false
                        },
                        tagged : [
                            {
                                type : String,
                                required : false
                            }
                        ],
                        comments :{
                            type : String,
                            required : false
                        },
                        like : {
                            type : Number,
                            required : false
                        }
                    }
                ]
    },

    profilePicture : {
        type : String,
        required : false
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({id : this._id} , process.env.SECRETKEY)
        this.authToken = token
        await this.save();
        return token
    }catch(err){
        console.log(err)
    }
}

const user = mongoose.model('user' , userSchema)

module.exports = user;