import { storage } from '../../../firebase/config';
import  * as actions from './actionTypes';

export const fetchProductList = () => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("products").orderBy("time", "desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(), id:doc.id}));
        dispatch({
            type: actions.FETCH_PRODUCT_LIST,
            payload:docs,
        })
    })
}


