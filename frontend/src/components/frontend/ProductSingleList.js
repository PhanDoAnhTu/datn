import { Link } from 'react-router-dom';

export default function ProductSingleList({ product }) {
    return (
        <div
            key={product._id}
            className="group relative flex justify-between space-x-3 px-1 py-2"
        >
            <div className="w-36 snap-start overflow-hidden rounded-md bg-gray-200 transition-all duration-200 ease-out lg:aspect-none group-hover:opacity-75 md:w-48 lg:h-80 lg:w-56">
                <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="flex-1">
                <Link
                    to={'/test/detail/test/test'}
                    className="max-sm:text-md line-clamp-2 overflow-hidden text-ellipsis text-wrap text-xl font-bold text-gray-700 max-sm:w-44 dark:text-white"
                >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.product_name}
                </Link>
                <div className="flex max-sm:flex-col sm:space-x-1">
                    <p className="text-xl font-medium text-gray-900 max-sm:text-sm dark:text-white">
                        {product.price}000000VND
                    </p>
                    <p className="text-xl font-medium text-gray-500 line-through decoration-rose-700 max-sm:text-sm dark:text-gray-300">
                        {product.price}000000VND
                    </p>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    {product.color}
                </p>
                <p className="text-md mt-1 line-clamp-4 overflow-hidden text-ellipsis text-gray-500 dark:text-gray-100">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sed, itaque deserunt! Magnam, odit. Adipisci repellat saepe
                    sunt, delectus, eveniet quis reprehenderit quidem at ipsa
                    natus nulla, rerum voluptates alias consectetur! Odio,
                    incidunt facilis! Non omnis excepturi itaque molestias nisi,
                    aspernatur eos at fugiat, exercitationem ratione nemo hic
                    quam, officiis et. Quas officia eum repellat recusandae
                    excepturi explicabo dolorum debitis sed corporis quod
                    officiis odio, numquam nobis laboriosam aliquid velit! Quam
                    nostrum voluptates nobis reiciendis ipsam!
                </p>
            </div>
        </div>
    );
}
