import { useState, useEffect } from 'react';
import { Question, GameState } from '@/types/game';
import { fetchBotpressQuestions, submitAnswerToBotpress } from '@/services/botpress';
import { useToast } from '@/components/ui/use-toast';

export const useGameState = (gameId: string) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    questions: [],
    score: 0,
    timeLeft: 10,
    showResults: false,
  });

  const { toast } = useToast();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questions = await fetchBotpressQuestions(gameId);
        setGameState(prev => ({ ...prev, questions }));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load questions. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (gameId === '6') { // Minecraft game ID
      loadQuestions();
    }
  }, [gameId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.timeLeft > 0 && !gameState.showResults) {
      timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            handleNextQuestion();
            return prev;
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.timeLeft, gameState.showResults]);

  const handleNextQuestion = () => {
    setGameState(prev => {
      if (prev.currentQuestionIndex >= prev.questions.length - 1) {
        return { ...prev, showResults: true };
      }
      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeLeft: 10,
      };
    });
  };

  const handleAnswer = async (answerIndex: number) => {
    try {
      const result = await submitAnswerToBotpress(
        gameState.questions[gameState.currentQuestionIndex].text,
        answerIndex
      );

      setGameState(prev => ({
        ...prev,
        score: prev.score + (result.points || 0),
      }));

      handleNextQuestion();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    gameState,
    handleAnswer,
  };
};