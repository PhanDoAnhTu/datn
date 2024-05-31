import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
export default function Banner() {
    const ExecuteScripta = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };
    return (
        <div>
            <Carousel
                className="relative"
                infiniteLoop
                autoPlay={true}
                interval={5000}
                showArrows={false}
                showStatus={false}
            >
                <div className="w-full bg-[url('https://fjallraven.com.au/cdn/shop/products/Mood_FW22_DanielBlom_Daypacks_7038_EXP_2025-08-01_1100x.jpg?v=1702939051')] bg-cover bg-center bg-no-repeat pb-52 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="text-left text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                Summer styles are finally here
                            </h1>
                            <p className="mt-4 text-left text-xl text-gray-500 dark:text-gray-300">
                                This year, our new summer collection will
                                shelter you from the harsh elements of Link
                                world that doesn&apos;t care if you live or die.
                            </p>
                        </div>

                        <div>
                            <div className="mt-10 text-left">
                                {/* Decorative image grid */}

                                <Link
                                    id="divElem"
                                    onClick={ExecuteScripta}
                                    className="z-10 inline-block rounded-md border border-transparent bg-magenta-500 px-8 py-3 text-center font-medium text-white transition duration-200 ease-out hover:-translate-y-1 hover:bg-magenta-400"
                                >
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[url('https://mtngear.com/media//wysiwyg/brands/fjallraven/fjallraven_banner_try1_paint.jpg')] bg-cover bg-center bg-no-repeat pb-52 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="text-left text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                Summer styles are finally here
                            </h1>
                            <p className="mt-4 text-left text-xl text-gray-500 dark:text-gray-300">
                                This year, our new summer collection will
                                shelter you from the harsh elements of Link
                                world that doesn&apos;t care if you live or die.
                            </p>
                        </div>

                        <div>
                            <div className="mt-10 text-left">
                                {/* Decorative image grid */}

                                <Link
                                    id="divElem"
                                    onClick={ExecuteScripta}
                                    className="z-10 inline-block rounded-md border border-transparent bg-magenta-500 px-8 py-3 text-center font-medium text-white transition duration-200 ease-out hover:-translate-y-1 hover:bg-magenta-400"
                                >
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[url('https://trekandmountain.com/wp-content/uploads/2017/08/Fjallraven-1000x400px-1000x400.jpg')] bg-cover bg-center bg-no-repeat pb-52 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 className="text-left text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                Summer styles are finally here
                            </h1>
                            <p className="mt-4 text-left text-xl text-gray-500 dark:text-gray-300">
                                This year, our new summer collection will
                                shelter you from the harsh elements of Link
                                world that doesn&apos;t care if you live or die.
                            </p>
                        </div>

                        <div>
                            <div className="mt-10 text-left">
                                {/* Decorative image grid */}

                                <Link
                                    id="divElem"
                                    onClick={ExecuteScripta}
                                    className="z-10 inline-block rounded-md border border-transparent bg-magenta-500 px-8 py-3 text-center font-medium text-white transition duration-200 ease-out hover:-translate-y-1 hover:bg-magenta-400"
                                >
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
