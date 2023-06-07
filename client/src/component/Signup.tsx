import React from 'react'
import {useState } from 'react'
import {Box , Button, Input} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'

type userDataType = {
    fname : string,
    lname : String,
    email : String,
    number : String,
    password : String
}

export const Signup = () =>{
    const navigate = useNavigate();
    const [signUpData , setSignUpData] = useState({})


    const signupUser = async (userData : userDataType) =>{

        const {fname , lname , email , number , password} = userData;
        console.log(fname,lname,email,number,password);
      
      try{  
            const res = await fetch('/register-user', {
            method  : "POST",
            headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                    },
           body :JSON.stringify({
            "fname" : fname,
            "lname" : lname,
            "email" : email,
            "number" : number,
            "password" : password
           }),
            credentials: 'include' // should be there
        
        })

        const data = await res.json();

        }
        catch(err){
            console.log(err);
        }

        
    }

    const uploadProfilePic =  async (e : React.FormEvent<HTMLFormElement> , email : string) =>{
        const formData = new FormData();
        formData.append('image' , e.currentTarget.image.files[0]);
        formData.append('isProfilePic' , "true");
        formData.append('email' , email)
        const res = await fetch('/upload',{
            method : "POST",
            body : formData
        })

        const data = await res.json();
        console.log(data);
    }

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();

        // storing all user data
       const fname = e.currentTarget.fname.value;
       const lname = e.currentTarget.lname.value;
       const number = e.currentTarget.number.value;
       const password = e.currentTarget.password.value;
       const cpassword = e.currentTarget.cpassword.value;
       const email = e.currentTarget.email.value;
        if(password != cpassword){
            return
        }
       const userData = {
        fname : fname,
        lname : lname,
        number : number,
        password : password,
        cpassword : cpassword,
        email : email
       }

       signupUser(userData);
       uploadProfilePic(e , email);

       navigate("/");
       
    }

    return(
        <Box sx={{width : '100%' , height : '100vh'}}>
            <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
                <div className='heading'>
                    <h1 className='text-pink-500 text-2xl'>Create a new Account</h1>
                </div>
                <form autoComplete='off' className='w-1/2 flex flex-col justify-center items-center gap-2' onSubmit={handleFormSubmit}>
                    
                    <Input
                    type="file"
                    name='image' />
                    
                    <TextField
                    required
                    label="First Name"
                    variant='outlined'
                    sx={{width:'50%'}}
                    name='fname'/>

                    <TextField
                    required
                    label="Last Name"
                    variant='outlined'
                    sx={{width:'50%'}}
                    name='lname'/>

                    <TextField
                    required
                    id="emailAddress"
                    label="Email Address"
                    type="email"
                    variant='outlined'
                    sx={{width:'50%'}}
                    name='email'
                    />
                    <TextField
                    required
                    id="number"
                    label="Phone Number"
                    type="text"
                    variant='outlined'
                    sx={{width:'50%'}}
                    name='number'/>
                    
                    <TextField
                    id="password"
                    required
                    label="Password"
                    type="password"
                    variant='outlined'
                    sx={{width:'50%'}}
                    name='password'/>
                    
                    <TextField
                    id="cpassword"
                    required
                    label="Confrim Password"
                    type="password"
                    variant='outlined'
                    sx={{width:'50%'}}
                    name='cpassword'/>
                    
                    <Button variant="contained" type="submit" sx={{width:'50%'}}>Sign Up</Button>
                </form>
                </div>
        </Box>  
    )
}