import { firebaseReducer } from "react-redux-firebase";
import {combineReducers} from "redux";
import categoryReducer from "./categoryReducer";
import loginReducer from "./loginReducer";
import productReducer from "./productReducer";
import registerReducer from "./registerReducer";
import reviewReducer from "./reviewReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
    firebaseReducer,
    loginReducer,
    registerReducer,
    categoryReducer,
    productReducer,
    reviewReducer,
    cartReducer,
})