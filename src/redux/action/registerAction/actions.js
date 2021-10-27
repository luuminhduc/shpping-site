import * as actions from './actionTypes';

export const registerRequest = (user,history) => async (dispatch,getState,{getFirebase,getFirestore})  => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const {email,password,name} = user;
    // firestore.collection('users').doc("NAncAT1s1M159AHYqO4v").set({
    //     email:"Ngu",
    //     avatar:""
    // }).then(() => {
    //     console.log("Done");
    // })
    firebase.auth().createUserWithEmailAndPassword(email,password).then((res) => {
        firestore.collection('users').doc(res.user.uid).set({
            avatar:'',
            email,
            name,
            address:{
                city:"",
                district:"",
                ward:"",
                address:"",
                phoneNumber:"",

            }
        }).then(() => {
            console.log("Done");
            dispatch(registerSuccess(history))
        });
    })
    .catch(err => dispatch(registerFailure(err)))
}

const registerFailure = (err) => {
    return {
        type: actions.REGISTER_FAILURE,
        payload: err.message
    }
}

const registerSuccess = (history) => {
    history.goBack();
    return{
        type: actions.REGISTER_SUCCESS
    }
}

export const hideregisterError = () => {
    return {
        type: actions.HIDE_REGISTER_ERROR,
    }
}