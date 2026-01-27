import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, styled } from '@mui/system'; 
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useContext } from 'react';
// import { UserContext } from '../../../ContextProvider';
import api from '../../../api';


const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  width: 0,
})

export default function Addproduct() {
const host =
  process.env.REACT_APP_API_URL ||
  "https://device-management-backend-zbbp.onrender.com";
  const[device,setDevice]=useState({
    dname:'',
    dtype:'',
    dbrand:'',
    dimage:'',
    ddate:'',
    dprice:''

  })
  const[categories,setCategories]=useState([]);
    
  const handleChange=(e)=>{
    if(e.target.name =='dimage'){
        setDevice({...device,dimage:e.target.files[0]})
      }else{
        setDevice({...device,[e.target.name]:e.target.value});
        console.log({[e.target.name]:e.target.value})
     }
    }
//  useEffect(()=>{

//         axios.get('http://localhost:5000/api/device/Adddevice')
//         .then((res)=>{
            
//             setDevice(res.data.Addproduct)
//             console.log(res.data)
//         })
//         .catch((error)=>{
//       console.log(error)
//         })
//     },[])
 const handleokay = () => {
  const data = new FormData();
  data.append('dname', device.dname);
  data.append('dtype', device.dtype);
  data.append('dbrand', device.dbrand);
  data.append('dimage', device.dimage);
  data.append('ddate', device.ddate);
  data.append('dprice', device.dprice);

  axios.post('/api/device/Adddevice', data, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  .then(() => alert("Product added successfully"))
  .catch((err) => console.log(err));
};



  return (
    <div>
        <Box style={{display:'flex',justifyContent:'center',marginTop:'30px'}}>
                    <Paper elevation={4} style={{width:'600px',padding:'20px'}}>
                        <Typography><h4>ADD DEVICE DETAILS </h4></Typography>
                        <TextField variant='outlined' label=' Name'onChange={handleChange}   name='dname' type='text' fullWidth sx={{mb:3}}/>
                        <TextField varient='outlined' label='Type' onChange={handleChange} name='dtype' type='text' fullWidth sx={{mb:3}}/>
                        <TextField variant='outlined' label='Brand' onChange={handleChange}  name='dbrand' type='text' fullWidth sx={{mb:3}}/>
                        <TextField variant='outlined' label='Image' onChange={handleChange}   name='dimage' InputLabelProps={{shrink:true}} type='file' fullWidth sx={{mb:3}}/>
                        <TextField variant='outlined' label='Date' onChange={handleChange}  name='ddate' InputLabelProps={{shrink:true}} type='date' fullWidth sx={{mb:3}}/>
                        <TextField variant='outlined' label='Price' onChange={handleChange}  name='dprice' type='number'  InputLabelProps={{shrink:true}} fullWidth sx={{mb:3}}/>
{/* * <Button sx={{mb:2}}
  component="label"
  role={undefined}
  variant="contained"
  InputLabelProps={{shrink:true}}
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload files
  <VisuallyHiddenInput
    type="file"
    onChange={handleChange}
    name='dimage'
    multiple
  />
</Button>   */}

        
          {/* {categories.map((catdata)=>(
            
           
          <MenuItem key={catdata._id} value={catdata._id}>{catdata.catogary_name}</MenuItem>

          ))} */}
    
      
                        
                        <Button variant='contained' onClick={handleokay}   color='error' sx={{ mt: 2, mb: 4 }}   >ADD </Button>
                    </Paper>
                </Box>
      
    </div>
  )
}
