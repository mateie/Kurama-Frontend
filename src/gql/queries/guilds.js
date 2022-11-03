import gql from "graphql-tag";

export const FetchGuilds = gql`
    query ($fetchDb: Boolean) {
        guilds(fetchDb: $fetchDb)
    }
`;

export const FetchGuild = gql`
    query ($guildId: String!, $fetchDb: Boolean) {
        guild(guildId: $guildId, fetchDb: $fetchDb)
    }
`;

export const FetchMembers = gql`
    query ($guildId: String!, $fetchDb: Boolean) {
        members(guildId: $guildId, fetchDb: $fetchDb)
    }
`;

export const FetchMember = gql`
    query ($guildId: String!, $memberId: String!, $fetchDb: Boolean) {
        member(guildId: $guildId, memberId: $memberId, fetchDb: $fetchDb)
    }
`;
