import app from './config/slack.js';
import { handleTriviaCommand } from './commands/triviaCommand.js';
import { handleScoreCommand } from './commands/scoreCommand.js';
import { handleAnswerAction } from './actions/answerAction.js';

// Register commands
app.command('/trivia', handleTriviaCommand);
app.command('/trivia-scores', handleScoreCommand);

// Register actions
app.action('answer', handleAnswerAction);

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Trivia app is running!');
})(); 