import { MinusCircleIcon } from "@heroicons/react/solid";
import { FieldValues, UseFormRegister, UseFormUnregister } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";

type NewGameFormProps = {
    playerPlaceholder: number;
    playerName?: string;
    playerId: string;
    registerInputFunc: UseFormRegister<FieldValues>;
    unregisterInputFunc: UseFormUnregister<FieldValues>;
    handleRemovePlayer: (playerId: string, unregisterInputFunc: UseFormUnregister<FieldValues>) => void;
    disableDelete: boolean;
}

export function NewPlayerForm({
    playerPlaceholder,
    playerName,
    playerId,
    registerInputFunc: register,
    unregisterInputFunc,
    handleRemovePlayer,
    disableDelete
}: NewGameFormProps) {

    //Need this state to properly unregister removed fields
    const [show, setShow] = useState(true)

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    exit={{ height: 0, opacity: 0 }}
                    className="flex items-center justify-center"
                >
                    <label className="sr-only" htmlFor={playerId}>{` Player `}</label>


                    <input className="w-full px-4 py-4 text-sm border-2 border-gray-200 rounded-lg"
                        id={playerId}
                        placeholder={`Player ${playerPlaceholder}`}
                        defaultValue={playerName}
                        {...register(playerId)}
                    />

                    {!disableDelete && (
                        <button
                            className="w-8 text-red-400 rounded-full"
                            type="button"
                            onClick={() => {
                                setShow(false)
                                handleRemovePlayer(playerId, unregisterInputFunc)
                            }}>
                            <MinusCircleIcon className="ml-2" />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}