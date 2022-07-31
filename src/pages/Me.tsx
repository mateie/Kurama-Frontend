import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@apollo/client";
import { FETCH_USER_CARD } from "../gql/queries/users";

import { Buffer } from "buffer";

const Me = () => {
    const { auth }: { auth: any } = useContext(AuthContext);

    const { loading, data: { userCard: card } = {} } = useQuery(FETCH_USER_CARD, {
        variables: {
            userId: auth.id,
        },
        pollInterval: 500,
    });

    if (loading) return <></>;

    const base64 = new Buffer(card.data).toString('base64');

    return (
        <div className="flex justify-content-between align-items-center">
            <img src={`data:image/png;base64,${base64}`} alt="" />
        </div>
    );
};

export default Me;