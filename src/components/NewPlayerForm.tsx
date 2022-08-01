import { MinusCircleIcon } from "@heroicons/react/solid";
import { FieldValues, UseFormRegister, UseFormUnregister } from "react-hook-form";

type NewGameFormProps = {
    playerPlaceholder: number;
    playerName?: string;
    playerId: string;
    registerInputFunc: UseFormRegister<FieldValues>;
    unregisterInputFunc: any;
    handleRemovePlayer: (playerId: string, unregisterInputFunc: UseFormUnregister<FieldValues>) => void;
}

export function NewPlayerForm({ playerPlaceholder, playerName, playerId, registerInputFunc: register, unregisterInputFunc, handleRemovePlayer }: NewGameFormProps) {

    return (
        <div className="flex items-center justify-center">
            <label className="sr-only" htmlFor={playerId}>{` Player `}</label>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="w-full px-4 py-4 mr-2 text-sm border-2 border-gray-200 rounded-lg"
                id={playerId}
                placeholder={`Player ${playerPlaceholder}`}
                defaultValue={playerName}
                {...register(playerId)}
            />
            <button
                className="w-6 text-red-400 rounded-full"
                type="button"
                onClick={() => handleRemovePlayer(playerId, unregisterInputFunc)}>
                <MinusCircleIcon />
            </button>
        </div>
    )
}