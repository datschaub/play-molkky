import { Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import Modal from "./modal";
import { SettingsModal } from "./SettingsModal";

export function NavBar() {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleCloseSettingsModal = useCallback(() => {
        handleCloseModal()
    }, [])

    const handleCloseModal = useCallback(() => {
        setModalIsOpen(false)
    }, [])

    const handleOpenModal = () => {
        setModalIsOpen(true)
    }

    return (
        <>
            <div className="py-4 navbar bg-secondary">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <Bars3Icon className="w-6 h-6" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-secondary rounded-box w-52">
                            <li><a>Homepage</a></li>
                            <li><a>Portfolio</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <h1 className="text-3xl font-extrabold leading-normal md:text-md">
                        <span className="text-primary">Play</span> <span className="text-accent">MÖLKKY</span>
                    </h1>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle" onClick={handleOpenModal}>
                        <Cog6ToothIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <Modal isOpen={modalIsOpen}>
                <SettingsModal closeModal={handleCloseModal} />
            </Modal>
        </>
    )
}