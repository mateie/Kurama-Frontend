import React from "react";
import { useQuery } from "@apollo/client";

import "./assets/less/App.less";

import { Avatar } from "primereact/avatar";
import { Card } from 'primereact/card';

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
            </div>
            <div className="flex flex-row align-items-center justify-content-around pt-5 scalein animation-duration-1000">
                <Card title="Features" className="fadeinleft animation-duration-500">
                </Card>
                <Card title="Features V2" className="fadeinright animation-duration-500">
                </Card>
            </div>
        </>
    )
};

export default App;