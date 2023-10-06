import { Dialog } from "@headlessui/react";
import { NewPlayerForm } from "./NewPlayerForm";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Player } from "../types/types";
import { FieldValues, useForm, UseFormGetValues } from "react-hook-form";
import { AnimatePresence, Reorder } from "framer-motion"
import { GameSettings } from "./GameSettings";
import { usePlayerStore } from "../stores/playerStore";

type NewGameProps = {
    closeModal: (getValuesFunc: UseFormGetValues<FieldValues>) => void;
    onHandleSubmit: (getValuesFunc: UseFormGetValues<FieldValues>) => void;
}

export function NewGame({
    closeModal,
    onHandleSubmit,
}: NewGameProps) {

    const {
        register,
        unregister,
        handleSubmit,
        getValues,
        formState: { errors },
        trigger
    } = useForm({
        shouldUnregister: true,
        mode: "onSubmit",
        criteriaMode: "all"
    })

    const addNewPlayer = usePlayerStore(state => state.addNewPlayer)
    const reOrderPlayers = usePlayerStore(state => state.reOrderPlayers)
    const players = usePlayerStore(state => state.players)

    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium"
            >
                New game 🙌
            </Dialog.Title>
            <h4>Add players</h4>
            <div className="flex flex-col text-sm text-gray-500">
                <form
                    onSubmit={handleSubmit(() => {
                        onHandleSubmit(getValues);
                    })}
                    className="flex flex-col mt-2 space-y-3"
                >
                    <Reorder.Group
                        axis="y"
                        values={players}
                        onReorder={(newOrder) => reOrderPlayers(newOrder, getValues)}
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
                                            errorMessage={errors[player.id]?.message?.toString()}
                                        />
                                    )
                                })
                            }
                        </AnimatePresence>
                    </Reorder.Group>
                    <button
                        className="w-full btn btn-primary"
                        type="button"
                        onClick={() => addNewPlayer()}>
                        <div className="flex items-center justify-center space-x-2 text-white transition-all">
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
                            className="btn btn-secondary"
                            onClick={() => closeModal(getValues)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
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