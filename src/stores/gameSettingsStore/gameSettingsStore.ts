import { create } from "zustand";
import { GameSettingsStore } from "./gameSettingsStore.types";

export const useGameSettingsStore = create<GameSettingsStore>((set) => ({
    gameStars: 3,
    winPoints: 50,
    currentPlayerId: undefined,
    gameIsStarted: false,
    setAmountOfGameStars(stars) {
        set(() => ({
            gameStars: stars,
        }));
    },
    setAmountOfWinPoints(points) {
        set(() => ({
            winPoints: points,
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
