import {getDatabase, ref, child, get} from "firebase/database";
export default {
    state: {
        info: null
    },
    mutations: {
        clearInfo(state){
            state.info = null
        },
        setInfo(state, info){
            state.info = info
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try{
                const id = commit('getUid');
                const dbRef = ref(getDatabase());
                const infoRow = await get(child(dbRef, `users/${id}/info`))
                const info = await infoRow?.val() ?? null
                console.log('info', info)
                commit('setInfo', info)
                if(!info){
                    console.log("No data available");
                }
            }catch(e){
                console.log(e)
            }
        }
    },
    getters: {
        info(state) {
            return state.info
        }
    }
}
