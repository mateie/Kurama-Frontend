import { Carousel } from "primereact/carousel";

import '../../assets/less/GuildCarousel.less';

import GuildInfo from "./GuildInfo";

const UserGuildCarousel = ({ auth }: { auth: any }) => {
    const guilds = auth.guilds.filter((guild: any) => guild.canManage);

    const guildTemplate = (guild: any) => <GuildInfo guild={guild} />

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