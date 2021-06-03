import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, makeVar, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import cookie from 'cookie';
import { IncomingMessage, ServerResponse } from 'http';
import { createUploadLink } from 'apollo-upload-client';
import { unionBy } from 'lodash';
import { TreeDataType } from 'kreme/build/Tree/types';

type Client = ApolloClient<NormalizedCacheObject>;

type ApolloPageProps = { props: { [key: string]: any } };

export type ResolverContext = {
    req?: IncomingMessage;
    res?: ServerResponse;
};

// Key of pageProps
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: Client;

// extract all cookies from req
export function parseCookies(req?: any, options = {}) {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
}

// get the refresh and access token from cookies
function getRefreshAndAccessToken(req: IncomingMessage) {
    const cookies = parseCookies(req);
    const acessToken = cookies['access-token'];
    const refreshToken = cookies['refresh-token'];
    return { acessToken, refreshToken };
}

function createCookieString(cookies: { [key: string]: string }) {
    let str = '';
    for (const [key, value] of Object.entries(cookies)) {
        str += `${key}=${value};`;
    }
    return str;
}

// Variables in local state
export const treeVar = makeVar<TreeDataType[]>([]);
export const importProgressVar = makeVar<number>(0);
export const isImportingVar = makeVar<boolean>(false);

function createApolloClient(context?: ResolverContext) {
    const uploadLink = createUploadLink({
        uri: process.env.VERCEL_URL ? process.env.VERCEL_URL + '/api/graphql' : 'http://localhost:3000/api/graphql', // Server URL (must be absolute)
        credentials: 'include', // Additional fetch() options like `credentials` or `headers`
    });

    const authLink = setContext((_, { headers }) => {
        // get the tokens
        if (context?.req) {
            const tokens = getRefreshAndAccessToken(context?.req);
            const cookie = createCookieString(tokens);
            return {
                headers: {
                    ...headers,
                    cookie,
                },
            };
        }

        return {
            headers: {
                ...headers,
            },
        };
    });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: authLink.concat(uploadLink as any),
        cache: new InMemoryCache({
            typePolicies: {
                Folder: {
                    fields: {
                        bookmarks: {
                            merge(existing = [], incoming) {
                                return unionBy(existing, incoming, '__ref');
                            },
                        },
                    },
                },
                Query: {
                    fields: {
                        tree: {
                            read() {
                                return treeVar();
                            },
                        },
                        getTree: {
                            merge(existing = [], incoming) {
                                if (typeof incoming.tree === 'string') {
                                    const newIncoming = { ...incoming };
                                    const tree = JSON.parse(incoming.tree) as TreeDataType[];
                                    treeVar(tree);
                                    newIncoming.tree = tree;
                                    return newIncoming;
                                }
                                return incoming || existing;
                            },
                        },
                    },
                },
            },
        }),
    });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null, context?: ResolverContext) {
    const _apolloClient = apolloClient ?? createApolloClient(context);
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function addApolloState(client: Client, pageProps: ApolloPageProps) {
    if (pageProps.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }
    return pageProps;
}

export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initializeApollo(state), [state]);
    return store;
}
