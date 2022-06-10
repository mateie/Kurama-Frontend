import gql from 'graphql-tag';

export const FETCH_CLIENT_USER = gql`
    query ClientUser {
        clientUser
    }
`;