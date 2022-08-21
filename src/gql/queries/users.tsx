import gql from "graphql-tag";

export const FETCH_USERS = gql`
    query($database: Boolean) {
        users(database: $database)
    }
`

export const FETCH_USER = gql`
    query($userId: String!, $database: Boolean) {
        user(userId: $userId, database: $database)
    }
`;

export const FETCH_USER_GUILDS = gql`
    query($auth: Object!) {
        userGuilds(auth: $auth)
    }
`;

export const FETCH_USER_CARD = gql`
    query($userId: String!) {
        userCard(userId: $userId)
    }
`;