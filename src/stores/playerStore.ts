import { nanoid } from 'nanoid'
import { FieldValues, UseFormGetValues, UseFormUnregister } from 'react-hook-form'
import create from 'zustand'
import { Player } from '../types/types'
import { mapPlayers, shuffleArray } from '../utils/utils';

interface IPlayerStoreState {
    players: Player[];
    addNewPlayer: () => void;
    removePlayer: (playerId: string, unregisterFunc: UseFormUnregister<FieldValues>) => void;
    setPlayerOrder: (newPlayers: any[]) => void;
    randomizePlayerOrder: (getValuesFunc: UseFormGetValues<FieldValues>) => void;
    reOrderPlayers: (newPlayers: Player[], getValuesFunc: UseFormGetValues<FieldValues>) => void;
}

const randomizeOrder = (players: Player[], getValuesFunc: UseFormGetValues<FieldValues>) => {
    const mappedPlayers = mapPlayers(players, getValuesFunc)
    const randPlayerOrder = shuffleArray(mappedPlayers)
    return randPlayerOrder
}

export const usePlayerStore = create<IPlayerStoreState>((set) => ({
    players: [
        { id: nanoid(5), name: '', order: 1, score: 0, stars: 0 },
        { id: nanoid(5), name: '', order: 2, score: 0, stars: 0 }
    ],
    addNewPlayer: () => {
        set((state) => ({
            players: [
                ...state.players,
                {
                    id: nanoid(5), name: '', order: state.players.length + 1, score: 0, stars: 0
                }
            ]
        }))
    },
    removePlayer: (playerId: string, unregisterFunc: UseFormUnregister<FieldValues>) => {
        unregisterFunc(playerId)
        set((state) => ({
            players: state.players.filter((p) => p.id !== playerId)
        }))
    },
    setPlayerOrder: (newPlayers: Player[]) => {
        set(() => ({
            players: newPlayers
        }))
    },
    reOrderPlayers: (newPlayers: Player[], getValuesFunc: UseFormGetValues<FieldValues>) => {
        const mappedPlayers = mapPlayers(newPlayers, getValuesFunc)
        set(() => ({
            players: mappedPlayers
        }))
    },
    randomizePlayerOrder: (getValuesFunc: UseFormGetValues<FieldValues>) => {
        set((state) => ({
            players: randomizeOrder(state.players, getValuesFunc)
        }))
    }
}))