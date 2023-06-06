import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom'
export const Login  = ()=>{
    const [loginDetails , setLoginDetails] = useState({});

    const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
       //storing login details
        setLoginDetails({
            email : e.currentTarget.email.value,
            password : e.currentTarget.password.value
        })
        console.log(loginDetails)
    }
    return(
       <Box sx={{height : '100%'}}>
        <div className='w-full flex flex-col justify-center items-center h-full gap-5'>
            <div className=''>
                <h1 className='text-pink-500 text-2xl'>Login to your account</h1>
            </div>
            <form className="w-1/2 flex flex-col justify-center items-center gap-2" onSubmit={handleFormSubmit}>
                <TextField
                    id='email'
                    label="Email address"
                    variant='outlined'
                    type="email"
                    name='email'
                    />
                    
                    <TextField
                    id='password'
                    label="Password"
                    variant='outlined'
                    maxRows={1}
                    type="password"
                    name='password'
                />

                <Button variant="contained" type="submit" >Login</Button>
        </form>
        <div className=''>
            <Link to="/signup"><h2>Dont'have an account ?</h2></Link>
        </div>
    </div>
       </Box>
    )
}