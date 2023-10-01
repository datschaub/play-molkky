import { MinusCircleIcon, HandIcon, SelectorIcon, ArrowsExpandIcon } from "@heroicons/react/solid";
import { FieldValues, UseFormRegister, UseFormUnregister } from "react-hook-form";
import { AnimatePresence, motion, Reorder, useDragControls, useMotionValue } from "framer-motion"
import { Player } from "../types/types";
import { ReorderIcon } from "./ReorderIcon";
import { usePlayerStore } from "../stores/playerStore";

type NewGameFormProps = {
    player: Player;
    playerPlaceholder: number;
    registerInputFunc: UseFormRegister<FieldValues>;
    unregisterInputFunc: UseFormUnregister<FieldValues>;
    disableDelete: boolean;
    errorMessage: string | undefined;
}

export function NewPlayerForm({
    player,
    playerPlaceholder,
    registerInputFunc: register,
    unregisterInputFunc,
    disableDelete,
    errorMessage
}: NewGameFormProps) {

    const removePlayer = usePlayerStore(state => state.removePlayer)

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
                <div className="flex items-center py-2 pr-1 space-x-2">
                    <ReorderIcon dragControls={dragControls} />
                    <label className="sr-only" htmlFor={player.id}>{` Player `}</label>
                    <input className="w-full input input-bordered"
                        id={player.id}
                        placeholder={`Player ${playerPlaceholder}`}
                        defaultValue={player.name}
                        {...register(player.id, {
                            required: `Player can't be empty 👀`
                        })}
                    />
                    {!disableDelete && (
                        <button
                            className="w-8 rounded-full text-accent"
                            type="button"
                            onClick={() => {
                                removePlayer(player.id, unregisterInputFunc)
                            }}>
                            <MinusCircleIcon className="ml-2" />
                        </button>
                    )}
                </div>
            </Reorder.Item>
            {errorMessage && (
                <div className="mt-2 text-red-500">
                    {errorMessage}
                </div>
            )}
        </>
    )
}