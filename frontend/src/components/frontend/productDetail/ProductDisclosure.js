import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function ProductDisclosure() {
  return (
    <div className="w-full ">
      <div className="mx-auto w-full max-w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between  border-b border-t border-stone-600 px-4 py-5 text-left text-sm font-medium focus:outline-none focus-visible:ring dark:text-white ">
                <span>PRODUCT DESCRIPTION</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white transition duration-200 ease-out`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 dark:text-stone-300">
                  If you're unhappy with your purchase for any reason, email us
                  within 90 days and we'll refund you in full, no questions
                  asked.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between  border-b border-t border-stone-600 px-4 py-5 text-left text-sm font-medium focus:outline-none focus-visible:ring dark:text-white ">
                <span>PRODUCT FEATURES</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white transition duration-200 ease-out`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 dark:text-stone-300">
                  If you're unhappy with your purchase for any reason, email us
                  within 90 days and we'll refund you in full, no questions
                  asked.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
