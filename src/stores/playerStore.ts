import { nanoid } from 'nanoid'
import { FieldValues, UseFormUnregister } from 'react-hook-form'
import create from 'zustand'
import { Player } from '../types/types'

interface IPlayerStoreState {
    players: Player[];
    addNewPlayer: () => void;
    removePlayer: (playerId: string, unregisterFunc: UseFormUnregister<FieldValues>) => void;
    setPlayerOrder: (newPlayers: any) => void;
    // handleRandomizeOrder: (getValuesFunc: UseFormGetValues<FieldValues>) => void;
    // handleOnReorder: Dispatch<SetStateAction<Player[]>>;
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
        set((state) => ({
            players: newPlayers
        }))
    }
}))