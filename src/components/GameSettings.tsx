import { ChevronDownIcon, BoltIcon } from "@heroicons/react/20/solid";
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
            className={`text-lg transition-opacity ${index < gameStars ? 'opacity-100' : 'opacity-30'}`}
        >
            ⭐
        </span>
    ))

    const getContentHeight = (gameSettingsOpen: boolean) => (gameSettingsOpen ? 'auto' : 0);

    return (
        <div className="overflow-hidden">
            <div className="flex items-center justify-between align-center">
                <div
                    className="flex flex-col w-full border-opacity-50"
                    onClick={toggleAccordion}
                >
                    <div className="divider">
                        <span className="font-bold">Game settings</span>
                        <motion.div
                            variants={variants}
                            animate={gameSettingsOpen ? 'rotate' : 'stop'}
                            transition={{ duration: 1.0, type: "spring" }}
                        >
                            <ChevronDownIcon className="w-6" />
                        </motion.div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {gameSettingsOpen && (
                    <motion.div
                        initial={{ height: 0, overflow: 'hidden', margin: 0, padding: 0 }}
                        animate={{ height: getContentHeight(gameSettingsOpen) }}
                        exit={{ height: 0, overflow: 'hidden', margin: 0, padding: 0 }}
                        transition={{ duration: 1.0, type: "spring" }}
                    >
                        <div className="flex flex-col px-1 gap-y-5">
                            <div className="flex flex-col items-center p-2 rounded-lg shadow shadow-slate-500 gap-y-2 bg-accent">
                                <span className="font-bold text-white">Amount of stars</span>
                                <input
                                    type="range"
                                    min={1}
                                    max="5"
                                    value={gameStars}
                                    className="range range-primary"
                                    step="1"
                                    onChange={handleStarsChange}
                                />
                                <div className="flex justify-between w-full px-2 text-lg rounded-lg">
                                    {rangeStarIcons}
                                </div>
                            </div>
                            <button
                                className="shadow btn btn-accent shadow-slate-500"
                                type="button"
                                onClick={() => randomizePlayerOrder(getFormValuesFunc)}>
                                <div className="flex items-center justify-center space-x-2 text-white">
                                    <span className="font-bold">Randomize Order</span>
                                    <BoltIcon className="w-6" />
                                </div>
                            </button>
                        </div>
                        <div className="divider" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}