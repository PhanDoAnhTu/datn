export default function ButtonWithBorder({ Title, HandleClick, className }) {
    return (
        <button
            onClick={HandleClick}
            className={`border-2 border-gray-900 text-gray-900 transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 dark:border-white dark:text-white ${className}`}
        >
            {Title}
        </button>
    );
}
