import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Splitter, SplitterPanel } from 'primereact/splitter';

import { FETCH_GUILD } from '../gql/queries/guilds';

import GuildInfo from '../components/Guild/GuildInfo';
import MemberTable from '../components/Guild/MemberTable';

const GuildPage = () => {
    const { guildId } = useParams();
    const { error, loading, data: { guild } = {} } = useQuery(FETCH_GUILD, {
        variables: {
            guildId,
            database: true,
        },
    });

    if (loading) return <></>;

    if (!guild) return <Navigate to='/' replace={true} />

    return (
        <div className='flex align-items-center justify-content-center'>
            {error && <h1>Guild not found</h1>}
            <Splitter layout='vertical' className='w-7'>
                <SplitterPanel>
                    <GuildInfo guild={guild} />
                </SplitterPanel>
                <SplitterPanel>
                    <MemberTable guild={guild} />
                </SplitterPanel>
            </Splitter>
        </div>
    )
};

export default GuildPage;