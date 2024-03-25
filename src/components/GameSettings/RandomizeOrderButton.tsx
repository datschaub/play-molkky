import { BoltIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { MouseEventHandler } from "react";

type RandomizeOrderButton = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};
export const RandomizeOrderButton = ({ onClick }: RandomizeOrderButton) => {
    return (
        <button
            className="shadow btn btn-primary shadow-slate-500"
            type="button"
            onClick={onClick}
        >
            <div className="flex items-center justify-center space-x-2 text-white">
                <span className="font-bold">Randomize Player Order</span>
                <ArrowsUpDownIcon className="w-6" />
            </div>
        </button>
    );
};
