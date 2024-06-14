import { Link } from 'react-router-dom';

export default function CategorySection() {
    return (
        <div className="">
            <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-8 max-sm:grid-rows-2 sm:px-6 sm:py-8 md:grid-cols-2 lg:gap-8 lg:px-8 ">
                <div className="overflow-hidden rounded-xl bg-gray-500 text-white shadow-md">
                    <div className="relative">
                        <img
                            className="h-96 w-full max-w-full object-cover object-center brightness-90"
                            src="https://www.fjallraven.com/4932a5/globalassets/fjallraven/eu/startpage/ss24/w-10/row_new-arrivals_dt_1.jpg?width=960&mode=Min&bgcolor=fff&quality=100"
                            alt="test"
                        />
                        <div className="absolute bottom-0 m-4 grid grid-rows-2">
                            <h1 className="text-2xl font-bold text-white lg:text-3xl">
                                Thời trang cho phái mạnh
                            </h1>
                            <div className="grid w-fit grid-cols-2 gap-4">
                                <Link
                                    to={`/san-pham-theo-danh-muc/nam/665f2c582cc3fc5cc87b6536/ao-thun`}
                                    className="overflow-hidden rounded bg-white px-5 py-4 text-center text-sm font-bold text-gray-800 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 lg:px-6 lg:py-5 lg:text-sm"
                                >
                                    Duyệt ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden rounded-xl bg-gray-500 text-white shadow-md">
                    <div className="relative">
                        <img
                            className="h-96 w-full max-w-full object-cover object-center brightness-90"
                            src="https://www.fjellsport.no/assets/blobs/fjallraven-women-s-expedition-down-lite-jacket-56fc04ee27.jpeg?preset=tiny&dpr=2"
                            alt="test"
                        />
                        <div className="absolute bottom-0 m-4 grid grid-rows-2">
                            <h1 className="text-2xl font-bold text-white lg:text-3xl">
                                Thời trang cho phái đẹp
                            </h1>
                            <div className="grid w-fit grid-cols-2 gap-4">
                                <Link
                                    to={`/san-pham-theo-danh-muc/nu/665f18fe2cc3fc5cc87b64f4/ao-thun`}
                                    className="overflow-hidden rounded bg-white px-5 py-4 text-center text-sm font-bold text-gray-800 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 lg:px-6 lg:py-5 lg:text-sm"
                                >
                                    Duyệt ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
