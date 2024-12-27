'use client';

import React, { useEffect, useState } from 'react';
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import QRCodeDisplay from '../components/QrCodeDisplay';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  const [paymentStatus, setPaymentStatus] = useState<string>('Awaiting payment...');
  const [reference, setReference] = useState<PublicKey | null>(null);
  const [recipient] = useState<PublicKey>(new PublicKey(process.env.NEXT_PUBLIC_SOLANA_RECIPIENT!));
  const [amount] = useState<BigNumber>(new BigNumber(0.4));

  useEffect(() => {
    setReference(Keypair.generate().publicKey);
  }, []);

  useEffect(() => {
    if (!reference) return;

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const checkPaymentStatus = async () => {
        try {
            // Use getSignaturesForAddress instead of getConfirmedSignaturesForAddress2
            const signatures = await connection.getSignaturesForAddress(reference, { limit: 1 });

            if (signatures.length > 0) {
                setPaymentStatus('Payment confirmed! 🎉');
            } else {
                setPaymentStatus('Awaiting payment...');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error checking payment status:', error.message);
            } else {
                console.error('Error checking payment status:', error);
            }
            setPaymentStatus('Error checking payment status. Please try again.');
        }
    };

    const interval = setInterval(checkPaymentStatus, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
}, [reference]);


  return (
    <div className="min-h-screen bg-grey flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="mx-auto my-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-4 rounded-lg shadow-lg flex justify-center items-center">Solana Pay</CardTitle>
          <CardDescription className="text-center text-xl">Scan the QR code to make the payment</CardDescription>
        </CardHeader>
        <CardContent>
          {reference && <QRCodeDisplay recipient={recipient} amount={amount} reference={reference} />}
          <p className="text-center font-semibold mt-4">{paymentStatus}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => setReference(Keypair.generate().publicKey)}
            variant="default"
          >
            Generate New QR Code
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

