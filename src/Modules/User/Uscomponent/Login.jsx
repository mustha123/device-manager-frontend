import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
// import axios from 'axios';
import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import api from '../../../api';

export default function Login() {
const[email,setEmail]=useState({
email:'',
password:'',
})
  const handleChange=(e)=>{
     setEmail({...email,[e.target.name]:e.target.value});
        console.log({[e.target.name]:e.target.value})
  }
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    console.log(email)
    e.preventDefault(); 
    api.post('/api/user/login' ,email)
    .then((res)=>{
      console.log("details fetched",res.data);
      if (res.data.success) { 
localStorage.setItem('UserToken', res.data.Token)
      console.log('User token stored in localStorage', res.data.Token);
    alert("Login Successful");
    navigate('/devicecontents')
} else {
    alert("Incorrect email or password");
}

  })
     .catch((error)=>{
      console.log(error)
      alert("Login Failed")
     
     })
     
  }
  return (
    <div>
      
      <Paper elevation={3} style={{padding:'30px',width:'300px',margin:'20px auto'}}>
        <h2>Login</h2>
        <TextField label="Email" variant="outlined" onChange={handleChange} name='email' value={email.email} type='email'autoComplete='off' fullWidth style={{marginBottom:'20px'}}/>
        <TextField label="Password" variant="outlined" onChange={handleChange} name='password' value={email.password} type="password" autoComplete="new-password" fullWidth style={{marginBottom:'20px'}}/>

        <Button variant="contained" onClick={handleSubmit} style={{backgroundColor:'#ef1027ff',color:'white',Padding:'30px',width:'100px',height:'30px'}}>Login</Button>
          <Button sx={{mt:7}}> <Link to='/register'> Continue with Register</Link>
         </Button>
        
        </Paper>
    </div>
  )
}
