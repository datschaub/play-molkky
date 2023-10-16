import { useState } from "react";
import { useGameSettingsStore } from "../../../stores/gameSettingsStore/gameSettingsStore";

export const useNavBar = () => {
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

    return {
        modalIsOpen,
        gameIsStarted,
        handleCloseModal,
        handleOpenModal,
    };
};

export default useNavBar;
