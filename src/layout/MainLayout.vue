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
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import {ref} from "vue";

export default {
  name: "MainLayout",
  components:{
    Navbar,
    Sidebar
  },
  setup(){
    let isOpen = ref(true)
    return{
      isOpen,
    }
  }
}
</script>

<style scoped>

</style>