import moment from 'moment';
import { useQuery } from '@apollo/client';

import '../../assets/less/MemberTable.less';

import { Column } from 'primereact/column';
import { Chip } from 'primereact/chip';
import { DataTable } from 'primereact/datatable';

import { FETCH_MEMBERS } from '../../gql/queries/guilds';

const MemberTable = ({ guild }: { guild: any }) => {
    const { data, loading } = useQuery(FETCH_MEMBERS, {
        variables: {
            guildId: guild.id,
        }
    });

    if (loading) return <></>;

    const { members } = data;

    const memberTemplate = (member: any) => {
        return (
            <Chip
                imageAlt={member.username}
                label={member.user.tag}
                image={member.avatarURL}
            />
        );
    }

    const joinedTemplate = (member: any) => {
        const joinedAt = `${moment(member.joinedTimestamp).format('MMM Do YY hh:mm A')} (${moment(member.joinedTimestamp).fromNow()})`;
        return (
            <span>{joinedAt}</span>
        );
    }

    return (
        <DataTable
            className='p-datatable-members'
            paginator
            value={members}
            removableSort
            responsiveLayout='scroll'
            sortField='joinedTimestamp'
            sortOrder={-1}
            rows={5}
        >
            <Column field='username' header='Username' sortable body={memberTemplate} />
            <Column field='joinedTimestamp' header='Joined' sortable body={joinedTemplate} />
        </DataTable>
    );
};

export default MemberTable;