import { combineReducers } from 'redux';
import  UserReducer  from './user-reducer';
import CartReducer from './cart-reducer';
import ProductReducer from './product-reducer';


const reducers = combineReducers({
    userReducer: UserReducer,
    productReducer: ProductReducer,
   cartReducer: CartReducer,
})
export default reducers