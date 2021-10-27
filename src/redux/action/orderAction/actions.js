import { removeAll } from '../cartAction/actions';
import { showModal } from '../modalAction/actions';
import * as actions from './actionTypes';

export const fetchOrderList = (uid) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("orders").where("uid","==",uid).get().then(snap => {
        const docs = [];
        snap.forEach(doc => docs.push({...doc.data(), id:doc.id}));
        dispatch({
            type: actions.FETCH_ORDER_LIST,
            payload:docs,
        })
    })
}

export const saveOrder = (orderList,history) => async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    for(let i = 0 ; i < orderList.length;i++) {
        const order = orderList[i];
        await decreaseInventory({firestore,id:order.productId, inventory:order.inventory,quantity:order.quantity})
         await addToOrderDB(firestore,order);
    }
    await dispatch(removeAll());
    await history.push('/account/history');
    await dispatch(showModal({title:"Your orders are saved",content:"Thank you so much"}));
}

const addToOrderDB = async (firestore,order) => {
    firestore.collection('orders').add(order)
}

const decreaseInventory = async ({firestore,id,inventory,quantity}) => {
    firestore.collection('products').doc(id).update({
        inventory: inventory - quantity,
    })
}