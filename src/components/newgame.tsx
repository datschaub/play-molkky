import { Dialog } from "@headlessui/react";

export function NewGame() {
    return (
        <div className="">
            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Payment successful
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Your payment has been successfully submitted. We’ve sent
                        you an email with all of the details of your order.
                    </p>
                </div>

                <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    //   onClick={closeModal}
                    >
                        Got it, thanks!
                    </button>
                </div>
            </Dialog.Panel>
        </div>
    )
}