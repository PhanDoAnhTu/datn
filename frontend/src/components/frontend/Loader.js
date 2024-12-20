import { ReactComponent as Ring } from '../../assets/oval.svg';
import { ReactComponent as DarkLogo } from '../../assets/darklogo.svg';
import { ReactComponent as LightLogo } from '../../assets/lightlogo.svg';
import { useTheme } from '../../ThemeContext';

const Loader = () => {
    const { darkMode } = useTheme();

    return (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-1 flex-col items-center justify-center bg-white dark:bg-zinc-950">
            {!darkMode ? (
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
