import fetch from 'node-fetch';
import { TriviaQuestion } from '../types';

let currentQuestion: TriviaQuestion | null = null;

export async function getTriviaQuestion(): Promise<TriviaQuestion> {
  const res = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
  const data = await res.json();
  return data.results[0];
}

export function getCurrentQuestion(): TriviaQuestion | null {
  return currentQuestion;
}

export function setCurrentQuestion(question: TriviaQuestion): void {
  currentQuestion = question;
}

export function clearCurrentQuestion(): void {
  currentQuestion = null;
} 