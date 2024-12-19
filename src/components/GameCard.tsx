import { motion } from 'framer-motion';

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export const GameCard = ({ game, onClick }: GameCardProps) => {
  return (
    <motion.div
      className="game-card glass-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-video">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 jin-heading">{game.title}</h3>
        <p className="text-gray-300 text-sm">{game.description}</p>
      </div>
    </motion.div>
  );
};