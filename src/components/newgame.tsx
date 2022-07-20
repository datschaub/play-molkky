import { Dialog } from "@headlessui/react";

export function NewGame() {
    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                New game
            </Dialog.Title>
            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    This is a new game
                </p>
            </div>
        </>
    )
}