import { useQuery } from "@apollo/client";

import { Carousel } from "primereact/carousel";
import { ProgressSpinner } from "primereact/progressspinner";

import "../../../assets/less/GuildCarousel.less";
import { FETCH_USER_GUILDS } from "../../../gql/queries/users";

import UserGuildInfo from "./UserGuildInfo";

const UserGuildCarousel = () => {
    const { loading, data: { userGuilds: guilds } = {} } = useQuery(
        FETCH_USER_GUILDS,
        {
            variables: {
                auth: localStorage.getItem("kuraToken")
            }
        }
    );

    const guildTemplate = (guild) => <UserGuildInfo guild={guild} />;

    const breakpoints = [
        {
            breakpoint: "1024px",
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: "600px",
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: "480px",
            numVisible: 1,
            numScroll: 1
        }
    ];

    return loading ? (
        <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
        />
    ) : (
        <Carousel
            value={guilds}
            itemTemplate={guildTemplate}
            numVisible={4}
            responsiveOptions={breakpoints}
            style={{ width: "1840px" }}
        />
    );
};

export default UserGuildCarousel;
