import { useState } from "react";


import { Button } from "primereact/button";

import GuildCarousel from "../components/Guild/GuildCarousel";
import UserGuildCarousel from "../components/Guild/User/UserGuildCarousel";

const Servers = ({ auth }) => {
    const [servers, setServers] = useState("bot");

    return (
        <>
        {auth && (
            <div className="flex align-items-center justify-content-center">
                <Button
                    className="p-button-success mr-1"
                    label="Bot's Servers"
                    onClick={() => setServers("bot")}
                />
                <Button
                    className="p-button-danger"
                    label="Your Servers"
                    onClick={() => setServers("user")}
                />
            </div>
        )}
        <div className="flex flex-row align-items-center justify-content-center pt-5 scalein">
            {servers === "bot" && <GuildCarousel />}
            {servers === "user" && auth && <UserGuildCarousel />}
        </div>
        </>
    );
}

export default Servers;