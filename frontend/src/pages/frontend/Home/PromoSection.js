import { useNavigate } from 'react-router';

export default function PromoSection({ category }) {
    const navigate = useNavigate();
    return (
        <div>
            <div className="max-h-1/4 mx-auto gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:gap-8 lg:px-8">
                <div className="overflow-hidden rounded-xl bg-gray-500 text-white shadow-md">
                    <div className="relative h-96 max-w-full max-sm:h-72">
                        <img
                            className="h-full w-full object-cover brightness-75"
                            src={category?.category_image}
                            alt={category?.category_name}
                        />
                        <div className="absolute bottom-0 left-0 right-0 top-0 flex max-h-full justify-center">
                            <div className="relative flex flex-col items-center justify-center">
                                <h1 className="text-3xl font-bold text-white max-sm:my-1 max-sm:text-2xl lg:text-4xl">
                                    {category?.category_name}
                                </h1>
                                <h1 className="max-sm:text-md my-3 text-lg font-semibold text-white  max-sm:my-1 lg:text-xl">
                                    {category?.category_description}
                                </h1>
                                <button
                                    onClick={() =>
                                        navigate(
                                            '/san-pham-theo-danh-muc/' +
                                                category?.category_slug
                                        )
                                    }
                                    className="my-3 overflow-hidden rounded bg-white px-4 py-2 text-sm font-bold text-gray-800 shadow-md transition duration-200 ease-out hover:-translate-y-1 hover:text-xanthous-500 max-sm:my-1 lg:px-6 lg:py-5 lg:text-sm"
                                >
                                    Khám phá ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
