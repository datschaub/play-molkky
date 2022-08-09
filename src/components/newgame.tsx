import { Dialog } from "@headlessui/react";
import { NewPlayerForm } from "./NewPlayerForm";
import { PlusCircleIcon, LightningBoltIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Player } from "../types/types";
import { FieldValues, useForm, UseFormUnregister } from "react-hook-form";
import { AnimatePresence, Reorder } from "framer-motion"
import { Dispatch, SetStateAction } from "react";
import * as Accordion from '@radix-ui/react-accordion';

type NewGameProps = {
    players: Player[];
    handleAddPlayers: () => void;
    handleRemovePlayers: (playerId: string, unregisterFunc: UseFormUnregister<FieldValues>) => void;
    handleRandomizeOrder: () => void;
    handleOnReorder: Dispatch<SetStateAction<Player[]>>;
    closeModal: (getValuesFunc: any) => void;
    onHandleSubmit: (newPlayers: any) => void;
}

export function NewGame({
    players,
    handleAddPlayers,
    handleRemovePlayers,
    handleRandomizeOrder,
    closeModal,
    onHandleSubmit,
    handleOnReorder
}: NewGameProps) {

    const { register, unregister, handleSubmit, getValues, formState: { errors } } = useForm({
        shouldUnregister: true,
        mode: "all"
    })

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
                    onSubmit={handleSubmit(onHandleSubmit)}
                    className="flex flex-col mt-2 space-y-3"
                >
                    <Reorder.Group
                        axis="y"
                        values={players}
                        onReorder={handleOnReorder}
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
                                            handleRemovePlayer={handleRemovePlayers}
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
                        onClick={() => handleAddPlayers()}>
                        <div className="flex items-center justify-center space-x-2 text-white transition-colors group-active:text-purple-600 group-hover:text-purple-600">
                            <span className="font-bold">Add Player</span>
                            <PlusCircleIcon className="w-6" />
                        </div>
                    </button>
                    <Accordion.Root type="single" collapsible>
                        <Accordion.Item value="item1">
                            <Accordion.Header className="flex justify-around align-center">
                            <div className="w-1/4 border border-gray-200 rounded-full"/>
                                <Accordion.Trigger className="flex p-2 font-bold align-center">
                                    Game settings <ChevronDownIcon className="w-6" />
                                </Accordion.Trigger>
                                <div className="w-1/4 border border-gray-200 rounded-full"/>
                            </Accordion.Header>
                            <Accordion.Content>
                                <button
                                    className="w-1/2 h-10 px-4 py-2 text-white transition-colors bg-purple-500 border border-purple-500 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
                                    type="button"
                                    onClick={() => handleRandomizeOrder()}>
                                    <div className="flex items-center justify-center space-x-2 text-white transition-colors group-active:text-purple-500 group-hover:text-purple-500">
                                        <span className="font-bold">Randomize Order</span>
                                        <LightningBoltIcon className="w-6" />
                                    </div>
                                </button>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion.Root>
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