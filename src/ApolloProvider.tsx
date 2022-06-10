import React from "react";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache, ApolloLink, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("kuramaToken");
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);