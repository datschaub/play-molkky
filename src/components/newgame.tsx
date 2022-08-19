import { Dialog } from "@headlessui/react";
import { NewPlayerForm } from "./NewPlayerForm";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { Player } from "../types/types";
import { FieldValues, useForm, UseFormGetValues } from "react-hook-form";
import { AnimatePresence, Reorder } from "framer-motion"
import { useCallback } from "react";
import { GameSettings } from "./GameSettings";
import { usePlayerStore } from "../stores/playerStore";
import { mapPlayers } from "../utils/utils";

type NewGameProps = {
    closeModal: (getValuesFunc: UseFormGetValues<FieldValues>) => void;
    onHandleSubmit: (newPlayers: any) => void;
}

export function NewGame({
    closeModal,
    onHandleSubmit,
}: NewGameProps) {

    const { register, unregister, handleSubmit, getValues, formState: { errors } } = useForm({
        shouldUnregister: true,
        mode: "all"
    })

    const addNewPlayer = usePlayerStore(state => state.addNewPlayer)
    const setPlayerOrder = usePlayerStore(state => state.setPlayerOrder)
    const players = usePlayerStore(state => state.players)

    const reorderPlayers = useCallback((newPlayerOrder: Player[]) => {
        const mappedPlayerOrder = mapPlayers(newPlayerOrder, getValues)
        setPlayerOrder(mappedPlayerOrder)
    }, [setPlayerOrder, getValues])

    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                New game
            </Dialog.Title>
            <h4>Add players</h4>
            <div className="flex flex-col text-sm text-gray-500">
                <form
                    onSubmit={handleSubmit(() => onHandleSubmit(getValues))}
                    className="flex flex-col mt-2 space-y-3"
                >
                    <Reorder.Group
                        axis="y"
                        values={players}
                        onReorder={(newOrder) => reorderPlayers(newOrder)}
                        className="overflow-hidden"
                    >
                        <AnimatePresence initial={false}>
                            {
                                players.map((player: Player, i) => {
                                    return (
                                        <NewPlayerForm
                                            player={player}
                                            key={player.id}
                                            playerPlaceholder={players.indexOf(player) + 1}
                                            registerInputFunc={register}
                                            unregisterInputFunc={unregister}
                                            disableDelete={i < 2}
                                        />
                                    )
                                })
                            }
                        </AnimatePresence>
                    </Reorder.Group>
                    <button
                        className="w-full h-10 px-4 py-2 text-white transition-colors bg-purple-600 border border-purple-600 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
                        type="button"
                        onClick={() => addNewPlayer()}>
                        <div className="flex items-center justify-center space-x-2 text-white transition-colors group-active:text-purple-600 group-hover:text-purple-600">
                            <span className="font-bold">Add Player</span>
                            <PlusCircleIcon className="w-6" />
                        </div>
                    </button>
                    <GameSettings
                        getFormValuesFunc={getValues}
                    />
                    <div
                        className="flex justify-between mt-4"
                    >
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-md hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                            onClick={() => closeModal(getValues)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 border border-purple-600 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                        >
                            <span className="font-medium text-white transition-colors group-active:text-purple-500 group-hover:text-purple-600">
                                Play!
                            </span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}