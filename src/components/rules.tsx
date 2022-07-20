import { Dialog } from "@headlessui/react";

export function Rules() {
    return (
        <>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                Rules
            </Dialog.Title>
            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    These are the rules
                </p>
            </div>
        </>
    )
}