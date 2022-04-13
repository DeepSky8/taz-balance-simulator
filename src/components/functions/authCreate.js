// import React, { useContext, useReducer } from "react";
// import { auth2 } from '../../firebase/firebase';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import authReducer from "../../reducers/authReducer";

// const createUser = createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         const { dispatch } = useReducer(authReducer)
//         const uid = userCredential.user.uid;
//         dispatch({ type: 'CREATE_USER', uid })
//         return 
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage)
//     })

// export { createUser as default }