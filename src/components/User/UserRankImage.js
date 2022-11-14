import { useQuery } from "@apollo/client";
import { FetchUserCard } from "../../gql/queries/users";
import { Buffer } from "buffer";

import { ProgressSpinner } from "primereact/progressspinner";

const UserRankImage = ({ userId, width, height }) => {
    const { loading, data: { userCard: card } = {} } = useQuery(FetchUserCard, {
        variables: {
            userId,
        },
        pollInterval: 3000,
    });

    return loading ? (
        <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="3"
            animationDuration="1s"
        />
    ) : (
        <img
            style={{
                width: `${width ? width : "auto"}`,
                height: `${height ? height : "auto"}`,
            }}
            src={`data:image/png;base64,${new Buffer(card.data).toString(
                "base64"
            )}`}
            alt=""
        />
    );
};

export default UserRankImage;
