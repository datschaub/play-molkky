import React from "react";
import { motion } from "framer-motion";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import useNavBar from "./hooks/useNavBar";
import { SettingsModal } from "../modals/SettingsModal";
import Modal from "../modals/modal";

const settingsIconsVariants = {
    rotate: { rotate: [0, -90] },
    stop: { rotate: 0 },
};

export const SettingsButton = () => {
    const { modalIsOpen, handleOpenModal, handleCloseModal } = useNavBar();

    return (
        <>
            <motion.button
                className="transition-all btn btn-ghost btn-circle"
                onClick={handleOpenModal}
            >
                <motion.div
                    variants={settingsIconsVariants}
                    animate={modalIsOpen ? "rotate" : "stop"}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <Cog6ToothIcon className="w-8 h-8" />
                </motion.div>
            </motion.button>
            <Modal isOpen={modalIsOpen}>
                <SettingsModal closeModal={handleCloseModal} />
            </Modal>
        </>
    );
};

export default SettingsButton;
