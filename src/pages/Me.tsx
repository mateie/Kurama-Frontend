import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import UserRankImage from "../components/User/UserRankImage";
import { Navigate } from "react-router-dom";

const Me = () => {
    const { auth }: { auth: any } = useContext(AuthContext);

    if (!auth) return <Navigate to='/' replace={true} />

    return (
        <div className="flex justify-content-between align-items-center">
            <UserRankImage userId={auth.id} />
        </div>
    );
};

export default Me;