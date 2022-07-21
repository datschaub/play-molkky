import { Field } from "formik"

type NewGameFormProps = {
    playerPlaceholder: number;
}

export function NewPlayerForm({ playerPlaceholder }: NewGameFormProps) {

    return (
        <div className="relative">
            <label className="sr-only" htmlFor={`player-${playerPlaceholder}`}>{` Player `}</label>
            <Field
                className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
                id={`player-${playerPlaceholder}`}
                name={`player-${playerPlaceholder}`}
                placeholder={`Player ${playerPlaceholder}`}
            />
        </div>
    )
}