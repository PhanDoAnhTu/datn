import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductOption({ variation, sku_tier_idx }) {

    // console.log(variation.options[sku_tier_idx])
    const [selected, setSelected] = useState(variation.options[sku_tier_idx])
    // const [selectedOption, setSelectedOption] = useState([])
    // useEffect(() => {
    //     variation && variation.options.filter((option,index)=>{
    //         if(option.toString()===selected.toString()){
    //             setSelectedOption([...index])
    //         }
    //     })
    // }, [selected])

    const onChangeSelected = async (e, sku_tier_idx) => {
        variation.options
        console.log("sku_selected", sku_tier_idx)
        setSelected(e)
    }

    return (
        <Listbox value={selected} onChange={(e) => onChangeSelected(e, sku_tier_idx)} key={variation.name}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-5 text-white-900">{variation && variation.name}</Listbox.Label>
                    <div className="relative mt-2 ">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1 pl-2 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-5">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">{selected}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {variation.options.map((option) => (
                                    <Listbox.Option
                                        key={option}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-1 pl-2 pr-8'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {option}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
