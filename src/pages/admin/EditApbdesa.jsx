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

function EditApbdesa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pendapatanDesa: "",
    pengeluaranDesa: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customApi.get(`apbdesas/${id}`);
        setFormData({
          pendapatanDesa: res.data.pendapatanDesa,
          pengeluaranDesa: res.data.pengeluaranDesa,
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
      await customApi.put(`apbdesas/${id}`, formData,
        {
          headers: {
            "x-auth-token": token
          }
        }
      );
      alert("Apb Desa updated successfully");
      navigate("/adminpanel");
    } catch (err) {
      console.error(err);
      alert("Error updating Apb Desa");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Struktur Apb Desa
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Jumlah Pendapatan Desa"
            name="pendapatanDesa"
            value={formData.pendapatanDesa}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Jumlah Perempuan"
            name="pengeluaranDesa"
            value={formData.pengeluaranDesa}
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
            Update Apb Desa
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditApbdesa;
