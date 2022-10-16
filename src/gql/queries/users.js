import gql from "graphql-tag";

export const FETCH_USERS = gql`
    query ($fetchDb: Boolean) {
        users(fetchDb: $fetchDb)
    }
`;

export const FETCH_USER = gql`
    query ($userId: String!, $fetchDb: Boolean) {
        user(userId: $userId, fetchDb: $fetchDb)
    }
`;

export const FETCH_USER_GUILDS = gql`
    query ($auth: String!, $fetchDb: Boolean) {
        userGuilds(auth: $auth, fetchDb: $fetchDb)
    }
`;

export const FETCH_USER_CARD = gql`
    query ($userId: String!) {
        userCard(userId: $userId)
    }
`;

export const FETCH_USER_WARNS = gql`
    query ($guildId: String!, $userId: String!) {
        warns(guildId: $guildId, userId: $userId)
    }
`;

export const FETCH_USER_REPORTS = gql`
    query ($guildId: String!, $userId: String!) {
        reports(guildId: $guildId, userId: $userId)
    }
`;
