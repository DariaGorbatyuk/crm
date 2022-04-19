<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link :to="{name: 'profile'}" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {useRouter} from "vue-router"
import {useStore} from "vuex";

export default {
  name: "Navbar",
  setup() {
    const store = useStore()
    const router = useRouter()
    const dropdown = ref(null)
    const dropdownObj = ref(null)
    const interval = ref(null)
    const date = ref(null)
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    async function logout() {
      await store.dispatch('logout')
      await router.push({name: 'login', query: {message: 'logout'}})
    }

    onMounted(() => {
      interval.value = setInterval(() => {
        date.value = new Intl.DateTimeFormat('ru-RU', options).format(new Date())
      }, 1000)
      dropdownObj.value = M.Dropdown.init(dropdown.value, {
        constrainWidth: true
      })
    })
    onBeforeUnmount(() => {
      clearInterval(interval.value)
      if(dropdownObj.value && dropdownObj.value.destroy){
        dropdownObj.value.destroy()
      }
    })
    return {
      dropdown,
      logout,
      date
    }
  }
}
</script>

<style scoped>

</style>