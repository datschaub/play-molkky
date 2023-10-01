import { motion } from "framer-motion";

type StarBtnProps = {
    isSelected: boolean;
    onSelect: () => void;
}

// Framer Motion needs real color codes to transition
// https://tailwindcolor.com/
const variants = {
    isSelected: {
        backgroundColor: '#FB7185', // daisyUI primary
    },
    notSelected: {
        backgroundColor: '#EE9895' // daisyUI base-100
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
                        backgroundColor: '#EA7A74'  // daisyUI primary focus
                    }
                    : ''
            }
            onHoverEnd={e => {}} // reset hover        
            className={`font-bold shadow flex justify-center w-full p-2 border-2 rounded-md border-rose-400`}
            onClick={() => onSelect()}
        >
            Add star ⭐
        </motion.button>
    )
}