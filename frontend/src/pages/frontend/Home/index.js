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

export default function Home() {
    const dispatch = useDispatch();
    const { all_products } = useSelector((state) => state.productReducer);
    console.log(all_products);
    useEffect(() => {
        if (!all_products) dispatch(allProducts({}));
    }, [all_products]);

    console.log(all_products);
    return (
        <div>
            <DocumentTitle title="Trang chủ" />
            <Banner />
            <div className="px-4 sm:px-6 lg:px-8">
                {all_products ? (
                    (() => {
                        const listSale =
                            all_products[0]?.special_offer
                                ?.special_offer_spu_list;
                        const newProducts = all_products
                            ?.slice()
                            .filter(
                                (item) =>
                                    item._id ===
                                    listSale
                                        ?.slice()
                                        .find(
                                            (subitem) =>
                                                subitem.product_id === item._id
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
            <CategorySection />
            <div className="px-4 sm:px-6 lg:px-8">
                {all_products ? (
                    <ProductList
                        title={'Sản phẩm mới'}
                        summary={'Sản phẩm mới nhất đã ở đây'}
                        products={all_products}
                    />
                ) : (
                    <></>
                )}
            </div>

            <Blog />
            <Subscribe />
        </div>
    );
}
