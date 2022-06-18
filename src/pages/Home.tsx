import { useQuery } from "@apollo/client";

import { Avatar } from "primereact/avatar"
import GuildCarousel from "../components/GuildCarousel";

import { FETCH_CLIENT_USER } from "../gql/queries/client";

const Home = () => {
    const { loading: clientLoading, data: clientData } = useQuery(FETCH_CLIENT_USER, { pollInterval: 100000 });

    if (clientLoading) return <></>;

    const { clientUser: bot } = clientData;
    return (
        <>
            <div className="flex flex-column align-items-center justify-content-center m-2 pt-5 scalein animation-ease-out animation-duration-500">
                <Avatar image={bot.avatarURL} size="xlarge" shape="circle" className="shadow-8" />
                <h1>{bot.username}</h1>
                <h3>{bot.description}</h3>
                <h5>Currently I am in {bot.guilds} servers and have {bot.users} users</h5>
            </div>
            <div className="flex flex-row align-items-center justify-content-center pt-5 scalein">
                <GuildCarousel />
            </div>
        </>
    )
};

export default Home;