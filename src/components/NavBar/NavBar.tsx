import { Dropdown } from "./Dropdown";
import { Logo } from "./Logo";
import SettingsButton from "./SettingsButton";
import useNavBar from "./hooks/useNavBar";

export function NavBar() {
    const { gameIsStarted } = useNavBar();

    return (
        <>
            <div className="py-4 navbar bg-secondary">
                <div className="navbar-start">
                    <div className="dropdown">
                        <Dropdown />
                    </div>
                </div>
                <div className="navbar-center">
                    <Logo />
                </div>
                <div className="navbar-end">
                    {gameIsStarted && <SettingsButton />}
                </div>
            </div>
        </>
    );
}
