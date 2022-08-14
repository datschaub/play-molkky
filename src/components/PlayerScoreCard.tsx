import { PlusCircleIcon } from "@heroicons/react/solid"
import { Player } from "../types/types"

type PlayerScoreCardProps = {
    player: Player
    openPlayerScoreModal: (player: Player) => void
}

export function PlayerScoreCard({ player, openPlayerScoreModal }: PlayerScoreCardProps) {
    return (
        <div className="flex items-center">
            <div
                className="flex justify-between w-full p-4 border-2 border-purple-300 rounded-lg"
                key={player.id}
            >
                <span>
                    {player.name}
                </span>

                <span className="font-bold">
                    {player.score}
                </span>
            </div>
            <div className="ml-2">
                <PlusCircleIcon onClick={() => openPlayerScoreModal(player)} className="w-6 h-6" />
            </div>
        </div>
    )
}