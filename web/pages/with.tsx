import { GetServerSideProps } from 'next';
import { gql, useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from '../lib/apolloClient';

const PingQuery = gql`
    query hey {
        ping
    }
`;

const WithStaticProps = () => {
    const { data, refetch } = useQuery(PingQuery, {});

    return (
        <div>
            <p>{data.ping ? 'dsaoijd' : '...loading'}</p>
            <button type="button" onClick={() => refetch()}>
                refetch
            </button>
        </div>
    );
};
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const apolloClient = initializeApollo(null, { req, res });
    await apolloClient.query({
        query: PingQuery,
    });
    return addApolloState(apolloClient, {
        props: {},
    });
};

export default WithStaticProps;
