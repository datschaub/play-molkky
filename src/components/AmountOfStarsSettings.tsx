import { useGameSettingsStore } from "../stores/gameSettingsStore/gameSettingsStore";

export function AmountOfStarsSettings() {
    const gameStars = useGameSettingsStore((state) => state.gameStars);
    const setAmountOfGameStars = useGameSettingsStore(
        (state) => state.setAmountOfGameStars,
    );

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event?.target?.value, 10);
        setAmountOfGameStars(newValue);
    };

    const rangeStarIcons = Array.from({ length: 5 }, (_, index) => (
        <span
            key={index}
            className={`text-lg transition-opacity ${
                index < gameStars ? "opacity-100" : "opacity-30"
            }`}
        >
            ⭐
        </span>
    ));

    return (
        <div className="flex flex-col items-center p-2 rounded-lg shadow shadow-slate-500 gap-y-2 bg-accent">
            <span className="font-bold text-white">Amount of stars</span>
            <input
                type="range"
                min={1}
                max="5"
                value={gameStars}
                className="range range-primary"
                step="1"
                onChange={handleStarsChange}
            />
            <div className="flex justify-between w-full px-2 text-lg rounded-lg">
                {rangeStarIcons}
            </div>
        </div>
    );
}
