import { Link } from 'react-router-dom';

export default function CategorySection({ item }) {
    return (
        <div className="overflow-hidden rounded-xl bg-gray-500 text-white shadow-md">
            <div className="relative">
                <img
                    className="h-96 w-full max-w-full object-cover object-center brightness-75"
                    src={item.slider_image}
                    alt="test"
                />
                <div className="absolute bottom-0 m-4 grid grid-rows-2">
                    <h1 className="text-2xl font-bold text-white lg:text-3xl">
                        {item.slider_summary}
                    </h1>
                    <div className="grid w-fit grid-cols-2 gap-4">
                        <Link
                            to={item.slider_link}
                            className="overflow-hidden rounded bg-white px-5 py-4 text-center text-sm font-bold text-gray-800 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 lg:px-6 lg:py-5 lg:text-sm"
                        >
                            Duyệt ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
