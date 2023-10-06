import create from 'zustand'

type GameSettingsStore = {
    gameStars: number;
    setAmountOfGameStars: (stars: number) => void;
    gameIsStarted: boolean;
    setGameIsStarted: (isStarted: boolean) => void;
    currentPlayerId: string | undefined;
    setCurrentPlayerId: (playerId: string | undefined) => void;
}

export const useGameSettingsStore = create<GameSettingsStore>((set) => ({
    gameStars: 3,
    setAmountOfGameStars(stars) {
        set((state) => ({
            gameStars: stars
        }))
    },
    gameIsStarted: false,
    setGameIsStarted(isStarted) {
        set((state) => ({
            gameIsStarted: isStarted
        }))
    },
    currentPlayerId: undefined,
    setCurrentPlayerId(playerId) {
        set((state) => ({
            currentPlayerId: playerId
        }))
    },
}))