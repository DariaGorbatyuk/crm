import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                const auth = getAuth()
                const userCredentials = await signInWithEmailAndPassword(auth, email, password)
                const user = userCredentials.user
                console.log('user', user)
            } catch (error) {
                throw error
            }
        }
    }
}