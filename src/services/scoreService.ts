import { Score } from '../types';

let scores: Score = {};

export function addPoint(userId: string): number {
  scores[userId] = (scores[userId] || 0) + 1;
  return scores[userId];
}

export function getLeaderboard(): string {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([userId, score], index) => `${index + 1}. <@${userId}>: ${score} points`)
    .join('\n');
}

export function hasScores(): boolean {
  return Object.keys(scores).length > 0;
} 