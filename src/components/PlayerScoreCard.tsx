import { PlusCircleIcon } from "@heroicons/react/solid"
import { Player } from "../types/types"
import { generateEmojis } from "../utils/utils"
import { usePlayerStore } from "../stores/playerStore"

type PlayerScoreCardProps = {
    player: Player
    openPlayerScoreModal: (player: Player) => void
}

const generateStars = (count: number, totalGameStars: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push(
            <span key={i} className="p-0.5 opacity-100">⭐️</span>
        );
    }
    for (let i = count; i < totalGameStars; i++) {
        stars.push(
            <span key={i} className="p-0.5 opacity-30">⭐️</span>
        );
    }
    return stars;
};

export function PlayerScoreCard({
    player,
    openPlayerScoreModal
}: PlayerScoreCardProps) {

    const gameStars = usePlayerStore(state => state.gameStars)
    
    return (
        <div className="flex items-center">
            <div
                className="flex items-center justify-between w-full p-4 text-lg border-2 border-purple-300 rounded-lg"
                key={player.id}
            >
                <span>
                    {player.name}
                </span>

                <span className="font-bold">
                    {player.score} pts
                </span>
                <span className="flex items-center gap-x-1">
                    {generateStars(player.stars, gameStars)}
                </span>
            </div>
            <div className="ml-2">
                <PlusCircleIcon onClick={() => openPlayerScoreModal(player)} className="w-6 h-6" />
            </div>
        </div>
    )
}