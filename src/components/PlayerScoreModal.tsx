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
            <StarBtn isSelected={starIsSelected} onSelect={handleOnSelectStar} />
            <div className="my-4 font-bold">
                Current score: {
                    selectedNumber > 0
                        ? `${player.score} (${player.score + selectedNumber})`
                        : player.score
                }
            </div>
            <div className="my-4 font-bold">
                Current stars: {
                    starIsSelected
                        ? `${generateEmojis(player.stars, '⭐')} (+ ⭐)`
                        : `${generateEmojis(player.stars, '⭐')}`
                }
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