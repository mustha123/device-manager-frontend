import { Box, Button, Paper, TextField, Typography } from '@mui/material';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api';


const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  width: 0,
});

export default function UpdateDeviceDetails() {
  const {pid}=useParams();
  const navigate=useNavigate();

  const [update,setUpdate]=useState({
    dname:'',
    dtype:'',
    dbrand:'',
    dimage:'',
    ddate:'',
    dprice:''
   })
    const [imagefile,setImagefile]=useState([])
  useEffect(() => {
  api.get(`/api/device/getdevicebyid/${pid}`)
    .then((res) => {
      const data = res.data.oneproduct;
      setUpdate({
        dname: data.device_name,
        dtype: data.device_type,
        dbrand: data.device_brand,
        dimage: data.device_image,
        ddate: data.device_date?.slice(0,10),
        dprice: data.device_price || ''
      });
    })
    .catch((error) => console.log(error));
}, [pid]); 



const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
}
    const handleUpdate = () => {
  const formData = new FormData();

  formData.append("device_name", update.dname);
  formData.append("device_type", update.dtype);
  formData.append("device_brand", update.dbrand);
  formData.append("device_date", update.ddate);
  formData.append("device_price", update.dprice);

  // VERY IMPORTANT
  if (imagefile) {
    formData.append("dimage", imagefile);
  }

  api.put(
    `/api/device/updateitem/${pid}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  .then(() => {
    alert("Item updated successfully");
    navigate("/admin/viewdevice");
  })
  .catch(err => console.log(err));
};


  return (
    <div>
        <Box
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "30px",
        }}
      >
        <Paper elevation={4} style={{ width: "600px", padding: "20px" }}>
          <Typography>
            <h4>UPDATE DEVICE DETAILS</h4>
          </Typography>

          <TextField
            variant="outlined"
            label="Name"
            name="dname"
            value={update.dname}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            variant="outlined"
            label="Type"
            name="dtype"
            value={update.dtype}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            variant="outlined"
            label="Brand"
            name="dbrand"
            type="text"
            value={update.dbrand}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
          />

        

          <TextField
            variant="outlined"
            label="Device Image"
            name="dimage"
            type="file"
            InputLabelProps={{shrink:true}}
            // value={update.dimage}
              onChange={(e) => setImagefile(e.target.files[0])}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
          variant='outlined'
          label='Date'
          name='ddate'
          type='date'
          InputLabelProps={{shrink:true}}
          value={update.ddate}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
          />
           <TextField
          variant='outlined'
          label='Price'
          name='dprice'
          type='number'
           value={update.dprice}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
          />
          {/* <FormControl sx={{ minWidth: 560 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={product.catid}
              onChange={handleChange}
              name="catid"
              label="Category"
            >
              {categories &&
                categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.catogary_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl> */}

          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2, mb: 4 }}
            onClick={handleUpdate}
          >
            UPDATE PRODUCT
          </Button>
        </Paper>
      </Box>
      
    </div>
  )
}
