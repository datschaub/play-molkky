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
    const dragControls = useDragControls()

    const transitionDelay = playerPlaceholder - 1

    return (
        <>
            <Reorder.Item
                id={player.id}
                value={player}
                dragListener={false}
                dragControls={dragControls}
            >
                <motion.div
                    key={player.id}
                    variants={{
                        initial: (i) => ({
                            opacity: 0,
                            height: 0,
                            // y: -30 * i
                        }),
                        animate: (i) => ({
                            opacity: 1,
                            height: 'auto',
                            // y: 0,
                            // transition: {
                            //     y: {
                            //         delay: i * 0.1  
                            //     },
                            //     opacity: {
                            //         delay: i * 0.1
                            //     }
                            // }
                        }),
                        exit: {
                            opacity: 0,
                            height: 0,
                            transition: {
                                opacity: {
                                    duration: 0.2
                                },
                                height: {
                                    duration: 0.3
                                }
                            }
                        }
                    }}
                    custom={transitionDelay}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="flex items-center justify-center py-2 space-y-2">
                        <ReorderIcon dragControls={dragControls} />
                        <label className="sr-only" htmlFor={player.id}>{` Player `}</label>
                        <input className="w-full px-4 py-4 ml-4 text-sm border-2 border-gray-200 rounded-lg"
                            id={player.id}
                            placeholder={`Player ${playerPlaceholder}`}
                            defaultValue={player.name}
                            {...register(player.id)}
                        />
                        {!disableDelete && (
                            <button
                                className="w-8 text-red-400 rounded-full"
                                type="button"
                                onClick={() => {
                                    handleRemovePlayer(player.id, unregisterInputFunc)
                                }}>
                                <MinusCircleIcon className="ml-2" />
                            </button>
                        )}
                    </div>
                </motion.div>
            </Reorder.Item>
        </>
    )
}