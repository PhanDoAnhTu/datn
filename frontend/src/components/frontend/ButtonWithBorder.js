export default function ButtonWithBorder({ Title, HandleClick, className }) {
    return (
        <button
            onClick={HandleClick}
            className={`rounded-md border-2 border-magenta-500 bg-magenta-500 text-white shadow-md ring-magenta-500 transition duration-500 ease-out hover:border-magenta-500 ${className}`}
        >
            {Title}
        </button>
    );
}
