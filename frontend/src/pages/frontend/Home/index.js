import Banner from './Banner';
// import ProductList from '../../../components/frontend/ProductList';
import CategorySection from './Category';
import PromoSection from './PromoSection';
import Blog from './Blog';
import Subscribe from '../../../components/frontend/home/Subscribe';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { allProducts } from '../../../store/actions';
import DocumentTitle from '../../../components/frontend/DocumentTitle';

export default function Home() {
    // const dispatch = useDispatch();
    // const { all_products } = useSelector((state) => state.productReducer);
    // console.log(all_products);
    // useEffect(() => {
    //     if (!all_products) (
    //         dispatch(allProducts({ }))
    //     )
    // }, [all_products]);
    return (
        <div>
            <DocumentTitle title="Trang chủ" />
            <Banner />
            <CategorySection />
            <div className="px-4 sm:px-6 lg:px-8">
                {/* {all_products ?
                    <ProductList
                        title={'Best selling'}
                        summary={'Our most favorite products are here'}
                        products={all_products}
                    />
                    : <></>
                } */}

            </div>

            <PromoSection />
            <Blog />
            <Subscribe />
        </div>
    );
}
