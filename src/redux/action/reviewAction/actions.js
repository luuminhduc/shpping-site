import * as actions from './actionTypes';

export const fetchReviewList = (productId) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    try{
        const arr = [];
        const res = await firestore.collection("reviews").where("productId", "==", productId).get();
        res.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id });
          });
          await dispatch({
              type: actions.FETCH_REVIEW_LIST,
              payload: arr,
          })
    }catch(err ){
        console.log(err);
    }
}

export const addNewReview = (newReview,reset) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("reviews").add(newReview).then(() => {
        reset();
        dispatch(hideReviewModal())
        dispatch(fetchReviewList(newReview.productId));
    })
    .catch(err => {
        console.log(err);
    })
}

export const showReviewModal = () => {
    return {
        type: actions.SHOW_REVIEW_MODAL,
        payload: true
    }
}

export const hideReviewModal = () => {
    return{
        type: actions.HIDE_REVIEW_MODAL,
        payload: false,
    }
}