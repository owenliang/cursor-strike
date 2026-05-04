import type { HistoryRecord } from '../types/game';
import { STORAGE_KEY, MAX_HISTORY } from './constants';

export function saveResult(record: HistoryRecord): void {
  const history = loadHistory();
  history.unshift(record);
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function loadHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}