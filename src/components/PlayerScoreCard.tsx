import { PlusCircleIcon } from "@heroicons/react/20/solid"
import { Player } from "../types/types"
import { useGameSettingsStore } from "../stores/gameSettingsStore"

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

const currentPlayerStyles = 'shadow-accent shadow-lg bg-primary-focus';

export function PlayerScoreCard({
    player,
    openPlayerScoreModal
}: PlayerScoreCardProps) {

    const gameStars = useGameSettingsStore(state => state.gameStars)
    const currentPlayerId = useGameSettingsStore(state => state.currentPlayerId)

    return (
        <>
            <div className={`shadow transition-all lg:max-w-none card bg-primary text-primary-content ${player.id === currentPlayerId && currentPlayerStyles}`}>
                <div className="p-4 card-body">
                    <h2 className="w-full card-title">
                        {player.id === currentPlayerId && (
                            <span>➡️</span>
                        )}
                        {player.name}
                    </h2>
                    <div className="flex flex-row justify-between py-2">
                        <div className="p-2 text-2xl font-bold shadow shadow-slate-700 btn-circle bg-secondary-focus">
                            {player.score}
                        </div>
                        <div className={`text-2xl lg:text-3xl bg-accent rounded-lg p-2 shadow`}>
                            {generateStars(player.stars, gameStars)}
                        </div>
                    </div>
                    <div className="m-0 divider" />
                    <div className="justify-between card-actions">
                        <button className="shadow btn btn-sm btn-secondary">
                            Edit
                        </button>
                        <button className="shadow btn btn-sm" onClick={() => openPlayerScoreModal(player)}>
                            Add points <PlusCircleIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}