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
        return {}

    },
    mutations: {},
    getters: {},
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                const userCredentials = await signInWithEmailAndPassword(auth, email, password)
                const user = userCredentials.user
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async logout({commit}) {
            try {
                await signOut(auth)
            } catch (error) {
                commit('setError', error)
            }

        },
        async register({dispatch, commit}, {email, password, name}) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            const id = user.uid;
            await set(ref(database, `users/${id}/info`), {
                bill: 10000,
                name
            })
        }
    }
}