import { lazy } from 'react';

// import App from '../App.js';
// import Category from '../pages/frontend/Category/index.js';
// import Login from '../pages/frontend/Auth/Login.js';
// import Register from '../pages/frontend/Auth/Register.js';
// import Home from '../pages/frontend/Home/index.js';
// import PrivateRoute from '../pages/frontend/Auth/PrivateRoute.js';
// import Profile from '../pages/frontend/Profile/Profile.js';
// import News from '../pages/frontend/News/index.js';
// import NewDetail from '../pages/frontend/News/NewDetail.js';
// import ProductDetail from '../pages/frontend/ProductDetail/index.js';
// import Contact from '../pages/frontend/Contact/index.js';
// import Checkout from '../pages/frontend/Checkout/index.js';
// import Search from '../pages/frontend/Search.js';
// import LoginSuccessSocial from '../pages/frontend/Auth/LoginSuccessSocial.js';

const App = lazy(() => import('../App.js'));
const Login = lazy(() => import('../pages/frontend/Auth/Login.js'));
const Register = lazy(() => import('../pages/frontend/Auth/Register.js'));
const Home = lazy(() => import('../pages/frontend/Home/index.js'));
const PrivateRoute = lazy(
    () => import('../pages/frontend/Auth/PrivateRoute.js')
);
const Profile = lazy(() => import('../pages/frontend/Profile/Profile.js'));
const Category = lazy(() => import('../pages/frontend/Category/index.js'));
const News = lazy(() => import('../pages/frontend/News/index.js'));
const NewDetail = lazy(() => import('../pages/frontend/News/NewDetail.js'));
const ProductDetail = lazy(
    () => import('../pages/frontend/ProductDetail/index.js')
);
const Contact = lazy(() => import('../pages/frontend/Contact/index.js'));
const Checkout = lazy(() => import('../pages/frontend/Checkout/index.js'));
const Search = lazy(() => import('../pages/frontend/Search.js'));
const OrderDetail = lazy(
    () => import('../pages/frontend/Profile/OrderDetail.js')
);
const LoginSuccessSocial = lazy(
    () => import('../pages/frontend/Auth/LoginSuccessSocial.js')
);
const TransactionCheck = lazy(
    () => import('../pages/frontend/Checkout/TransactionCheck.js')
);
const PageNotFound = lazy(() => import('../pages/frontend/PageNotFound.js'));

import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import RegisterComplete from '../pages/frontend/Auth/RegisterComplete.js';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Home />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<Register />} />
            <Route
                path="/san-pham-theo-danh-muc/:category_slug?"
                element={<Category />}
            />
            <Route
                path="/san-pham/:product_slug_id"
                element={<ProductDetail />}
            />
            <Route path="/bai-viet" element={<News />} />
            <Route path="/bai-viet/:slug?" element={<NewDetail />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/tim-kiem-san-pham/:keyword" element={<Search />} />

            <Route
                path="/kiem-tra-dang-nhap/:userId/:provider"
                element={<LoginSuccessSocial />}
            />
            <Route path="/thanh-toan/:page?" element={<Checkout />} />

            <Route path="/" element={<PrivateRoute />}>
                <Route path="/trang-ca-nhan/:page?" element={<Profile />} />

                <Route
                    path="/chi-tiet-don-hang/:orderId"
                    element={<OrderDetail />}
                />
                <Route
                    path="/kiem-tra-thanh-toan"
                    element={<TransactionCheck />}
                />
            </Route>
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/dang-ky-thanh-cong" element={<RegisterComplete />} />
        </Route>
    )
);

export default router;
