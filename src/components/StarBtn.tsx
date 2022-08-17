import { motion } from "framer-motion";

type StarBtnProps = {
    isSelected: boolean;
    onSelect: () => void;
}

// Framer Motion needs real color codes to transition
// https://tailwindcolor.com/
const variants = {
    isSelected: {
        backgroundColor: '#FB7185', // tailwind bg-rose-400
    },
    notSelected: {
        backgroundColor: '#FFF'
    },
}

export function StarBtn({ isSelected, onSelect }: StarBtnProps) {

    return (
        <motion.button
            animate={(isSelected) ? "isSelected" : "notSelected"}
            variants={variants}
            whileHover={
                !isSelected
                    ? {
                        backgroundColor: '#FDA4AF'  // tailwind bg-rose-300
                    }
                    : ''
            }
            onHoverEnd={e => {}} // reset hover        
            className={`flex justify-center w-full p-2 border-2 rounded-md border-rose-400`}
            onClick={() => onSelect()}
        >
            ⭐
        </motion.button>
    )
}