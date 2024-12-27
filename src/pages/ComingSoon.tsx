import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface ComingSoonProps {
  isOpen: boolean
  onClose: () => void
  gameTitle: string
}

const ComingSoon: React.FC<ComingSoonProps> = ({ isOpen, onClose, gameTitle }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 p-8 rounded-lg max-w-2xl w-full text-center border border-yellow-600"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">{gameTitle} - COMING SOON</h2>
            <p className="text-2xl mb-8 text-yellow-300">
              "Where pixels meet possibility: Your next gaming obsession is loading!"
            </p>

            <p className="text-xl mb-8 text-yellow-100">
              We're crafting an AI experience that will blow your mind. 
              Stay tuned for a game that learns and evolves with you!
            </p>

            <Button
              onClick={onClose}
              className="bg-yellow-600 text-black hover:bg-yellow-500 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Coming Soon
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ComingSoon

