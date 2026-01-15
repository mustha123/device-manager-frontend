import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Border from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const[reg,setReg]=useState({
    uname:'',
    uemail:'',
    upassword:'',
    uphone:'',
    uaddress:''
  })
  const handleChange=(e)=>{
    setReg({...reg,[e.target.name]:e.target.value});
        console.log({[e.target.name]:e.target.value})
  }
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(reg);
axios.post(
  'http://localhost:5000/api/user/addregisteruser',
  reg
)

    .then((res)=>{
      console.log("user details",res.data);
      alert("Registered Successfully")
      navigate('/login');
      })
      .catch ((error)=> {
      console.log(error)
      alert("Server error ")
    })
  }
  return (
      <div>
      <Paper elevation={3} style={{padding:'30px',width:'300px',margin:'20px auto'}}>
        <h2>Registeration</h2>
       <TextField label="Name" variant="outlined" onChange={handleChange} name='uname' fullWidth style={{marginBottom:'20px'}}/>
       <TextField label="Email" variant="outlined" onChange={handleChange} name='uemail'autoComplete='off' fullWidth style={{marginBottom:'20px'}}/>
       <TextField label="Password" variant="outlined" onChange={handleChange} name='upassword' type="password" autoComplete="new-password"
 fullWidth style={{marginBottom:'20px'}}/>
       <TextField label="Phone" variant="outlined" onChange={handleChange} name='uphone' type="number" fullWidth style={{marginBottom:'20px'}}/>
       <TextField label="Address" variant="outlined" onChange={handleChange} name='uaddress' type="text" fullWidth style={{marginBottom:'20px'}}/>
       
         <Button variant="contained" onClick={handleSubmit} style={{backgroundColor:'#ef1027ff',color:'white',Padding:'30px',width:'100px',height:'30px'}}>Register</Button>
        <Border sx={{mt:7}}> <Link to='/login'> Continue with Login</Link>
         </Border>
        
        </Paper>
  </div>
  )
}
