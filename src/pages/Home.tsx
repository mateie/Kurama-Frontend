import { useQuery } from "@apollo/client";

import { Avatar } from "primereact/avatar"

import { FETCH_CLIENT_USER } from "../gql/queries/client";
import { FETCH_GUILDS } from "../gql/queries/guilds";
import { useContext } from 'react';
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
    const { auth } = useContext(AuthContext);
    const { loading: clientLoading, data: clientData } = useQuery(FETCH_CLIENT_USER);
    const { loading: guildsLoading, data: guildsData } = useQuery(FETCH_GUILDS);

    if (clientLoading || guildsLoading) return <></>;

    const { clientUser: bot } = clientData;
    const { guilds } = guildsData;

    return (
        <>
            <div className="flex flex-column align-items-center justify-content-center m-2 pt-5 scalein animation-ease-out animation-duration-500">
                <Avatar image={bot.avatarURL} size="xlarge" shape="circle" className="shadow-8" />
                <h1>{bot.username}</h1>
                <h3>{bot.description}</h3>
                <h5>Currently I am in {bot.guilds} servers and have {bot.users} users</h5>
            </div>
            <div className="flex flex-row align-items-center justify-content-center pt-5 scalein animation-duration-2000">
                {guilds.map((guild: any) => {
                    return <img src={guild.iconURL} alt="" />
                })}
            </div>
        </>
    )
};

export default Home;