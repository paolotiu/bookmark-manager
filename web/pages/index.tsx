import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
    <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hello Next.js 👋</h1>
        <p>
            <Link href="/home" passHref>
                <a href="home">Home</a>
            </Link>
        </p>
        <div></div>
    </Layout>
);

export default IndexPage;
