/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation } from "@apollo/client";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_USER } from "../gql/mutations/auth";
import { login, logout } from "../reducers/auth";

const AuthContext = createContext({
    auth: null,
    login: (userData) => {},
    logout: () => {}
});

const AuthProvider = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [authUser] = useMutation(AUTH_USER, {
        update: (_, { data: { authUser: authData } }) => {
            dispatch(login(authData));
        }
    });

    const lin = (token) => {
        localStorage.setItem("kuraToken", token);
        authUser({ variables: { auth: token } });
    };

    const lout = () => {
        navigate("/");
        dispatch(logout());
    };

    return (
        <AuthContext.Provider
            value={{ auth: user, login: lin, logout: lout }}
            {...props}
        />
    );
};

export { AuthContext, AuthProvider };
