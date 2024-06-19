import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { addresses } from '../../../test/addresses';
import { getAddressByCustomerId } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Address() {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userReducer);
    const [address, setAddress] = useState(null);
    const fetchDataAddress = async () => {
        const resultAddress = await dispatch(getAddressByCustomerId({ customer_id: userInfo._id }))
        setAddress(resultAddress?.payload?.metaData)
    }
    useEffect(() => {
        fetchDataAddress()
    }, [])

    return (
        <Tab.Panel className="p-3">
            <div className="grid grid-cols-2 gap-2">
                {addresses.map((item, index) => (
                    <div
                        className="flex items-center bg-zinc-800/60 px-3 py-2"
                        onClick={() => setAddress(item)}
                        key={index}
                    >
                        <div className="flex flex-1 flex-col text-white">
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
            <div className="mt-4 flex justify-end space-x-2 border-t-2 border-white pt-2">
                <button className="border-2 border-white px-2 py-1 text-white transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500">
                    Thêm địa chỉ mới
                </button>
            </div>
        </Tab.Panel>
    );
}
