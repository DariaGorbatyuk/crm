import {getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, set} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB2Ro_NJE4MBj524NX6_Rw4BGCwtUY6Ht4",
    authDomain: "vue-crm-b2ea8.firebaseapp.com",
    projectId: "vue-crm-b2ea8",
    storageBucket: "vue-crm-b2ea8.appspot.com",
    messagingSenderId: "567967453579",
    appId: "1:567967453579:web:c956e761f4d96830fd5f8e"
};
const appFire = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(appFire);
export default {
    state() {
        return {

        }

    },
    mutations: {
        getUid() {
            const user = auth.currentUser
            return user ? user.uid : null
        }
    },
    getters: {},
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                const userCredentials = await signInWithEmailAndPassword(auth, email, password)
                const user = userCredentials.user
                console.log('user', user)
            } catch (error) {
                throw error
            }
        },
        async logout() {
            signOut(auth).then(() => {
                console.log('logouuuut')
            }).catch((error) => {
                // An error happened.
            });
        },
        async register({dispatch},{email, password, name}) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in

                    const user = userCredential.user;
                    return user.uid
                    // ...
                }).then((id)=>{
                const uid = dispatch('getUid')
                set(ref(database, `users/${id}/info`), {
                    bill: 10000,
                    name
                })
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }
    }
}