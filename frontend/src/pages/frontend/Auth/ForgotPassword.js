import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function ForgotPassword() {
    let [isOpen, setIsOpen] = useState(false);
    const [isForgot, setIsForgot] = useState(0);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    const emailList = 'test@gmail.com';
    const vericode = '2023';
    const handleIsForgot = (signal) => {
        //if signal equal 1, modal will close and set all variable to their default
        if (signal !== -1) {
            //if isForgot equal 0 that means user is at enter email modal
            if (isForgot === 0) {
                //call a service that checking if email is valid in database
                if (emailList === email) {
                    setIsForgot(signal);
                    return;
                }
            }
            //if isForgot equal 0 that means user is at enter verification code modal
            if (isForgot === 1) {
                if (verificationCode === vericode) {
                    //this will move user to the reset password modal
                    setIsForgot(2);
                }
            }
            return;
        }
        closeModal();
        setIsForgot(0);
        setEmail('');
        setVerificationCode('');
        setPassword('');
        setRepassword('');
    };
    const resetPassword = () => {
        //call a service that change the password here before close modal
        if (password !== repassword) {
            alert('Not matching');
            return;
        }
        closeModal();
        setIsForgot(0);
        setEmail('');
        setVerificationCode('');
        setRepassword('');
        setPassword('');
        alert(password);
    };

    return (
        <>
            <div className=" flex items-center justify-center">
                <button
                    onClick={openModal}
                    type="button"
                    className="font-bold text-magenta-500 transition duration-200 ease-out hover:text-magenta-600 max-sm:text-xs"
                >
                    Forgot password?
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => null}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                                    <div className="group flex flex-nowrap overflow-hidden">
                                        <div
                                            className={`flex max-w-full transition delay-200 duration-300 ease-out ${isForgot === 1 ? '-translate-x-full' : ''} ${isForgot === 2 ? '-translate-x-2full' : ''}`}
                                        >
                                            <div className="w-full max-w-full flex-none px-1">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                                                >
                                                    Forgot your password?
                                                </Dialog.Title>
                                                <div>
                                                    <p className="text-sm text-gray-400">
                                                        We&apos;ll send you an
                                                        email based on the email
                                                        you give us.
                                                    </p>
                                                </div>

                                                <div className="mt-7 flex flex-col">
                                                    <input
                                                        type="email"
                                                        placeholder="email"
                                                        required
                                                        value={email}
                                                        onChange={(e) =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                        autoFocus={false}
                                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:text-white"
                                                    />
                                                </div>
                                                <div className="mt-5 flex justify-end space-x-3">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-rose-600 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                        onClick={() =>
                                                            handleIsForgot(-1)
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                        onClick={() =>
                                                            handleIsForgot(1)
                                                        }
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-full max-w-full flex-none px-1">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                                                >
                                                    Verification Step
                                                </Dialog.Title>
                                                <div>
                                                    <p className="text-sm text-gray-400">
                                                        Enter verification code
                                                        we have sent to your
                                                        email.
                                                    </p>
                                                </div>

                                                <div className="mt-7 flex flex-col">
                                                    <input
                                                        type="text"
                                                        placeholder="Verification Code"
                                                        required
                                                        value={verificationCode}
                                                        onChange={(e) =>
                                                            setVerificationCode(
                                                                e.target.value
                                                            )
                                                        }
                                                        autoFocus={false}
                                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:text-white"
                                                    />
                                                </div>
                                                <div className="mt-5 flex justify-end space-x-3">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-rose-600 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                        onClick={() =>
                                                            handleIsForgot(-1)
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                        onClick={() =>
                                                            handleIsForgot(2)
                                                        }
                                                    >
                                                        Verify
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className={`w-full max-w-full flex-none px-1 ${isForgot === 2 ? '' : 'hidden'}`}
                                            >
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                                                >
                                                    Reset your password
                                                </Dialog.Title>
                                                <div>
                                                    <p className="text-sm text-gray-400">
                                                        Enter your new password
                                                    </p>
                                                </div>

                                                <div className="mt-7 flex flex-col space-y-3">
                                                    <input
                                                        type="password"
                                                        placeholder="New password"
                                                        required
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        autoFocus={false}
                                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:text-white"
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder="Confirm password"
                                                        required
                                                        value={repassword}
                                                        onChange={(e) =>
                                                            setRepassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        autoFocus={false}
                                                        className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:text-white"
                                                    />
                                                </div>
                                                <div className="mt-5 flex justify-end space-x-3">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-rose-600 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                        onClick={() =>
                                                            handleIsForgot(-1)
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                        onClick={() =>
                                                            resetPassword()
                                                        }
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
