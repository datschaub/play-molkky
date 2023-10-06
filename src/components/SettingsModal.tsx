import { Dialog } from "@headlessui/react";

type SettingsModalProps = {
    closeModal: () => void;
}

export function SettingsModal({ closeModal }: SettingsModalProps) {
    return (
        <>
            <Dialog.Title
                as="h3"
                className="mb-2 text-lg font-medium leading-6 text-gray-900"
            >
                Settings
            </Dialog.Title>
            <div className="pb-4">
                Update settings 👇
            </div>
            <div
                className="flex justify-between mt-4"
            >
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => closeModal()}
                >
                    Close
                </button>
            </div>
        </>
    )
}