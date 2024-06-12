import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { products } from '../../test/products';
import ProductSingle from '../../components/frontend/ProductSingle';

export default function Search() {
    const navigate = useNavigate();
    const params = useParams();
    const [keyword, setKeyword] = useState('');
    useEffect(() => {
        setKeyword(params.keyword);
    }, [params]);
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword === '') {
            alert('please give us some infos to find');
            return;
        }
        navigate(`/tim-kiem-san-pham/${keyword}`);
    };
    return (
        <div className=" pb-7 pt-10 sm:px-10 md:pt-24">
            <form
                className="flex w-full space-x-2 px-10"
                method="post"
                onSubmit={handleSearch}
            >
                <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full border-2 border-white bg-transparent text-lg text-gray-900 outline-none ring-0 transition duration-500 ease-out focus:border-magenta-500 focus:bg-zinc-900/50 focus:ring-0 dark:text-white"
                />
                <button
                    type="submit"
                    className="rounded-md px-1 text-sm text-white transition duration-500 ease-out hover:text-magenta-500"
                >
                    <MagnifyingGlassIcon
                        className="h-10 w-10"
                        aria-hidden="true"
                    />
                </button>
            </form>
            <div className="mt-5 grid grid-cols-2 px-4 text-white max-sm:gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {products.map((product, index) => (
                    <ProductSingle key={index} product={product} />
                ))}
            </div>
        </div>
    );
}
