import { BoltIcon } from "@heroicons/react/20/solid";
import { usePlayerStore } from "../../stores/playerStore/playerStore";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import { MouseEventHandler } from "react";

type RandomizeOrderButton = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};
export const RandomizeOrderButton = ({ onClick }: RandomizeOrderButton) => {
    return (
        <button
            className="shadow btn btn-accent shadow-slate-500"
            type="button"
            onClick={onClick}
        >
            <div className="flex items-center justify-center space-x-2 text-white">
                <span className="font-bold">Randomize Order</span>
                <BoltIcon className="w-6" />
            </div>
        </button>
    );
};
