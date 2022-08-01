import { FieldValues, useForm, UseFormRegister } from "react-hook-form";

type NewGameFormProps = {
    playerPlaceholder: number;
    playerName?: string;
    registerInputFunc: UseFormRegister<FieldValues>;
}

export function NewPlayerForm({ playerPlaceholder, playerName, registerInputFunc: register }: NewGameFormProps) {

    const playerId = `player-${playerPlaceholder}`;

    return (
        <div className="relative">
            <label className="sr-only" htmlFor={playerId}>{` Player `}</label>
            {/* register your input into the hook by invoking the "register" function */}
            <input className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
                id={playerId}
                placeholder={`Player ${playerPlaceholder}`}
                defaultValue={playerName}
                {...register(playerId)}
            />
        </div>
    )
}