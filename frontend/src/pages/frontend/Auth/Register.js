import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onSignup } from '../../../store/actions';
import { toast } from 'react-toastify';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.userReducer);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Mật khẩu không trùng');
        } else {
            try {
                await dispatch(
                    onSignup({
                        customer_email: email,
                        customer_password: password,
                        customer_name: username,
                    })
                );
                navigate("/xac-nhan");
                toast.info('Vui lòng xác nhận email này');
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err);
            }
        }
    };
    return (
        <>
                            <DocumentTitle title="Đăng ký" />

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 md:py-64 md:pt-32 lg:px-8">
                <div className="self-center rounded-md bg-white/75 pb-12 shadow-md max-sm:w-full max-sm:px-12 sm:w-3/6 dark:bg-zinc-800">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white ">
                            Đăng ký ngay để nhận những lợi ích
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="space-y-6"
                            onSubmit={submitHandler}
                            method="POST"
                        >
                            <div className="mt-2">
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        autoComplete="email"
                                        placeholder="Email"
                                        required
                                        className="block w-full border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent py-1.5 pl-0 text-gray-900 shadow-sm outline-none ring-0 transition duration-200 ease-out placeholder:font-semibold placeholder:text-gray-300 focus:border-magenta-500 focus:ring-0 sm:text-sm sm:leading-6 dark:border-white dark:text-white"
                                    />
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        autoComplete="username"
                                        placeholder="Username"
                                        required
                                        className="block w-full border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent py-1.5 pl-0 text-gray-900 shadow-sm outline-none ring-0 transition duration-200 ease-out placeholder:font-semibold placeholder:text-gray-300 focus:border-magenta-500 focus:ring-0 sm:text-sm sm:leading-6 dark:border-white dark:text-white"
                                    />
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        autoComplete="current-password"
                                        placeholder="Mật khẩu"
                                        required
                                        className="block w-full border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent py-1.5 pl-0 text-gray-900 shadow-sm outline-none ring-0 transition duration-200 ease-out placeholder:font-semibold placeholder:text-gray-300 focus:border-magenta-500 focus:ring-0 sm:text-sm sm:leading-6 dark:border-white dark:text-white"
                                    />
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="repassword"
                                        name="repassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        autoComplete="current-password"
                                        placeholder="Nhập lại mật khẩu"
                                        required
                                        className="block w-full border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent py-1.5 pl-0 text-gray-900 shadow-sm outline-none ring-0 transition duration-200 ease-out placeholder:font-semibold placeholder:text-gray-300 focus:border-magenta-500 focus:ring-0 sm:text-sm sm:leading-6 dark:border-white dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    // disabled={isLoading}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-magenta-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-200 ease-out hover:bg-magenta-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {/* {isLoading ? 'Registering...' : 'Register'} */}
                                    Đăng ký
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500 dark:text-stone-200">
                            Đã là thành viên?{' '}
                            <Link
                                to="/dang-nhap"
                                className="font-bold leading-6 text-magenta-500 hover:text-magenta-600"
                            >
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
