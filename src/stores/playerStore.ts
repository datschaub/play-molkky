import { nanoid } from 'nanoid'
import { FieldValues, UseFormGetValues, UseFormUnregister } from 'react-hook-form'
import { create } from 'zustand'
import { Player } from '../types/types'
import { mapPlayers, shuffleArray } from '../utils/utils';

interface IPlayerStoreState {
    players: Player[];
    addNewPlayer: () => void;
    removePlayer: (playerId: string, unregisterFunc: UseFormUnregister<FieldValues>) => void;
    setPlayerOrder: (newPlayers: any[]) => void;
    randomizePlayerOrder: (getValuesFunc: UseFormGetValues<FieldValues>) => void;
    reOrderPlayers: (newPlayers: Player[], getValuesFunc: UseFormGetValues<FieldValues>) => void;
    addPlayerPoints: (player: Player, pointsToAdd: number) => void;
    resetAllPlayerPoints: () => void;
    removeAllCurrentPlayers: () => void;
}

const randomizeOrder = (players: Player[], getValuesFunc: UseFormGetValues<FieldValues>) => {
    const mappedPlayers = mapPlayers(players, getValuesFunc)
    const randPlayerOrder = shuffleArray(mappedPlayers)
    return randPlayerOrder
}

const addPlayerPoints = (players: Player[], player: Player, pointsToAdd: number) => {
    let playerToUpdate = players.filter(p => p.id === player.id).at(0)
    return players.map((p, i) => {

        const addStarForCurrentUser = p === playerToUpdate && (pointsToAdd === 0)
        const starsShouldResetForCurrentPlayer = p === playerToUpdate && (pointsToAdd > 0)

        return {
            'name': p.name,
            'id': p.id,
            'order': p.order,
            'score': p === playerToUpdate ? (p.score + pointsToAdd) : p.score,
            'stars': addStarForCurrentUser
                ? (p.stars + 1)
                : starsShouldResetForCurrentPlayer
                    ? 0
                    : p.stars
        }
    })
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
    removePlayer: (playerId, unregisterFunc) => {
        unregisterFunc(playerId)
        set((state) => ({
            players: state.players.filter((p) => p.id !== playerId)
        }))
    },
    setPlayerOrder: (newPlayers) => {
        set(() => ({
            players: newPlayers
        }))
    },
    reOrderPlayers: (newPlayers, getValuesFunc) => {
        const mappedPlayers = mapPlayers(newPlayers, getValuesFunc)
        set(() => ({
            players: mappedPlayers
        }))
    },
    randomizePlayerOrder: (getValuesFunc) => {
        set((state) => ({
            players: randomizeOrder(state.players, getValuesFunc)
        }))
    },
    addPlayerPoints: (player, pointsToAdd) => {
        set((state) => ({
            players: addPlayerPoints(state.players, player, pointsToAdd)
        }))
    },
    resetAllPlayerPoints: () => {
        set((state) => ({
            players: state.players.map((player) => ({
                ...player,
                score: 0,
                stars: 0
            }))
        }))
    },
    removeAllCurrentPlayers: () => {
        set({ players: [
          { id: nanoid(5), name: '', order: 1, score: 0, stars: 0 },
          { id: nanoid(5), name: '', order: 2, score: 0, stars: 0 },
        ] });
      },
}))