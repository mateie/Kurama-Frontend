import gql from "graphql-tag";

export const LoginUser = gql`
    mutation login($code: String!) {
        login(code: $code)
    }
`;

export const AuthUser = gql`
    mutation authuser($auth: String!) {
        authUser(auth: $auth)
    }
`;
