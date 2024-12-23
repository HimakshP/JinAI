import React, { useEffect } from 'react';
import { encodeURL, createQR } from '@solana/pay';
import { Keypair, PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

export default function Home() {
    useEffect(() => {
        const recipient = new PublicKey(process.env.NEXT_PUBLIC_SOLANA_RECIPIENT);
        const amount = new BigNumber(1); // 1 SOL
        const reference = Keypair.generate().publicKey; // Unique reference
        const label = 'Solana Pay Store';
        const message = 'Thanks for your payment!';
        const memo = 'Order123';

        // Create payment URL
        const url = encodeURL({
            recipient,
            amount,
            reference,
            label,
            message,
            memo,
        });

        // Generate QR code
        const qrCode = createQR(url, 300, 'transparent');
        const qrContainer = document.getElementById('qr-code-container');
        qrContainer.innerHTML = ''; // Clear any existing QR code
        qrCode.append(qrContainer);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Solana Pay Integration</h1>
            <div id="qr-code-container"></div>
        </div>
    );
}
