import { motion } from "framer-motion";

type ScoreNumberBtnProps = {
    number: number;
    onSelectNumber: (number: number) => void;
    isSelected: boolean;
}

// Framer Motion needs real color codes to transition
// https://tailwindcolor.com/
const variants = {
    isSelected: {
        backgroundColor: '#4ADE80', // tailwind bg-green-400
    },
    notSelected: {
        backgroundColor: '#FFF'
    },
}

export function ScoreNumberBtn({ number, onSelectNumber, isSelected }: ScoreNumberBtnProps) {

    return (
        <motion.button
            animate={(isSelected) ? "isSelected" : "notSelected"}
            variants={variants}
            whileHover={
                !isSelected
                    ? {
                        backgroundColor: '#86EFAC'  // tailwind bg-green-300
                    }
                    : ''
            }
            onHoverEnd={e => {}} // reset hover        
            className={`flex justify-center p-2 border-2 rounded-md border-green-400 hover:bg-green-300 font-bold`}
            onClick={() => onSelectNumber(number)}
        >
            {number}
        </motion.button>
    )
}