import { useState } from "react";

const useGameSettingsAccordion = () => {
    const [gameSettingsOpen, setGameSettingsOpen] = useState(false);

    const toggleAccordion = () => {
        setGameSettingsOpen((prev) => !prev);
    };

    const getContentHeight = () => {
        return gameSettingsOpen ? "auto" : 0;
    };

    return {
        gameSettingsOpen,
        toggleAccordion,
        getContentHeight,
    };
};

export default useGameSettingsAccordion;
