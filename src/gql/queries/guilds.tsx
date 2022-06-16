import gql from "graphql-tag";

export const FETCH_GUILDS = gql`
    {
        guilds
    }
`;

export const FETCH_GUILD = gql`
    query($guildId: String!) {
        getGuild(guildId: $guildId)
    }
`;