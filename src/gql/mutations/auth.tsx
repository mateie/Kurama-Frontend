import gql from "graphql-tag";

export const LOGIN_USER = gql`
    mutation login(
        $code: String!
    ) {
        login (
            code: $code
        )
    }
`;

export const AUTH_USER = gql`
    mutation authuser(
        $auth: Object
    ) {
        authUser (
            auth: $auth
        )
    }
`