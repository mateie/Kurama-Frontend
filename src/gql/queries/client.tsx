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

export const FETCH_COMMAND = gql`
    query($commandName: String!) {
        command(commandName: $commandName)
    }
`