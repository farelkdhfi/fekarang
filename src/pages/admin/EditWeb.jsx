import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  InputLabel,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import customApi from "../../api";

const Input = styled("input")({
  display: "none",
});

function EditWeb() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [previewImages, setPreviewImages] = useState({
    fotoKepalaDesa: "",
    fotoSekretarisDesa: "",
    fotoKasiPemerintahan: "",
    fotoKasiKesra: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customApi.get(`websites/${id}`);
        setFormData({
          sambutan: res.data.sambutan,
          namaKepalaDesa: res.data.namaKepalaDesa,
          namaSekretarisDesa: res.data.namaSekretarisDesa,
          namaKasiPemerintahan: res.data.namaKasiPemerintahan,
          namaKasiKesra: res.data.namaKasiKesra,
          fotoKepalaDesa: null,
          fotoSekretarisDesa: null,
          fotoKasiPemerintahan: null,
          fotoKasiKesra: null,
        });
        setPreviewImages({
          fotoKepalaDesa: res.data.fotoKepalaDesa,
          fotoSekretarisDesa: res.data.fotoSekretarisDesa,
          fotoKasiPemerintahan: res.data.fotoKasiPemerintahan,
          fotoKasiKesra: res.data.fotoKasiKesra,
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

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    setPreviewImages({ ...previewImages, [name]: URL.createObjectURL(files[0]) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("sambutan", formData.sambutan);
    data.append("namaKepalaDesa", formData.namaKepalaDesa);
    data.append("namaSekretarisDesa", formData.namaSekretarisDesa);
    data.append("namaKasiPemerintahan", formData.namaKasiPemerintahan);
    data.append("namaKasiKesra", formData.namaKasiKesra);
    ["fotoKepalaDesa", "fotoSekretarisDesa", "fotoKasiPemerintahan", "fotoKasiKesra"].forEach(
      (field) => {
        if (formData[field]) {
          data.append(field, formData[field]);
        }
      }
    );

    const token = localStorage.getItem("token")
    try {
      await customApi.put(`websites/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token
        },
      });
      alert("Content updated successfully");
      navigate("/adminpanel")
    } catch (err) {
      console.error(err);
      alert("Error updating content");
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
            label="Sambutan"
            name="sambutan"
            value={formData.sambutan}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />

          {[
            "KepalaDesa",
            "SekretarisDesa",
            "KasiPemerintahan",
            "KasiKesra",
          ].map((role) => (
            <Box key={role} marginBottom={3}>
              <TextField
                label={`Nama ${role.replace(/([A-Z])/g, " $1")}`}
                name={`nama${role}`}
                value={formData[`nama${role}`]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <InputLabel shrink>Upload Gambar {role.replace(/([A-Z])/g, " $1")}</InputLabel>
              <label htmlFor={`upload-${role}`}>
                <Input
                  accept="image/*"
                  id={`upload-${role}`}
                  type="file"
                  name={`foto${role}`}
                  onChange={handleImageChange}
                />
                <Button variant="contained" component="span" sx={{ mt: 1 }}>
                  Upload
                </Button>
              </label>
              {previewImages[`foto${role}`] && (
                <Box mt={2}>
                  <img
                    src={previewImages[`foto${role}`]}
                    alt={`Preview ${role}`}
                    style={{ maxWidth: "100%", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  />
                </Box>
              )}
            </Box>
          ))}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Update Struktur Organisasi Desa
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditWeb;
