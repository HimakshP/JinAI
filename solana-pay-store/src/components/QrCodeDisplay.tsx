'use client';

import React, { useEffect, useRef } from 'react';
import { encodeURL, createQR } from '@solana/pay';
import { PublicKey } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

interface QRCodeDisplayProps {
  recipient: PublicKey;
  amount: BigNumber;
  reference: PublicKey;
}

export default function QRCodeDisplay({ recipient, amount, reference }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      const url = encodeURL({
        recipient,
        amount,
        reference,
        label: 'Solana Pay Store',
        message: 'Thanks for your purchase!',
        memo: 'Order123',
      });

      const qrCode = createQR(url, 300, 'transparent');
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qrCode.append(qrRef.current);
      }
    };

    generateQRCode();
  }, [recipient, amount, reference]);

  return <div ref={qrRef} className="mx-auto my-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-4 rounded-lg shadow-lg flex justify-center items-center"></div>;

}

