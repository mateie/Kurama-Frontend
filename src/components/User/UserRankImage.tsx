import { useQuery } from "@apollo/client";
import { FETCH_USER_CARD } from "../../gql/queries/users";
import { Buffer } from "buffer";

import { ProgressSpinner } from 'primereact/progressspinner';

const UserRankImage = ({ userId }: { userId: string }) => {
    const { loading, data: { userCard: card } = {} } = useQuery(FETCH_USER_CARD, {
        variables: {
            userId
        }
    });

    return loading ? (
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="3" animationDuration="1s" />
    ) : (
        <img src={`data:image/png;base64,${new Buffer(card.data).toString('base64')}`} alt="" />
    );
};

export default UserRankImage;