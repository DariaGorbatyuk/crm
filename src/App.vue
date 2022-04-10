<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>
<script>
import EmptyLayout from "@/layout/EmptyLayout";
import MainLayout from "@/layout/MainLayout";

export default {
  components:{
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout(){
      return (this.$route.meta.layout ?? 'main') + '-layout'
    }
  }
}
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import './assets/index.css';
</style>
