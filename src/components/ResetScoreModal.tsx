import { Dialog } from "@headlessui/react";

type ResetScoreModalProps = {
    closeModal: () => void;
}

export function ResetScoreModal({ closeModal }: ResetScoreModalProps) {
    return (
        <>
            <Dialog.Title
                as="h3"
                className="mb-2 text-lg font-medium leading-6 text-gray-900"
            >
                Reset Score
            </Dialog.Title>
            <div className="pb-4">
                This will reset all players scores and stars to 0
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
                    className="btn btn-primary"
                    onClick={() => closeModal()}
                >
                    Reset
                </button>
            </div>
        </>
    )
}