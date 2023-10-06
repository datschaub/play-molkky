import { Dialog } from "@headlessui/react";

type QuitGameModalProps = {
    closeModal: () => void;
}

export function QuitGameModal({ closeModal }: QuitGameModalProps) {
    return (
        <>
            <Dialog.Title
                as="h3"
                className="mb-2 text-lg font-medium leading-6 text-gray-900"
            >
                Quit Game
            </Dialog.Title>
            <div className="pb-4">
                This will quit the game and go back to the start page
            </div>
            <div
                className="flex justify-between mt-4"
            >
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => closeModal()}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-error"
                    onClick={() => closeModal()}
                >
                    Quit
                </button>
            </div>
        </>
    )
}