import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ProductSingle from '../../components/frontend/ProductSingle';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DocumentTitle from '../../components/frontend/DocumentTitle';

export default function Search() {
    const navigate = useNavigate();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const { keyword } = useParams();
    const searchRef = useRef(null);
    const [products, setProducts] = useState(null);

    const { all_products } = useSelector((state) => state.productReducer);
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchRef.current.value === '') {
            toast.error('Vui lòng cung cấp từ khóa để tìm kiếm');
            return;
        }
        navigate(`/tim-kiem-san-pham/${searchRef.current?.value}`, {
            replace: true,
        });
    };
    useEffect(() => {
        setProducts(
            all_products
                ?.slice()
                .filter((item) =>
                    item.product_name
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                )
        );
    }, [keyword]);

    return (
        <div className="pb-7 pt-10 sm:px-10 md:pt-24">
            <DocumentTitle title="Trang  tìm kiếm" />

            <form
                className="flex w-full space-x-2 px-10"
                method="post"
                onSubmit={handleSearch}
            >
                <input
                    defaultValue={keyword}
                    ref={searchRef}
                    className="w-full border-2 border-gray-900 bg-transparent text-lg text-gray-900 outline-none ring-0 transition duration-500 ease-out focus:border-magenta-500 focus:bg-gray-400/50 focus:ring-0 dark:border-white dark:text-white dark:focus:bg-zinc-900/50"
                />
                <button
                    type="submit"
                    className="rounded-md px-1 text-sm text-gray-900 transition duration-500 ease-out hover:text-magenta-500 dark:text-white"
                >
                    <MagnifyingGlassIcon
                        className="h-10 w-10"
                        aria-hidden="true"
                    />
                </button>
            </form>
            <div className="mt-5 grid grid-cols-2 gap-4 px-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {products && products?.length > 0 ? (
                    products.map((product, index) => (
                        <ProductSingle key={index} product={product} />
                    ))
                ) : (
                    <div className="col-span-full pb-44 text-center align-middle text-xl font-bold tracking-wide text-gray-900 dark:text-white">
                        Không có sản phẩm khớp với thông tin tìm kiếm!
                    </div>
                )}
            </div>
        </div>
    );
}
