import { SlackCommandMiddlewareArgs } from '@slack/bolt';
import { getTriviaQuestion, setCurrentQuestion } from '../services/triviaService.js';

export async function handleTriviaCommand({ ack, say }: SlackCommandMiddlewareArgs): Promise<void> {
  await ack();
  const question = await getTriviaQuestion();
  setCurrentQuestion(question);

  const allAnswers = [...question.incorrect_answers, question.correct_answer]
    .sort(() => Math.random() - 0.5);

  await say({
    text: `🎉 *Trivia Question:* ${question.question}`,
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
} 