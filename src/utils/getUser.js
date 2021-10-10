import {firestore} from '../firebase/config';

export const getUser = async (id) => {
    return firestore.collection("users").doc(id).get()
    .then(res => {
        return {...res.data()}
    })
    .catch(err => {
        console.log(err);
    })
}