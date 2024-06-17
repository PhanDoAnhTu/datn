import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import ForgotPassword from './ForgotPassword';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        const id = toast.loading("Đang kiểm tra thông tin...")
        try {
            const dataLogin = await dispatch(
                onLogin({ customer_email: email, customer_password: password })
            );
            // console.log(dataLogin)
            if (dataLogin?.payload?.status === (200 || 201)) {
                navigate(redirect);
                toast.update(id, {
                    render: "Đăng nhập thành công",
                    type: "success",
                    isLoading: false,
                    closeOnClick: true,
                    autoClose: 3000,
                });
            } else {
                toast.update(id, {
                    render: "Đăng nhập không thành công",
                    type: "error",
                    isLoading: false,
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }

        } catch (err) {
            toast.update(id, {
                render: "Đăng nhập không thành công",
                type: "error",
                isLoading: false,
                closeOnClick: true,
                autoClose: 3000,
            });
        }
    };
    const LoginWithFacabook = async () => {
        try {
            toast.loading("Vui lòng chờ...")
            window.open(
                `http://localhost:5000/api/social-authentication/facebook`,
                '_self'
            );
        } catch (err) {
            toast.error(err?.data?.message || err);
        }
    };
    const LoginWithGoogle = async () => {
        try {
            toast.loading("Vui lòng chờ...")
            window.open(
                `http://localhost:5000/api/social-authentication/google`,
                '_self'
            );
        } catch (err) {
            toast.error(err?.data?.message || err);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 md:py-64 md:pt-32 lg:px-8 ">
                <div className="self-center bg-zinc-900/50 pb-12 max-sm:w-full max-sm:px-12 sm:w-3/6">
                    <div className="sm:mx-auto sm:w-full sm:max-w-screen-xl">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 max-sm:text-xl dark:text-white">
                            Đăng nhập vào tài khoản của bạn
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                            className="space-y-6"
                            onSubmit={submitHandler}
                            method="POST"
                        >
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="off"
                                    placeholder="Email"
                                    required
                                    className="block w-full border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent py-1.5 pl-0 text-gray-900 shadow-sm outline-none ring-0 transition duration-200 ease-out placeholder:font-semibold placeholder:text-gray-300 focus:border-magenta-500 focus:ring-0 sm:text-sm sm:leading-6 dark:border-white dark:text-white"
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="off"
                                    placeholder="*******"
                                    required
                                    className="mt-3 block w-full border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent py-1.5 pl-0 text-gray-900 shadow-sm outline-none ring-0 transition duration-200 ease-out placeholder:font-semibold placeholder:text-gray-300 focus:border-magenta-500 focus:ring-0 sm:text-sm sm:leading-6 dark:border-white dark:text-white"
                                />
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            className="rounded-sm border-gray-300 transition duration-200 ease-out checked:text-xanthous-500 focus:ring-xanthous-400 focus:ring-offset-0"
                                        />
                                        <p className="font-bold max-sm:text-xs dark:text-white">
                                            Nhớ tôi
                                        </p>
                                    </div>
                                    <ForgotPassword />
                                </div>
                            </div>

                            <div>
                                <button
                                    // disabled={isLoading}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-magenta-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-200 ease-out hover:bg-magenta-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {/* {isLoading ? 'Signing In...' : 'Sign In'} */}
                                    Đăng nhập
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500 dark:text-stone-200">
                            Chưa là thành viên?{' '}
                            <Link
                                to="/dang-ky"
                                className="font-bold leading-6 text-magenta-500 hover:text-magenta-600"
                            >
                                Đăng ký ngay
                            </Link>
                        </p>
                        <div className="flex flex-col justify-center space-y-1 pt-7">
                            <span className="text-center text-sm text-gray-500 dark:text-stone-200">
                                Hoặc đăng nhập bằng
                            </span>
                            <div className="flex w-full flex-col space-y-2">
                                <button
                                    className="flex items-center justify-center space-x-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold transition duration-200 ease-out"
                                    onClick={() => LoginWithFacabook()}
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebookF}
                                        className="h-4 w-4 text-white"
                                    />
                                    <span className="text-white">Facebook</span>
                                </button>
                                <button
                                    className="flex items-center justify-center space-x-1 rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold transition duration-200 ease-out"
                                    onClick={() => LoginWithGoogle()}
                                >
                                    <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="h-4 w-4 text-white"
                                    />
                                    <span className="text-white">Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
