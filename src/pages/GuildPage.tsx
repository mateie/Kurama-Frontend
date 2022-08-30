import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Splitter, SplitterPanel } from 'primereact/splitter';

import { AuthContext } from '../providers/AuthProvider';

import { FETCH_CLIENT_USER } from "../gql/queries/client";

import { FETCH_GUILD } from '../gql/queries/guilds';

import GuildInfo from '../components/Guild/GuildInfo';
import MemberTable from '../components/Guild/MemberTable';

const GuildPage = () => {
    const { auth } = useContext(AuthContext);
    const { guildId } = useParams();
    const { loading, data: { clientUser: bot } = {} } = useQuery(FETCH_CLIENT_USER, { pollInterval: 100000 }), { guild } = {} } = useQuery(FETCH_GUILD, {
        variables: {
            guildId,
            database: true,
        },
    });

    if (loading) return <></>;

    if (!guild) return <Navigate to='/' replace={true} />
    
    if (!auth && guild.members.includes(bot.id) && guild.members.includes(auth.id)) {

    return (
        <div className='flex align-items-center justify-content-center'>
            <Splitter layout='vertical' className='w-7'>
                <SplitterPanel>
                    <GuildInfo guild={guild} />
                </SplitterPanel>
            </Splitter>
        </div>
    )

 } else {

    return (
        <div className='flex align-items-center justify-content-center'>
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
};

export default GuildPage;
