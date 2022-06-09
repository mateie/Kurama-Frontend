import React from "react";
import App from "./App";

import { ApolloClient, ApolloProvider, InMemoryCache, split } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createUploadLink({
    uri: 'http://localhost:4000',
});

const authLink = setContext(() => {
    const token = localStorage.getItem('kuramaToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
}) as any;

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    authLink.concat(httpLink),
);

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);