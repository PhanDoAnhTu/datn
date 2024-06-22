import { Outlet } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import Header from './layouts/LayoutSite/Header';
import Footer from './layouts/LayoutSite/Footer';

import { ToastContainer } from 'react-toastify';

import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { useProductDetail } from './ProductModalContext';
import { Dialog, Transition } from '@headlessui/react';
import ProductModal from './components/frontend/ProductModal';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from './ThemeContext';
// eslint-disable-next-line no-unused-vars
// import { useEffect, useState } from 'react';

const App = () => {
    const [scrollY, setScrollY] = useState(window.scrollY);
    const { darkMode } = useTheme();
    // eslint-disable-next-line no-unused-vars
    const { isModalOpen, product_id, openModal, closeModal } =
        useProductDetail();
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
        <SkeletonTheme
            baseColor={`${darkMode ? '#333333' : '#e4e4e7'}`}
            highlightColor={`${darkMode ? '#666666' : '#ccc'}`}
        >
            <main className="dark:bg-pattern-dark bg-pattern-light">
                <ToastContainer
                    theme={'colored'}
                    closeOnClick={true}
                    autoClose={2000}
                    pauseOnHover={false}
                />
                <Header />
                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() => closeModal()}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/50" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-60 pt-20 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="no-scrollbar h-1/2square w-full max-w-full transform overflow-y-scroll rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900">
                                        <div className="group">
                                            <ProductModal />
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
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
        </SkeletonTheme>
    );
};

export default App;
