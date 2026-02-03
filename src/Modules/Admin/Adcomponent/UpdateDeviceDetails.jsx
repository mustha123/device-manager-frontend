import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api';

export default function UpdateDeviceDetails() {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [update, setUpdate] = useState({
    dname: '',
    dtype: '',
    dbrand: '',
    dimage: '',
    ddate: '',
    dprice: ''
  });

  const [imagefile, setImagefile] = useState(null);

  useEffect(() => {
    api.get(`/api/device/getdevicebyid/${pid}`)
      .then((res) => {
        const data = res.data.oneproduct;
        setUpdate({
          dname: data.device_name,
          dtype: data.device_type,
          dbrand: data.device_brand,
          dimage: data.device_image,
          ddate: data.device_date?.slice(0, 10),
          dprice: data.device_price || ''
        });
      })
      .catch(console.log);
  }, [pid]);

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("device_name", update.dname);
    formData.append("device_type", update.dtype);
    formData.append("device_brand", update.dbrand);
    formData.append("device_date", update.ddate);
    formData.append("device_price", update.dprice);

    if (imagefile) formData.append("dimage", imagefile);

    api.put(`/api/device/updateitem/${pid}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(() => {
      alert("Item updated successfully");
      navigate("/admin/viewdevice");
    })
    .catch(console.log);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: { xs: 2, sm: 4 }, // 📱 Mobile view
        px: 2 // 📱 Mobile view
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: { xs: "100%", sm: "600px" }, // 📱 Mobile view
          p: { xs: "20px 15px", sm: "25px" }, // 📱 Mobile view
          borderRadius: 3
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          UPDATE DEVICE DETAILS
        </Typography>

        <TextField label="Name" name="dname" value={update.dname} onChange={handleChange} fullWidth size="small" sx={{ mb: 2 }} />
        <TextField label="Type" name="dtype" value={update.dtype} onChange={handleChange} fullWidth size="small" sx={{ mb: 2 }} />
        <TextField label="Brand" name="dbrand" value={update.dbrand} onChange={handleChange} fullWidth size="small" sx={{ mb: 2 }} />

        <TextField
          label="Device Image"
          type="file"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setImagefile(e.target.files[0])}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />

        <TextField label="Date" name="ddate" type="date" value={update.ddate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth size="small" sx={{ mb: 2 }} />
        <TextField label="Price" name="dprice" type="number" value={update.dprice} onChange={handleChange} fullWidth size="small" sx={{ mb: 3 }} />

        <Button
          variant="contained"
          color="error"
          fullWidth // 📱 Mobile view
          onClick={handleUpdate}
          sx={{
            height: { xs: 45, sm: 40 }, // 📱 Mobile view
            fontSize: { xs: "16px", sm: "14px" },
            borderRadius: 2
          }}
        >
          UPDATE PRODUCT
        </Button>
      </Paper>
    </Box>
  );
}
