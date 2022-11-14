import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider";

import "./assets/less/App.less";

import Home from "./pages/Home";
import GuildPage from "./pages/GuildPage";
import Me from "./pages/Me";

import Login from "./components/Login";
import Navigation from "./components/Navigation";

const App = () => {
    console.log("%cStop!", "color: red; font-size: 40px; font-weight: bold;");
    console.log(
        '%cDo not enter any scripts or some sort of "hack" here, it will most likely compromise your account and steal your information',
        "font-size: 30px; font-weight: bold;"
    );
    console.log(
        "%cThis browser feature is intended for developers only",
        "font-size: 30px; font-weight: bold;"
    );

    return (
        <Router>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route caseSensitive element={<Home />} path="/" />
                    <Route caseSensitive element={<Me />} path="/@me" />
                    <Route caseSensitive path="guild">
                        <Route path=":guildId" element={<GuildPage />} />
                    </Route>
                    <Route element={<Login />} path="/login" />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
