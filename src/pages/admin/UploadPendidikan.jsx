import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import customApi from "../../api";

function UploadPendidikan() {
  const [formData, setFormData] = useState({
    belumSekolah: "",
    tamatSd: "",
    tidakTamatSd: "",
    tamatSLTA: "",
    tamatPerguruanTinggi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      belumSekolah: formData.belumSekolah,
      tamatSd: formData.tamatSd,
      tidakTamatSd: formData.tidakTamatSd,
      tamatPerguruanTinggi: formData.tamatPerguruanTinggi,
      tamatSLTA: formData.tamatSLTA,
    };
    const token = localStorage.getItem("token")
    try {
      await customApi.post("pendidikans/add", data, {
        headers: { 
            "Content-Type": "application/json",
            "x-auth-token" : token, 
        },
      });
      alert("Content uploaded successfully");
      setFormData({
        belumSekolah: "",
        tamatSd: "",
        tidakTamatSd: "",
        tamatPerguruanTinggi: "",
        tamatSLTA: "",
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
            Upload Pendidikan Desa
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah penduduk belum sekolah"
                  name="belumSekolah"
                  value={formData.belumSekolah}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah penduduk tidak tamat SD"
                  name="tidakTamatSd"
                  value={formData.tidakTamatSd}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah penduduk tamat SD"
                  name="tamatSd"
                  value={formData.tamatSd}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah penduduk tamat SLTA"
                  name="tamatSLTA"
                  value={formData.tamatSLTA}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah penduduk tamat Perguruan Tinggi"
                  name="tamatPerguruanTinggi"
                  value={formData.tamatPerguruanTinggi}
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

export default UploadPendidikan;
