import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import AdminPanel from "./pages/admin/AdminPanel";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/user/HomePage";
import ProductDetails from "./pages/user/ProductDetails";
import UploadProduct from "./pages/admin/UploadProduct";
import EditProduct from "./pages/admin/EditProduct";
import MyApplications from "./pages/user/MyApplications";
import Masingmasing from "./pages/admin/Masingmasing";
import Skdp from "./pages/formApplications/Skdp";
import Skdl from "./pages/formApplications/Skdl";
import Sktm from "./pages/formApplications/Sktm";
import Sku from "./pages/formApplications/Sku";
import TentangDesa from "./pages/user/TentangDesa";
import UploadWeb from "./pages/admin/UploadWeb";
import EditWeb from "./pages/admin/EditWeb";
import UploadPenduduk from "./pages/admin/uploadPenduduk";
import EditPenduduk from "./pages/admin/EditPenduduk";
import UploadApbdesa from "./pages/admin/UploadApbdesa";
import EditApbdesa from "./pages/admin/EditApbdesa";
import HomePageEdit from "./pages/admin/HomePageEdit";
import ProtectedHalaman from "./utils/ProtectedHalaman";
import UploadBerita from "./pages/admin/UploadBerita";
import EditBerita from "./pages/admin/EditBerita";
import SemuaBerita from "./pages/user/SemuaBerita";
import BeritaDetail from "./pages/user/BeritaDetail";
import UploadVisimisi from "./pages/admin/UploadVisimisi";
import EditVisiMisi from "./pages/admin/EditVisiMisi";
import UploadSejarah from "./pages/admin/UploadSejarah";
import EditSejarah from "./pages/admin/EditSejarah";
import UploadPerangkatDesa from "./pages/admin/UploadPerangkatDesa";
import EditSemuaPerangkatDesa from "./pages/admin/EditSemuaPerangkatDesa";
import UploadPerwakilanDesa from "./pages/admin/UploadPerwakilanDesa";
import EditSemuaPerwakilan from "./pages/admin/EditSemuaPerwakilanDesa";
import UploadLpm from "./pages/admin/UploadLpm";
import EditSemuaLpm from "./pages/admin/EditSemuaLpm";
import UploadPendidikan from "./pages/admin/UploadPendidikan";
import UploadPekerjaan from "./pages/admin/UploadPekerjaan";
import UploadKas from "./pages/admin/UploadKas";
import Layanan from "./pages/user/Layanan";
import EditPendidikan from "./pages/admin/EditPendidikan";
import EditPekerjaan from "./pages/admin/EditPekerjaan";
import EditKas from "./pages/admin/EditKas";
import SemuaProduk from "./pages/user/SemuaProduk";
import PotensiDesa from "./pages/user/PotensiDesa";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />          
          <Route path="/homeedit" element={<HomePageEdit />} />          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={ <Dashboard />}/>
          <Route path="/layanan" element={ <Layanan />}/>
          <Route path="/potensi" element={ <PotensiDesa />}/>

          <Route path="/adminpanel" element={<AdminPanel />}/>

          <Route path="/uploadweb" element={<UploadWeb />} />
          <Route path="/websites/:id/edit" element={<EditWeb />} /> 
          
          <Route path="/uploadpenduduk" element={<UploadPenduduk />} />
          <Route path="/penduduks/:id/edit" element={<EditPenduduk />} /> 

          <Route path="/uploadapbdesa" element={<UploadApbdesa />} />
          <Route path="/apbdesas/:id/edit" element={<EditApbdesa />} /> 
          
          <Route path="/uploadberita" element={<UploadBerita />} />
          <Route path="/beritas/:id/edit" element={<EditBerita />} /> 
          <Route path="/semua-berita" element={<SemuaBerita />} /> 
          <Route path="/beritas/:id" element={<BeritaDetail />} /> 

          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/uploadproduct" element={<UploadProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} /> 
          <Route path="/umkm" element={<SemuaProduk />} /> 

          <Route path="/uploadvisi" element={<UploadVisimisi />} />
          <Route path="/visimisis/:id/edit" element={<EditVisiMisi />} /> 

          <Route path="/uploadsejarah" element={<UploadSejarah />} />
          <Route path="/sejarahs/:id/edit" element={<EditSejarah />} /> 

          <Route path="/uploadperangkat" element={<UploadPerangkatDesa />} />
          <Route path="/perangkats/:id/edit" element={<EditSemuaPerangkatDesa />} /> 

          <Route path="/uploadperwakilan" element={<UploadPerwakilanDesa />} />
          <Route path="/perwakilans/:id/edit" element={<EditSemuaPerwakilan />} /> 

          <Route path="/uploadlpm" element={<UploadLpm />} />
          <Route path="/lpms/:id/edit" element={<EditSemuaLpm />} /> 

          <Route path="/uploadpendidikan" element={<UploadPendidikan />} />
          <Route path="/pendidikans/:id/edit" element={<EditPendidikan />} /> 

          <Route path="/uploadpekerjaan" element={<UploadPekerjaan />} />
          <Route path="/pekerjaans/:id/edit" element={<EditPekerjaan />} /> 

          <Route path="/uploadkas" element={<UploadKas />} />
          <Route path="/kass/:id/edit" element={<EditKas />} />           

          <Route path="/myapp" element={<MyApplications />} /> 
          <Route path="/masing" element={<Masingmasing />} /> 
          <Route path="/skdp" element={<Skdp />} /> 
          <Route path="/skdl" element={<Skdl />} /> 
          <Route path="/sktm" element={<Sktm />} /> 
          <Route path="/sku" element={<Sku />} /> 
          <Route path="/tentang" element={<TentangDesa />} /> 
          <Route path="/protect" element={<ProtectedHalaman />} /> 
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
