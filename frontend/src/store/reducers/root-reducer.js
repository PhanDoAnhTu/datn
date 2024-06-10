import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import CartReducer from './cart-reducer';
import ProductReducer from './product-reducer';
import WishListReducer from './wish-list-reducer';
import PaymentReducer from './payment-reducer';
import CategoryReducer from './category-reducer';
import SliderReducer from './slider-reducer';
import TopicReducer from './topic-reducer';
import PostReducer from './post-reducer';
import Special_offerReducer from './spicial-offer-reducer';

const reducers = combineReducers({
    userReducer: UserReducer,
    productReducer: ProductReducer,
    cartReducer: CartReducer,
    categoryReducer: CategoryReducer,
    sliderReducer: SliderReducer,
    topicReducer: TopicReducer,
    postReducer: PostReducer,
    wishListReducer: WishListReducer,
    paymentReducer: PaymentReducer,
    special_offerReducer: Special_offerReducer
});
export default reducers;
