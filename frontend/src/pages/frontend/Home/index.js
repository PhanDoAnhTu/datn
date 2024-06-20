import Banner from './Banner';
// import ProductList from '../../../components/frontend/ProductList';
import CategorySection from './Category';
// eslint-disable-next-line no-unused-vars
import PromoSection from './PromoSection';
import Blog from './Blog';
import Subscribe from '../../../components/frontend/home/Subscribe';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allProducts } from '../../../store/actions';
import DocumentTitle from '../../../components/frontend/DocumentTitle';
import ProductList from '../../../components/frontend/ProductList';
import { getSliderByActive } from '../../../store/actions/slider-actions';
// import { findListBrand } from '../../../store/actions/brand-actions';

export default function Home() {
    const dispatch = useDispatch();
    const { all_products } = useSelector((state) => state.productReducer);
    const { category } = useSelector((state) => state.categoryReducer);
    const { slider } = useSelector((state) => state.sliderReducer);


    const fetchData = async () => {
        dispatch(allProducts());
        // dispatch(findListBrand());
        dispatch(
            getSliderByActive({
                slider_is_active: true,
            })
        );
    }

    useEffect(() => {
        try {
            fetchData()
        } catch (error) {
            setTimeout(() => {
                fetchData()
            }, 3000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <DocumentTitle title="Trang chủ" />
            <Banner
                slider={(() => {
                    const fetchedSlider = slider
                        ?.slice()
                        ?.filter((item) => item.slider_position === 'banner');
                    return fetchedSlider;
                })()}
            />
            <div className="px-4 sm:px-6 lg:px-8">
                {all_products ? (
                    (() => {
                        const listSale =
                            all_products[0]?.special_offer
                                ?.special_offer_spu_list;
                        const newProducts = all_products
                            ?.slice()
                            ?.filter(
                                (item) =>
                                    item._id ===
                                    listSale
                                        ?.slice()
                                        ?.find(
                                            (subitem) =>
                                                subitem?.product_id === item._id
                                        )?.product_id
                            );
                        if (newProducts?.length > 0) {
                            return (
                                <ProductList
                                    title={'Sản phẩm khuyến mại'}
                                    summary={'Dựt deal ngay kẻo lỡ'}
                                    products={newProducts}
                                />
                            );
                        } else {
                            return '';
                        }
                    })()
                ) : (
                    <></>
                )}
            </div>
            <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-8 max-sm:grid-rows-2 sm:px-6 sm:py-8 md:grid-cols-2 lg:gap-8 lg:px-8 ">
                {(() => {
                    const fetchedSlider = slider
                        ?.slice()
                        ?.filter(
                            (item) =>
                                item?.slider_position === 'body' &&
                                (item?.slider_link ===
                                    '/san-pham-theo-danh-muc/nam' ||
                                    item?.slider_link ===
                                    '/san-pham-theo-danh-muc/nu')
                        );
                    return fetchedSlider?.map((item) => (
                        <CategorySection item={item} key={item._id} />
                    ));
                })()}
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
                {all_products ? (
                    <ProductList
                        title={'Sản phẩm mới'}
                        summary={'Sản phẩm mới nhất đã ở đây'}
                        products={all_products?.slice(0, 10)}
                    />
                ) : (
                    <></>
                )}
            </div>

            <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-8 max-sm:grid-rows-2 sm:px-6 sm:py-8 md:grid-cols-2 lg:gap-8 lg:px-8 ">
                {(() => {
                    const fetchedSlider = slider
                        ?.slice()
                        ?.filter(
                            (item) =>
                                item?.slider_position === 'body' &&
                                (item?.slider_link ===
                                    '/san-pham-theo-danh-muc/nu/trang-suc-and-phu-kien/mu-and-mu-len' ||
                                    item?.slider_link ===
                                    '/san-pham-theo-danh-muc/nu/thoi-trang/quan-djui')
                        );
                    return fetchedSlider?.map((item) => (
                        <CategorySection item={item} key={item._id} />
                    ));
                })()}
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
                {all_products
                    ? (() => {
                        // eslint-disable-next-line no-unused-vars
                        const newProducts = all_products
                            ?.slice()
                            ?.filter((item) =>
                                item?.product_category?.some((UUID) =>
                                    category
                                        ?.slice()
                                        ?.filter(
                                            (item) =>
                                                item?.category_slug ===
                                                'ao-thun'
                                        )
                                        ?.map((item) => {
                                            return item?._id;
                                        })
                                        ?.includes(UUID)
                                )
                            );
                        return (
                            <ProductList
                                title={'Áo thun'}
                                summary={
                                    'Những chiếc áo thun không ngại thời gian'
                                }
                                products={newProducts}
                            />
                        );
                    })()
                    : ''}
            </div>
            {(() => {
                const filterdCategory = category
                    ?.slice()
                    ?.find((item) => item.category_image?.length > 0);
                return <PromoSection category={filterdCategory} />;
            })()}
            <div className="px-4 sm:px-6 lg:px-8">
                {all_products
                    ? (() => {
                        // eslint-disable-next-line no-unused-vars
                        const newProducts = all_products
                            ?.slice()
                            .filter((item) =>
                                item?.product_category?.some((UUID) =>
                                    category
                                        ?.slice()
                                        ?.filter(
                                            (item) =>
                                                item?.parent_id ===
                                                category
                                                    ?.slice()
                                                    ?.find(
                                                        (item) =>
                                                            item?.category_slug ===
                                                            'balo'
                                                    )?._id
                                        )
                                        ?.map((item) => {
                                            return item?._id;
                                        })
                                        ?.includes(UUID)
                                )
                            );
                        return (
                            <ProductList
                                title={'Balo'}
                                summary={
                                    'Người bạn đồng hành không thể thiếu trên mọi nẽo đường'
                                }
                                products={newProducts}
                            />
                        );
                    })()
                    : ''}
            </div>

            <Blog />
            <Subscribe />
        </div>
    );
}
