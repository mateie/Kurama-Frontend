import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import UserRankImage from "../components/User/UserRankImage";
import { Navigate } from "react-router-dom";

import { Card } from "primereact/card";
import { Chip } from "primereact/chip";

const Me = () => {
    const { auth } = useContext(AuthContext);

    if (!auth) return <Navigate to="/" replace={true} />;

    console.log(auth);

    const cardHeader = (
        <div
            className="bg-contain bg-no-repeat bg-center h-10rem"
            style={{ backgroundImage: `url(${auth.bannerURL})` }}
        >
            <Chip label={auth.username} image={auth.avatarURL} />
        </div>
    );

    return (
        <div className="flex-row justify-content-between align-items-center">
            <Card header={cardHeader} style={{ textAlign: "center" }}>
                <UserRankImage height="20rem" userId={auth.id} />
            </Card>
        </div>
    );
};

export default Me;
