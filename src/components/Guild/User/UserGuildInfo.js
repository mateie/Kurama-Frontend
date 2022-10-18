import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

import { FETCH_USER } from "../../../gql/queries/users";

const UserGuildInfo = ({ guild }) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [fetchOwner, { loading, data: { user: owner } = {} }] = useLazyQuery(FETCH_USER);

    useEffect(() => {
        if(guild.ownerId) fetchOwner({ variables: { userId: guild.ownerId } });
    }, [guild, guild.ownerId]);

    const avatar = loading ? (
        "Loading..."
    ) : owner ? (
        <Chip label={owner.username} image={owner.avatarURL} />
    ) : (
        <Chip label="Unknown Owner" />
    );

    return (
        <div className="guild">
            <div className="guild-content">
                <div className="mb-3">
                    <img
                        src={guild.iconURL}
                        className="guild-icon"
                        alt="Guild Icon"
                        onClick={() => navigate(`/guild/${guild.id}`)}
                    />
                </div>
                <div>
                    <h3 className="mb-1">{guild.name}</h3>
                    <h4 className="mb-1">
                        <i>
                            {guild.description
                                ? guild.description
                                : "No Description"}
                        </i>
                    </h4>
                    <h5 className="mb-3">{avatar}</h5>
                    <h6 className="mt-0 mb-3">
                        {guild.members ? guild.members.length : "Unknown"} Members
                    </h6>
                </div>
                {guild.promoted &&
                    (guild.members.includes(auth.id) ? (
                        <Button
                            className="p-button-danger"
                            label="Already joined"
                            disabled
                        />
                    ) : (
                        <Button
                            className="p-button-success"
                            label="Join the server"
                            onClick={() =>
                                window.open(guild.inviteURL, "_blank")
                            }
                        />
                    ))}
            </div>
        </div>
    );
};

export default UserGuildInfo;
