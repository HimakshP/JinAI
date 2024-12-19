import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GameCard } from '@/components/GameCard';
import { ConnectWallet } from '@/components/ConnectWallet';
import { FloatingIcons } from '@/components/FloatingIcons';

const games = [
  {
    id: 1,
    title: "GTA V",
    description: "Challenge your knowledge of Los Santos and prove you're the ultimate GTA expert.",
    image: "/images/gtav.jpg"
  },
  {
    id: 2,
    title: "God of War",
    description: "Test your expertise in Norse mythology and Kratos' epic journey.",
    image: "/images/gow.jpg"
  },
  {
    id: 3,
    title: "Need for Speed",
    description: "Race through questions about cars, tracks, and legendary moments.",
    image: "/images/nfs.jpg"
  },
  {
    id: 4,
    title: "Ghost of Tsushima",
    description: "Prove your mastery of samurai lore and feudal Japanese history.",
    image: "/images/got.jpg"
  },
  {
    id: 5,
    title: "Call of Duty",
    description: "Test your tactical knowledge and CoD series expertise.",
    image: "/images/cod.jpg"
  },
  {
    id: 6,
    title: "Minecraft",
    description: "Challenge your crafting knowledge and survival skills.",
    image: "/images/minecraft.jpg"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const handleGameSelect = (gameId: number) => {
    setSelectedGame(gameId);
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-jinblack text-white relative overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-card">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-4xl font-rajdhani font-bold jin-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            JinAI
          </motion.h1>
          <ConnectWallet />
        </div>
      </nav>

      <main className="pt-24">
        <section className="min-h-screen relative">
          <FloatingIcons />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-6xl font-bold mb-6 jin-heading">
                Game Quiz Arena
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Test your gaming knowledge and win rewards in our AI-powered quiz battles
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-black/30">
          <div className="max-w-7xl mx-auto">
            <motion.h3
              className="text-4xl font-bold mb-12 text-center jin-heading"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Choose Your Arena
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => handleGameSelect(game.id)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;