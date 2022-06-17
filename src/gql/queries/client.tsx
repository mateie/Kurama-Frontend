import gql from 'graphql-tag';

export const FETCH_CLIENT = gql`
    {
        client
    }
`

export const FETCH_CLIENT_USER = gql`
    {
        clientUser
    }
`;

export const FETCH_COMMANDS = gql`
    {
        commands
    }
`;