import * as actions from './actionTypes';

export const fetchCategoryList = () => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("categories").orderBy("time","desc").onSnapshot(snap => {
        const docs = [];
        snap.forEach(item => docs.push({...item.data(), id:item.id}));
        dispatch({
            type: actions.FETCH_CATEGORY_LIST,
            payload: docs,
        })
    })
}