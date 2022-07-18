import type { NextPage } from "next";
import Head from "next/head";
import { PlayIcon, DocumentTextIcon } from '@heroicons/react/solid'

type ActionButtonProps = {
  name: string;
  description: string;
  link: string;
  icon: JSX.Element;
};

type ActionButtonIconProps = {
  icon: JSX.Element;
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Play <span className="text-purple-300">MÖLKKY</span>
        </h1>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-3 lg:w-2/3">
          <ActionButton
            name="New game"
            description="Start a new round of Mölkky"
            link="newgame"
            icon={<PlayIcon />}
          />
          <ActionButton
            name="Rules"
            description="Read the rules"
            link="rules"
            icon={<DocumentTextIcon />}
          />
        </div>
      </main>
    </>
  );
};

const ActionButtonIcon = ({ icon }: ActionButtonIconProps) => {
  return (
    <div className="h-6 w-6 flex-shrink-0 ml-4 text-purple-600 bg-white border border-white rounded-full group-active:text-purple-500">
      {icon}
    </div>
  )
}

const ActionButton = ({
  name,
  description,
  link,
  icon
}: ActionButtonProps) => {
  return (
    <a
      aria-label={description}
      className="flex items-center justify-between px-5 py-3 transition-colors bg-purple-600 border border-purple-600 rounded-lg hover:bg-transparent group focus:outline-none focus:ring" href={`${link}`}
    >
      <span className="font-medium text-white transition-colors group-active:text-purple-500 group-hover:text-purple-600">
        {name}
      </span>
      <ActionButtonIcon icon={icon} />
    </a>
  );
};



export default Home;
