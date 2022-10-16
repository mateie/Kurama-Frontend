import gql from "graphql-tag";

export const FETCH_GUILDS = gql`
    query ($fetchDb: Boolean) {
        guilds(fetchDb: $fetchDb)
    }
`;

export const FETCH_GUILD = gql`
    query ($guildId: String!, $fetchDb: Boolean) {
        guild(guildId: $guildId, fetchDb: $fetchDb)
    }
`;

export const FETCH_MEMBERS = gql`
    query ($guildId: String!, $fetchDb: Boolean) {
        members(guildId: $guildId, fetchDb: $fetchDb)
    }
`;

export const FETCH_MEMBER = gql`
    query ($guildId: String!, $memberId: String!, $fetchDb: Boolean) {
        member(guildId: $guildId, memberId: $memberId, fetchDb: $fetchDb)
    }
`;
