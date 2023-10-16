import { ChevronDownIcon, BoltIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import { usePlayerStore } from "../../stores/playerStore/playerStore";
import { AmountOfStarsSettings } from "./AmountOfStarsSettings";
import useGameSettingsAccordion from "./hooks/useGameSettingsAccordion";
import { RandomizeOrderButton } from "./RandomizeOrderButton";

type GameSettingsProps = {
    getFormValuesFunc: UseFormGetValues<FieldValues>;
};

const variants = {
    rotate: { rotate: [0, -180] },
    stop: { rotate: 0 },
};

export function GameSettings({ getFormValuesFunc }: GameSettingsProps) {
    const { gameSettingsOpen, toggleAccordion, getContentHeight } =
        useGameSettingsAccordion();
    const randomizePlayerOrder = usePlayerStore(
        (state) => state.randomizePlayerOrder,
    );

    return (
        <div className="overflow-hidden">
            <div className="flex items-center justify-between align-center">
                <div
                    className="flex flex-col w-full hover:cursor-pointer"
                    onClick={toggleAccordion}
                >
                    <div className="divider">
                        <span className="font-bold">Game settings</span>
                        <motion.div
                            variants={variants}
                            animate={gameSettingsOpen ? "rotate" : "stop"}
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
                        initial={{
                            height: 0,
                            overflow: "hidden",
                            margin: 0,
                            padding: 0,
                        }}
                        animate={{
                            height: getContentHeight(),
                        }}
                        exit={{
                            height: 0,
                            overflow: "hidden",
                            margin: 0,
                            padding: 0,
                        }}
                        transition={{ duration: 1.0, type: "spring" }}
                    >
                        <div className="flex flex-col px-1 gap-y-5">
                            <AmountOfStarsSettings />
                            <RandomizeOrderButton
                                onClick={() =>
                                    randomizePlayerOrder(getFormValuesFunc)
                                }
                            />
                        </div>
                        <div className="divider" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
