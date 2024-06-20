import { Dialog, Tab, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { addresses } from '../../../test/addresses';
import { getAddressByCustomerId } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Address() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userReducer);
    const [address, setAddress] = useState(null);
    const fetchDataAddress = async () => {
        const resultAddress = await dispatch(
            getAddressByCustomerId({ customer_id: userInfo._id })
        );
        setAddress(resultAddress?.payload?.metaData);
    };
    useEffect(() => {
        fetchDataAddress();
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [receiverName, setReceiverName] = useState('');

    const handleAddAddress = () => {};

    return (
        <Tab.Panel className="p-3">
            <div className="grid grid-cols-2 gap-2">
                {addresses.map((item, index) => (
                    <div
                        className="flex items-center rounded-md bg-zinc-200 px-3 py-2 text-gray-700 shadow-md dark:bg-zinc-800 dark:text-white"
                        onClick={() => setAddress(item)}
                        key={index}
                    >
                        <div className="flex flex-1 flex-col">
                            <div className="font-bold">{item.name}</div>
                            <div>{item.phonenumber}</div>
                            <div>
                                {item.street}, {item.city}
                            </div>
                        </div>
                        <div className="flex h-full items-center">
                            <input
                                type="radio"
                                value={item._id}
                                checked={address?._id === item._id}
                                className="border-0 p-3 transition duration-500 ease-out checked:bg-xanthous-500 checked:text-xanthous-400 focus:ring-xanthous-400"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-end space-x-2 pt-2">
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-md border-2 border-magenta-500 bg-magenta-500 px-2 py-1 text-white shadow-md transition duration-500 ease-out hover:-translate-y-0.5"
                >
                    Thêm địa chỉ mới
                </button>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
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
                                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                                        <div className="group flex flex-nowrap overflow-hidden">
                                            <div
                                                className={`flex w-full max-w-full text-gray-900 transition delay-200 duration-300 ease-out dark:text-white`}
                                            >
                                                <div className="w-full max-w-full flex-none px-1">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg font-bold leading-6 "
                                                    >
                                                        Thêm địa chỉ
                                                    </Dialog.Title>
                                                    <div className="mt-7 flex flex-col -space-y-2">
                                                        <label>
                                                            Tên người nhận
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={receiverName}
                                                            onChange={(e) =>
                                                                setReceiverName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            autoFocus={false}
                                                            className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:border-white dark:text-white"
                                                        />
                                                    </div>
                                                    <div className="mt-7 flex flex-col -space-y-2">
                                                        <label>Địa chỉ</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={newAddress}
                                                            onChange={(e) =>
                                                                setNewAddress(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            autoFocus={false}
                                                            className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:border-white dark:text-white"
                                                        />
                                                    </div>
                                                    <div className="mt-7 flex flex-col -space-y-2">
                                                        <label>
                                                            Số điện thoại
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={phonenumber}
                                                            onChange={(e) =>
                                                                setPhoneNumber(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            autoFocus={false}
                                                            className="border-b-2 border-l-0 border-r-0 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:border-white dark:text-white"
                                                        />
                                                    </div>
                                                    <div className="mt-5 flex justify-end space-x-3">
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center rounded-md border-2 border-gray-900 px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-rose-500 hover:bg-rose-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white dark:text-white"
                                                            onClick={() => {
                                                                setIsOpen(
                                                                    false
                                                                );
                                                                setNewAddress(
                                                                    ''
                                                                );
                                                                setPhoneNumber(
                                                                    ''
                                                                );
                                                                setReceiverName(
                                                                    ''
                                                                );
                                                            }}
                                                        >
                                                            Hủy
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center rounded-md border-2 border-gray-900 px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:bg-magenta-500 hover:text-white focus:outline-none  focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-white dark:text-white"
                                                            onClick={() =>
                                                                handleAddAddress()
                                                            }
                                                        >
                                                            Lưu
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
            </div>
        </Tab.Panel>
    );
}
