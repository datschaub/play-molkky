import { Player } from "../types/types"
import { PlayerScoreCard } from "../components/PlayerScoreCard"
import Modal from "./modals/modal"
import { useCallback, useState } from "react"
import { PlayerScoreModal } from "./modals/PlayerScoreModal"

type ScoreBoardProps = {
    players: Player[];
    updatePlayerPoints: (player: Player, pointsToAdd: number) => void;
}

export function ScoreBoard({ players, updatePlayerPoints }: ScoreBoardProps) {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<Player>()

    const handleOpenPlayerScoreModal = (player: Player) => {
        setSelectedPlayer(player)
        setModalIsOpen(true)
    }

    const handleCloseModal = useCallback(() => {
        setModalIsOpen(false)
    }, [])

    return (
        <>
            <div className="flex flex-col w-full space-x-0 space-y-4">
                {
                    players.map((player) => {
                        return <PlayerScoreCard key={player.id} player={player} openPlayerScoreModal={handleOpenPlayerScoreModal} />
                    })
                }
            </div>
            <Modal isOpen={modalIsOpen}>
                {selectedPlayer && <PlayerScoreModal player={selectedPlayer} closeModal={handleCloseModal} updatePlayerPoints={updatePlayerPoints} />}
            </Modal>
        </>
    )
}