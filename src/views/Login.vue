<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            class="validate"
            :class="{invalid: v$.email.$errors.length>0}"
            v-model.trim="state.email"
        >

        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-for="error in v$.email.$errors"
               :key="error.$uid"
        >{{ error.$message }}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            :class="{invalid: v$.password.$errors.length>0}"
            v-model="state.password"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
               v-for="error in v$.password.$errors"
               :key="error.$uid">{{ error.$message }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link :to="{name: 'register'}">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>

import {useRouter, useRoute} from "vue-router";
import {inject, onMounted, reactive} from "vue";
import useVuelidate from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'
import messages from "@/utils/messages";
import {useStore} from "vuex";
export default {
  name: "Login",
  components: {
    useVuelidate,
    required,
    email
  },

  setup(_, context) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const $message = inject('$message')
    const $error = inject('$error')
    const state = reactive({
      email: '',
      password: ''
    })
    const rules = {
      email: {required, email, $lazy: true},
      password: {required, $lazy: true}
    }

    async function submitHandler() {
      const isFormCorrect = await v$.value.$validate()
      if (!isFormCorrect) {
        v$.value.email.$errors.forEach(error => console.log(error.$message))
        return
      }
      const formData = {
        email: state.email,
        password: state.password
      }
      try{
        await store.dispatch('login', formData)
        await router.push({name: 'home'})
      }catch (e){}
    }

    const v$ = useVuelidate(rules, state)

    onMounted(() => {
      if(route.query.message){
        $message(messages[route.query.message])
      }
    })
    return {
      submitHandler,
      state,
      v$
    }
  }
}
</script>

<style scoped>

</style>