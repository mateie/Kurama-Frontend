import { useQuery } from '@apollo/client';

import '../assets/less/GuildCarousel.less'

import { Avatar } from 'primereact/avatar';
import { Carousel } from 'primereact/carousel';

import { FETCH_GUILDS } from '../gql/queries/guilds';
import { FETCH_USERS } from '../gql/queries/client';

const GuildCarousel = () => {
    const { data, loading } = useQuery(FETCH_GUILDS);
    const { loading: usersLoading, data: uData } = useQuery(FETCH_USERS);

    if (loading) return (
        <></>
    );

    const { guilds } = data;



    const guildTemplate = (guild: any) => {
        const owner = !usersLoading && uData.users.find((member: any) => member.id === guild.ownerId);
        console.log(owner);
        const avatar = usersLoading
            ? 'Loading...'
            : <>
                <Avatar
                    image={owner.avatarURL}
                    shape='circle'
                    size='large'
                />
                <br />
                <span className='pt-0'>{owner.username}</span>
            </>
        return (
            <div className='guild'>
                <div className='guild-content'>
                    <div className='mb-3'>
                        <img src={guild.iconURL} className='guild-icon' alt='Guild Icon' />
                    </div>
                    <div>
                        <h3 className='mb-1'><i>{guild.description ? guild.description : 'No Description'}</i></h3>
                        <h4 className='mb-3'>
                            {avatar}
                        </h4>
                        <h5 className='mt-0 mb-3'>{guild.members.length} Members</h5>
                    </div>
                </div>
            </div>
        )
    }

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ]

    return (
        <Carousel
            value={guilds}
            itemTemplate={guildTemplate}
            numVisible={3}
            responsiveOptions={responsiveOptions}
        />
    )
};

export default GuildCarousel;