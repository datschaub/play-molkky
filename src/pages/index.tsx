import type { NextPage } from "next";
import Head from "next/head";
import { GetStaticProps } from "next";
import { NewGame } from "../components/newgame";
import Modal from "../components/modal";
import { Rules } from "../components/rules";
import { useCallback, useEffect, useState } from "react";
import { PlayIcon, DocumentTextIcon } from '@heroicons/react/solid'
import { ModalButton } from "../components/ModalButton";
import { Player } from "../types/types";
import { nanoid } from 'nanoid'
import { FieldValues, UseFormGetValues, UseFormUnregister } from "react-hook-form";

// Set initial IDs on build time because of hydration
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      player1_id: nanoid(5),
      player2_id: nanoid(5)
    },
  }
}

// Need at least 2 players
type HomeProps = {
  player1_id: string;
  player2_id: string;
}

const Home: NextPage<HomeProps> = ({ player1_id, player2_id }) => {

  const [players, setPlayers] = useState<Player[]>([
    { id: player1_id, name: '', order: 1 },
    { id: player2_id, name: '', order: 2 }
  ])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element>()

  const handleOpenModal = (modalContent: JSX.Element) => {
    setModalContent(modalContent)
    setModalIsOpen(true)
  }

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  const mapNewPlayers = useCallback((newPlayers: any) => {
    const playersArray = Object.entries(newPlayers)
    let p = [...players]
    setPlayers(p.map((player) => {
      return {
        'name': newPlayers[player.id],
        'id': player.id,
        'order': player.order
      }
    }))
  }, [players])

  const handleClosePlayersModal = useCallback((getValuesFunc: UseFormGetValues<FieldValues>) => {
    const newPlayers = getValuesFunc();
    mapNewPlayers(newPlayers)
    handleCloseModal()
  }, [mapNewPlayers, handleCloseModal])

  const handleSubmit = useCallback((newPlayers: any) => {
    mapNewPlayers(newPlayers)
    handleCloseModal()
  }, [mapNewPlayers, handleCloseModal])

  const handleAddPlayer = useCallback(() => {
    setPlayers(
      [...players, { id: nanoid(5), name: '', order: players.length + 1 }]
    )
  }, [players])

  const handleRemovePlayer = useCallback((playerId: string, unregisterFunc: UseFormUnregister<FieldValues>) => {
    //Unregister field from react forms
    unregisterFunc(playerId)
    const playerIndex = players.findIndex((p) => p.id === playerId)

    let playerData = [...players];
    playerData.splice(playerIndex, 1)
    setPlayers(playerData)
  }, [players])

  const randomizeOrder = useCallback(() => {
    console.log(players)
  }, [players])

  const reorderPlayers = useCallback((getValuesFunc: UseFormGetValues<FieldValues>) => {
    const newPlayers = getValuesFunc()
    mapNewPlayers(newPlayers)
  }, [mapNewPlayers])

  useEffect(() => {
    setModalContent(
      <NewGame
        players={players}
        handleAddPlayers={handleAddPlayer}
        handleRemovePlayers={handleRemovePlayer}
        closeModal={handleClosePlayersModal}
        onHandleSubmit={handleSubmit}
        handleRandomizeOrder={randomizeOrder}
        handleOnReorder={setPlayers}
      />
    )
  }, [players, handleAddPlayer, handleCloseModal, handleSubmit, handleRemovePlayer, handleClosePlayersModal, randomizeOrder, setPlayers, reorderPlayers])

  return (
    <>
      <Head>
        <title>Play Mölkky</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container flex flex-col items-center justify-center h-screen p-4 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Play <span className="text-purple-300">MÖLKKY</span>
        </h1>
        <div className="flex flex-col items-center w-full pt-3 mt-3 space-y-4 text-center lg:w-2/3">
          <ModalButton
            name="New game"
            closeModal={handleClosePlayersModal}
            handleOpenModal={handleOpenModal}
            modalContent={
              <NewGame
                players={players}
                handleAddPlayers={handleAddPlayer}
                closeModal={handleClosePlayersModal}
                onHandleSubmit={handleSubmit}
                handleRemovePlayers={handleRemovePlayer}
                handleRandomizeOrder={randomizeOrder}
                handleOnReorder={setPlayers}
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
        </div>
        <div className="absolute bottom-0">{JSON.stringify(players)}</div>
        <Modal isOpen={modalIsOpen} closeModal={handleCloseModal}>
          {modalContent}
        </Modal>
      </main>
    </>
  );
};

export default Home;