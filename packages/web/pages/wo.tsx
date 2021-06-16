import { gql, useQuery } from '@apollo/client';

const PingQuery = gql`
    query hey {
        ping
    }
`;

const WithStaticProps = () => {
    const { data } = useQuery(PingQuery);

    return <div>{data?.ping ? 'dsaoijd' : '...loading'}</div>;
};
export default WithStaticProps;
