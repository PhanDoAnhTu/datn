import Login from '../pages/frontend/Auth/Login.js';
import Register from '../pages/frontend/Auth/Register.js';
import Home from '../pages/frontend/Home/index.js';
import PrivateRoute from '../pages/frontend/Auth/PrivateRoute.js';
import Category from '../pages/frontend/Category/index.js';
import Profile from '../pages/frontend/Profile/Profile.js';
import News from '../pages/frontend/News/index.js';
import NewDetail from '../pages/frontend/News/NewDetail.js';
import ProductDetail from '../pages/frontend/ProductDetail/index.js';
import Contact from '../pages/frontend/Contact/index.js';
import Checkout from '../pages/frontend/Checkout/index.js';
import Search from '../pages/frontend/Search.js';
import LoginSuccessSocial from '../pages/frontend/Auth/LoginSuccessSocial.js';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App.js';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category/:gender/:test" element={<Category />} />
            <Route path="/:category_slug/:product_slug?/:product_id?" element={<ProductDetail />} />
            <Route path="/news/:page" element={<News />} />
            <Route path="/new/d/:slug" element={<NewDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/login-success/:userId?/:provider?" element={<LoginSuccessSocial />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/u/:page" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                
            </Route>


        </Route>
    )
)


export default router