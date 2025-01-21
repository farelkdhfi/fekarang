import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import customApi from "../../api";

function UploadApbdesa() {
  const [formData, setFormData] = useState({
    pendapatanDesa: "",
    pengeluaranDesa: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      pendapatanDesa: formData.pendapatanDesa,
      pengeluaranDesa: formData.pengeluaranDesa,
    };

    const token = localStorage.getItem("token")
    try {
      await customApi.post("apbdesas/add", data, {
        headers: { 
          "Content-Type": "application/json",
          "x-auth-token": token
         },
      });
      alert("Content uploaded successfully");
      setFormData({
        pendapatanDesa: "",
        pengeluaranDesa: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error uploading content");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Upload Apb Desa
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah Pendapatan Desa"
                  name="pendapatanDesa"
                  value={formData.pendapatanDesa}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah Pengeluaran Desa"
                  name="pengeluaranDesa"
                  value={formData.pengeluaranDesa}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Upload Content
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UploadApbdesa;
