import { useContext, useRef } from "react";
import { Buffer } from "buffer";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../providers/AuthProvider";

import { LoginUser } from "../gql/mutations/auth";

import { Toast } from "primereact/toast";

const Login = () => {
    const { login } = useContext(AuthContext);
    const toast = useRef(null);

    const code = window.location.search.split("=")[1];

    const [loginUser] = useMutation(LoginUser, {
        update: (_, { data: { login: userData } }) => {
            login(userData);
        }
    });

    const successAuth = () => {
        toast.current?.show({
            severity: "error",
            summary: "Invalid Token",
            detail: "Invalid token was provided for authentication",
            life: 5000
        });
    };

    if (!window.location.search.split("=")[1]) {
        successAuth();
        return (
            <>
                <Toast ref={toast} position="top-center" />
                <Navigate to="/" replace={true} />
            </>
        );
    }

    loginUser({ variables: { code: Buffer.from(code).toString("base64") } });

    return <Navigate to="/" />;
};

export default Login;
