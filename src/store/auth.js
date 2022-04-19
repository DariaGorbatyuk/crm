import {getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";

export default {
    state(){
        const auth = getAuth()
    },
    mutations:{
        getUid(){

        }
    },
    getters:{

    },
    actions: {
        async login({dispatch, commit, state}, {email, password}) {
            try {
                const userCredentials = await signInWithEmailAndPassword(state.auth, email, password)
                const user = userCredentials.user
                console.log('user', user)
            } catch (error) {
                throw error
            }
        },
        async logout() {
            signOut(state.auth).then(() => {
                console.log('logouuuut')
            }).catch((error) => {
                // An error happened.
            });
        },
        async register({email, password, name}){
            createUserWithEmailAndPassword(state.auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log('newuser', user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }
}