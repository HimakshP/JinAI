import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GameCard } from '@/components/GameCard'
import { ConnectWallet } from '@/components/ConnectWallet'
import { FloatingIcons } from '@/components/FloatingIcons'
import { LoginButton } from '@/components/LoginButton'
import ComingSoon from '@/pages/ComingSoon'
import { useNavigate } from 'react-router-dom'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const games = [
  {
    id: 1,
    title: "GTA V",
    description: "Challenge your knowledge of Los Santos and prove you're the ultimate GTA expert.",
    image: "/gtavr.jpg",
    isAvailable: true
  },
  {
    id: 2,
    title: "God of War",
    description: "Test your expertise in Norse mythology and Kratos' epic journey.",
    image: "/gowr.jpg",
    isAvailable: true
  },
  {
    id: 3,
    title: "Need for Speed",
    description: "Race through questions about cars, tracks, and legendary moments.",
    image: "/nfsr.jpg",
    isAvailable: false
  },
  {
    id: 4,
    title: "Ghost of Tsushima",
    description: "Prove your mastery of samurai lore and feudal Japanese history.",
    image: "/gotr.jpg",
    isAvailable: false
  },
  {
    id: 5,
    title: "Call of Duty",
    description: "Test your tactical knowledge and CoD series expertise.",
    image: "/codr.jpg",
    isAvailable: false
  },
  {
    id: 6,
    title: "Minecraft",
    description: "Challenge your crafting knowledge and survival skills.",
    image: "/minecraftr.jpg",
    isAvailable: false
  }
]

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null)
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [comingSoonTitle, setComingSoonTitle] = useState("")
  const [user] = useAuthState(auth);

  const handleGameSelect = (gameId: number) => {
    if (!user) {
      alert('Please login to play!');
      return;
    }

    const game = games.find(g => g.id === gameId)
    if (game) {
      if (game.isAvailable) {
        setSelectedGame(gameId)
        navigate(`/game/${gameId}`)
      } else {
        setComingSoonTitle(game.title)
        setShowComingSoon(true)
      }
    }
  }

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
          <div className="flex items-center gap-4">
            <LoginButton />
            <ConnectWallet />
          </div>
        </div>
      </nav>

      <main className="pt-24 relative">
        <div className="relative z-0">
          <section className="min-h-screen relative">
            <FloatingIcons />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-20xl font-bold mb-10 jin-heading">
                  THE ULTIMATE GAMING EXPERIENCE
                </h2>
                <p className="text-4xl text-gray-300 max-w-2xl mx-auto">
                The AI That Knows Every Game. Ask, Explore, Have Fun
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
        </div>
      </main>

      <ComingSoon
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        gameTitle={comingSoonTitle}
      />
    </div>
  )
}

export default Index
