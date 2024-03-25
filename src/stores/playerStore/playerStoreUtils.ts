import { FieldValues, UseFormGetValues } from "react-hook-form";
import { Player } from "../../types/types";
import { useGameSettingsStore } from "../gameSettingsStore/gameSettingsStore";
import { mapPlayers, shuffleArray } from "../../utils/utils";
import { nanoid } from "nanoid";

export const addPlayerPoints = (
    players: Player[],
    playerToUpdate: Player,
    pointsToAdd: number,
): Player[] => {
    const updatedPlayers = players.map((player) => {
        if (player.id === playerToUpdate.id) {
            const addStarForCurrentUser = pointsToAdd === 0;
            const starsShouldResetForCurrentPlayer = pointsToAdd > 0;
            const newStars = addStarForCurrentUser
                ? player.stars + 1
                : starsShouldResetForCurrentPlayer
                ? 0
                : player.stars;

            // Check if the player should be eliminated
            const isEliminated =
                newStars >= useGameSettingsStore.getState().gameStars;

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

export const randomizeOrder = (
    players: Player[],
    getValuesFunc: UseFormGetValues<FieldValues>,
) => {
    const mappedPlayers = mapPlayers(players, getValuesFunc);
    const randPlayerOrder = shuffleArray(mappedPlayers);
    return randPlayerOrder;
};

export const generateDefaultPlayers = (amount: number = 2) => {
    const players = [];

    for (let i = 0; i < amount; i++) {
        const player = {
            id: nanoid(5),
            name: "",
            order: i + 1,
            score: 0,
            stars: 0,
            isEliminated: false,
        };

        players.push(player);
    }

    return players;
};
