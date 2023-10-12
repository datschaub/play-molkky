import { Dialog } from "@headlessui/react";
import { usePlayerStore } from "../../stores/playerStore";
import { useGameSettingsStore } from "../../stores/gameSettingsStore";

type QuitGameModalProps = {
    closeModal: () => void;
    closeParentModal: () => void;
};

export function QuitGameModal({
    closeModal,
    closeParentModal,
}: QuitGameModalProps) {
    const removeAllCurrentPlayers = usePlayerStore(
        (state) => state.removeAllCurrentPlayers,
    );
    const setGameIsStarted = useGameSettingsStore(
        (state) => state.setGameIsStarted,
    );
    const setAmountOfGameStars = useGameSettingsStore(
        (state) => state.setAmountOfGameStars,
    );

    const handleResetScore = () => {
        removeAllCurrentPlayers();
        setAmountOfGameStars(3);
        setGameIsStarted(false);
        closeModal();
        closeParentModal();
    };

    return (
        <>
            <Dialog.Title
                as="h3"
                className="mb-2 text-lg font-medium leading-6 text-gray-900"
            >
                ❗ Quit Game
            </Dialog.Title>
            <div className="pb-4">
                This will quit the game and go back to the start page
            </div>
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-error"
                    onClick={handleResetScore}
                >
                    Quit
                </button>
            </div>
        </>
    );
}
