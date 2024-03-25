import { Dialog } from "@headlessui/react";
import { Player } from "../../types/types";

type EditPlayerModalProps = {
    closeModal: () => void;
    player: Player;
};

export function EditPlayerModal({ closeModal, player }: EditPlayerModalProps) {
    const handleEditPlayer = () => {
        closeModal();
    };

    return (
        <>
            <Dialog.Title
                as="h3"
                className="mb-2 text-lg font-medium leading-6 text-gray-900"
            >
                Edit player
            </Dialog.Title>
            <div className="pb-4">{player.name}</div>
            <p>* Name</p>
            <p>* Score</p>
            <p>* Stars</p>
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                >
                    Close
                </button>
                <button
                    type="button"
                    className={`btn btn-primary`}
                    onClick={handleEditPlayer}
                >
                    <span>Confirm</span>
                </button>
            </div>
        </>
    );
}
