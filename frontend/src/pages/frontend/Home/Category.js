export default function CategorySection() {
    return (
        <div className="">
            <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-16 max-sm:grid-rows-2 sm:px-6 sm:py-16 md:grid-cols-2 lg:gap-8 lg:px-8 ">
                <div className="overflow-hidden rounded-xl bg-gray-500 text-white shadow-md">
                    <div className="relative">
                        <img
                            className="h-auto max-w-full object-cover"
                            src="https://www.fjallraven.com/4932a5/globalassets/fjallraven/eu/startpage/ss24/w-10/row_new-arrivals_dt_1.jpg?width=960&mode=Min&bgcolor=fff&quality=100"
                            alt="test"
                        />
                        <div className="absolute bottom-0 m-4 grid grid-rows-2">
                            <h1 className="text-2xl font-bold text-white lg:text-3xl">
                                Title
                            </h1>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="overflow-hidden rounded bg-white px-5 py-4 text-sm font-bold text-gray-800 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 lg:px-6 lg:py-5 lg:text-sm">
                                    Button 1
                                </button>
                                <button className="overflow-hidden rounded bg-white px-5 py-4 text-sm font-bold text-gray-800 shadow-md  transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 lg:px-6 lg:py-5 lg:text-sm">
                                    Button 2
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden rounded-xl bg-gray-500 text-white shadow-md">
                    <div className="relative">
                        <img
                            className="h-auto max-w-full object-cover"
                            src="https://www.fjallraven.com/4932a5/globalassets/fjallraven/eu/startpage/ss24/w-10/row_shells_dt_1.jpg?width=960&mode=Min&bgcolor=fff&quality=100"
                            alt="test"
                        />
                        <div className="absolute bottom-0 m-4 grid grid-rows-2">
                            <h1 className="text-2xl font-bold text-white lg:text-3xl">
                                Title
                            </h1>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="overflow-hidden rounded bg-white px-5 py-4 text-sm font-bold text-gray-800 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 lg:px-6 lg:py-5 lg:text-sm">
                                    Button 1
                                </button>
                                <button className="overflow-hidden rounded bg-white px-5 py-4 text-sm font-bold text-gray-800 shadow-md  transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 lg:px-6 lg:py-5 lg:text-sm">
                                    Button 2
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
