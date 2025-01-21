import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import customApi from "../../api";

function EditPenduduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    laki: "",
    perempuan: "",
    kepalaKeluarga: "",
    penduduk: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customApi.get(`penduduks/${id}`);
        setFormData({
          laki: res.data.laki,
          perempuan: res.data.perempuan,
          kepalaKeluarga: res.data.kepalaKeluarga,
          penduduk: res.data.penduduk,
        });
      } catch (err) {
        console.error(err);
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

    const token = localStorage.getItem("token")
    try {
      await customApi.put(`penduduks/${id}`, formData, {
        headers: {
          "x-auth-token": token
        }
      });
      alert("Administrative updated successfully");
      navigate("/adminpanel");
    } catch (err) {
      console.error(err);
      alert("Error updating administrative");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Struktur Organisasi Desa
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Jumlah Laki-Laki"
            name="laki"
            value={formData.laki}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Jumlah Perempuan"
            name="perempuan"
            value={formData.perempuan}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Jumlah Kepala Keluarga"
            name="kepalaKeluarga"
            value={formData.kepalaKeluarga}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Jumlah Penduduk"
            name="penduduk"
            value={formData.penduduk}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Update Administrasi Desa
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditPenduduk;
