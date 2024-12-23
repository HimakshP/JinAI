import { Connection, clusterApiUrl } from '@solana/web3.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { reference } = req.body;
    const connection = new Connection(clusterApiUrl(process.env.NEXT_PUBLIC_SOLANA_CLUSTER), 'confirmed');

    try {
        const signatures = await connection.getConfirmedSignaturesForAddress2(new PublicKey(reference), { limit: 1 });
        if (signatures.length > 0) {
            res.status(200).json({ success: true, signature: signatures[0] });
        } else {
            res.status(200).json({ success: false, message: 'No transaction found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
