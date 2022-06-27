import gql from "graphql-tag";

export const FETCH_USER_GUILDS = gql`
    query($auth: Object!) {
        userGuilds(auth: $auth)
    }
`;