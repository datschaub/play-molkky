import { Dialog } from "@headlessui/react";

import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useState } from "react";
import { NewGameForm } from "./NewPlayerForm";

export function NewGame() {

    const [players, setPlayers] = useState<string[]>([""]);
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
                <p className="flex flex-col mt-2 space-y-2 text-sm text-gray-500">
                    {
                        players.map((player) => {
                            return (
                                <NewGameForm
                                    key={players.indexOf(player) + 1}
                                    playerPlaceholder={players.indexOf(player) + 1}
                                />
                            )
                        })
                    }
                </p>
            </div>
        </>
    )
}