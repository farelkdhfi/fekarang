import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import customApi from "../../api";

function UploadPekerjaan() {
  const [formData, setFormData] = useState({
    petani: "",
    pedagang: "",
    pengrajin: "",
    pns: "",
    tni: "",
    pensiunan: "",
    swasta: "",
    buruh: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      petani: formData.petani,
      pedagang: formData.pedagang,
      pengrajin: formData.pengrajin,
      pns: formData.pns,
      tni: formData.tni,
      pensiunan: formData.pensiunan,
      swasta: formData.swasta,
      buruh: formData.buruh,
    };
    const token = localStorage.getItem("token")
    try {
      await customApi.post("pekerjaans/add", data, {
        headers: { 
            "Content-Type": "application/json",
            "x-auth-token" : token, 
        },
      });
      alert("Content uploaded successfully");
      setFormData({
        petani: "",
        pedagang: "",
        pengrajin: "",
        pns: "",
        tni: "",
        pensiunan: "",
        swasta: "",
        buruh: "",
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
            Upload Pekerjaan Penduduk Desa
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah petani"
                  name="petani"
                  value={formData.petani}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah pedagang"
                  name="pedagang"
                  value={formData.pedagang}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah pengrajin"
                  name="pengrajin"
                  value={formData.pengrajin}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah PNS"
                  name="pns"
                  value={formData.pns}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah TNI"
                  name="tni"
                  value={formData.tni}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah pensiunan"
                  name="pensiunan"
                  value={formData.pensiunan}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah swasta"
                  name="swasta"
                  value={formData.swasta}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Jumlah buruh"
                  name="buruh"
                  value={formData.buruh}
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

export default UploadPekerjaan;
