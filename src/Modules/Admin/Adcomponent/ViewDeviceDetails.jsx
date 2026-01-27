import React, { useEffect, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import api from '../../../api';
import { API_URL } from "../../../config";



export default function ViewDeviceDetails() {
  const [view,setView]=useState([])
  useEffect(()=>{
  fetchusers();
},[])
const navigate=useNavigate();
const fetchusers = async () => {
  try {
    const response = await api.get(
      "/api/device/getdevice"
    );

    setView(response.data.getproducts);

    response.data.getproducts.forEach(prod => {
      fetchDeviceStatus(prod._id);
    });

  } catch (error) {
    console.log(error);
  }
};

const [deviceStatus, setDeviceStatus] = useState({});

const fetchDeviceStatus = async (deviceId) => {
  const res = await api.get(
    `/api/order/device-status/${deviceId}`
  );

  setDeviceStatus(prev => ({
    ...prev,
    [deviceId]: res.data.status
  }));
};

const handleDelete=(cid)=>{
  console.log('device_id'+cid)
  api.delete(`/api/device/deleteitem/${cid}`)
  .then(()=>{
    alert('Item deleted successfully')
    fetchusers();
  })
}
  return (
    <div>
       {/* <Link to={'/admin/updatedevice'}> <Button style={{marginLeft:1000,marginTop:10}} variant='contained'> Update Device Details</Button></Link> */}
       <Typography variant='h4' fontFamily='monospace'> View Device Details</Typography>
      <TableContainer 
  style={{
    width: '79%',            // Adjust width so it fits on right side
    marginLeft: 'auto',      // Push table to the right
    marginRight: '20px',     // Small right spacing
    borderRadius: 8,
    border: '2px solid #1976d2',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
    overflowX: 'auto'
  }}
>

         <Table  sx={{ tableLayout: 'fixed' }}>
  <TableHead sx={{ backgroundColor: 'black' }}>
  <TableRow>
    <TableCell sx={{ color: 'white', width: '5%', textAlign: 'center' }}>
      SLNO
    </TableCell>
    <TableCell sx={{ color: 'white', width: '15%' }}>
      Name
    </TableCell>
    <TableCell sx={{ color: 'white', width: '15%' }}>
      Type
    </TableCell>
    <TableCell sx={{ color: 'white', width: '15%' }}>
      Brand
    </TableCell>
    <TableCell sx={{ color: 'white', width: '10%', textAlign: 'center' }}>
      Image
    </TableCell>
    <TableCell sx={{ color: 'white', width: '15%', textAlign: 'center' }}>
      Date
    </TableCell>
    <TableCell sx={{ color: 'white', width: '10%', textAlign: 'center' }}>
      Price
    </TableCell>
    <TableCell sx={{ color: 'white', width: '15%', textAlign: 'center' }}>
      Action
    </TableCell>
  </TableRow>
</TableHead>


         <TableBody>
            {view.map((prod,index)=>(
                <TableRow key={prod._id}>
  <TableCell align="center">{index + 1}</TableCell>
  <TableCell>{prod.device_name}</TableCell>
  <TableCell>{prod.device_type}</TableCell>
  <TableCell>{prod.device_brand}</TableCell>

  <TableCell align="center">
    <img
      src={`${API_URL}/uploads/${prod.device_image}`}
      alt="device"
      style={{ width: 80, borderRadius: 5 }}
    />
  </TableCell>

  <TableCell align="center">{prod.device_date}</TableCell>
  <TableCell align="center">{prod.device_price}</TableCell>

  <TableCell align="center">
    <Button
      component={Link}
      to={`/admin/updatedevice/${prod._id}`}
      sx={{ '&:hover': { backgroundColor: 'darkgreen' } }}
    >
      <DriveFileRenameOutlineOutlinedIcon />
    </Button>
    <Button
      sx={{ ml: 1 }}
      color="error"
      onClick={() => handleDelete(prod._id)}
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

