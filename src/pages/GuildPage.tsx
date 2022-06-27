import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Splitter, SplitterPanel } from 'primereact/splitter';

import { FETCH_GUILD } from '../gql/queries/guilds';

import GuildInfo from '../components/Guild/GuildInfo';
import MemberTable from '../components/Guild/MemberTable';

const GuildPage = () => {
    const { guildId } = useParams();
    const { data, loading, error } = useQuery(FETCH_GUILD, {
        variables: {
            guildId
        }
    });

    if (loading) return <></>;

    const { guild } = data;

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