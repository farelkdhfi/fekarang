import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import customApi from "../../api";

function UploadPenduduk() {
  const [formData, setFormData] = useState({
    laki: "",
    perempuan: "",
    kepalaKeluarga: "",
    penduduk: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      laki: formData.laki,
      perempuan: formData.perempuan,
      penduduk: formData.penduduk,
      kepalaKeluarga: formData.kepalaKeluarga,
    };

    const token = localStorage.getItem("token")
    try {
      await customApi.post("penduduks/add", data, {
        headers: { 
          "Content-Type": "application/json",
          "x-auth-token": token 
        },
      });
      alert("Content uploaded successfully");
      setFormData({
        laki: "",
        perempuan: "",
        kepalaKeluarga: "",
        penduduk: "",
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
            Upload Profil Desa
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah Penduduk"
                  name="penduduk"
                  value={formData.penduduk}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah Kepala Keluarga"
                  name="kepalaKeluarga"
                  value={formData.kepalaKeluarga}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah Penduduk Laki-laki"
                  name="laki"
                  value={formData.laki}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah Penduduk Perempuan"
                  name="perempuan"
                  value={formData.perempuan}
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

export default UploadPenduduk;
