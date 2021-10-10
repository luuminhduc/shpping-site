import {firestore} from '../firebase/config';

export const getUser = (id) => {
    firestore.collection("users").doc(id).get()
    .then(res => {
        return {...res.data(),id:res.id}
    })
    .catch(err => {
        console.log(err);
    })
}