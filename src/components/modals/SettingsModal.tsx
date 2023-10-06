import { Dialog } from "@headlessui/react";
import { AmountOfStarsSettings } from "../AmountOfStarsSettings";
import Modal from "./modal";
import { useCallback, useState } from "react";
import { ResetScoreModal } from "./ResetScoreModal";
import { QuitGameModal } from "./QuitGameModal";

type SettingsModalProps = {
    closeModal: () => void;
}

export function SettingsModal({ closeModal }: SettingsModalProps) {

    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false)
    const [confirmModalContent, setConfirmModalContent] = useState<JSX.Element>()

    const handleResetScore = () => {
        setConfirmModalContent(<ResetScoreModal closeModal={handleCloseConfirmModal} />)
        setConfirmModalIsOpen(true)
    }

    const handleQuitGame = () => {
        setConfirmModalContent(<QuitGameModal closeModal={handleCloseConfirmModal} />)
        setConfirmModalIsOpen(true)
    }

    const handleCloseConfirmModal = useCallback(() => {
        setConfirmModalIsOpen(false)
    }, [])

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
            <div className="flex flex-col gap-y-5">
                <AmountOfStarsSettings />
            </div>
            <div className="divider" />
            <div className="flex flex-row justify-around">
                <button
                    type="button"
                    className="shadow btn btn-warning"
                    onClick={() => handleResetScore()}
                >
                    Reset Score
                </button>
                <button
                    type="button"
                    className="shadow btn btn-error"
                    onClick={() => handleQuitGame()}
                >
                    Quit Game
                </button>
            </div>
            <div className="divider" />
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
            <Modal isOpen={confirmModalIsOpen}>
                {confirmModalContent}
            </Modal>
        </>
    )
}