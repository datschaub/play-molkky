import { MinusCircleIcon, HandIcon, SelectorIcon, ArrowsExpandIcon } from "@heroicons/react/solid";
import { FieldValues, UseFormRegister, UseFormUnregister } from "react-hook-form";
import { AnimatePresence, motion, Reorder, useDragControls, useMotionValue } from "framer-motion"
import { useState } from "react";
import { Player } from "../types/types";
import { ReorderIcon } from "./ReorderIcon";

type NewGameFormProps = {
    player: Player;
    playerPlaceholder: number;
    registerInputFunc: UseFormRegister<FieldValues>;
    unregisterInputFunc: UseFormUnregister<FieldValues>;
    handleRemovePlayer: (playerId: string, unregisterInputFunc: UseFormUnregister<FieldValues>) => void;
    disableDelete: boolean;
}

export function NewPlayerForm({
    player,
    playerPlaceholder,
    registerInputFunc: register,
    unregisterInputFunc,
    handleRemovePlayer,
    disableDelete
}: NewGameFormProps) {

    //Need this state to properly unregister removed fields
    const [show, setShow] = useState(true)
    const dragControls = useDragControls()

    return (
        <AnimatePresence>
            {show && (
                <Reorder.Item
                    id={player.id}
                    value={player}
                    dragListener={false}
                    dragControls={dragControls}
                >
                    <motion.div
                        exit={{ height: 0, opacity: 0 }}
                        className="flex items-center justify-center p-2"
                    >
                        <ReorderIcon dragControls={dragControls} />
                        <label className="sr-only" htmlFor={player.id}>{` Player `}</label>
                        <input className="w-full px-4 py-4 ml-4 text-sm border-2 border-gray-200 rounded-lg"
                            id={player.id}
                            placeholder={`Player ${playerPlaceholder}`}
                            defaultValue={player.name}
                            {...register(player.id)}
                        />
                        {/* <SelectorIcon
                            className={`absolute w-6 h-6 text-gray-800 text-opacity-30 hover:cursor-grab left-9`}
                        /> */}

                        {!disableDelete && (
                            <button
                                className="w-8 text-red-400 rounded-full"
                                type="button"
                                onClick={() => {
                                    setShow(false)
                                    handleRemovePlayer(player.id, unregisterInputFunc)
                                }}>
                                <MinusCircleIcon className="ml-2" />
                            </button>
                        )}
                    </motion.div>
                </Reorder.Item>
            )}
        </AnimatePresence>
    )
}