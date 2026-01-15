import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

export default function Viewuser() {
     const[allusers,setAllusers]=useState([]);
      useEffect(()=>{
     fetchusers();
  },[])
  const fetchusers=async()=>{
    try {
      const response=await axios.get('http://localhost:5000/api/user/getuser')
      setAllusers(response.data.getusers)
      console.log("All Users",response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete=(mid)=>{
console.log('user_id'+mid);
axios.delete(`http://localhost:5000/api/user/deleteuser/${mid}`)
.then(()=>{
alert('user deleted successfully')
fetchusers();
})
.catch((error)=>{
  console.log(error)

})
  }
  
  return (
    <div>
         <Typography variant='h4' fontFamily='monospace'> View Users</Typography>
     <TableContainer
  style={{
    width: '80%',             // reduce width to fit right side
    marginLeft: 'auto',       // push table to right
    marginRight: '20px',      // some right spacing
    borderRadius: 8,
    border: '2px solid #1976d2',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
    overflowX: 'auto'
  }}
>


              
             <Table sx={{ tableLayout: 'fixed' }}>
  <TableHead sx={{ backgroundColor: 'black' }}>
    <TableRow>
      <TableCell align="center" sx={{ color: 'white', width: "70px" }}>
        SL.NO
      </TableCell>
      <TableCell align="center" sx={{ color: 'white', width: "180px" }}>
        Name
      </TableCell>
      <TableCell align="center" sx={{ color: 'white', width: "200px" }}>
        Email
      </TableCell>
      <TableCell align="center" sx={{ color: 'white', width: "120px" }}>
        Phone
      </TableCell>
      <TableCell align="center" sx={{ color: 'white', width: "250px" }}>
        Address
      </TableCell>
      <TableCell align="center" sx={{ color: 'white', width: "120px" }}>
        Actions
      </TableCell>
    </TableRow>
  </TableHead>

  <TableBody>
    {allusers.map((userdata, index) => (
      <TableRow key={userdata._id}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{userdata.name}</TableCell>
        <TableCell align="center">{userdata.email}</TableCell>
        <TableCell align="center">{userdata.phone}</TableCell>
        <TableCell align="center">{userdata.address}</TableCell>
        <TableCell align="center">
          <Button
            color="error"
            onClick={() => handleDelete(userdata._id)}
          >
            <DeleteForeverIcon />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

</TableContainer>
    </div>
  )
}
