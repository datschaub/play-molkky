import { ChevronDownIcon, LightningBoltIcon } from "@heroicons/react/solid";
import { Separator } from "@radix-ui/react-separator";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import { usePlayerStore } from "../stores/playerStore";

type GameSettingsProps = {
    getFormValuesFunc: UseFormGetValues<FieldValues>;
}

const variants = {
    rotate: { rotate: [0, -180] },
    stop: { rotate: 0 }
}

export function GameSettings({ getFormValuesFunc }: GameSettingsProps) {

    const [gameSettingsOpen, setGameSettingsOpen] = useState(false);
    const randomizePlayerOrder = usePlayerStore(state => state.randomizePlayerOrder)
    const gameStars = usePlayerStore(state => state.gameStars)
    const setAmountOfGameStars = usePlayerStore((state) => state.setAmountOfGameStars);

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event?.target?.value, 10);
        setAmountOfGameStars(newValue);
    };

    const toggleAccordion = () => {
        setGameSettingsOpen((prev) => !prev)
    }

    const rangeStarIcons = Array.from({ length: 5 }, (_, index) => (
        <span
            key={index}
            className={`text-lg ${index < gameStars ? 'opacity-100' : 'opacity-30'}`}
        >
            ⭐
        </span>
    ))

    return (
        <div className="overflow-hidden">
            <div className="flex items-center justify-between align-center">
                <Separator className="w-1/4 h-1 bg-purple-300 rounded-full" />
                <div
                    className="flex p-2 font-bold align-center hover:cursor-pointer"
                    onClick={toggleAccordion}
                >
                    Game settings
                    <motion.div
                        variants={variants}
                        animate={gameSettingsOpen ? 'rotate' : 'stop'}
                        transition={{ duration: 0.2, type: "spring" }}
                    >
                        <ChevronDownIcon className="w-6" />
                    </motion.div>
                </div>
                <Separator className="w-1/4 h-1 bg-purple-300 rounded-full" />
            </div>
            <AnimatePresence>
                {gameSettingsOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                    >
                        <div className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-2">
                                Amount of stars
                                <input
                                    type="range"
                                    min={1}
                                    max="5"
                                    value={gameStars}
                                    className="range"
                                    step="1"
                                    onChange={handleStarsChange}
                                />
                                <div className="flex justify-between w-full px-2 text-lg">
                                    {rangeStarIcons}
                                </div>
                            </div>
                            <button
                                className="w-full h-10 px-4 py-2 text-white transition-colors bg-purple-500 border border-purple-500 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
                                type="button"
                                onClick={() => randomizePlayerOrder(getFormValuesFunc)}>
                                <div className="flex items-center justify-center space-x-2 text-white transition-colors group-active:text-purple-500 group-hover:text-purple-500">
                                    <span className="font-bold">Randomize Order</span>
                                    <LightningBoltIcon className="w-6" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}