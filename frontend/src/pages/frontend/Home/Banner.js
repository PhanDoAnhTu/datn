import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
export default function Banner({ slider }) {
    const ExecuteScripta = () => {
        window.scrollTo({
            top: 10000,
            behavior: 'smooth',
        });
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
                showThumbs={false}
            >
                {slider?.map((item, index) => {
                    const image = item.slider_image;
                    return (
                        <div
                            key={index}
                            className={`group relative w-full pb-52 pt-16 hover:bg-opacity-50 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40`}
                        >
                            <img
                                src={image}
                                className="absolute left-0 top-0 h-full w-full object-cover object-center brightness-75 transition duration-300 ease-out"
                            />
                            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="p-1 sm:max-w-lg">
                                    <h1 className="text-left text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                        {item.slider_summary}
                                    </h1>
                                    <p className="mt-4 text-left text-xl text-gray-300">
                                        {item.slider_description}
                                    </p>
                                </div>

                                <div className="relative">
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
                    );
                })}
            </Carousel>
        </div>
    );
}
