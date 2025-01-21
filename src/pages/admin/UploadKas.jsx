import { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import customApi from "../../api";

function UploadKas() {
  const [formData, setFormData] = useState({
    tanah: "",
    abodemen: "",
    pam: "",
    sewaGedung: "",
    swadaya: "",
    portal: "",
    pengusaha: "",
    bumdes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      tanah: formData.tanah,
      abodemen: formData.abodemen,
      pam: formData.pam,
      sewaGedung: formData.sewaGedung,
      swadaya: formData.swadaya,
      portal: formData.portal,
      pengusaha: formData.pengusaha,
      bumdes: formData.bumdes,
    };
    const token = localStorage.getItem("token")
    try {
      await customApi.post("kass/add", data, {
        headers: { 
            "Content-Type": "application/json",
            "x-auth-token" : token, 
        },
      });
      alert("Content uploaded successfully");
      setFormData({
        tanah: "",
        abodemen: "",
        pam: "",
        sewaGedung: "",
        swadaya: "",
        portal: "",
        pengusaha: "",
        bumdes: "",
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
                  label="Tanah Kas Desa"
                  name="tanah"
                  value={formData.tanah}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Abodemen Kios Pasar"
                  name="abodemen"
                  value={formData.abodemen}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Pengguna PAM Jabangsa"
                  name="pam"
                  value={formData.pam}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Sewa Gedung Serbaguna"
                  name="sewaGedung"
                  value={formData.sewaGedung}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Swadaya,Partisipssi dan Gotong royong"
                  name="swadaya"
                  value={formData.swadaya}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Portal dan warung bakul"
                  name="portal"
                  value={formData.portal}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Urunan Desa dan Retribusi pengusaha"
                  name="pengusaha"
                  value={formData.pengusaha}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Bagi Hasil Bumdes"
                  name="bumdes"
                  value={formData.bumdes}
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

export default UploadKas;
