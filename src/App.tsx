import React from "react";
import "./App.css";
import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./paginas/home/Home";
import Login from "./paginas/login/Login";

function App() {
    return (
    <Router>
            <Navbar />
            <div style={{ minHeight: '100vh' }}>
                <Routes>// Antigo Switch
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;

