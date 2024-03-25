import { nanoid } from "nanoid";
import { create } from "zustand";
import { mapPlayers } from "../../utils/utils";
import { PlayerStoreState } from "./playerStore.types";
import {
    addPlayerPoints,
    generateDefaultPlayers,
    randomizeOrder,
} from "./playerStoreUtils";

export const usePlayerStore = create<PlayerStoreState>((set) => ({
    players: generateDefaultPlayers(),
    winnerId: null,
    addNewPlayer: () => {
        set((state) => ({
            players: [
                ...state.players,
                {
                    id: nanoid(5),
                    name: "",
                    order: state.players.length + 1,
                    score: 0,
                    stars: 0,
                    isEliminated: false,
                },
            ],
        }));
    },
    removePlayer: (playerId, unregisterFunc) => {
        unregisterFunc(playerId);
        set((state) => ({
            players: state.players.filter((p) => p.id !== playerId),
        }));
    },
    setPlayerOrder: (newPlayers) => {
        set(() => ({
            players: newPlayers,
        }));
    },
    reOrderPlayers: (newPlayers, getValuesFunc) => {
        const mappedPlayers = mapPlayers(newPlayers, getValuesFunc);
        set(() => ({
            players: mappedPlayers,
        }));
    },
    randomizePlayerOrder: (getValuesFunc) => {
        set((state) => ({
            players: randomizeOrder(state.players, getValuesFunc),
        }));
    },
    addPlayerPoints: (player, pointsToAdd) => {
        set((state) => ({
            players: addPlayerPoints(state.players, player, pointsToAdd),
        }));
    },
    resetAllPlayerPoints: () => {
        set((state) => ({
            players: state.players.map((player) => ({
                ...player,
                score: 0,
                stars: 0,
                isEliminated: false,
            })),
        }));
    },
    removeAllCurrentPlayers: () => {
        set({
            players: generateDefaultPlayers(),
        });
    },
    setWinner: (playerId) => {
        set({ winnerId: playerId });
    },
}));
