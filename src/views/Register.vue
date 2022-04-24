<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="state.email"
            :class="{invalid: v$.email.$errors.length > 0}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="v$.email.email.$invalid"
        >Неверный формат</small>
        <small class="helper-text invalid"
               v-if="v$.email.required.$invalid"
        >Это поле не может быть пустым</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model="state.passport"
            :class="{invalid: v$.passport.$errors.length > 0}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
               v-if="v$.passport.required.$invalid"
        >Это поле не может быть пустым</small>
        <small class="helper-text invalid"
               v-else-if="v$.passport.minLength.$invalid">
          Минимальная длина 6 символов
        </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            class="validate"
            v-model="state.name"
            :class="{invalid: v$.name.$errors.length > 0}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid"
               v-if="v$.name.required.$invalid">Это поле не может быть пустым</small>
      </div>
      <p>
        <label>
          <input
              :class="{invalid: v$.name.$errors.length > 0}"
              type="checkbox" v-model="state.agreement"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link :to="{name: 'login'}">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "Register",
  components: {
    useVuelidate,
    required,
    email
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const passportMinLength = 6
    const state = reactive({
      email: '',
      passport: '',
      name: '',
      agreement: false,
    })
    const rules = {
      email: {required, email, $lazy: true},
      passport: {required, minLength: minLength(passportMinLength), $lazy: true},
      name: {required, $lazy: true},
      agreement: {checked: v => v, $lazy: true}
    }

    async function submitHandler() {
      const resultValidation = await v$.value.$validate()
      if (!resultValidation) {
        return
      }
      const formData = {
        email: state.email,
        password: state.passport,
        name: state.name
      }
      try {
        await store.dispatch('register', formData)
        await router.push({name: 'home'})
      } catch (e) {
        store.commit('setError', e)
      }
    }

    const v$ = useVuelidate(rules, state)
    return {
      submitHandler,
      passportMinLength,
      state,
      v$,
    }
  }
}
</script>

<style>

</style>