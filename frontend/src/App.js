import { Route, Router, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContext, UrlContext } from "./context/context";
import LandingPage from "./pages/LandingPage";
import AdminDash from "./pages/AdminDash";
import { NewApplication } from "./pages/NewApplication";
import ViewApplication from "./pages/ViewApplication";


function App() {
  return (
    <>
      <UrlContext>
        <AuthContext>
          <Routes >
            <Route path="/admin/login" element={<Login admin={true} />} />
            <Route path='/admin/dash' element={<AdminDash admin={true} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/new-application" element={<NewApplication />} />
            <Route path="/view-application" element={<ViewApplication />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </AuthContext>
      </UrlContext>
    </>
  );
}

export default App;
