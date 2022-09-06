import { Route, Router, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  return (

    <>
      <Header />
      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
      <ToastContainer />
      <Footer />
    </>);
}

export default App;
