import pkg from '@slack/bolt';
const { App } = pkg;
import fetch from 'node-fetch';
import 'dotenv/config';

// Initialize your Bolt app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Store current question and scores
let currentQuestion = null;
let scores = {};

// Score management functions
function addPoint(userId) {
  scores[userId] = (scores[userId] || 0) + 1;
  return scores[userId];
}

function getLeaderboard() {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([userId, score], index) => `${index + 1}. <@${userId}>: ${score} points`)
    .join('\n');
}

// Fetch trivia question from Open Trivia API
async function getTriviaQuestion() {
  const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
  const data = await res.json();
  return data.results[0];
}

// Handle the trivia slash command
app.command('/trivia', async ({ ack, say }) => {
  await ack();
  currentQuestion = await getTriviaQuestion();

  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    .sort(() => Math.random() - 0.5); // shuffle answers

  await say({
    text: `🎉 *Trivia Question:* ${currentQuestion.question}`,
    attachments: allAnswers.map((answer, idx) => ({
      text: `${idx + 1}. ${answer}`,
      callback_id: 'trivia_answer',
      actions: [{
        name: 'answer',
        text: answer,
        type: 'button',
        value: answer
      }]
    }))
  });
});

// Add leaderboard command
app.command('/trivia-scores', async ({ ack, say }) => {
  await ack();
  if (Object.keys(scores).length === 0) {
    await say("No scores yet! Start playing trivia with `/trivia`");
    return;
  }
  await say({
    text: "🏆 *Trivia Leaderboard*\n" + getLeaderboard()
  });
});

// Handle button interactions
app.action('answer', async ({ action, ack, say, body }) => {
  await ack();

  const userAnswer = action.value;
  const userId = body.user.id;
  const user = `<@${userId}>`;

  if (!currentQuestion) {
    await say(`${user}, there's no active trivia question! Start a new one with /trivia.`);
    return;
  }

  if (userAnswer === currentQuestion.correct_answer) {
    const newScore = addPoint(userId);
    await say(`✅ ${user} Correct! The answer is indeed *${currentQuestion.correct_answer}*.\nYou now have *${newScore} points*!`);
  } else {
    await say(`❌ ${user} Oops! Correct answer was *${currentQuestion.correct_answer}*.`);
  }

  currentQuestion = null; // Reset question after answering
});

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Trivia app is running!');
})();
