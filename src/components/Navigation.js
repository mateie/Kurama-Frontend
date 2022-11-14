import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import "../assets/less/Navigation.less";

import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";

import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const items = [
        {
            label: "Home",
            command: () => navigate("/"),
        },
    ];

    const authLink =
        process.env.NODE_ENV === "production"
            ? "https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=https%3A%2F%2Fkuramisa.com%2Flogin&response_type=code&scope=identify%20guilds"
            : "https://discord.com/api/oauth2/authorize?client_id=969414951292788766&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify%20guilds";

    if (!auth)
        return (
            <Menubar
                className="top-nav"
                model={items}
                end={
                    <Button
                        label="Login"
                        className="p-button-success"
                        onClick={() => (window.location.href = authLink)}
                    />
                }
            />
        );

    return (
        <Menubar end={<ProfileButton />} className="top-nav" model={items} />
    );
};

export default Navigation;
