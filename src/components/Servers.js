import { useState } from "react";

import PropTypes from "prop-types";
import { Button } from "primereact/button";

import GuildCarousel from "./Guild/GuildCarousel";
import UserGuildCarousel from "./Guild/User/UserGuildCarousel";

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
};

Servers.propTypes = {
    auth: PropTypes.object
};

export default Servers;
