export type Page = 'login' | 'game' | 'result';

export interface Ball {
  id: string;
  x: number;
  y: number;
  radius: number;
  spawnTime: number;
  dying: boolean;
}

export interface GameResult {
  nickname: string;
  totalScore: number;
  hits: number;
  misses: number;
  totalTargets: number;
  hitRate: number;
  avgReactionTime: number;
  hitsPerSecond: number;
  timestamp: number;
}

export interface HistoryRecord extends GameResult {
  id: string;
}