import App from "../App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../reducers";

import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    ApolloLink,
    createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("kuraToken");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }
    if (networkError) console.log(`[Network Error]: ${networkError}`);
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
    credentials: "include"
});

export default (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </PersistGate>
    </Provider>
);
