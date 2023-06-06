import React from 'react'
import {useState } from 'react'
import {Box , Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useNavigate} from 'react-router-dom'
export const Signup = () =>{
    const navigate = useNavigate();
    const [signUpData , setSignUpData] = useState({})

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();

        // storing all user data
       const fname = e.currentTarget.fname.value;
       const lname = e.currentTarget.lname.value;
       const number = e.currentTarget.number.value;
       const password = e.currentTarget.password.value;
       const cpassword = e.currentTarget.cpassword.value;
       const email = e.currentTarget.email.value;

       const userData = {
        fname : fname,
        lname : lname,
        number : number,
        password : password,
        cpassword : cpassword,
        email : email
       }

       setSignUpData(userData);

      
        navigate("/");
       
    }

    return(
        <Box sx={{width : '100%' , height : '100vh'}}>
            <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
                <div className='heading'>
                    <h1 className='text-pink-500 text-2xl'>Create a new Account</h1>
                </div>
                <form autoComplete='off' className='w-1/2 flex flex-col justify-center items-center gap-2' onSubmit={handleFormSubmit}>
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