import { Question } from '@/types/game';

const BOTPRESS_URL = 'https://api.botpress.cloud/v1';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 500 && retries > 0) {
      console.log(`Retrying request, ${retries} attempts remaining...`);
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Network error, retrying... ${retries} attempts remaining`);
      await sleep(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export const fetchBotpressQuestions = async (gameId: string): Promise<Question[]> => {
  const apiKey = localStorage.getItem('BOTPRESS_API_KEY');
  const botId = localStorage.getItem('BOTPRESS_BOT_ID');

  if (!apiKey || !botId) {
    throw new Error('Botpress credentials not found');
  }

  try {
    console.log('Attempting to fetch questions with credentials:', { botId });
    
    const response = await fetchWithRetry(
      `${BOTPRESS_URL}/chat/conversations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'x-bot-id': botId
        },
        body: JSON.stringify({
          message: "Get minecraft questions",
          conversationId: gameId
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Botpress API error:', errorData);
      
      if (response.status === 401) {
        throw new Error('Invalid Botpress credentials. Please check your API key and Bot ID.');
      } else if (response.status === 500) {
        throw new Error('Botpress server is currently unavailable. Please try again later.');
      }
      
      throw new Error(`Failed to fetch questions from Botpress: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Botpress response:', data);
    
    if (!data.responses || !Array.isArray(data.responses) || data.responses.length === 0) {
      throw new Error('No questions received from Botpress');
    }

    return data.responses.map((item: any) => ({
      text: item.text || 'Question text unavailable',
      options: item.choices || ['Yes', 'No', 'Maybe', 'Not sure'],
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
  const apiKey = localStorage.getItem('BOTPRESS_API_KEY');
  const botId = localStorage.getItem('BOTPRESS_BOT_ID');

  if (!apiKey || !botId) {
    throw new Error('Botpress credentials not found');
  }

  try {
    const response = await fetchWithRetry(
      `${BOTPRESS_URL}/chat/conversations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'x-bot-id': botId
        },
        body: JSON.stringify({
          message: `Answer: ${answerIndex}`,
          context: {
            question: questionText
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Botpress API error:', errorData);
      
      if (response.status === 500) {
        throw new Error('Botpress server is currently unavailable. Please try again later.');
      }
      
      throw new Error(`Failed to submit answer to Botpress: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Answer submission response:', data);

    return {
      isCorrect: data.isCorrect || false,
      points: data.isCorrect ? 10 : 0
    };
  } catch (error) {
    console.error('Error submitting answer to Botpress:', error);
    throw error;
  }
};