import gql from "graphql-tag";

export const FetchUsers = gql`
    query ($fetchDb: Boolean) {
        users(fetchDb: $fetchDb)
    }
`;

export const FetchUser = gql`
    query ($userId: String!, $fetchDb: Boolean) {
        user(userId: $userId, fetchDb: $fetchDb)
    }
`;

export const FetchUserGuilds = gql`
    query ($auth: String!, $fetchDb: Boolean) {
        userGuilds(auth: $auth, fetchDb: $fetchDb)
    }
`;

export const FetchUserCard = gql`
    query ($userId: String!) {
        userCard(userId: $userId)
    }
`;

export const FetchWarns = gql`
    query ($guildId: String!, $userId: String!) {
        warns(guildId: $guildId, userId: $userId)
    }
`;

export const FetchReports = gql`
    query ($guildId: String!, $userId: String!) {
        reports(guildId: $guildId, userId: $userId)
    }
`;
