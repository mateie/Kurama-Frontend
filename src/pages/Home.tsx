import { useContext, useState } from 'react';
import { useQuery } from "@apollo/client";

import { Avatar } from "primereact/avatar"

import { Button } from 'primereact/button';

import GuildCarousel from "../components/Guild/GuildCarousel";
import UserGuildCarousel from '../components/Guild/User/UserGuildCarousel';

import { FETCH_CLIENT_USER } from "../gql/queries/client";

import { AuthContext } from '../providers/AuthProvider';

const Home = () => {
    const { auth } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_CLIENT_USER, { pollInterval: 100000 });
    const [servers, setServers] = useState('bot');

    if (loading) return <></>;

    const { clientUser: bot } = data;

    return (
        <>
            <div className="flex flex-column align-items-center justify-content-center m-2 pt-5 scalein animation-ease-out animation-duration-500">
                <Avatar image={bot.avatarURL} size="xlarge" shape="circle" className="shadow-8" />
                <h1>{bot.username}</h1>
                <h3>{bot.description}</h3>
                <h5>Currently I am in {bot.guilds} servers and have {bot.users} users</h5>
            </div>
            {auth && (
                <div className='flex align-items-center justify-content-center'>
                    <Button
                        className='p-button-success mr-1'
                        label="Bot's Servers"
                        onClick={() => setServers('bot')}
                    />
                    <Button
                        className='p-button-danger'
                        label='Your Servers'
                        onClick={() => setServers('user')}
                    />
                </div>
            )}
            <div className="flex flex-row align-items-center justify-content-center pt-5 scalein">
                {servers === 'bot' && <GuildCarousel />}
                {servers === 'user' && auth && <UserGuildCarousel />}
            </div>
        </>
    )
};

export default Home;