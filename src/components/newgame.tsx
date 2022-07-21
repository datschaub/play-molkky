import { Dialog } from "@headlessui/react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useState } from "react";
import { NewPlayerForm } from "./NewPlayerForm";
import { PlusCircleIcon } from "@heroicons/react/solid";

type NewGameProps = {
    players: string[];
    handleAddPlayers: () => void;
    closeModal: () => void;
    handleSubmit: () => void;
}

export function NewGame({ players, handleAddPlayers, closeModal, handleSubmit }: NewGameProps) {

    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                New game
            </Dialog.Title>
            <div className="mt-2">
                <h4>Add players</h4>
                <p className="flex flex-col text-sm text-gray-500">

                    <Formik
                        initialValues={{
                            player: '',
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Form className="mt-2 space-y-2 ">
                            {
                                players.map((player) => {
                                    return (
                                        <NewPlayerForm
                                            key={players.indexOf(player) + 1}
                                            playerPlaceholder={players.indexOf(player) + 1}
                                        />
                                    )
                                })
                            }
                        </Form>
                    </Formik>
                </p>
                <button
                    className="w-10 h-10 mt-4 text-purple-600 rounded-full"
                    type="button"
                    onClick={() => handleAddPlayers()}>
                    <PlusCircleIcon />
                </button>
                <div className="flex justify-between">
                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => closeModal()}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 border border-purple-600 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => handleSubmit()}
                        >
                            <span className="font-medium text-white transition-colors group-active:text-purple-500 group-hover:text-purple-600">
                                Submit
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}