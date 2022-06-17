import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider"

import "./assets/less/App.less";

import Home from "./pages/Home";

import Login from "./components/Login";
import Navigation from "./components/Navigation";
import CommandPage from './pages/CommandPage';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route caseSensitive element={<Home />} path='/' />
                    <Route caseSensitive path="command">
                        <Route path=":commandName" element={<CommandPage />} />
                    </Route>
                    <Route element={<Login />} path="/login" />
                </Routes>
            </AuthProvider>
        </Router>
    )
};

export default App;