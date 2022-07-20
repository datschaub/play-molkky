import { Dialog } from "@headlessui/react";

import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useState } from "react";

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
                <p className="mt-2 text-sm text-gray-500">
                    <Formik
                        initialValues={{
                            player: '',
                        }}
                        onSubmit={(values) => {
                            alert(JSON.stringify(values, null, 2))
                        }}
                    >
                        <Form className="flex items-center">
                            <label className="text-sm font-bold text-gray-700 shrink-0" htmlFor='Player'>
                                Player {players.length}
                            </label>
                            <Field className="w-full px-3 py-2 ml-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id='player' name='player' />
                        </Form>
                    </Formik>
                </p>
            </div>
        </>
    )
}