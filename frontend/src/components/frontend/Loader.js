import { ReactComponent as Ring } from '../../assets/oval.svg';
import { ReactComponent as DarkLogo } from '../../assets/darklogo.svg';
import { ReactComponent as LightLogo } from '../../assets/lightlogo.svg';
import { useEffect, useState } from 'react';

const Loader = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        const handleDarkModeChange = (event) => {
            setIsDarkMode(event.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
        setIsDarkMode(darkModeMediaQuery.matches);

        return () => {
            darkModeMediaQuery.removeEventListener(
                'change',
                handleDarkModeChange
            );
        };
    }, []);

    return (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-1 flex-col items-center justify-center bg-white dark:bg-zinc-950">
            {!isDarkMode ? (
                <DarkLogo className="h-[150px] w-[150px]" />
            ) : (
                <LightLogo className="h-[150px] w-[150px]" />
            )}
            <div className="relative flex h-[50px] w-[50px] text-gray-900 dark:text-white">
                <Ring />
            </div>
        </div>
    );
};

export default Loader;
