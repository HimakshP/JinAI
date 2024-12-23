// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mock Database
const questions = [
  {
    id: 1,
    text: "What is the name of the protagonist in GTA V?",
    options: ["Michael De Santa", "Trevor Phillips", "Franklin Clinton", "All of them"],
    correctAnswer: 3,
  },
  {
    id: 2,
    text: "Which city is GTA V set in?",
    options: ["Liberty City", "Los Santos", "Vice City", "San Fierro"],
    correctAnswer: 1,
  },
];

// Endpoint to fetch questions
app.get('/api/questions', (req, res) => {
  const sanitizedQuestions = questions.map(({ correctAnswer, ...rest }) => rest); // Exclude correctAnswer
  res.json(sanitizedQuestions);
});

// Endpoint to submit answers
app.post('/api/submit-answer', (req, res) => {
  const { answers } = req.body; // Array of answers from the user
  let score = 0;

  // Calculate score
  answers.forEach((answer, index) => {
    if (questions[index].correctAnswer === answer) {
      score += 1;
    }
  });

  res.json({ score, total: questions.length });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
