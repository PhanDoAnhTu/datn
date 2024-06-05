import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSliderByActive } from '../../../store/actions/slider-actions';
export default function Banner() {
    const ExecuteScripta = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const dispatch = useDispatch();
    const { slider } = useSelector((state) => state.sliderReducer);
    useEffect(() => {
        if (!slider) dispatch(getSliderByActive({ slider_is_active: true }));
        console.log(slider);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slider]);
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
                {slider?.map((item, index) => {
                    const image = item.slider_image;
                    return (
                        <div
                            key={index}
                            style={{ backgroundImage: `url(${image})` }}
                            className={`w-full bg-cover bg-center bg-no-repeat pb-52 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40`}
                        >
                            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                                <div className="sm:max-w-lg">
                                    <h1 className="text-left text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                        {item.slider_summary}
                                    </h1>
                                    <p className="mt-4 text-left text-xl text-gray-500 dark:text-gray-300">
                                        {item.slider_description}
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
                    );
                })}
            </Carousel>
        </div>
    );
}
