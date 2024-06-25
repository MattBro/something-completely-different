import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';  // Ensure to import node-fetch
import { PassThrough } from 'stream';  // Import PassThrough stream

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'http://localhost:8000/api/p/python';  // Ensure this URL is correct
    console.log('Fetching data from:', url)
    const response = await fetch(url);
    console.log(response.status);

    if (response.body) {
        res.setHeader('Content-Type', 'application/json');
        const passThrough = new PassThrough();
        response.body.pipe(passThrough);
        response.body.on('data', (chunk) => {
            console.log(chunk.toString());
        });
        passThrough.pipe(res);
    } else {
        res.status(500).json({ error: 'Failed to stream data' });
    }
}