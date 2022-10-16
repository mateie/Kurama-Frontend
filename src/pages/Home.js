import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

import GuildCarousel from "../components/Guild/GuildCarousel";
import UserGuildCarousel from "../components/Guild/User/UserGuildCarousel";

import { FETCH_CLIENT_USER } from "../gql/queries/client";

import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
    const { auth } = useContext(AuthContext);
    const {
        loading,
        error,
        data: { clientUser: bot } = {}
    } = useQuery(FETCH_CLIENT_USER, { pollInterval: 100000 });
    const [servers, setServers] = useState("bot");

    const BotInfo = loading ? (
        <></>
    ) : error ? (
        <h1>Bot seems to be offline</h1>
    ) : (
        <div className="flex flex-wrap align-items-center justify-content-center">
            <Avatar
                image={bot.avatarURL}
                size="xlarge"
                shape="circle"
                className="shadow-8"
            />
            <h2>{bot.username}</h2>
            <h4>{bot.description}</h4>
            <h5>
                Currently I am in {bot.guilds} servers and have {bot.users}{" "}
                users
            </h5>
        </div>
    );

    return (
        <>
            <div className="flex justify-content-between m-2 pt-5 scalein animation-ease-out animation-duration-500">
                {BotInfo}
            </div>
            {!error && auth && (
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
            {!error && (
                <div className="flex flex-row align-items-center justify-content-center pt-5 scalein">
                    {servers === "bot" && <GuildCarousel />}
                    {servers === "user" && auth && <UserGuildCarousel />}
                </div>
            )}
        </>
    );
};

export default Home;
