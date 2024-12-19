import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <motion.button
      className="btn-connect"
      onClick={handleConnect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center gap-2">
        <Wallet className="w-5 h-5" />
        {isConnected ? 'Connected' : 'Connect Wallet'}
      </span>
    </motion.button>
  );
};