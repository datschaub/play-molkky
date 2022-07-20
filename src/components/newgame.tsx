import { Dialog } from "@headlessui/react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useState } from "react";
import { NewPlayerForm } from "./NewPlayerForm";
import { PlusCircleIcon } from "@heroicons/react/solid";

export function NewGame() {

    const [players, setPlayers] = useState<string[]>(["player-1"]);

    const handleAddPlayer = () => {
        setPlayers([...players, `player-${players.length + 1}`])
    }

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
                        onSubmit={(values) => {
                            alert(JSON.stringify(values, null, 2))
                        }}
                    >
                        <Form className="mt-2 space-y-2 ">
                            {
                                players.map((player) => {
                                    return (
                                        <NewPlayerForm
                                            key={players.indexOf(player) + 1}
                                            playerPlaceholder={players.indexOf(player) + 1}
                                            handleAddPlayer={handleAddPlayer}
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
                    onClick={() => handleAddPlayer()}>
                    <PlusCircleIcon />
                </button>
            </div>
        </>
    )
}