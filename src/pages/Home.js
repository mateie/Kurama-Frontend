import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { Avatar } from "primereact/avatar";

import { FetchClientUser } from "../gql/queries/client";

import { AuthContext } from "../providers/AuthProvider";
import Servers from "./Servers";

const Home = () => {
    const { auth } = useContext(AuthContext);
    const {
        loading,
        error,
        data: { clientUser: bot } = {}
    } = useQuery(FetchClientUser, { pollInterval: 100000 });

    const BotInfo = loading ? (
        <></>
    ) : error ? (
        <h1>Bot seems to be offline</h1>
    ) : (
        <div className="flex flex-column align-items-center justify-content-center">
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
            <div className="flex justify-content-center scalein animation-ease-out animation-duration-500">
                {BotInfo}
            </div>
            <Servers auth={auth} />
        </>
    );
};

export default Home;
