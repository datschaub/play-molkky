import { Player } from "../../types/types";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ScoreNumberBtn } from "../ScoreNumberBtn";
import { usePlayerStore } from "../../stores/playerStore";
import { useGameSettingsStore } from "../../stores/gameSettingsStore";

type PlayerScoreModalProps = {
    player: Player;
    closeModal: () => void;
    updatePlayerPoints: (player: Player, pointsToAdd: number) => void;
};

const addPointsBtnStyles = {
    btnEnabled: `btn-primary`,
    btnDisabled: `btn-ghost`,
    btnTextEnabled: ``,
    btnTextDisabled: `hover:cursor-not-allowed`,
};

export function PlayerScoreModal({
    player,
    closeModal,
    updatePlayerPoints,
}: PlayerScoreModalProps) {
    const addPlayerPoints = usePlayerStore((state) => state.addPlayerPoints);
    const players = usePlayerStore((state) => state.players);
    const setCurrentPlayerId = useGameSettingsStore(
        (state) => state.setCurrentPlayerId,
    );
    const currentPlayerId = useGameSettingsStore(
        (state) => state.currentPlayerId,
    );
    const [selectedNumber, setSelectedNumber] = useState<number | undefined>(
        undefined,
    );
    const [starIsSelected, setStarIsSelected] = useState(false);
    const addPointsDisabled = selectedNumber == undefined && !starIsSelected;
    const gameStars = useGameSettingsStore((state) => state.gameStars);

    const handleOnSelectNumber = (number: number) => {
        if (number == selectedNumber) {
            setSelectedNumber(undefined);
        } else {
            setSelectedNumber(number);
        }
        setStarIsSelected(false);
    };

    const handleOnSelectStar = () => {
        if (starIsSelected) {
            setSelectedNumber(undefined);
        } else {
            setSelectedNumber(0);
        }
        setStarIsSelected((prev) => !prev);
    };

    const playerIsEliminated = (player: Player | undefined): boolean => {
        if (player) {
            return player.stars === gameStars;
        }
        return false;
    };

    const handleAddPlayerPoints = () => {
        if (selectedNumber !== undefined) {
            addPlayerPoints(player, selectedNumber);
            
            // Get the current player
            const currentPlayer = players.find((p) => p.id === currentPlayerId);

            // Find the next player index (excluding eliminated players)
            let nextPlayerIndex = (currentPlayer?.order || 1) % players.length;

            // Iterate until a non-eliminated player is found
            while (players[nextPlayerIndex]?.isEliminated) {
                nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
            }

            // Set the state to the next non-eliminated player's id
            setCurrentPlayerId(players[nextPlayerIndex]?.id);

            closeModal();
        }
    };

    /**
     * Generates star icons based on the game stars and the player's star count,
     * reflecting the selection with opacity 100 when a star is selected.
     * @returns {Array} An array of React elements representing star icons.
     */
    const handleCurrentStars = (): Array<any> =>
        Array.from({ length: gameStars }, (_, index) => {
            let opacityClass = "opacity-30 transition transition-all";

            if (starIsSelected) {
                if (index < player.stars) {
                    opacityClass = "opacity-100";
                } else if (index === player.stars) {
                    opacityClass =
                        "transition transition-all opacity-70 border-b-4 border-b-primary border-dotted";
                }
            } else if (index < player.stars) {
                opacityClass = "opacity-100";
            }

            return (
                <span
                    key={index}
                    className={`text-lg ${opacityClass}`}
                >
                    ⭐
                </span>
            );
        });

    return (
        <>
            <Dialog.Title
                as="h3"
                className="mb-2 text-lg font-medium leading-6 text-gray-900"
            >
                {player.name}
            </Dialog.Title>
            <div className="pb-4">Add points 👇</div>
            <div className="p-2 rounded-lg shadow bg-secondary shadow-slate-500">
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(12)].map((e, i) => {
                        return (
                            <ScoreNumberBtn
                                key={i}
                                number={i + 1}
                                isSelected={selectedNumber === i + 1}
                                onSelectNumber={handleOnSelectNumber}
                            />
                        );
                    })}
                </div>
                <div className="m-0 divider" />
                <label className="flex flex-row items-center justify-center gap-2 cursor-pointer label">
                    <span className="text-xl font-bold label-text">
                        Add star
                    </span>
                    <input
                        type="checkbox"
                        checked={starIsSelected}
                        className="w-8 h-8 border-4 shadow checkbox checkbox-primary"
                        onChange={handleOnSelectStar}
                    />
                </label>
            </div>
            <div className="px-3 py-1 mt-4 text-xl rounded-lg shadow shadow-slate-500 gap-y-2 bg-accent">
                <div className="my-4 font-bold">
                    Current score:{" "}
                    {selectedNumber !== undefined && selectedNumber > 0
                        ? `${player.score} (${player.score + selectedNumber})`
                        : player.score}
                </div>
                <div className="my-4 font-bold">
                    Current stars: {handleCurrentStars()}
                </div>
            </div>
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
                    disabled={addPointsDisabled}
                    className={`btn ${
                        addPointsDisabled
                            ? addPointsBtnStyles.btnDisabled
                            : addPointsBtnStyles.btnEnabled
                    }`}
                    onClick={handleAddPlayerPoints}
                >
                    <span
                        className={`font-medium text-white transition-colors ${
                            addPointsDisabled
                                ? addPointsBtnStyles.btnTextDisabled
                                : addPointsBtnStyles.btnTextEnabled
                        }`}
                    >
                        Add points
                    </span>
                </button>
            </div>
        </>
    );
}
