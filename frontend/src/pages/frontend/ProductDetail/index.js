import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import classNames from '../../../helpers/classNames';
import { Link, useParams } from 'react-router-dom';
import ProductList from '../../../components/frontend/ProductList';
import { products } from '../../../test/products';
import {
    productById,
    listImageByProductId,
    getSpecialOfferBySpuId,
    addToCart,
    removeFromWishList,
    addToWishList,
} from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from '../../../utils';

const product = {
    to: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', to: '#' },
        { id: 2, name: 'Clothing', to: '#' },
    ],
};

const reviews = { to: '#', average: 4, totalCount: 117 };
export default function ProductDetail() {
    const { product_slug_id } = useParams();
    const dispatch = useDispatch();

    const product_id = product_slug_id.split('-').pop();
    const { userInfo } = useSelector((state) => state.userReducer);
    const [favories_products, setfavoriesProduct] = useState(
        getFavoritesFromLocalStorage()
    );

    const [variations, setVariations] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState(
        variations.length === 1 ? [0] : [0, 0]
    );
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [product_detail, setProductDetail] = useState(null);
    const [product_images, setProductImages] = useState(null);
    const [selected_sku, setSelectedSku] = useState(null);
    const [spicial_offer, setSpicial_offer] = useState(null);
    const [sale_sku, setSale_sku] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const getProductDetail = async () => {
        const response = await dispatch(productById({ spu_id: product_id }));
        response && setProductDetail(response.payload.metaData)
        const fetch_spicial_offer = await dispatch(getSpecialOfferBySpuId({ spu_id: product_id }))
        fetch_spicial_offer && setSpicial_offer(fetch_spicial_offer.payload.metaData)
    }
    const getPhotosByProductDetail = async () => {
        const response = await dispatch(listImageByProductId(product_id));
        response && setProductImages(response.payload.metaData)
    }


    /////////////////////////////
    useEffect(() => {
        if (!product_detail) {
            getProductDetail();
        }
    }, [product_id, product_detail]);
    /////////////
    useEffect(() => {
        if (product_detail) {
            setVariations(product_detail.spu_info.product_variations);
            setName(product_detail.spu_info.product_name);
            setDescription(product_detail.spu_info.product_description);
        }
    }, [product_id, product_detail]);

    useEffect(() => {
        if (!product_images) {
            getPhotosByProductDetail();
        }
    }, [product_id, product_images]);

    /////////selected variation
    const handleVariationChange = (value, variationOrder) => {
        setSelectedVariation((s) => {
            const newArray = s.slice();
            newArray[variationOrder] = value;
            return newArray;
        });
    };
    useEffect(() => {
        if (product_detail) {
            const filteredSKU = product_detail.sku_list
                ? product_detail.sku_list.find(
                    (item) =>
                        item.sku_tier_idx.toString() ===
                        selectedVariation.toString()
                )
                : null;
            if (filteredSKU != null) {
                setPrice(filteredSKU.sku_price);
                setStock(filteredSKU.sku_stock);
                setSelectedImage(
                    product_images &&
                    product_images.find(
                        (item) =>
                            item.sku_id.toString() ===
                            filteredSKU._id.toString()
                    )
                );
                spicial_offer &&
                    spicial_offer.special_offer_spu_list.filter((product) => {
                        if (
                            product.product_id.toString() ===
                            product_detail.spu_info._id.toString()
                        ) {
                            return product.sku_list.filter((sku) => {
                                if (
                                    sku.sku_id.toString() ===
                                    filteredSKU._id.toString()
                                ) {
                                    setSale_sku(sku);
                                    return;
                                }
                            });
                        }
                    });
                console.log('filteredSKU', filteredSKU);
                console.log('pricesale', sale_sku);
            }
        }
    }, [
        product_id,
        selectedVariation,
        product_detail,
        product_images,
        spicial_offer,
        sale_sku,
    ]);

    const HandleImageChoose = (e) => {
        setSelectedImage(e);
    };
    console.log('selectedVariation', selectedVariation);

    useEffect(() => {
        setSelectedSku(
            product_detail
                ? product_detail.sku_list.find(
                    (item) =>
                        item.sku_tier_idx.toString() ===
                        selectedVariation.toString()
                )
                : null
        );
    }, [product_detail, selectedVariation]);

    ////////////quantity
    const handleDecrement = async (quantity) => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleIncrement = async (quantity, stock) => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    ////addtoCart
    const handleAddToCart = async (userId, { productId, sku_id, quantity }) => {
        if (quantity <= stock) {
            // console.log('selected_sku', sku_id + productId + sku_id)
            await dispatch(
                addToCart({
                    userId: userId,
                    product: {
                        productId: productId,
                        sku_id: sku_id,
                        quantity: quantity,
                    },
                })
            );
            toast.success('Đã thêm sản phẩm vào giỏ hàng!');
            // addCartItemToLocalStorage({
            //     productId: productId,
            //     sku_id: sku_id,
            //     quantity: quantity
            // })
        }
    };
    ////////////////wishList
    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(
            addToWishList({
                userId: userId,
                productId: productId,
            })
        );
        await addFavoriteToLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        toast.success('Đã thêm sản phẩm vào mục yêu thích!');
    };

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        await dispatch(
            removeFromWishList({
                userId: userId,
                productId: productId,
            })
        );
        await removeFavoriteFromLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        toast.success('Đã xóa sản phẩm ra khỏi mục yêu thích!');
    };
    return (
        <div className="bg-transparent pt-10 md:pt-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <Link
                                        to={breadcrumb.to}
                                        className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {breadcrumb.name}
                                    </Link>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <Link
                                to={product.to}
                                aria-current="page"
                                className="font-medium text-gray-500 transition duration-200 ease-out hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                            >
                                {product.name}
                            </Link>
                        </li>
                    </ol>
                </nav>
                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
                    <div className="flex flex-col-reverse lg:col-span-2 lg:h-square lg:flex-row lg:space-x-5 lg:border-r lg:border-gray-200 lg:pr-8 dark:lg:border-stone-700">
                        <div className="no-scrollbar flex w-full flex-row overflow-hidden max-lg:mt-3 max-lg:space-x-3 max-lg:overflow-x-scroll max-lg:pb-1 lg:w-44 lg:flex-col lg:space-y-3 lg:overflow-y-scroll">
                            {product_images &&
                                product_images.map((item, index) => (
                                    <button
                                        onClick={() => HandleImageChoose(item)}
                                        key={index}
                                        className="h-36 w-24 flex-shrink-0 sm:overflow-hidden sm:rounded-lg lg:w-full"
                                    >
                                        <img
                                            src={item.thumb_url}
                                            alt={item.thumb_url}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </button>
                                ))}
                        </div>
                        <div className="w-full sm:overflow-hidden sm:rounded-lg">
                            <img
                                src={selectedImage && selectedImage.thumb_url}
                                alt={selectedImage && selectedImage.thumb_url}
                                className="h-full w-full object-fill object-center"
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                            {name}
                        </h1>
                        <p className="mt-6 text-3xl tracking-tight text-gray-900 dark:text-gray-200">
                            <NumericFormat
                                value={sale_sku ? sale_sku.price_sale : price}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={0}
                                id="price"
                                suffix={'đ'}
                            />
                            &emsp;
                            {sale_sku && (
                                <span className="rounded-full bg-red-100 px-5 py-2 text-xs font-medium  text-red-800 dark:bg-red-900 dark:text-red-300">
                                    Giảm {sale_sku.percentage}%
                                </span>
                            )}
                        </p>

                        <p className="text-2xl tracking-tight text-gray-900 line-through decoration-rose-700 dark:text-gray-200">
                            <NumericFormat
                                value={sale_sku && price}
                                displayType={'text'}
                                thousandSeparator={true}
                                decimalScale={0}
                                id="price"
                                suffix={'đ'}
                            />
                        </p>
                        {/* Reviews */}
                        <div className="">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                reviews.average > rating
                                                    ? 'text-xanthous-500'
                                                    : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">
                                    {reviews.average} out of 5 stars
                                </p>
                                <Link
                                    to={reviews.to}
                                    className="ml-3 text-sm font-medium text-xanthous-500 hover:text-xanthous-600"
                                >
                                    {reviews.totalCount} reviews
                                </Link>
                            </div>
                        </div>
                        <div
                            className="fb-like mt-2"
                            data-href="https://developers.facebook.com/docs/plugins/"
                            data-width=""
                            data-layout=""
                            data-action=""
                            data-size=""
                            data-share="true"
                        ></div>
                        <div className="mt-10">
                            {variations.map((item, index) => (
                                <div key={index}>
                                    <div className="mt-10" key={index}>
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                                                {item.name}
                                            </h3>
                                        </div>

                                        <RadioGroup
                                            value={selectedVariation[index]}
                                            onChange={(value) =>
                                                handleVariationChange(
                                                    value,
                                                    index
                                                )
                                            }
                                            className="mt-4"
                                        >
                                            <RadioGroup.Label className="sr-only">
                                                Choose Link size
                                            </RadioGroup.Label>
                                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                {item.options.map(
                                                    (option, subindex) => (
                                                        <RadioGroup.Option
                                                            key={option}
                                                            value={subindex}
                                                            className={({
                                                                active,
                                                            }) =>
                                                                classNames(
                                                                    item
                                                                        ? 'cursor-pointer bg-gray-200 text-gray-900 shadow-sm dark:bg-stone-400 dark:text-white'
                                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200 dark:bg-stone-300',
                                                                    active
                                                                        ? 'ring-2 ring-xanthous-400'
                                                                        : '',
                                                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase transition duration-200 ease-out hover:bg-gray-400 focus:outline-none sm:flex-1 sm:py-6 dark:hover:bg-stone-500'
                                                                )
                                                            }
                                                        >
                                                            {({
                                                                active,
                                                                checked,
                                                            }) => (
                                                                <>
                                                                    <RadioGroup.Label
                                                                        as="span"
                                                                        className="pointer-events-none"
                                                                    >
                                                                        {option}
                                                                    </RadioGroup.Label>
                                                                    {/*checking if stock is 0 */}
                                                                    {item ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active
                                                                                    ? 'border'
                                                                                    : 'border-4',
                                                                                checked
                                                                                    ? 'border-xanthous-500'
                                                                                    : 'border-transparent',
                                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                        >
                                                                            <svg
                                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                viewBox="0 0 100 100"
                                                                                preserveAspectRatio="none"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <line
                                                                                    x1={
                                                                                        0
                                                                                    }
                                                                                    y1={
                                                                                        100
                                                                                    }
                                                                                    x2={
                                                                                        100
                                                                                    }
                                                                                    y2={
                                                                                        0
                                                                                    }
                                                                                    vectorEffect="non-scaling-stroke"
                                                                                />
                                                                            </svg>
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    )
                                                )}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            ))}

                            <div className=" mt-10 flex flex-col space-y-1">
                                {stock != null ? (
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        Số lượng có sẵn: {stock}
                                    </span>
                                ) : (
                                    ''
                                )}
                                <div
                                    className="inline-flex rounded-md shadow-sm"
                                    role="group"
                                >
                                    <button
                                        onClick={() =>
                                            handleDecrement(quantity)
                                        }
                                        className="rounded-s-lg border border-gray-900 bg-transparent px-2 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
                                    >
                                        -
                                    </button>

                                    <div className=" w-10 border-b border-t border-gray-900 bg-transparent p-4 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700">
                                        <span>{quantity}</span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleIncrement(quantity, stock)
                                        }
                                        className="rounded-e-lg border border-gray-900 bg-transparent px-2 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
                                    >
                                        +
                                    </button>
                                </div>

                                {product_detail && (
                                    userInfo ?
                                        (
                                            favories_products.some((p_id) => p_id === product_detail.spu_info._id) == true
                                                ?
                                                <button onClick={() => HandleRemoveFromWishList({ userId: userInfo._id, productId: product_detail.spu_info._id })} className="border-2 px-3 py-2  text-slate-50 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                                    Bỏ thích
                                                </button>
                                                :
                                                <button onClick={() => HandleAddToWishList({ userId: userInfo._id, productId: product_detail.spu_info._id })} className="border-2 px-3 py-2  text-slate-50 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                                    Thêm vào yêu thích
                                                </button>
                                        ) :
                                        (
                                            <button className="border-2  px-3 py-2  text-slate-50 font-semibold transition duration-500 ease-out hover:border-magenta-500 hover:text-magenta-500 max-sm:text-xs">
                                                Thêm vào yêu thích
                                            </button>
                                        )
                                )}

                                {product_detail &&
                                    (selected_sku ? (
                                        <button
                                            onClick={() =>
                                                handleAddToCart(userInfo._id, {
                                                    productId:
                                                        product_detail.spu_info
                                                            ._id,
                                                    sku_id: selected_sku._id,
                                                    quantity: quantity,
                                                })
                                            }
                                            className=" flex w-full items-center justify-center rounded-md border border-transparent bg-magenta-500 px-8 py-3 text-base font-medium text-white transition duration-200 ease-out hover:bg-magenta-400 focus:outline-none focus:ring-2 focus:ring-magenta-400 focus:ring-offset-2"
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    ) : (
                                        <button className=" flex w-full items-center justify-center rounded-md border border-transparent bg-magenta-500 px-8 py-3 text-base font-medium text-white transition duration-200 ease-out hover:bg-magenta-400 focus:outline-none focus:ring-2 focus:ring-magenta-400 focus:ring-offset-2">
                                            Thêm vào giỏ hàng
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-2xl space-y-4 px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 lg:pt-16">
                    <h1 className="border-b border-stone-500 py-5 text-4xl font-bold dark:text-white">
                        Mô tả sản phẩm
                    </h1>
                    <p className="text-justify dark:text-white">
                        {description}
                    </p>
                    <ProductList
                        title={'Explore more products'}
                        products={products}
                        summary={'These products are the same uses...'}
                    />
                </div>
            </div>
        </div >
    );
}
