import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
