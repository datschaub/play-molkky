import { motion } from "framer-motion";

type ScoreNumberBtnProps = {
    number: number;
    onSelectNumber: (number: number) => void;
    isSelected: boolean;
};

// Framer Motion needs real color codes to transition
// https://tailwindcolor.com/
const variants = {
    isSelected: {
        backgroundColor: "#DC8951", // daisyUI retro accent
    },
    notSelected: {
        backgroundColor: "#E4D8B4", // daisyUI base-100
    },
};

export function ScoreNumberBtn({
    number,
    onSelectNumber,
    isSelected,
}: ScoreNumberBtnProps) {
    return (
        <motion.button
            animate={isSelected ? "isSelected" : "notSelected"}
            variants={variants}
            whileHover={
                !isSelected
                    ? {
                          backgroundColor: "#DAC89A", // daisyUI base-200
                      }
                    : ""
            }
            onHoverEnd={(e) => {}} // reset hover
            className={`flex shadow justify-center p-2 border-2 rounded-lg border-[#D5BE87] hover:bg-[#DAC89A] font-bold`}
            onClick={() => onSelectNumber(number)}
        >
            {number}
        </motion.button>
    );
}
