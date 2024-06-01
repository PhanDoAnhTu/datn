import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import CartReducer from './cart-reducer';
import ProductReducer from './product-reducer';
import WishListReducer from './wish-list-reducer';
import PaymentReducer from './payment-reducer';


const reducers = combineReducers({
    userReducer: UserReducer,
    productReducer: ProductReducer,
    cartReducer: CartReducer,
    wishListReducer: WishListReducer,
    paymentReducer: PaymentReducer
})
export default reducers