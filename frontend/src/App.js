import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layouts/LayoutSite/Header';
import Footer from './layouts/LayoutSite/Footer';
import { ToastContainer } from 'react-toastify';
// import { useEffect, useState } from 'react';

const App = () => {
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
        </main>
    );
};

export default App;
