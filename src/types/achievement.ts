export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (state: {
    sessions: import('./statistics').SessionRecord[];
  }) => boolean;
}
