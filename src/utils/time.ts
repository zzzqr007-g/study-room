export function formatTime(totalSeconds: number): string {
  const sign = totalSeconds < 0 ? '-' : '';
  const abs = Math.abs(totalSeconds);
  const mins = Math.floor(abs / 60);
  const secs = abs % 60;
  return `${sign}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getWeekDates(): { key: string; label: string }[] {
  const days: { key: string; label: string }[] = [];
  const now = new Date();
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({ key, label: `周${dayNames[d.getDay()]}` });
  }
  return days;
}

export function getCurrentHour(): number {
  return new Date().getHours();
}
