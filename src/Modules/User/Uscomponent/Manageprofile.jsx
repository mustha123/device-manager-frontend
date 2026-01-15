import { Margin } from '@mui/icons-material'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Manageprofile() {
    const[profile,setProfile]=useState({
        uname:'',
        uemail:'',
        uphone:'',
        uaddress:''
    });
//to handle updates in state
    const handleChange=(e)=>{
        setProfile({...profile,[e.target.name]:e.target.value});
        console.log({[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        const token=localStorage.getItem('UserToken')
        console.log('user token',token)
        if(token){
            axios.get('http://localhost:5000/api/user/Getprofile',{headers:{"Authorization":token}})
        .then((res)=>{
        //   setProfile(res.data.user)
          const userdata=res.data.user;
          setProfile({
        uname:userdata.name,
        uemail:userdata.email,
        uphone:userdata.phone,
        uaddress:userdata.address
          })
        })
        .catch((err)=>{
            console.log(err)
        })
        }else{
            alert('token not found')
        }
        
    },[])
    const handleprofileupdate=()=>{
        const token= localStorage.getItem('UserToken')
        console.log(token)
            axios.put('http://localhost:5000/api/user/manageprofile',profile,{headers:{"Authorization":token}})
            .then((res)=>{
            alert(res.data.message);
            setProfile(res.data.user) 
            
            })
            .catch((error)=>{
                console.log(error)
                alert(error.message)

            })


    }
  return (
    <div>
        <Box style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
            <Paper elevation={4} style={{width:'600px',padding:'20px'}}>
                <Typography><h4>Manage profile</h4></Typography>
                <TextField varient='outlined' label='Name' onChange={handleChange} value={profile.uname} name='uname' fullWidth sx={{mb:3}}/>
                <TextField varient='outlined' label='Email'onChange={handleChange} value={profile.uemail} name='uemail' fullWidth sx={{mb:3}}/>
                <TextField varient='outlined' label='Phone' onChange={handleChange} value={profile.uphone} name='uphone' fullWidth sx={{mb:3}}/>
                <TextField varient='outlined' label='Address' onChange={handleChange} value={profile.uaddress} name='uaddress' fullWidth sx={{mb:3}}/>
                <Button varient='contained'/*onClick={handleprofileupdate}*/ color='error'>UPDATE PROFILE</Button>
            </Paper>
        </Box>
      
    </div>
  )
}

