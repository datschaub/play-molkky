import { Player } from "../types/types"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { ScoreNumberBtn } from "./ScoreNumberBtn"
import { StarBtn } from "./StarBtn"
import { usePlayerStore } from "../stores/playerStore"
import { generateEmojis } from "../utils/utils"

type PlayerScoreModalProps = {
    player: Player;
    closeModal: () => void;
    updatePlayerPoints: (player: Player, pointsToAdd: number) => void;
}

const addPointsBtnStyles = {
    btnEnabled: `btn-primary`,
    btnDisabled: `btn-ghost`,
    btnTextEnabled: ``,
    btnTextDisabled: `hover:cursor-not-allowed`
}

export function PlayerScoreModal({
    player,
    closeModal,
    updatePlayerPoints
}: PlayerScoreModalProps) {

    const addPlayerPoints = usePlayerStore(state => state.addPlayerPoints)
    const [selectedNumber, setSelectedNumber] = useState<number>(0)
    const [starIsSelected, setStarIsSelected] = useState(false)
    const addPointsDisabled = selectedNumber <= 0 && !starIsSelected
    const gameStars = usePlayerStore(state => state.gameStars)

    const handleOnSelectNumber = (number: number) => {
        setSelectedNumber(number)
        setStarIsSelected(false)
    }

    const handleOnSelectStar = () => {
        setSelectedNumber(0)
        setStarIsSelected(true)
    }

    const handleAddPlayerPoints = () => {
        addPlayerPoints(player, selectedNumber)
        closeModal()
    }

    /**
     * Generates star icons based on the game stars and the player's star count,
     * reflecting the selection with opacity 100 when a star is selected.
     * @returns {Array} An array of React elements representing star icons.
     */
    const handleCurrentStars = (): Array<any> => Array.from({ length: gameStars }, (_, index) => {
        let opacityClass = 'opacity-30 transition transition-all';

        if (starIsSelected) {
            if (index < player.stars) {
                opacityClass = 'opacity-100';
            } else if (index === player.stars) {
                opacityClass = 'transition transition-all opacity-70 border-b-4 border-b-primary border-dotted';
            }
        } else if (index < player.stars) {
            opacityClass = 'opacity-100';
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
                Player {player.name}
            </Dialog.Title>
            <div className="pb-4">Add points 👇</div>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {
                    [...Array(12)].map((e, i) => {
                        return <ScoreNumberBtn key={i} number={i + 1} isSelected={selectedNumber === (i + 1)} onSelectNumber={handleOnSelectNumber} />
                    })
                }
            </div>
            <StarBtn
                isSelected={starIsSelected}
                onSelect={handleOnSelectStar}
            />
            <div className="p-2 mt-4 text-xl rounded-lg shadow shadow-slate-500 gap-y-2 bg-secondary">
                <div className="my-4 font-bold">
                    Current score: {
                        selectedNumber > 0
                            ? `${player.score} (${player.score + selectedNumber})`
                            : player.score
                    }
                </div>
                <div className="my-4 font-bold">
                    Current stars: {handleCurrentStars()}
                </div>
            </div>
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
                <button
                    type="button"
                    disabled={addPointsDisabled}
                    className={`btn ${addPointsDisabled ? addPointsBtnStyles.btnDisabled : addPointsBtnStyles.btnEnabled}`}
                    onClick={() => handleAddPlayerPoints()}
                >
                    <span className={`font-medium text-white transition-colors ${addPointsDisabled ? addPointsBtnStyles.btnTextDisabled : addPointsBtnStyles.btnTextEnabled}`}>
                        Add points
                    </span>
                </button>
            </div>
        </>
    )
}