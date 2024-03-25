export type GameSettingsStore = {
    gameStars: number;
    winPoints: number;
    setAmountOfGameStars: (stars: number) => void;
    setAmountOfWinPoints: (winPoints: number) => void;
    gameIsStarted: boolean;
    setGameIsStarted: (isStarted: boolean) => void;
    currentPlayerId: string | undefined;
    setCurrentPlayerId: (playerId: string | undefined) => void;
};
