import { Dialog, Tab, Transition } from '@headlessui/react';
import GenderSelection from '../../../components/frontend/GenderSelection';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    upLoadImageSingle,
    changeAvatar,
    checkPassword,
    onChangePassword,
    updateInfomation,
} from '../../../store/actions';
import { toast } from 'react-toastify';
import { UserIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

export default function Information() {
    const [isEditable, setIsEditable] = useState(false);
    const { userInfo } = useSelector((state) => state.userReducer);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [gender, setGender] = useState(0);
    let [isOpen, setIsOpen] = useState(false);
    const [isForgot, setIsForgot] = useState(0);
    const [password, setPassword] = useState('');
    const [oldpassword, setOldPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEditable === false) {
            setPhone(userInfo?.customer_phone);
            setUsername(userInfo?.customer_name);
            setGender(0);
            setEmail(userInfo?.customer_email);
        }
    }, [isEditable]);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    const handleIsForgot = async (signal) => {
        if (signal == -1) {
            closeModal();
            setIsForgot(0);
            setOldPassword('');
            setPassword('');
            setRepassword('');
            return;
        }
        if (isForgot === 0) {
            const id = toast.loading('Vui lòng chờ...');
            const check = await dispatch(
                checkPassword({
                    customer_email: userInfo.customer_email,
                    customer_password: oldpassword,
                })
            );
            if (check?.payload?.status === (200 || 201)) {
                toast.update(id, {
                    render: 'Mật khẩu cũ đúng, hãy nhập mật khẩu mới',
                    type: 'success',
                    isLoading: false,
                    closeOnClick: true,
                    autoClose: 2000,
                });
                setIsForgot(signal);
            } else {
                toast.update(id, {
                    render: 'Mật khẩu cũ sai',
                    type: 'error',
                    isLoading: false,
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
        }
    };
    const changePassword = async () => {
        if (password !== repassword) {
            toast.error('Nhập lại mật khẩu không khớp');
            return;
        }
        if (isForgot == 1) {
            const id = toast.loading('Vui lòng chờ...');

            const change = await dispatch(
                onChangePassword({
                    customer_email: userInfo.customer_email,
                    customer_password: password,
                })
            );
            if (change?.payload?.status === (200 || 201)) {
                toast.update(id, {
                    render: 'Đổi mật khẩu thành công',
                    type: 'success',
                    isLoading: false,
                    closeOnClick: true,
                    autoClose: 3000,
                });
                closeModal();
                setIsForgot(0);
                setOldPassword('');
                setRepassword('');
                setPassword('');
                return;
            }
            toast.update(id, {
                render: 'Đổi mật khẩu không thành công',
                type: 'error',
                isLoading: false,
                closeOnClick: true,
                autoClose: 3000,
            });
        }

        closeModal();
        setIsForgot(0);
        setOldPassword('');
        setRepassword('');
        setPassword('');
        return;
    };
    let [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    const onChangeAvatar = async (files) => {
        if (files?.length > 0) {
            setImage(files[0]);
        }
    };

    const onSaveChange = async () => {
        if (image) {
            const id = toast.loading('Đang cập nhật ảnh đại diện');
            const formData = new FormData();
            formData.append('file', image);

            const uploadImage = await dispatch(upLoadImageSingle(formData));
            if (uploadImage?.payload?.status === (200 || 201)) {
                await dispatch(
                    changeAvatar({
                        customer_id: userInfo._id,
                        image: uploadImage.payload.metaData.thumb_url,
                    })
                );
                toast.update(id, {
                    render: 'Cập nhật ảnh đại diện thành công',
                    type: 'success',
                    isLoading: false,
                    closeOnClick: true,
                    autoClose: 2000,
                });
            } else {
                toast.update(id, {
                    render: 'Cập nhật ảnh đại diện không thành công',
                    type: 'error',
                    isLoading: false,
                    closeOnClick: true,
                    autoClose: 2000,
                });
            }
            setOpen(false);
        }
    };

    const onEditInfo = async () => {
        const id = toast.loading('Đang cập nhật...');
        const update = await dispatch(
            updateInfomation({
                customer_id: userInfo?._id,
                customer_name: username,
                customer_phone: phone,
                customer_sex:
                    gender === 0
                        ? 'Nam'
                        : gender === 1
                          ? 'Nữ'
                          : 'Không muốn tiết lộ',
                customer_date_of_birth:
                    birthYear + '-' + birthMonth + '-' + birthDay,
            })
        );
        if (update?.payload?.status === (200 || 201)) {
            toast.update(id, {
                render: 'Cập nhật thông tin thành công',
                type: 'success',
                isLoading: false,
                closeOnClick: true,
                autoClose: 2000,
            });
        } else {
            toast.update(id, {
                render: 'Cập nhật thông tin không thành công',
                type: 'error',
                isLoading: false,
                closeOnClick: true,
                autoClose: 2000,
            });
        }
        setIsEditable(false);

        setBirthDay('');
        setBirthYear('');
        setBirthMonth('');
    };

    return (
        <Tab.Panel className={'flex flex-col space-y-7 p-7 outline-none'}>
            <div className="flex items-center max-sm:flex-col max-sm:justify-center max-sm:space-y-5 sm:space-x-6">
                <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white">
                        {userInfo.customer_avatar ? (
                            <img
                                src={userInfo?.customer_avatar}
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-300 text-gray-500 dark:bg-magenta-400 dark:text-white">
                                <UserIcon className="h-10 w-10 drop-shadow-md" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-center space-y-1 max-sm:items-center">
                    <button
                        onClick={() => setOpen(true)}
                        className="w-fit rounded-md border-2 border-magenta-500 bg-magenta-500 px-10 py-2 font-bold text-white transition duration-200 ease-out hover:-translate-y-0.5"
                    >
                        Thay đổi
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
                                                            Cập nhật ảnh đại
                                                            diện
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <input
                                                                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 file:border-b-0 file:border-l-0 file:border-r-2 file:border-t-0 file:border-zinc-500 file:bg-transparent file:p-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:file:text-white"
                                                                aria-describedby="file_input_help"
                                                                id="file_input"
                                                                type="file"
                                                                onChange={(e) =>
                                                                    onChangeAvatar(
                                                                        e.target
                                                                            .files
                                                                    )
                                                                }
                                                            />
                                                            <p
                                                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                                                id="file_input_help"
                                                            >
                                                                PNG, JPG, JPEG
                                                                or (MAX.
                                                                800x400px).
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4  py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-zinc-800">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline-none ring-2 ring-inset ring-white transition duration-500 ease-out hover:bg-magenta-500 hover:text-gray-900 hover:ring-magenta-500 sm:ml-3 sm:w-auto dark:text-white "
                                                    onClick={() =>
                                                        onSaveChange()
                                                    }
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline-none ring-2 ring-inset ring-white transition  duration-500 ease-out hover:bg-rose-500 hover:text-zinc-900 hover:ring-rose-500 sm:mt-0 sm:w-auto dark:text-white"
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
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col -space-y-1">
                    <span className="w-fit border-white pr-1 text-gray-900 dark:text-white">
                        Email
                    </span>
                    <input
                        type="text"
                        value={email}
                        className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 outline-none brightness-50 transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white dark:text-white"
                        disabled
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col -space-y-1">
                        <span className="w-fit  border-white pr-1 text-gray-900 dark:text-white">
                            Tên người dùng
                        </span>
                        <input
                            type="text"
                            disabled={!isEditable}
                            value={
                                !isEditable ? userInfo?.customer_name : username
                            }
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white dark:text-white"
                        />
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="w-fit  border-white pr-1 text-gray-900 dark:text-white">
                            Họ và tên
                        </span>
                        <input
                            type="text"
                            value={
                                !isEditable ? userInfo?.customer_name : username
                            }
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!isEditable}
                            className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white dark:text-white"
                        />
                    </div>

                    <div className="flex flex-col -space-y-1">
                        <span className="w-fit  border-white pr-1 text-gray-900 dark:text-white">
                            Giới tính
                        </span>
                        <GenderSelection
                            selectedGender={0}
                            isEditable={isEditable}
                            setGender={setGender}
                            gender={gender}
                        />
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="w-fit border-white pr-1 text-gray-900 dark:text-white">
                            Số điện thoại
                        </span>
                        <input
                            type="text"
                            value={
                                !isEditable ? userInfo?.customer_phone : phone
                            }
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditable}
                            className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white dark:text-white"
                        />
                    </div>
                    <div>
                        <div className="flex flex-col -space-y-1">
                            <span className="w-fit border-white pr-1 text-gray-900 dark:text-white">
                                Ngày sinh
                            </span>
                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    value={
                                        !isEditable
                                            ? userInfo?.customer_date_of_birth
                                                ? dayjs(
                                                      userInfo?.customer_date_of_birth
                                                  ).format('DD')
                                                : ''
                                            : birthDay
                                    }
                                    onChange={(e) =>
                                        setBirthDay(e.target.value)
                                    }
                                    disabled={!isEditable}
                                    className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white dark:text-white"
                                />
                                <input
                                    type="text"
                                    value={
                                        !isEditable
                                            ? userInfo?.customer_date_of_birth
                                                ? dayjs(
                                                      userInfo?.customer_date_of_birth
                                                  ).format('MM')
                                                : ''
                                            : birthMonth
                                    }
                                    onChange={(e) =>
                                        setBirthMonth(e.target.value)
                                    }
                                    disabled={!isEditable}
                                    className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white dark:text-white"
                                />
                                <input
                                    type="text"
                                    value={
                                        !isEditable
                                            ? userInfo?.customer_date_of_birth
                                                ? dayjs(
                                                      userInfo?.customer_date_of_birth
                                                  ).format('YYYY')
                                                : ''
                                            : birthYear
                                    }
                                    onChange={(e) =>
                                        setBirthYear(e.target.value)
                                    }
                                    disabled={!isEditable}
                                    className="border-x-0 border-b-2 border-t-0 border-gray-900 bg-transparent pl-0 text-gray-900 outline-none transition duration-500 ease-out focus:border-magenta-500 focus:ring-0 disabled:brightness-50 dark:border-white dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
                {!isEditable ? (
                    <>
                        {userInfo?.customer_provider == 'google' ||
                        userInfo?.customer_provider == 'facebook' ? (
                            <></>
                        ) : (
                            <button
                                onClick={openModal}
                                className="rounded-md border-2 border-gray-900 px-5 py-1 text-gray-900 transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 dark:border-white dark:text-white"
                            >
                                Đổi mật khẩu
                            </button>
                        )}

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
                                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                                                <div className="group flex flex-nowrap overflow-hidden">
                                                    <div
                                                        className={`flex w-full max-w-full transition delay-200 duration-300 ease-out ${isForgot === 1 ? '-translate-x-full' : ''}`}
                                                    >
                                                        <div className="w-full max-w-full flex-none px-1">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                                                            >
                                                                Đổi mật khẩu
                                                            </Dialog.Title>
                                                            <div>
                                                                <p className="text-sm text-gray-400">
                                                                    Vui lòng
                                                                    nhập mật
                                                                    khẩu cũ.
                                                                </p>
                                                            </div>

                                                            <div className="mt-7 flex flex-col">
                                                                <input
                                                                    type="password"
                                                                    placeholder="*******"
                                                                    required
                                                                    value={
                                                                        oldpassword
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setOldPassword(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    autoFocus={
                                                                        false
                                                                    }
                                                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:text-white"
                                                                />
                                                            </div>
                                                            <div className="mt-5 flex justify-end space-x-3">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-rose-600 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                                    onClick={() =>
                                                                        handleIsForgot(
                                                                            -1
                                                                        )
                                                                    }
                                                                >
                                                                    Hủy
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                                    onClick={() =>
                                                                        handleIsForgot(
                                                                            1
                                                                        )
                                                                    }
                                                                >
                                                                    Tiếp theo
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`w-full max-w-full flex-none px-1 ${isForgot === 1 ? '' : 'hidden'}`}
                                                        >
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                                                            >
                                                                Nhập mật khẩu
                                                                mới
                                                            </Dialog.Title>
                                                            <div>
                                                                <p className="text-sm text-gray-400">
                                                                    Vui lòng
                                                                    nhập mật
                                                                    khẩu mới
                                                                </p>
                                                            </div>

                                                            <div className="mt-7 flex flex-col space-y-3">
                                                                <input
                                                                    type="password"
                                                                    placeholder="Mật khẩu mới"
                                                                    required
                                                                    value={
                                                                        password
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setPassword(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    autoFocus={
                                                                        false
                                                                    }
                                                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:text-white"
                                                                />
                                                                <input
                                                                    type="password"
                                                                    placeholder="Xác nhận"
                                                                    required
                                                                    value={
                                                                        repassword
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setRepassword(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    autoFocus={
                                                                        false
                                                                    }
                                                                    className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-white bg-transparent pl-0 text-gray-900 transition duration-500 ease-out placeholder:text-gray-400 focus:border-b-magenta-500 focus:ring-0 dark:text-white"
                                                                />
                                                            </div>
                                                            <div className="mt-5 flex justify-end space-x-3">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-rose-600 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                                    onClick={() =>
                                                                        handleIsForgot(
                                                                            -1
                                                                        )
                                                                    }
                                                                >
                                                                    Hủy
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center border-2 border-white px-4 py-2 text-sm font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-white"
                                                                    onClick={() =>
                                                                        changePassword()
                                                                    }
                                                                >
                                                                    Đổi mật khẩu
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
                        <button
                            onClick={() => setIsEditable(true)}
                            className="rounded-md border-2 border-gray-900 px-5 py-1 text-gray-900 transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 dark:border-white dark:text-white"
                        >
                            Chỉnh sửa
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditable(false)}
                            className="rounded-md border-2 border-gray-900 px-5 py-1 text-gray-900 transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 dark:border-white dark:text-white"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={() => onEditInfo()}
                            className="rounded-md border-2 border-gray-900 px-5 py-1 text-gray-900 transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 dark:border-white dark:text-white"
                        >
                            Lưu thay đổi
                        </button>
                    </>
                )}
            </div>
        </Tab.Panel>
    );
}
