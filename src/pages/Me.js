import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import UserRankImage from "../components/User/UserRankImage";
import { Navigate } from "react-router-dom";

import { Card } from "primereact/card";
import { Chip } from "primereact/chip";

const Me = () => {
    const { auth } = useContext(AuthContext);

    if (!auth) return <Navigate to="/" replace={true} />;


    return (
        <div className="flex-row justify-content-between align-items-center">
            <Card header={<h1>Work in progress</h1>} style={{ textAlign: "center" }}>
                <UserRankImage height="20rem" userId={auth.id} />
            </Card>
        </div>
    );
};

export default Me;
