import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

import { Buffer } from "buffer";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gql/mutations/auth";
import { Navigate } from "react-router-dom";

const Callback = () => {
    const { login } = useContext(AuthContext);

    const code = Buffer.from(window.location.search.split('=')[1]).toString('base64');

    const [loginUser] = useMutation(LOGIN_USER, {
        update: (_, { data: { login: userData } }) => {
            login(userData);
        },
        variables: {
            code
        }
    });

    loginUser();

    return <Navigate to='/' />
};

export default Callback;