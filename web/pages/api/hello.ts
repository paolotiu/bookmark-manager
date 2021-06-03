import { NextApiHandler } from 'next';

const handler: NextApiHandler = (_, res) => {
    console.log('HELLO');
    res.send('OK');
};

export default handler;
