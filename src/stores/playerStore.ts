import { nanoid } from "nanoid";
import {
    FieldValues,
    UseFormGetValues,
    UseFormUnregister,
} from "react-hook-form";
import { create } from "zustand";
import { Player } from "../types/types";
import { mapPlayers, shuffleArray } from "../utils/utils";
import { useGameSettingsStore } from "./gameSettingsStore";

interface IPlayerStoreState {
    players: Player[];
    addNewPlayer: () => void;
    removePlayer: (
        playerId: string,
        unregisterFunc: UseFormUnregister<FieldValues>,
    ) => void;
    setPlayerOrder: (newPlayers: any[]) => void;
    randomizePlayerOrder: (
        getValuesFunc: UseFormGetValues<FieldValues>,
    ) => void;
    reOrderPlayers: (
        newPlayers: Player[],
        getValuesFunc: UseFormGetValues<FieldValues>,
    ) => void;
    addPlayerPoints: (player: Player, pointsToAdd: number) => void;
    resetAllPlayerPoints: () => void;
    removeAllCurrentPlayers: () => void;
}

const randomizeOrder = (
    players: Player[],
    getValuesFunc: UseFormGetValues<FieldValues>,
) => {
    const mappedPlayers = mapPlayers(players, getValuesFunc);
    const randPlayerOrder = shuffleArray(mappedPlayers);
    return randPlayerOrder;
};

const addPlayerPoints = (
    players: Player[],
    playerToUpdate: Player,
    pointsToAdd: number
  ): Player[] => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerToUpdate.id) {
        const addStarForCurrentUser = pointsToAdd === 0;
        const starsShouldResetForCurrentPlayer = pointsToAdd > 0;
        const newStars = addStarForCurrentUser ? player.stars + 1 : starsShouldResetForCurrentPlayer ? 0 : player.stars
  
        // Check if the player should be eliminated
        const isEliminated = newStars >= useGameSettingsStore.getState().gameStars;
  
        return {
          ...player,
          score: player.score + pointsToAdd,
          stars: newStars,
          isEliminated,
        };
      }
  
      return player;
    });
  
    return updatedPlayers;
  };

export const usePlayerStore = create<IPlayerStoreState>((set) => ({
    players: [
        {
            id: nanoid(5),
            name: "",
            order: 1,
            score: 0,
            stars: 0,
            isEliminated: false,
        },
        {
            id: nanoid(5),
            name: "",
            order: 2,
            score: 0,
            stars: 0,
            isEliminated: false,
        },
    ],
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
            players: [
                {
                    id: nanoid(5),
                    name: "",
                    order: 1,
                    score: 0,
                    stars: 0,
                    isEliminated: false,
                },
                {
                    id: nanoid(5),
                    name: "",
                    order: 2,
                    score: 0,
                    stars: 0,
                    isEliminated: false,
                },
            ],
        });
    },
}));
