import { useState } from "react";

type ScoreNumberBtnProps = {
    number: number;
    onSelectNumber: (number: number) => void;
    isSelected: boolean;
}

export function ScoreNumberBtn({ number, onSelectNumber, isSelected}: ScoreNumberBtnProps) {

    return (
        <button
            className={`flex justify-center p-2 border-2 border-green-400 hover:bg-green-200 rounded-md ${isSelected && `bg-green-400`}`}
            onClick={() => onSelectNumber(number)}
        >
            {number}
        </button>
    )
}