import { Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function GenderSelection({
    selectedGender,
    isEditable,
    setGender,
    gender,
}) {
    const people = [
        { gender: 'Nam', id: 0 },
        { gender: 'Nữ', id: 1 },
        { gender: 'Không muốn tiết lộ', id: 2 },
    ];
    const handleGenderChange = (id) => {
        setGender(id);
    };
    useEffect(() => {
        if (isEditable) {
            setGender(selectedGender);
        } else {
            setGender(0);
        }
    }, [isEditable, selectedGender, setGender]);

    return (
        <div
            className={`border-x-0 border-b-2 border-t-0 transition duration-500 ease-out dark:border-white ${isEditable ? 'border-b-black' : 'brightness-100'}`}
        >
            <Listbox
                value={isEditable ? people[gender] : people[selectedGender]}
                onChange={(e) => handleGenderChange(e.id)}
                disabled={!isEditable}
            >
                <div className="relative mt-1 ">
                    <Listbox.Button className="relative w-full cursor-default py-2 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-magenta-300 ui-disabled:brightness-100 sm:text-sm ">
                        <span className="block truncate text-gray-900 dark:text-white">
                            {people[gender]?.gender}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpIcon
                                className="h-5 w-5 text-gray-700 transition duration-200 ease-out ui-open:rotate-180 dark:text-white"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-white">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? 'bg-magenta-900    text-zinc-700'
                                                : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {person.gender}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-magenta-600">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
