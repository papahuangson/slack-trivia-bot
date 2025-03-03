import { SlackCommandMiddlewareArgs } from '@slack/bolt';
import { getLeaderboard, hasScores } from '../services/scoreService.js';

export async function handleScoreCommand({ ack, say }: SlackCommandMiddlewareArgs): Promise<void> {
  await ack();
  if (!hasScores()) {
    await say("No scores yet! Start playing trivia with `/trivia`");
    return;
  }
  await say({
    text: "🏆 *Trivia Leaderboard*\n" + getLeaderboard()
  });
} 