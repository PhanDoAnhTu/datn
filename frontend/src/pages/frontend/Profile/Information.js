import { Dialog, Tab, Transition } from '@headlessui/react';
import GenderSelection from '../../../components/frontend/GenderSelection';
import { Fragment, useRef, useState } from 'react';

export default function Information() {
    const [isEditable, setIsEditable] = useState(false);
    const [tempUsername, setTempUsername] = useState('');
    const [tempFullName, setTempFullName] = useState('');
    const [tempGender, setTempGender] = useState(0);
    const testData = {
        username: 'test123',
        fullname: 'le van test',
        email: 'test@gmail.com',
        gender: 0,
    };
    let [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    return (
        <Tab.Panel className={'flex flex-col space-y-7 p-7 outline-none'}>
            <div className="flex items-center max-sm:flex-col max-sm:justify-center max-sm:space-y-5 sm:space-x-6">
                <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRMbfFvbkrmVCeAM4G90s0UinjMAG9e2J2066q5byaqQ&s"
                            alt=""
                            className="object-cover object-center"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center space-y-1 max-sm:items-center">
                    <button
                        onClick={() => setOpen(true)}
                        className="w-fit border-2 border-white px-10 py-2 font-bold text-white transition duration-200 ease-out hover:border-magenta-500 hover:text-magenta-500"
                    >
                        Change
                    </button>
                    <Transition.Root show={open} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            initialFocus={cancelButtonRef}
                            onClose={() => null}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-zinc-900">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mt-3 flex-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                                                        >
                                                            Upload avatar
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <input
                                                                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 file:border-b-0 file:border-l-0 file:border-r-2 file:border-t-0 file:border-zinc-500 file:bg-transparent file:p-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:file:text-white"
                                                                aria-describedby="file_input_help"
                                                                id="file_input"
                                                                type="file"
                                                            />
                                                            <p
                                                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                                id="file_input_help"
                                                            >
                                                                PNG, JPG or
                                                                (MAX.
                                                                800x400px).
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4  py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-zinc-800">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none ring-2 ring-inset ring-magenta-500 transition duration-500 ease-out hover:bg-magenta-500 sm:ml-3 sm:w-auto"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline-none ring-2 ring-inset ring-white transition duration-500 ease-out hover:bg-gray-50 hover:text-zinc-900 sm:mt-0 sm:w-auto dark:text-white"
                                                    onClick={() =>
                                                        setOpen(false)
                                                    }
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>
                    <div className="flex flex-col">
                        <span className="text-white">File maximum: 24MB</span>
                        <span className="text-white">
                            File extension: .jpg, .jpeg, .png
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col -space-y-1">
                    <span className="w-fit  border-white pr-1 text-white">
                        Username
                    </span>
                    <input
                        type="text"
                        disabled={!isEditable}
                        value={!isEditable ? testData.username : tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-white outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white"
                    />
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="w-fit  border-white pr-1 text-white">
                        Full Name
                    </span>
                    <input
                        type="text"
                        value={!isEditable ? testData.fullname : tempFullName}
                        onChange={(e) => setTempFullName(e.target.value)}
                        disabled={!isEditable}
                        className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-white outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white"
                    />
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="w-fit border-white pr-1 text-white">
                        Email
                    </span>
                    <input
                        type="text"
                        value={testData.email}
                        className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-white outline-none brightness-50 transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white"
                        disabled
                    />
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="w-fit  border-white pr-1 text-white">
                        Gender
                    </span>
                    <GenderSelection
                        selectedGender={testData.gender}
                        isEditable={isEditable}
                        setTempGender={setTempGender}
                        tempGender={tempGender}
                    />
                </div>
                <div className="flex flex-col -space-y-1">
                    <span className="w-fit border-white pr-1 text-white brightness-50">
                        Phone number
                    </span>
                    <div className="flex items-center border-x-0 border-b-2 border-t-0 transition duration-500 ease-out focus:border-magenta-500 dark:border-white/50">
                        <input
                            type="text"
                            className="flex-1 border-0 border-gray-900 bg-transparent pl-0 text-white outline-none focus:ring-0 disabled:brightness-50 "
                        />
                        <button className="h-fit w-fit border-2 p-1 text-xs font-semibold text-white transition duration-200 ease-out hover:border-magenta-500 hover:text-magenta-500">
                            Change
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                {!isEditable ? (
                    <>
                        <button className="border-2 border-white px-5 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500">
                            Change password
                        </button>
                        <button
                            onClick={() => setIsEditable(true)}
                            className="border-2 border-white px-5 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500"
                        >
                            Edit
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditable(false)}
                            className="border-2 border-white px-5 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setIsEditable(false)}
                            className="border-2 border-white px-5 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500"
                        >
                            Save
                        </button>
                    </>
                )}
            </div>
        </Tab.Panel>
    );
}
