import app from './config/slack.js';
import { handleTriviaCommand } from './commands/triviaCommand.js';
import { handleScoreCommand } from './commands/scoreCommand.js';
import { handleAnswerAction } from './actions/answerAction.js';

/**
 * Register Slack commands
 * Add new command handlers here
 */
const registerCommands = () => {
  app.command('/trivia', handleTriviaCommand);
  app.command('/trivia-scores', handleScoreCommand);
};

/**
 * Register Slack interactive actions
 * Add new action handlers here
 */
const registerActions = () => {
  app.action('answer', handleAnswerAction);
};

/**
 * Initialize and start the Slack app
 * @param {number} port - The port number to run the app on
 */
const startServer = async (port: number = 3000) => {
  try {
    await app.start(port);
    console.log(`⚡️ Trivia app is running on port ${port}!`);
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

// Initialize the app
const init = () => {
  registerCommands();
  registerActions();
  startServer(Number(process.env.PORT) || 3000);
};

init(); 