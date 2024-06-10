import { combineReducers } from 'redux';
// import  UserReducer  from './user-reducer';
// import CartReducer from './cart-reducer';
import ProductReducer from './product-reducer';
import UploadReducer from './upload-reducer';


const reducers = combineReducers({
    // userReducer: UserReducer,
    productReducer: ProductReducer,
    uploadReducer: UploadReducer,
    //    cartReducer: CartReducer,
})
export default reducers