'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const GameRoom1 = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleStartGame = () => {
    setIsLoading(true)
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to the specified URL
      window.location.href = 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/29/07/20250329072743-EH48SVL0.json'
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[url('/gowr.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/70 p-8 rounded-lg max-w-md w-full text-white"
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">
          God of War AI Adventure
        </h1>
        <p className="text-lg mb-8 text-center">
          Ready to journey through the Nine Realms with our immersive AI? A legendary adventure awaits!
        </p>
        <div className="flex justify-center">
          <Button
            onClick={handleStartGame}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? "Loading..." : "Begin Journey"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default GameRoom1