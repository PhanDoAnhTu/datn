import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layouts/LayoutSite/Header';
import Footer from './layouts/LayoutSite/Footer';
import { ToastContainer } from 'react-toastify';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';

const App = () => {
    const [scrollY, setScrollY] = useState(window.scrollY);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // useEffect(() => {
    //     const darkModeMediaQuery = window.matchMedia(
    //         '(prefers-color-scheme: dark)'
    //     );

    //     const handleDarkModeChange = (event) => {
    //         setIsDarkMode(event.matches);
    //     };

    //     darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    //     setIsDarkMode(darkModeMediaQuery.matches);

    //     return () => {
    //         darkModeMediaQuery.removeEventListener(
    //             'change',
    //             handleDarkModeChange
    //         );
    //     };
    // }, []);
    return (
        <main className="dark:bg-pattern-dark bg-pattern-light">
            <ToastContainer
                // toastStyle={{
                //     backgroundColor: `${isDarkMode ? 'rgb(24 24 27)' : '#fff'}`,
                //     color: `${isDarkMode ? '#fff' : 'rgb(24 24 27)'}`,
                // }}
                autoClose={2000}
            />
            <Header />
            <Outlet />
            <Footer />
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-5 right-5"
            >
                <ArrowUpCircleIcon
                    className={`h-12 w-12 ${scrollY > 700 ? 'opacity-100' : 'opacity-0'} ${scrollY > 500 ? '' : 'hidden'} animate-bounce text-gray-900 transition duration-500 ease-out hover:text-magenta-500 dark:text-white`}
                />
            </button>
        </main>
    );
};

export default App;
