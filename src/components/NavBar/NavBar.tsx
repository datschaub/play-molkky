import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import Modal from "../modals/modal";
import { SettingsModal } from "../modals/SettingsModal";
import { motion } from "framer-motion";
import { Dropdown } from "./Dropdown";
import { useGameSettingsStore } from "../../stores/gameSettingsStore";

const settingsIconsVariants = {
    rotate: { rotate: [0, -90] },
    stop: { rotate: 0 },
};

export function NavBar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const gameIsStarted = useGameSettingsStore(
        (gameSettings) => gameSettings.gameIsStarted,
    );

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    return (
        <>
            <div className="py-4 navbar bg-secondary">
                <div className="navbar-start">
                    <div className="dropdown">
                        <Dropdown />
                    </div>
                </div>
                <div className="navbar-center">
                    <h1 className="text-3xl font-extrabold leading-normal md:text-md">
                        <span className="text-primary">Play</span>{" "}
                        <span className="text-accent">MÖLKKY</span>
                    </h1>
                </div>
                <div className="navbar-end">
                    {gameIsStarted && (
                        <motion.button
                            className="transition-all btn btn-ghost btn-circle"
                            onClick={handleOpenModal}
                        >
                            <motion.div
                                variants={settingsIconsVariants}
                                animate={modalIsOpen ? "rotate" : "stop"}
                                transition={{
                                    duration: 0.5,
                                    type: "spring",
                                }}
                            >
                                <Cog6ToothIcon className="w-6 h-6" />
                            </motion.div>
                        </motion.button>
                    )}
                </div>
            </div>
            <Modal isOpen={modalIsOpen}>
                <SettingsModal closeModal={handleCloseModal} />
            </Modal>
        </>
    );
}
