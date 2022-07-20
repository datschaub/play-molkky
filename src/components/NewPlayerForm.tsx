import { Field, Form, Formik } from "formik"

type NewGameFormProps = {
    playerPlaceholder: number;
}

export function NewGameForm({ playerPlaceholder }: NewGameFormProps) {
    return (
        <Formik
            initialValues={{
                player: '',
            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2))
            }}
        >
            <Form className="relative">
                <label className="sr-only" htmlFor="player"> Player </label>
                <Field
                    className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
                    id='player'
                    name='player'
                    placeholder={`Player ${playerPlaceholder}`}
                />
                <button className="absolute p-2 text-white -translate-y-1/2 bg-purple-600 rounded-full top-1/2 right-4" type="button">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </Form>
        </Formik>
    )
}