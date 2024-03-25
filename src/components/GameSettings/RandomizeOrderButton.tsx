import { BoltIcon, ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import { motion, useAnimation } from "framer-motion";
import { MouseEventHandler } from "react";

type RandomizeOrderButton = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};
export const RandomizeOrderButton = ({ onClick }: RandomizeOrderButton) => {
    const controls = useAnimation();

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick(event);
        await controls.start({
            rotate: 360,
            transition: {
                duration: 1,
                ease: "easeOut",
                type: "spring",
                bounce: 0.55,
            },
        });
        controls.set({ rotate: 0 });
    };

    return (
        <button
            className="shadow btn btn-primary shadow-slate-500"
            type="button"
            onClick={handleClick}
        >
            <div className="flex items-center justify-center space-x-2 text-white">
                <span className="font-bold">Randomize Player Order</span>
                <motion.div
                    className="w-6"
                    animate={controls}
                >
                    <ArrowsUpDownIcon />
                </motion.div>
            </div>
        </button>
    );
};
