import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider"

import "./assets/less/App.less";

import Home from "./pages/Home";
import Callback from "./components/Callback";

const App = () => {

    return (
        <Router>
            <AuthProvider>
                <a href="https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=identify%20guilds" >Login</a>
                <Routes>
                    <Route element={<Home />} path='/' />
                    <Route element={<Callback />} path="/callback" />
                </Routes>
            </AuthProvider>
        </Router>
    )
};

export default App;