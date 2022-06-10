import React from "react";
import { useQuery } from "@apollo/client";

import "./assets/less/App.less";

import { Avatar } from "primereact/avatar";

import { FETCH_CLIENT_USER } from './gql/queries/user';

const App = () => {
    const { loading, data } = useQuery(FETCH_CLIENT_USER);

    if (loading) return <></>;

    const { clientUser: bot } = data;

    console.log(bot);

    return (
        <>
            <div className="flex flex-column align-items-center justify-content-center m-2 pt-5 scalein animation-duration-1000">
                <Avatar image={bot.avatarURL} size="xlarge" shape="circle" />
                <h1>{bot.username}</h1>
                <h3>{bot.description}</h3>
            </div>
            <div className="flex flex-row align-items-center justify-content-center pt-5 scalein animation-duration-1000">
            </div>
        </>
    )
};

export default App;