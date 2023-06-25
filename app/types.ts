export type GameLevel = {
  prompt: string;
  password: string;
  defense: string;
  verifyPrompt?: string;
  suffix?: string;
};

export type GameLevels = {
  [levelNumber: number]: GameLevel;
};
