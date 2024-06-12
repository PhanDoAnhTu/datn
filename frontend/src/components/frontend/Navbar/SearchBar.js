import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import classNames from '../../../helpers/classNames';
import { useNavigate } from 'react-router';
export default function SearchBar({ Button }) {
    const searchInput = useRef(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = (e) => {
        e.preventDefault();
        if (input) {
            searchInput.current.blur();
            navigate(`/tim-kiem-san-pham/${input}`);
            setInput('');
            setOpen(false);
        } else {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setInput('');
        setOpen(false);
    };
    return (
        <div className={`flex items-center px-1 lg:ml-4`}>
            <button
                className={classNames(
                    !open
                        ? 'delay-400 mx-1 opacity-0'
                        : 'mx-1 opacity-100 delay-300',
                    ' transition-opacity duration-200 ease-out  max-lg:hidden'
                )}
                disabled={!open}
                onClick={handleClose}
            >
                <XMarkIcon
                    className="h-4 w-4 text-gray-500 transition-colors duration-200 ease-out hover:text-gray-800 dark:text-white dark:hover:text-gray-500"
                    aria-hidden="true"
                />
            </button>
            <form onSubmit={handleOpen} method="post">
                <input
                    type="text"
                    ref={searchInput}
                    placeholder="Type here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={`h-8 bg-transparent outline-none transition-all duration-200 ease-out placeholder:italic placeholder:text-gray-500 focus:border-xanthous-500 focus:ring-xanthous-500 max-lg:hidden dark:text-white dark:placeholder:text-gray-200 ${open ? 'pointer-events-auto w-44 border-b border-gray-900 delay-200 dark:border-white' : 'pointer-events-none w-0 border-none'} delay-200 duration-700 ease-in-out`}
                />
            </form>

            <div
                className={`flex w-fit  overflow-hidden transition-colors duration-200 max-lg:hidden `}
                onClick={handleOpen}
            >
                {Button}
            </div>
        </div>
    );
}
