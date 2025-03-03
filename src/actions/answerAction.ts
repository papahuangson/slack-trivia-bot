import { BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt';
import { getCurrentQuestion, clearCurrentQuestion } from '../services/triviaService.js';
import { addPoint } from '../services/scoreService.js';

export async function handleAnswerAction({ 
  action, 
  ack, 
  say, 
  body 
}: SlackActionMiddlewareArgs<BlockAction>): Promise<void> {
  await ack();

  const userAnswer = action.value;
  const userId = body.user.id;
  const user = `<@${userId}>`;
  const currentQuestion = getCurrentQuestion();

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

  clearCurrentQuestion();
} 