import { useState } from 'react';

import moment from 'moment';
import { useQuery } from '@apollo/client';

import '../../assets/less/MemberTable.less';

import { FilterMatchMode } from 'primereact/api';

import { Column } from 'primereact/column';
import { Chip } from 'primereact/chip';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

import { FETCH_MEMBERS } from '../../gql/queries/guilds';

const MemberTable = ({ guild }: { guild: any }) => {

    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const { data, loading } = useQuery(FETCH_MEMBERS, {
        variables: {
            guildId: guild.id,
        }
    });

    if (loading) return (
        <div className='flex justify-content-center align-items-center'>
            <h4>Loading Members...</h4>
        </div>
    );

    const { members } = data;

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const headerTemplate = () => {
        return (
            <div className='flex justify-content-between align-items-center'>
                <div className='flex justify-content-start'>
                    <h5 className='m-0'>Members ({members.length})</h5>
                </div>
                <div className='flex justify-content-end'>
                    <span className='p-input-icon-left'>
                        <i className='pi pi-search' />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} />
                    </span>
                </div>
            </div>
        )
    }

    const usernameTemplate = (member: any) => {
        console.log(member);
        return (
            <Chip
                imageAlt={member.username}
                label={member.user.username}
                image={member.avatarURL}
            />
        );
    }

    const atTemplate = (member: any) => {
        return (<i>{member.user.discriminator}</i>)
    }

    const joinedTemplate = (member: any) => {
        const joinedAt = `${moment(member.joinedTimestamp).format('MMM Do YY h:mm A')} (${moment(member.joinedTimestamp).fromNow()})`;
        return (
            <span>{joinedAt}</span>
        );
    }

    const header = headerTemplate();

    return (
        <DataTable
            className='p-datatable-members'
            paginator
            loading={loading}
            header={header}
            value={members}
            filters={filters}
            removableSort
            responsiveLayout='scroll'
            sortField='joinedTimestamp'
            sortOrder={-1}
            rows={5}
        >
            <Column field='username' header='Username' sortable body={usernameTemplate} />
            <Column field='discriminator' header='#' body={atTemplate} />
            <Column field='joinedTimestamp' header='Joined' sortable body={joinedTemplate} />
        </DataTable>
    );
};

export default MemberTable;