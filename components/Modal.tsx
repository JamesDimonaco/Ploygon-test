/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilAltIcon } from '@heroicons/react/outline'

export default function Modal({ open, setOpen, data, deletePolygon, updatePolygon }) {
    const [calculatedArea, setCalculatedArea] = useState(data.area)
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [size1, setSize1] = useState(data.size1)
    const [size2, setSize2] = useState(data.size2)

    const handleCalculateArea = (e) => {
        setShowUpdateButton(true)
        const target = e.target.id
        const value = e.target.value
        if (data.type === 'Rectangle') {
            setCalculatedArea(target === "Width" ? Number(value) * Number(data.size2) : Number(data.size1) * Number(value))
        }
        if (data.type === 'Triangle') {
            setCalculatedArea(target === "High" ? Number(value) * Number(data.size2) / 2 : Number(data.size1) * Number(value) / 2)
        }
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-200">
                                        <PencilAltIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Edit your {data?.type}
                                        </Dialog.Title>


                                        <div className="mt-5 sm:mt-6">
                                            <form onChange={(e) => handleCalculateArea(e)}>
                                                <label htmlFor={data?.type === "Rectangle" ? "Width" : "Hight"} className="block text-sm font-medium leading-5 text-gray-700">
                                                    {data?.type === "Rectangle" ? "Width" : "Hight"}
                                                </label>
                                                <input id={data?.type === "Rectangle" ? "Width" : "Hight"} type="number" className="mt-1 form-input w-full py-2 px-3 border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                    defaultValue={data.size1} onChange={(e) => setSize1(e.target.value)}/>
                                                <label htmlFor={data?.type === "Rectangle" ? "Length" : "Base"} className="block text-sm font-medium leading-5 text-gray-700">
                                                    {data?.type === "Rectangle" ? "Length" : "Base"}
                                                </label>
                                                <input id={data?.type === "Rectangle" ? "Length" : "Base"} type="number" className="mt-1 form-input w-full py-2 px-3 border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                                    defaultValue={data.size2} onChange={(e) => setSize2(e.target.value)}/>
                                            </form>
                                            <p className="text-lg mt-1 text-gray-500">
                                                Calculated area : {calculatedArea}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-1 mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700   sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Go back
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700  sm:text-sm"
                                        onClick={() => deletePolygon(data.type, data.id)}

                                    >
                                        Delete {data?.type}
                                    </button>
                                </div>
                                {showUpdateButton && <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md shadow-sm px-2 py-2 my-2 bg-green-600 text-base font-medium text-white hover:bg-green-700   sm:text-sm"
                                    onClick={() => updatePolygon(data.type, data.id, size1,size2 )}
                                >
                                    Update {data?.type}
                                </button>}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
