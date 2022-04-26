<template>
  <div class="app-main-layout">
    <Navbar @toggleSidebar="isOpen = !isOpen"></Navbar>
    <Sidebar :is-open="isOpen"></Sidebar>
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" :to="{name: 'record'}">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "MainLayout",
  components:{
    Navbar,
    Sidebar
  },
  setup(){
    const store = useStore()
    let isOpen = ref(true)
     onMounted(async () => {
       if (!store.getters.info) {
         await store.dispatch('fetchInfo')
       }
     })
    return{
      isOpen,
    }
  }
}
</script>

<style scoped>

</style>
