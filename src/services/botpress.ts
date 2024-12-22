const BOTPRESS_URL = 'https://api.botpress.cloud/v1';

export const fetchBotpressQuestions = async (gameId: string): Promise<Question[]> => {
  try {
    const response = await fetch(`${BOTPRESS_URL}/chat/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('BOTPRESS_API_KEY')}`
      },
      body: JSON.stringify({
        message: "Get minecraft questions",
        conversationId: gameId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions from Botpress');
    }

    const data = await response.json();
    
    // Transform Botpress response to match our Question interface
    // Assuming the response contains an array of questions
    return data.responses.map((item: any) => ({
      text: item.text,
      options: item.choices || [],
      correctAnswer: item.correctIndex || 0,
    }));
  } catch (error) {
    console.error('Error fetching Botpress questions:', error);
    throw error;
  }
};

export const submitAnswerToBotpress = async (
  questionText: string,
  answerIndex: number
): Promise<{ isCorrect: boolean; points: number }> => {
  try {
    const response = await fetch(`${BOTPRESS_URL}/chat/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('BOTPRESS_API_KEY')}`
      },
      body: JSON.stringify({
        message: `Answer: ${answerIndex}`,
        context: {
          question: questionText
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit answer to Botpress');
    }

    const data = await response.json();
    return {
      isCorrect: data.isCorrect || false,
      points: data.points || 0
    };
  } catch (error) {
    console.error('Error submitting answer to Botpress:', error);
    throw error;
  }
};