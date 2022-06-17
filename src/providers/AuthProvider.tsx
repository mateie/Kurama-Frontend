import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_USER } from "../gql/mutations/auth";
import { login, logout } from "../reducers/auth";

const AuthContext = createContext({
    auth: null,
    login: (userData: any) => { },
    logout: () => { }
});

const AuthProvider = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
    const navigate = useNavigate();

    const [authUser] = useMutation(AUTH_USER, {
        update: (_, { data: { authUser: authData } }) => {
            dispatch(login(authData))
        },
    });

    const lin = (token: any) => {
        const decoded: any = jwtDecode(token);
        authUser({ variables: { auth: decoded.token } });
    };

    const lout = () => {
        navigate('/');
        dispatch(logout());
    }

    return (
        <AuthContext.Provider
            value={{ auth: user, login: lin, logout: lout }}
            {...props}
        />
    );
};

export { AuthContext, AuthProvider };