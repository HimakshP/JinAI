import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { toast } from 'sonner';

export const WalletButton: FC = () => {
  const { wallet, connecting, connected, disconnect } = useWallet();

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
    <div className="relative">
      <WalletMultiButton className="!bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 transition-all duration-200 rounded-lg px-6 py-2 text-white font-semibold shadow-lg" />
      {connected && (
        <button
          onClick={handleDisconnect}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
        </button>
      )}
    </div>
  );
};