import { create } from "zustand";
import { GameSettingsStore } from "./gameSettingsStore.types";

export const useGameSettingsStore = create<GameSettingsStore>((set) => ({
    gameStars: 3,
    currentPlayerId: undefined,
    gameIsStarted: false,
    setAmountOfGameStars(stars) {
        set(() => ({
            gameStars: stars,
        }));
    },
    setGameIsStarted(isStarted) {
        set(() => ({
            gameIsStarted: isStarted,
        }));
    },
    setCurrentPlayerId(playerId) {
        set(() => ({
            currentPlayerId: playerId,
        }));
    },
}));
