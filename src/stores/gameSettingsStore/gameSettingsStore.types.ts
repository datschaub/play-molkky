export type GameSettingsStore = {
    gameStars: number;
    setAmountOfGameStars: (stars: number) => void;
    gameIsStarted: boolean;
    setGameIsStarted: (isStarted: boolean) => void;
    currentPlayerId: string | undefined;
    setCurrentPlayerId: (playerId: string | undefined) => void;
};