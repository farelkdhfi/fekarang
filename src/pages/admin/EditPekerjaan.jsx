import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import customApi from "../../api";

function EditPekerjaan() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await customApi.get(`pekerjaans/${id}`, {
          headers: { "x-auth-token": token },
        });
        setFormData(response.data); // Mengisi form dengan data dari server
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
      await customApi.put(`pekerjaans/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      alert("Content updated successfully");
      navigate("/adminpanel"); // Kembali ke halaman list setelah update
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
            Edit Data Pekerjaan Penduduk Desa
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

export default EditPekerjaan;
