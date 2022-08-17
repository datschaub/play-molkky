import { motion } from "framer-motion";
import { useState } from "react";

type ScoreNumberBtnProps = {
    number: number;
    onSelectNumber: (number: number) => void;
    isSelected: boolean;
}

export function ScoreNumberBtn({ number, onSelectNumber, isSelected }: ScoreNumberBtnProps) {

    return (
        <motion.button
            // whileHover={{
            //     //scale: 1.1,
            //     backgroundColor: 'rgb(134 239 172)'
            // }}
            className={`transition ease-in-out duration-200 flex justify-center p-2 border-2 border-green-400 rounded-md ${isSelected && `bg-green-400`} ${!isSelected && `hover:bg-green-300`}`}
            onClick={() => onSelectNumber(number)}
        >
            {number}
        </motion.button>
    )
}