import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon, StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import classNames from '../../../helpers/classNames';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeartSlashIcon from '../../../assets/HeartSlashIcon.js';
import ProductList from '../../../components/frontend/ProductList';
import Skeleton from 'react-loading-skeleton';
// eslint-disable-next-line no-unused-vars
import parse from 'html-react-parser';
import {
    addToCart,
    removeFromWishList,
    addToWishList,
    onProductDetail,
    getNameAndAvatarCustomer,
} from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';

import { toast } from 'react-toastify';

import {
    addFavoriteToLocalStorage,
    getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from '../../../utils';
import HeartIcon from '../../../assets/HeartIcon.js';
import DocumentTitle from '../../../components/frontend/DocumentTitle.js';
import { UserIcon } from '@heroicons/react/24/outline';
export default function ProductDetail() {
    const { userInfo } = useSelector((state) => state.userReducer);
    const { info_review_user } = useSelector((state) => state.userReducer);
    // console.log('info_review_user', info_review_user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { all_products } = useSelector((state) => state.productReducer);
    const { product_slug_id } = useParams();
    const product_id = product_slug_id.split('-').pop();

    const [favories_products, setfavoriesProduct] = useState(
        getFavoritesFromLocalStorage()
    );
    const [variations, setVariations] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState(null);

    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [product_detail, setProductDetail] = useState(null);
    const [sku_list, setSkuList] = useState(null);
    const [product_categories, setProductCategories] = useState([]);
    const [product_images, setProductImages] = useState([]);
    const [selected_sku, setSelectedSku] = useState(null);
    const [special_offer, setSpicial_offer] = useState(null);
    const [sale, setSale] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [review, setReview] = useState([]);
    const [rating_score_avg, setRating_score_avg] = useState(0);
    const [related_products, setRelated_products] = useState([]);
    // const [comment, setComment] = useState([]);
    const [reload, setReload] = useState(false);

    const getProductDetail = async (product_id) => {
        setReload(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const responseProductDetail = await dispatch(
            onProductDetail({ spu_id: product_id })
        );

        if (responseProductDetail) {
            const resultProduct =
                await responseProductDetail?.payload?.metaData;
            // console.log('responseProductDetail.', responseProductDetail);
            setProductDetail(resultProduct.product_detail);
            setName(resultProduct.product_detail.product_name);
            setDescription(resultProduct.product_detail?.product_description);

            if (resultProduct.product_detail?.product_variations.length > 0) {
                setVariations(resultProduct.product_detail?.product_variations);
                setSelectedVariation(resultProduct.sku_list[0]?.sku_tier_idx);
                setSkuList(resultProduct.sku_list);
                setSelectedSku(resultProduct.sku_list[0]);
                setPrice(resultProduct.sku_list[0]?.sku_price);
                setStock(resultProduct.sku_list[0].sku_stock);
            } else {
                setStock(resultProduct.product_detail.product_quantity);
                setSelectedImage(resultProduct.product_detail.product_thumb);
                setPrice(resultProduct.product_detail.product_price);
            }
            setProductImages(resultProduct?.product_images);

            setProductCategories(resultProduct.product_categories);
            setReview(resultProduct.product_review);
            setRelated_products(resultProduct.related_products);

            if (resultProduct?.product_review?.length > 0) {
                setRating_score_avg(
                    resultProduct.product_review?.reduce(
                        (partialSum, a) => partialSum + a?.rating_score,
                        0
                    ) / resultProduct.product_review?.length
                );
            } else {
                setRating_score_avg(0);
            }
            setSpicial_offer(
                resultProduct.special_offer?.special_offer_spu_list?.find(
                    (spu) => spu.product_id == product_id
                )
            );
        }
        setReload(false);
    };
    /////////////////////////////
    useEffect(() => {
        try {
            getProductDetail(product_id);
        } catch (error) {
            setTimeout(() => {
                getProductDetail(product_id);
            }, 3000);
        }
    }, [product_slug_id]);

    useEffect(() => {
        !info_review_user && dispatch(getNameAndAvatarCustomer());
    }, []);

    useEffect(() => {
        if (special_offer) {
            if (special_offer?.sku_list?.length > 0) {
                special_offer?.sku_list.map((sku) => {
                    if (
                        sku.sku_tier_idx.toString() ==
                        selectedVariation.toString()
                    ) {
                        setSale(sku);
                        return;
                    }
                });
            } else {
                setSale(special_offer);
                return;
            }
        }
    }, [special_offer]);
    /////////selected variation
    const handleVariationChange = (value, variationOrder) => {
        setSelectedVariation((s) => {
            const newArray = s.slice();
            newArray[variationOrder] = value;
            return newArray;
        });
    };

    useEffect(() => {
        if (selectedVariation) {
            setSelectedSku(
                sku_list.find(
                    (sku) =>
                        sku.sku_tier_idx?.toString() ==
                        selectedVariation?.toString()
                )
            );
        }
    }, [selectedVariation]);

    useEffect(() => {
        if (selected_sku) {
            setPrice(selected_sku.sku_price);
            setStock(selected_sku.sku_stock);
            if (
                product_images?.find(
                    (item) => item?.sku_id === selected_sku?._id
                )
            ) {
                setSelectedImage(
                    product_images?.find(
                        (item) => item?.sku_id === selected_sku?._id
                    )?.thumb_url
                );
            }
            if (special_offer) {
                if (special_offer?.sku_list?.length > 0) {
                    special_offer?.sku_list.map((sku) => {
                        if (
                            sku?.sku_tier_idx?.toString() ==
                            selectedVariation?.toString()
                        ) {
                            setSale(sku);
                            return;
                        }
                    });
                } else {
                    setSale(special_offer);
                }
            }

            // console.log('filteredSKU', selected_sku);
            // console.log('pricesale', sale);
            // console.log('special_offer', special_offer);
        }
    }, [selected_sku]);

    const HandleImageChoose = (e) => {
        setSelectedImage(e);
    };

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
        if (userId) {
            if (quantity <= stock) {
                // console.log('selected_sku', sku_id + productId + sku_id)
                await dispatch(
                    addToCart({
                        userId: userId._id,
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
            } else {
                toast.info('Số lượng sản phẩm còn lại không đủ');
            }
        } else {
            toast.info('Vui lòng đăng nhập để tiếp tục');
            // navigate('/login');
        }
    };
    ////////////////wishList
    const HandleAddToWishList = async ({ userId, productId }) => {
        if (userId) {
            await dispatch(
                addToWishList({
                    userId: userId._id,
                    productId: productId,
                })
            );
            await addFavoriteToLocalStorage(productId);
            setfavoriesProduct(getFavoritesFromLocalStorage());
            toast.success('Đã thêm sản phẩm vào mục yêu thích!');
        } else {
            toast.error('Vui lòng đăng nhập để tiếp tục');

            navigate('/login');
        }
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
        toast.info('Đã xóa sản phẩm ra khỏi mục yêu thích!');
    };

    return (
        <div className="bg-transparent pt-10 md:pt-20">
            <DocumentTitle title="Sản phẩm" />

            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li>
                            <div className="flex items-center">
                                <Link
                                    to="/"
                                    className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Trang chủ
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
                        {product_categories.length > 0 &&
                            product_categories.map((breadcrumb, index) => (
                                <li key={breadcrumb._id}>
                                    <div className="flex items-center">
                                        <Link
                                            to={`/san-pham-theo-danh-muc/${(index === 0 || index === 1 || index === 2) && product_categories[0].category_slug}${(index === 1 || index === 2) && product_categories[1].category_slug ? `/${product_categories[1].category_slug}` : ''}${index === 2 && product_categories[2].category_slug ? `/${product_categories[2].category_slug}` : ''}`}
                                            className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            {breadcrumb.category_name}
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
                        {product_detail && (
                            <li className="text-sm">
                                <Link
                                    to={`/san-pham/${product_detail.product_slug}-${product_detail._id}`}
                                    aria-current="page"
                                    className="font-medium text-gray-500 transition duration-200 ease-out hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
                                >
                                    {product_detail.product_name}
                                </Link>
                            </li>
                        )}
                    </ol>
                </nav>
                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
                    <div className="flex flex-col-reverse lg:col-span-2 lg:h-square lg:flex-row lg:space-x-5 lg:border-r lg:border-gray-300 lg:pr-8 dark:lg:border-stone-700">
                        <div className="no-scrollbar flex w-full flex-row overflow-hidden max-lg:mt-3 max-lg:space-x-3 max-lg:overflow-x-scroll max-lg:pb-1 lg:w-44 lg:flex-col lg:space-y-3 lg:overflow-y-scroll">
                            {product_images &&
                            reload === false &&
                            product_images?.length > 0 ? (
                                product_images?.map((item, index) => (
                                    <button
                                        onClick={() =>
                                            HandleImageChoose(item.thumb_url)
                                        }
                                        key={index}
                                        className="h-24 w-24 flex-shrink-0 bg-gray-200 shadow-md sm:overflow-hidden sm:rounded-lg lg:h-36 lg:w-full"
                                    >
                                        <img
                                            src={item.thumb_url}
                                            alt={item.thumb_url}
                                            className="h-full w-full object-fill object-center"
                                        />
                                    </button>
                                ))
                            ) : (
                                <Skeleton count={4} className="h-32 w-24" />
                            )}
                        </div>
                        <div className="h-9/10 w-full shadow-md sm:overflow-hidden sm:rounded-lg">
                            {selectedImage && reload === false ? (
                                <img
                                    src={selectedImage && selectedImage}
                                    alt={selectedImage && selectedImage}
                                    className="h-full w-full object-fill object-center"
                                />
                            ) : (
                                <Skeleton
                                    count={1}
                                    className="aspect-h-1 aspect-w-1 h-full w-full"
                                />
                            )}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        {product_detail && reload === false ? (
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                                {name}
                            </h1>
                        ) : (
                            <Skeleton
                                count={2}
                                className="text-2xl sm:text-3xl"
                            />
                        )}
                        {product_detail && reload === false ? (
                            <>
                                <p className="mt-6 text-3xl tracking-tight text-gray-900 dark:text-gray-200">
                                    {sale ? (
                                        <NumericFormat
                                            value={sale.price_sale}
                                            displayType="text"
                                            thousandSeparator={true}
                                            decimalScale={0}
                                            id="price"
                                            suffix={'đ'}
                                        />
                                    ) : (
                                        <NumericFormat
                                            value={price}
                                            displayType="text"
                                            thousandSeparator={true}
                                            decimalScale={0}
                                            id="price"
                                            suffix={'đ'}
                                        />
                                    )}
                                    &emsp;
                                    {sale && (
                                        <span className="rounded-full bg-red-100 px-5 py-2 text-xs font-medium  text-red-800 dark:bg-red-900 dark:text-red-300">
                                            Giảm đến{' '}
                                            {sale.percentage?.toFixed(1)}%
                                        </span>
                                    )}
                                </p>
                                {sale && (
                                    <p className="text-2xl tracking-tight text-gray-900 line-through decoration-rose-700 dark:text-gray-200">
                                        <NumericFormat
                                            value={price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            decimalScale={0}
                                            id="price"
                                            suffix={'đ'}
                                        />
                                    </p>
                                )}
                            </>
                        ) : (
                            <div className="mt-6 ">
                                <Skeleton
                                    count={2}
                                    className="text-2xl sm:text-3xl"
                                />
                            </div>
                        )}

                        {/* Reviews */}
                        <div className="mt-3">
                            {product_detail && reload === false ? (
                                <>
                                    <h3 className="text-xanthous-500">
                                        Điểm đánh giá : {rating_score_avg}
                                    </h3>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        rating_score_avg >=
                                                            rating
                                                            ? 'text-xanthous-500'
                                                            : 'text-gray-400',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>

                                        <Link className="ml-3 text-sm font-medium text-xanthous-500 hover:text-xanthous-600">
                                            {review.length} đánh giá
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <Skeleton
                                    count={2}
                                    className="text-2xl sm:text-3xl"
                                />
                            )}
                        </div>

                        <div className="mt-10">
                            {product_detail && reload === false ? (
                                <>
                                    {variations.map((item, index) => (
                                        <div key={index}>
                                            <div className="mt-10" key={index}>
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                                                        {item.name}
                                                    </h3>
                                                </div>

                                                <RadioGroup
                                                    value={
                                                        selectedVariation[index]
                                                    }
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
                                                            (
                                                                option,
                                                                subindex
                                                            ) => (
                                                                <RadioGroup.Option
                                                                    key={option}
                                                                    value={
                                                                        subindex
                                                                    }
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
                                                                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-center text-sm font-medium uppercase shadow-md transition duration-200 ease-out hover:bg-gray-400 focus:outline-none sm:flex-1 sm:py-5 dark:hover:bg-stone-500'
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
                                                                                {
                                                                                    option
                                                                                }
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
                                                                                        'pointer-events-none absolute -inset-px rounded-md shadow-md'
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
                                </>
                            ) : (
                                <>
                                    <Skeleton
                                        count={4}
                                        containerClassName="flex gap-2 text-2xl h-16 sm:text-3xl"
                                    />
                                    <Skeleton
                                        count={4}
                                        containerClassName="flex gap-2 mt-5 text-2xl h-16 sm:text-3xl"
                                    />
                                </>
                            )}

                            <div className="mt-10 flex flex-col space-y-5">
                                {stock != null ? (
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        Số lượng có sẵn: {stock}
                                    </span>
                                ) : (
                                    ''
                                )}
                                <div
                                    className="inline-flex w-fit overflow-hidden rounded-md border-2 bg-gray-200 shadow-md dark:bg-zinc-950"
                                    role="group"
                                >
                                    <button
                                        onClick={() =>
                                            handleDecrement(quantity)
                                        }
                                        className="group border-gray-900 bg-transparent px-2 text-sm font-medium text-gray-900 transition duration-300 ease-out hover:bg-magenta-500 hover:text-white focus:z-10 focus:bg-magenta-400 focus:text-white dark:border-white dark:text-white  dark:hover:border-magenta-500 dark:hover:text-white dark:focus:border-magenta-400"
                                    >
                                        <MinusIcon className="h-5 w-5 text-gray-900 transition duration-300 ease-out group-hover:text-white dark:text-white" />
                                    </button>
                                    <div className="border-none bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 focus:z-10 dark:bg-stone-400 dark:text-white">
                                        <span>{quantity}</span>
                                    </div>
                                    <button
                                        className="group border-gray-900 bg-transparent px-2 text-sm font-medium text-gray-900 transition duration-300 ease-out hover:bg-magenta-500 hover:text-white focus:z-10 focus:bg-magenta-400 focus:text-white dark:border-white dark:text-white  dark:hover:border-magenta-500 dark:hover:text-white dark:focus:border-magenta-400"
                                        onClick={() =>
                                            handleIncrement(quantity, stock)
                                        }
                                    >
                                        <PlusIcon className="h-5 w-5 text-gray-900 transition duration-300 ease-out group-hover:text-white dark:text-white" />
                                    </button>
                                </div>

                                <div className="flex space-x-2">
                                    {product_detail ? (
                                        <button
                                            onClick={() =>
                                                handleAddToCart(userInfo, {
                                                    productId:
                                                        product_detail._id,
                                                    sku_id: selected_sku
                                                        ? selected_sku._id
                                                        : null,
                                                    quantity: quantity,
                                                })
                                            }
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-magenta-500 px-8 py-3 text-base font-medium text-white shadow-md transition duration-200 ease-out hover:bg-magenta-400 focus:outline-none focus:ring-2 focus:ring-magenta-400"
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-magenta-500 px-8 py-3 text-base font-medium text-white shadow-md transition duration-200 ease-out hover:bg-magenta-400 focus:outline-none focus:ring-2 focus:ring-magenta-400 focus:ring-offset-2 disabled:opacity-50"
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    )}
                                    {product_detail &&
                                        (userInfo ? (
                                            favories_products.some(
                                                (p_id) =>
                                                    p_id == product_detail._id
                                            ) == true ? (
                                                <button
                                                    onClick={() =>
                                                        HandleRemoveFromWishList(
                                                            {
                                                                userId: userInfo._id,
                                                                productId:
                                                                    product_detail._id,
                                                            }
                                                        )
                                                    }
                                                    className="flex w-fit items-center justify-center rounded-md border border-transparent bg-magenta-500 px-5 py-3 text-base font-medium text-white shadow-md transition duration-200 ease-out hover:bg-magenta-400 focus:outline-none focus:ring-2 focus:ring-magenta-400"
                                                >
                                                    <HeartSlashIcon />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        HandleAddToWishList({
                                                            userId: userInfo,
                                                            productId:
                                                                product_detail._id,
                                                        })
                                                    }
                                                    className="flex w-fit items-center justify-center rounded-md border border-transparent bg-magenta-500 px-5 py-3 text-base font-medium text-white shadow-md transition duration-200 ease-out hover:bg-magenta-400 focus:outline-none focus:ring-2 focus:ring-magenta-400"
                                                >
                                                    <HeartIcon />
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    HandleAddToWishList({
                                                        userId: userInfo,
                                                        productId:
                                                            product_detail._id,
                                                    })
                                                }
                                                className="flex w-fit items-center justify-center rounded-md border border-transparent bg-magenta-500 px-5 py-3 text-base font-medium text-white shadow-md transition duration-200 ease-out hover:bg-magenta-400 focus:outline-none focus:ring-2 focus:ring-magenta-400"
                                            >
                                                <HeartIcon />
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-2xl space-y-4 px-4 pb-16 pt-5 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 lg:pt-5">
                    <h1 className="border-b border-stone-500 py-5 text-4xl font-bold dark:text-white">
                        Mô tả sản phẩm
                    </h1>
                    <div>{parse(`${description}`)}</div>

                    <div className="w-full">
                        <ProductList
                            title={'Sản phẩm liên quan'}
                            products={
                                related_products.length > 0
                                    ? related_products
                                    : []
                            }
                            summary={
                                'Những sản phẩm cùng danh mục mà bạn có thể quan tâm'
                            }
                        />
                    </div>
                    <h1 className="border-b border-stone-500 pb-5 text-4xl font-bold dark:text-white">
                        Đánh giá về sản phẩm
                    </h1>

                    <div className="space-y-5">
                        <div className="grid gap-5">
                            {review?.length > 0 ? (
                                review.map((rv, index) => (
                                    <div
                                        key={`review-${index}`}
                                        className="flex items-center space-x-4 overflow-hidden bg-zinc-200 p-4 shadow-md shadow-gray-400 dark:bg-zinc-800 dark:shadow-inner"
                                    >
                                        <div className=" h-20 w-20  overflow-hidden rounded-full max-sm:h-16 max-sm:w-16">
                                            {' '}
                                            {info_review_user &&
                                            info_review_user.length > 0 &&
                                            info_review_user.find(
                                                (u) => u._id == rv.customer_id
                                            )?.customer_avatar != '' ? (
                                                <img
                                                    src={
                                                        info_review_user?.find(
                                                            (u) =>
                                                                u._id ==
                                                                rv.customer_id
                                                        )?.customer_avatar
                                                    }
                                                    alt={
                                                        info_review_user?.find(
                                                            (u) =>
                                                                u._id ==
                                                                rv.customer_id
                                                        )?.customer_avatar
                                                    }
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-300 text-gray-500 dark:bg-magenta-400 dark:text-white">
                                                    <UserIcon className="h-10 w-10 drop-shadow-md" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="grid gap-2">
                                            {' '}
                                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                {(info_review_user &&
                                                    info_review_user.length >
                                                        0 &&
                                                    info_review_user.find(
                                                        (u) =>
                                                            u._id ==
                                                            rv.customer_id
                                                    )?.customer_name) ||
                                                    'Ẩn danh'}
                                            </div>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map(
                                                    (rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                rv.rating_score >=
                                                                    rating
                                                                    ? 'text-xanthous-500'
                                                                    : 'text-gray-400',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <div className="leading-5 text-gray-900 dark:text-white">
                                                {rv.rating_content}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-lg font-bold text-gray-900">
                                    Hiện không có đánh giá nào về sản phẩm này
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
