import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

import { FETCH_USER } from "../../../gql/queries/users";

const UserGuildInfo = ({ guild }: { guild: any }) => {
    const navigate = useNavigate();
    const { loading, data: { user: owner } = {} } = useQuery(FETCH_USER, {
        variables: {
            userId: guild.ownerId
        }
    });

    const avatar = loading
        ? 'Loading...'
        : owner ? <Chip
            label={owner.username}
            image={owner.avatarURL}
        />
            : <Chip
                label="Unknown Owner" />;

    return (
        <div className='guild'>
            <div className='guild-content'>
                <div className='mb-3'>
                    {guild.botJoined ? (
                        <img src={guild.iconURL} className='guild-icon-joined' alt='Guild Icon' onClick={() => navigate(`/guild/${guild.id}`)} />
                    ) : (
                        <img src={guild.iconURL} className='guild-icon' alt='Guild Icon' />
                    )}

                </div>
                <div>
                    <h3 className='mb-1'>{guild.name}</h3>
                    <h4 className='mb-1'><i>{guild.description ? guild.description : 'No Description'}</i></h4>
                    <h5 className='mb-3'>
                        {avatar}
                    </h5>
                    <h6 className='mt-0 mb-3'>{guild.botJoined ? guild.members.length : 'Unknown'} Members</h6>
                    {!guild.botJoined && (
                        <Button
                            label="Add to the server"
                            onClick={() => window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=969414951292788766&permissions=1644971949559&scope=applications.commands%20bot'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserGuildInfo;