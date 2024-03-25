import { useGameSettingsStore } from "../../stores/gameSettingsStore/gameSettingsStore";
import { TrophyIcon } from "@heroicons/react/20/solid";

export function AmountOfPointsSettings() {
    const gameWinPoints = useGameSettingsStore((state) => state.winPoints);
    const setAmountOfWinPoints = useGameSettingsStore(
        (state) => state.setAmountOfWinPoints,
    );

    const handleWinPointsChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newValue = parseInt(event?.target?.value, 10);
        setAmountOfWinPoints(newValue);
    };

    return (
        <div className="flex flex-col items-center p-2 px-6 rounded-lg shadow shadow-slate-500 gap-y-2 bg-accent">
            <span className="font-bold text-white">Points to win 🏆</span>
            <input
                type="range"
                min={20}
                max="120"
                value={gameWinPoints}
                className="range range-primary"
                step="10"
                onChange={handleWinPointsChange}
            />
            <span className="font-bold text-white">{gameWinPoints}</span>
        </div>
    );
}
