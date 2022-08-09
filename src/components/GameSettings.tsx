import { ChevronDownIcon, LightningBoltIcon } from "@heroicons/react/solid";
import { Separator } from "@radix-ui/react-separator";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";

type GameSettingsProps = {
    handleRandomizeOrder: () => void;
}

export function GameSettings({ handleRandomizeOrder }: GameSettingsProps) {

    const [gameSettingsOpen, setGameSettingsOpen] = useState(false);

    const toggleAccordion = () => {
        setGameSettingsOpen((prev) => !prev)
    }

    return (
        <div>
            <div className="flex items-center justify-around align-center">
                <Separator className="w-1/4 h-1 bg-purple-300 rounded-full" />
                <div
                    className="flex p-2 font-bold align-center hover:cursor-pointer"
                    onClick={toggleAccordion}
                >
                    Game settings <ChevronDownIcon className="w-6" />
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
                        <button
                            className="w-1/2 h-10 px-4 py-2 text-white transition-colors bg-purple-500 border border-purple-500 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
                            type="button"
                            onClick={() => handleRandomizeOrder()}>
                            <div className="flex items-center justify-center space-x-2 text-white transition-colors group-active:text-purple-500 group-hover:text-purple-500">
                                <span className="font-bold">Randomize Order</span>
                                <LightningBoltIcon className="w-6" />
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}