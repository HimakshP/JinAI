import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Player {
  address: string;
  ready: boolean;
}

const GameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [betAmount, setBetAmount] = useState<number>(50);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate players joining
    const mockPlayers = [
      { address: '0x1234...5678', ready: true },
      { address: '0x8765...4321', ready: true },
      { address: '0x9876...5432', ready: false },
    ];
    
    setTimeout(() => {
      setPlayers(mockPlayers);
      setIsLoading(false);
    }, 1500);
  }, []);

  const betOptions = [50, 100, 200];

  return (
    <div className="min-h-screen bg-jinblack text-white p-6">
      <div className="max-w-4xl mx-auto pt-20">
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-8 jin-heading text-center">
            Game Room
          </h2>

          <div className="mb-8">
            <h3 className="text-xl mb-4">Select Bet Amount</h3>
            <div className="flex gap-4">
              {betOptions.map((amount) => (
                <button
                  key={amount}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    betAmount === amount
                      ? 'bg-jingold text-jinblack'
                      : 'bg-black/30 hover:bg-black/50'
                  }`}
                  onClick={() => setBetAmount(amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl mb-4">Players</h3>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-black/30 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {players.map((player, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-4 flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span>{player.address}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        player.ready
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {player.ready ? 'Ready' : 'Waiting'}
                    </span>
                  </motion.div>
                ))}
                {Array(4 - players.length)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="glass-card p-4 text-gray-500"
                    >
                      Waiting for player...
                    </div>
                  ))}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameRoom;