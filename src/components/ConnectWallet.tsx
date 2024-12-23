"use client"
import { motion } from 'framer-motion';
import { WalletButton } from '@/components/WalletButton';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
export const ConnectWallet = () => {
  const { connected, disconnect } = useWallet();
  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success('Wallet disconnected successfully');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <WalletButton />
      </motion.div>
      
      {connected && (
        <motion.button
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={handleDisconnect}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
        </motion.button>
      )}
    </div>
  );
};
export default ConnectWallet;