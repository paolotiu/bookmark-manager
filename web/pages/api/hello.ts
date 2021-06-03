import { NextApiHandler } from 'next';

const handler: NextApiHandler = (_, res) => {
    res.send('OK');
};

export default handler;
