import { Player } from "../types/types"
import { PlayerScoreCard } from "../components/PlayerScoreCard"
import Modal from "./modal"
import { useCallback, useState } from "react"
import { Dialog } from "@headlessui/react"
import { ScoreNumberBtn } from "./ScoreNumberBtn"

type PlayerScoreModalProps = {
    player: Player;
    closeModal: () => void;
    updatePlayerPoints: (player: Player, pointsToAdd: number) => void;
}

export function PlayerScoreModal({ player, closeModal, updatePlayerPoints }: PlayerScoreModalProps) {

    const [selectedNumber, setSelectedNumber] = useState<number>(0)

    const handleOnSelectNumber = (number: number) => {
        setSelectedNumber(number)
    }

    const addPlayerPoints = () => {
        updatePlayerPoints(player, selectedNumber)
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
            <div className="grid grid-cols-4 gap-2">
                {
                    [...Array(12)].map((e, i) => <ScoreNumberBtn key={i} number={i + 1} isSelected={selectedNumber === (i + 1)} onSelectNumber={handleOnSelectNumber} />)
                }
            </div>
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
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 border border-purple-600 rounded-md group hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                    onClick={() => addPlayerPoints()}
                >
                    <span className="font-medium text-white transition-colors group-active:text-purple-500 group-hover:text-purple-600">
                        Add points
                    </span>
                </button>
            </div>
        </>
    )
}