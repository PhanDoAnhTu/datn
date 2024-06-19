import { Outlet } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import Header from './layouts/LayoutSite/Header';
import Footer from './layouts/LayoutSite/Footer';

import { ToastContainer } from 'react-toastify';

import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './ThemeContext';
// eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
    return (
        <ThemeProvider>
            <main className="dark:bg-pattern-dark bg-pattern-light">
                <ToastContainer
                    theme={'colored'}
                    closeOnClick={true}
                    autoClose={2000}
                    pauseOnHover={false}
                />
                <Header />
                <Outlet />
                <Footer />
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                    className="fixed bottom-5 right-5"
                >
                    <ArrowUpCircleIcon
                        className={`h-12 w-12 ${scrollY > 700 ? 'opacity-100' : 'opacity-0'} ${scrollY > 500 ? '' : 'hidden'} animate-bounce text-gray-900 transition duration-500 ease-out hover:text-magenta-500 dark:text-white`}
                    />
                </button>
            </main>
        </ThemeProvider>
    );
};

export default App;
