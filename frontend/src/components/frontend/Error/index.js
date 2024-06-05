// components
import Logo from '../../../assets/Logo';
import { NavLink } from 'react-router-dom';

// assets

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center py-40">
            <Logo className={'h-1/2 w-1/2'} />
            <div className="flex flex-col items-center justify-center space-y-12">
                <h1 className="text-2xl font-bold  text-gray-900 md:text-3xl dark:text-white">
                    Trang này không tồn tại
                </h1>
                <div className="group relative flex items-center justify-center">
                    <div
                        className={`max-sm:text-md pointer-events-none relative z-10 px-12 py-10 text-xl font-bold text-white transition duration-300 ease-out group-hover:text-gray-900 max-sm:px-8 max-sm:py-7 dark:text-gray-900 dark:group-hover:text-white`}
                    >
                        Trở về trang chủ
                    </div>
                    <NavLink
                        to="/"
                        on
                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full border-2 bg-zinc-500 transition duration-300 ease-out group-hover:-skew-x-12 group-hover:-skew-y-6 group-hover:bg-magenta-500 dark:bg-white"
                    ></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Error;
