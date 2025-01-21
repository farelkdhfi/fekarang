import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import customApi from "../../api";

function UploadWeb() {
  const [formData, setFormData] = useState({
    sambutan: "",
    namaKepalaDesa: "",
    namaSekretarisDesa: "",
    namaKasiPemerintahan: "",
    namaKasiKesra: "",
    fotoKepalaDesa: null,
    fotoSekretarisDesa: null,
    fotoKasiPemerintahan: null,
    fotoKasiKesra: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("sambutan", formData.sambutan);
    data.append("namaKepalaDesa", formData.namaKepalaDesa);
    data.append("namaSekretarisDesa", formData.namaSekretarisDesa);
    data.append("namaKasiPemerintahan", formData.namaKasiPemerintahan);
    data.append("namaKasiKesra", formData.namaKasiKesra);
    if (formData.fotoKepalaDesa) data.append("fotoKepalaDesa", formData.fotoKepalaDesa);
    if (formData.fotoSekretarisDesa) data.append("fotoSekretarisDesa", formData.fotoSekretarisDesa);
    if (formData.fotoKasiPemerintahan) data.append("fotoKasiPemerintahan", formData.fotoKasiPemerintahan);
    if (formData.fotoKasiKesra) data.append("fotoKasiKesra", formData.fotoKasiKesra);

    const token = localStorage.getItem("token")
    try {
      await customApi.post("websites/add", data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "x-auth-token": token 
        },
      });
      alert("Content uploaded successfully");
      setFormData({
        sambutan: "",
        namaKepalaDesa: "",
        namaSekretarisDesa: "",
        namaKasiPemerintahan: "",
        namaKasiKesra: "",
        fotoKepalaDesa: null,
        fotoSekretarisDesa: null,
        fotoKasiPemerintahan: null,
        fotoKasiKesra: null,
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sambutan"
                  name="sambutan"
                  multiline
                  rows={4}
                  value={formData.sambutan}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nama Kepala Desa"
                  name="namaKepalaDesa"
                  value={formData.namaKepalaDesa}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nama Sekretaris Desa"
                  name="namaSekretarisDesa"
                  value={formData.namaSekretarisDesa}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nama Kasi Pemerintahan"
                  name="namaKasiPemerintahan"
                  value={formData.namaKasiPemerintahan}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nama Kasi Kesra"
                  name="namaKasiKesra"
                  value={formData.namaKasiKesra}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Upload Foto:
                </Typography>
                <input type="file" name="fotoKepalaDesa" accept="image/*" onChange={handleImageChange} />
                <input type="file" name="fotoSekretarisDesa" accept="image/*" onChange={handleImageChange} />
                <input type="file" name="fotoKasiPemerintahan" accept="image/*" onChange={handleImageChange} />
                <input type="file" name="fotoKasiKesra" accept="image/*" onChange={handleImageChange} />
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

export default UploadWeb;
