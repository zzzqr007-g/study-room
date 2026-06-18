export interface SessionRecord {
  id: string;
  date: string; // 'YYYY-MM-DD'
  startTime: number;
  endTime: number;
  duration: number; // seconds of actual focus
  type: 'focus' | 'break';
}
