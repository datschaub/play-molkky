import { Player } from "../types/types"
import { PlayerScoreCard } from "../components/PlayerScoreCard"
import Modal from "./modal"
import { useCallback, useState } from "react"
import { Dialog } from "@headlessui/react"
import { ScoreNumberBtn } from "./ScoreNumberBtn"
import { StarBtn } from "./StarBtn"
import { usePlayerStore } from "../stores/playerStore"

type PlayerScoreModalProps = {
    player: Player;
    closeModal: () => void;
    updatePlayerPoints: (player: Player, pointsToAdd: number) => void;
}

const addPointsBtnStyles = {
    btnEnabled: `text-white transition-colors bg-purple-600 border border-purple-600 hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2`,
    btnDisabled: `bg-gray-400`,
    btnTextEnabled: `group-active:text-purple-500 group-hover:text-purple-600`,
    btnTextDisabled: `hover:cursor-not-allowed`
}

export function PlayerScoreModal({ player, closeModal, updatePlayerPoints }: PlayerScoreModalProps) {

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
                {player.name}
            </Dialog.Title>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {
                    [...Array(12)].map((e, i) => {
                        return <ScoreNumberBtn key={i} number={i + 1} isSelected={selectedNumber === (i + 1)} onSelectNumber={handleOnSelectNumber} />
                    })
                }
            </div>
            <StarBtn isSelected={starIsSelected} onSelect={handleOnSelectStar} />
            <div className="my-4">
                Current score: {player.score}
            </div>
            <div
                className="flex justify-between mt-4"
            >
                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-md hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                    onClick={() => closeModal()}
                >
                    Close
                </button>
                <button
                    type="button"
                    disabled={addPointsDisabled}
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md group ${addPointsDisabled ? addPointsBtnStyles.btnDisabled : addPointsBtnStyles.btnEnabled}`}
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