import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import UserRankImage from "../components/User/UserRankImage";

const Me = () => {
    const { auth }: { auth: any } = useContext(AuthContext);

    return (
        <div className="flex justify-content-between align-items-center">
            <UserRankImage userId={auth.id} />
        </div>
    );
};

export default Me;