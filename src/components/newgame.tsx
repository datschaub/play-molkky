import { Dialog } from "@headlessui/react";
import { NewPlayerForm } from "./NewPlayerForm";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Player } from "../types/types";
import { FieldValues, useForm, UseFormUnregister } from "react-hook-form";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

type NewGameProps = {
    players: Player[];
    handleAddPlayers: () => void;
    handleRemovePlayers: (playerId: string, unregisterFunc: UseFormUnregister<FieldValues>) => void;
    closeModal: (getValuesFunc: any) => void;
    onHandleSubmit: (newPlayers: any) => void;
}

export function NewGame({ players, handleAddPlayers, handleRemovePlayers, closeModal, onHandleSubmit }: NewGameProps) {

    const { register, unregister, handleSubmit, getValues, formState: { errors } } = useForm({
        shouldUnregister: true
    })

    const itemVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: {
            opacity: 0,
        }
    };

    //https://www.youtube.com/watch?v=G3OyF-lRAWo&ab_channel=SamSelikoff

    return (
        <motion.div>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                New game
            </Dialog.Title>
            <h4>Add players</h4>
            <div
                className="flex flex-col text-sm text-gray-500"
            >
                <form onSubmit={handleSubmit(onHandleSubmit)} className="flex flex-col mt-2 space-y-2">
                    <AnimatePresence>
                        {
                            players.map((player: Player, i) => {
                                return (
                                    <motion.div
                                        layout="size"
                                        key={player.id}
                                        variants={itemVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{
                                            duration: 4.3,
                                        }}
                                    >
                                        <NewPlayerForm
                                            key={player.id}
                                            playerPlaceholder={players.indexOf(player) + 1}
                                            playerName={player.name}
                                            playerId={player.id}
                                            registerInputFunc={register}
                                            unregisterInputFunc={unregister}
                                            handleRemovePlayer={handleRemovePlayers}
                                        />
                                    </motion.div>
                                )
                            })
                        }
                    </AnimatePresence>
                    <button
                        // layout
                        className="w-10 h-10 mt-4 text-purple-600 rounded-full"
                        type="button"
                        onClick={() => handleAddPlayers()}>
                        <PlusCircleIcon />
                    </button>
                    <div
                        className="flex justify-between mt-4"
                    // layout
                    >
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => closeModal(getValues)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 border border-purple-600 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            <span className="font-medium text-white transition-colors group-active:text-purple-500 group-hover:text-purple-600">
                                Submit
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    )
}