<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import {computed, inject, watch} from "vue";
import {useStore} from "vuex";
import messages from "@/utils/messages";

export default {
  name: "EmptyLayout",
  setup(){
    const store = useStore()
    const $error = inject('$error')
    const error = computed(()=>{
      return store.getters.error
    })
    watch(error, (fbError)=>{
      $error(messages[fbError?.code] || 'Что-то пошло не так')
    })
    return{
      error
    }
  }
}
</script>

<style scoped>

</style>