import { useQuery } from "@apollo/client";

import "../../assets/less/GuildCarousel.less";

import { Carousel } from "primereact/carousel";
import { ProgressSpinner } from "primereact/progressspinner";

import { FETCH_GUILDS } from "../../gql/queries/guilds";

import GuildInfo from "./GuildInfo";

const GuildCarousel = () => {
    const { loading, data: { guilds } = {} } = useQuery(FETCH_GUILDS, {
        variables: { fetchDb: true }
    });

    const guildTemplate = (guild) => <GuildInfo guild={guild} />;

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

    return loading && !guilds ? (
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

export default GuildCarousel;
