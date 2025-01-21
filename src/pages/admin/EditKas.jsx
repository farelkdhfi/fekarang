import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import customApi from "../../api";

function EditKas() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await customApi.get(`kass/${id}`, {
          headers: { "x-auth-token": token },
        });
        setFormData(response.data); // Mengisi form dengan data yang diambil dari server
      } catch (err) {
        console.error("Error fetching data", err);
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      await customApi.put(`kass/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      alert("Content updated successfully");
      navigate("/adminpanel"); // Mengarahkan kembali ke halaman list kas desa setelah update
    } catch (err) {
      console.error("Error updating content", err);
      alert("Error updating content");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Edit Data Kas Desa
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
                  label="Swadaya, Partisipasi dan Gotong Royong"
                  name="swadaya"
                  value={formData.swadaya}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Portal dan Warung Bakul"
                  name="portal"
                  value={formData.portal}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Urunan Desa dan Retribusi Pengusaha"
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
                  Update Content
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditKas;
