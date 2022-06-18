import { useQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

import { Chip } from "primereact/chip";

import { FETCH_USERS } from "../../gql/queries/client";

const GuildInfo = ({ guild }: { guild: any }) => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(FETCH_USERS);

    const owner = !loading && data.users.find((member: any) => member.id === guild.ownerId);
    const avatar = loading
        ? 'Loading...'
        : <Chip
            label={owner.username}
            image={owner.avatarURL}
        />

    return (
        <div className='guild'>
            <div className='guild-content'>
                <div className='mb-3'>
                    <img src={guild.iconURL} className='guild-icon' alt='Guild Icon' onClick={() => navigate(`/guild/${guild.id}`)} />
                </div>
                <div>
                    <h3 className='mb-1'>{guild.name}</h3>
                    <h4 className='mb-1'><i>{guild.description ? guild.description : 'No Description'}</i></h4>
                    <h5 className='mb-3'>
                        {avatar}
                    </h5>
                    <h6 className='mt-0 mb-3'>{guild.members.length} Members</h6>
                </div>
            </div>
        </div>
    );
};

export default GuildInfo;