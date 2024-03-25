import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Player } from "../../types/types";
import { useGameSettingsStore } from "../../stores/gameSettingsStore/gameSettingsStore";
import { motion } from "framer-motion";
import Modal from "../modals/modal";
import { EditPlayerModal } from "../modals/EditPlayerModal";
import { useState } from "react";
import { usePlayerStore } from "../../stores/playerStore/playerStore";

type PlayerScoreCardProps = {
    player: Player;
    openPlayerScoreModal: (player: Player) => void;
};

const generateStars = (count: number, totalGameStars: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push(
            <span
                key={i}
                className="p-0.5 opacity-100"
            >
                ⭐️
            </span>,
        );
    }
    for (let i = count; i < totalGameStars; i++) {
        stars.push(
            <span
                key={i}
                className="p-0.5 opacity-30"
            >
                ⭐️
            </span>,
        );
    }
    return stars;
};

const currentPlayerStyles = "shadow-black shadow-md bg-primary-focus";

export function PlayerScoreCard({
    player,
    openPlayerScoreModal,
}: PlayerScoreCardProps) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const gameStars = useGameSettingsStore((state) => state.gameStars);
    const currentPlayerId = useGameSettingsStore(
        (state) => state.currentPlayerId,
    );
    const isCurrentPlayer = player.id === currentPlayerId;
    const winnerId = usePlayerStore((state) => state.winnerId); // Get the winnerId from the store

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleOpenEditPlayerModal = () => {
        setModalIsOpen(true);
    };

    const playerIsEliminated = player.isEliminated;

    return (
        <>
            <div
                className={`flex flex-row min-w-full shadow transition-all card bg-primary text-primary-content ${
                    isCurrentPlayer ? currentPlayerStyles : "opacity-90"
                } ${playerIsEliminated ? "opacity-30" : ""}`}
            >
                <div className="p-4 card-body">
                    <h2 className="w-full card-title">
                        {isCurrentPlayer && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{
                                    duration: 0.7,
                                    type: "spring",
                                    bounce: 0.5,
                                    delay: 0.3, //delay this so it's visible after the modal is closed
                                }}
                            >
                                ➡️
                            </motion.span>
                        )}
                        {player.name} {player.id === winnerId && "👑"} {playerIsEliminated && "☠️"}
                    </h2>
                    <div className="flex flex-row justify-between py-2">
                        <div className="p-2 text-2xl font-bold shadow shadow-slate-700 btn-circle bg-secondary">
                            {player.score}
                        </div>
                        <div
                            className={`text-2xl lg:text-3xl bg-accent rounded-lg p-2 shadow`}
                        >
                            {generateStars(player.stars, gameStars)}
                        </div>
                    </div>
                    <div className="m-0 divider" />
                    <div className="justify-between card-actions">
                        <button
                            className="shadow btn btn-sm btn-secondary"
                            onClick={handleOpenEditPlayerModal}
                        >
                            Edit
                        </button>
                        <button
                            className="shadow btn btn-sm"
                            onClick={() => openPlayerScoreModal(player)}
                            disabled={!isCurrentPlayer || playerIsEliminated}
                        >
                            Add points <PlusCircleIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={modalIsOpen}>
                <EditPlayerModal
                    closeModal={handleCloseModal}
                    player={player}
                />
            </Modal>
        </>
    );
}
