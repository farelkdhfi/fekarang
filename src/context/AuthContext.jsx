import { createContext, useState, useEffect } from "react";

// Membuat context
export const AuthContext = createContext();

// Provider untuk AuthContext
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null, // Token JWT
    role: null,  // Role pengguna (admin atau user)
  });

  // Fungsi untuk login
  const login = (token, role) => {
    // Simpan token dan role di state
    setAuth({ token, role });
    // Simpan token di localStorage untuk persistensi
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  // Fungsi untuk logout
  const logout = () => {
    setAuth({ token: null, role: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // Fungsi untuk memuat token saat aplikasi dimulai
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setAuth({ token, role });
    }
  }, []); // Empty dependency array -> hanya dijalankan sekali saat komponen mount

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
