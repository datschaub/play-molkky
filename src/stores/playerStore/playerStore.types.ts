import { Player } from "../../types/types";
import {
    FieldValues,
    UseFormGetValues,
    UseFormUnregister,
} from "react-hook-form";

export type PlayerStoreState = {
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