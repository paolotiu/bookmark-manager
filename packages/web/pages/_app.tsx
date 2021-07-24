import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'next-auth/client';
import { useApollo } from '../lib/apolloClient';
import 'styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </ApolloProvider>
    );
}
