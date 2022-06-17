import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider"

import "./assets/less/App.less";

import Home from "./pages/Home";

import Login from "./components/Login";
import Navigation from "./components/Navigation";
import RightClick from "./components/RightClick";

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <RightClick />
                <Navigation />
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Login />} path="/login" />
                </Routes>
            </AuthProvider>
        </Router>
    )
};

export default App;