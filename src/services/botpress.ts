import { Question } from '@/types/game';

const BOTPRESS_URL = 'YOUR_BOTPRESS_URL'; // Replace with your Botpress URL

export const fetchBotpressQuestions = async (gameId: string): Promise<Question[]> => {
  try {
    const response = await fetch(`${BOTPRESS_URL}/api/v1/content/elements`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions from Botpress');
    }

    const data = await response.json();
    
    // Transform Botpress response to match our Question interface
    return data.map((item: any) => ({
      text: item.questions[0],
      options: item.options,
      correctAnswer: item.correctOptionIndex,
    }));
  } catch (error) {
    console.error('Error fetching Botpress questions:', error);
    throw error;
  }
};

export const submitAnswerToBotpress = async (
  questionId: string, 
  answer: number
): Promise<{
  isCorrect: boolean;
  points: number;
}> => {
  try {
    const response = await fetch(`${BOTPRESS_URL}/api/v1/submit-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId,
        answer,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit answer to Botpress');
    }

    return response.json();
  } catch (error) {
    console.error('Error submitting answer to Botpress:', error);
    throw error;
  }
};