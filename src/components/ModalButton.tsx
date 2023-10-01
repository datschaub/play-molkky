
type ModalButtonProps = {
    name: string;
    closeModal: (players: any) => void;
    handleOpenModal: (value: JSX.Element) => void;
    modalContent: JSX.Element;
    icon: JSX.Element;
};

type ActionButtonIconProps = {
    icon: JSX.Element;
};

const ActionButtonIcon = ({ icon }: ActionButtonIconProps) => {
    return (
        <div className="flex-shrink-0 w-8 h-8 ml-4 text-white transition-colors rounded-full group-active:text-purple-500 group-hover:text-purple-600">
            {icon}
        </div>
    )
}

export const ModalButton = ({
    name,
    handleOpenModal,
    modalContent,
    icon
}: ModalButtonProps) => {

    const openModal = () => {
        handleOpenModal(modalContent)
    }

    return (
        <>
            <button
                type="button"
                onClick={() => openModal()}
                aria-label={`Hey ho`}
                className="flex items-center justify-center w-2/3 btn btn-accent"
            >
                <span className="font-medium text-white transition-colors group-active:text-purple-500 group-hover:text-purple-600">
                    {name}
                </span>
                <ActionButtonIcon icon={icon} />
            </button>
        </>
    );
};