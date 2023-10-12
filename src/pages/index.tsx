import type { NextPage } from "next";
import Head from "next/head";
import { NewGame } from "../components/NewGame";
import Modal from "../components/modals/modal";
import { Rules } from "../components/rules";
import { useCallback, useEffect, useState } from "react";
import { PlayIcon, DocumentTextIcon } from "@heroicons/react/20/solid";
import { ModalButton } from "../components/ModalButton";
import { Player } from "../types/types";
import { FieldValues, UseFormGetValues } from "react-hook-form";
import { ScoreBoard } from "../components/ScoreBoard";
import { usePlayerStore } from "../stores/playerStore";
import { mapPlayers } from "../utils/utils";
import { NavBar } from "../components/NavBar/NavBar";
import { useGameSettingsStore } from "../stores/gameSettingsStore";

const Home: NextPage<{}> = () => {
    const players = usePlayerStore((state) => state.players);
    const setPlayerOrder = usePlayerStore((state) => state.setPlayerOrder);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState<JSX.Element>();
    const gameIsStarted = useGameSettingsStore(
        (gameSettings) => gameSettings.gameIsStarted,
    );
    const setGameIsStarted = useGameSettingsStore(
        (gameSettings) => gameSettings.setGameIsStarted,
    );
    const setCurrentPlayerId = useGameSettingsStore(
        (gameSettings) => gameSettings.setCurrentPlayerId,
    );

    const handleOpenModal = (modalContent: JSX.Element) => {
        setModalContent(modalContent);
        setModalIsOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        setModalIsOpen(false);
    }, []);

    const handleClosePlayersModal = useCallback(
        (getValuesFunc: UseFormGetValues<FieldValues>) => {
            const mappedPlayerOrder = mapPlayers(players, getValuesFunc);
            setPlayerOrder(mappedPlayerOrder);
            handleCloseModal();
        },
        [setPlayerOrder, handleCloseModal, players],
    );

    const handleSubmit = useCallback(
        (getValuesFunc: UseFormGetValues<FieldValues>) => {
            handleClosePlayersModal(getValuesFunc);
            setCurrentPlayerId(players[0]?.id);
            setGameIsStarted(true);
        },
        [
            handleClosePlayersModal,
            setGameIsStarted,
            players,
            setCurrentPlayerId,
        ],
    );

    const handleUpdatePlayerPoints = (player: Player, pointsToAdd: number) => {
        let playerToUpdate = players.filter((p) => p.id === player.id).at(0);

        // setPlayers([...players].map((p, i) => {
        //   return {
        //     'name': p.name,
        //     'id': p.id,
        //     'order': p.order,
        //     'score': p === playerToUpdate ? (player.score + pointsToAdd) : p.score
        //   }
        // }))
    };

    useEffect(() => {
        setModalContent(
            <NewGame
                closeModal={handleClosePlayersModal}
                onHandleSubmit={handleSubmit}
            />,
        );
    }, [players, handleCloseModal, handleSubmit, handleClosePlayersModal]);

    return (
        <>
            <Head>
                <title>Play Mölkky</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>

            <main className="flex flex-col items-center justify-center">
                <NavBar />
                <div className="flex flex-col items-center justify-center w-full gap-4 p-4 text-center lg:w-2/3">
                    {!gameIsStarted ? (
                        <>
                            <ModalButton
                                name="New game"
                                closeModal={handleClosePlayersModal}
                                handleOpenModal={handleOpenModal}
                                modalContent={
                                    <NewGame
                                        closeModal={handleClosePlayersModal}
                                        onHandleSubmit={handleSubmit}
                                    />
                                }
                                icon={<PlayIcon />}
                            />
                            <ModalButton
                                name="Rules"
                                closeModal={handleCloseModal}
                                handleOpenModal={handleOpenModal}
                                modalContent={<Rules />}
                                icon={<DocumentTextIcon />}
                            />
                        </>
                    ) : (
                        <ScoreBoard
                            players={players}
                            updatePlayerPoints={handleUpdatePlayerPoints}
                        />
                    )}
                </div>
                <Modal isOpen={modalIsOpen}>{modalContent}</Modal>
            </main>
        </>
    );
};

export default Home;
