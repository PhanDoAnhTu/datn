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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:gender/:test" element={<Category />} />
            <Route
                path="/san-pham/:product_slug_id?"
                element={<ProductDetail />}
            />
            <Route path="/news/:page" element={<News />} />
            <Route path="/new/d/:slug" element={<NewDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search/:keyword" element={<Search />} />

            <Route
                path="/login-success/:userId?/:provider?"
                element={<LoginSuccessSocial />}
            />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/" element={<PrivateRoute />}>
                <Route path="/u/:page" element={<Profile />} />
                <Route path="/checking-order" element={<TransactionCheck />} />
            </Route>
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/dang-ky-thanh-cong" element={<RegisterComplete />} />
        </Route>
    )
);

export default router;
