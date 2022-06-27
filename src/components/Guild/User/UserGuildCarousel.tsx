import { useQuery } from '@apollo/client';

import { Carousel } from "primereact/carousel";

import '../../../assets/less/GuildCarousel.less';
import { FETCH_USER_GUILDS } from "../../../gql/queries/users";

import UserGuildInfo from "./UserGuildInfo";

const UserGuildCarousel = () => {
    const { data, loading } = useQuery(FETCH_USER_GUILDS, {
        variables: {
            auth: localStorage.getItem('kuraToken')
        },
    });

    if (loading) return <></>;

    const { userGuilds: guilds } = data;

    const guildTemplate = (guild: any) => <UserGuildInfo guild={guild} />

    const breakpoints = [
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
    ];

    return (
        <Carousel
            value={guilds}
            itemTemplate={guildTemplate}
            numVisible={3}
            responsiveOptions={breakpoints}
        />
    )
};

export default UserGuildCarousel;