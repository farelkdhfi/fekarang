import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import customApi from "../../api";

function EditPendidikan() {
  const { id } = useParams(); // Mengambil id dari URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    belumSekolah: "",
    tamatSd: "",
    tidakTamatSd: "",
    tamatSLTA: "",
    tamatPerguruanTinggi: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await customApi.get(`pendidikans/${id}`, {
          headers: { "x-auth-token": token },
        });
        setFormData(response.data);
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
      await customApi.put(`pendidikans/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      alert("Content updated successfully");
      navigate("/adminpanel"); // Navigasi ke halaman list setelah update
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
            Edit Data Pendidikan Desa
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

export default EditPendidikan;
