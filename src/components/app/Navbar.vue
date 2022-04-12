<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">12.12.12</span>
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
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router"

export default {
  name: "Navbar",
  setup(){
    const router = useRouter()
    const dropdown = ref(null)
    function logout(){
      console.log('logout')
      router.push({name: 'login', query:{message: 'logout'}})
    }
    onMounted(()=>{
      console.log('dropdown', dropdown.value)
      M.Dropdown.init(dropdown.value, {
        constrainWidth: true
      })
    })
    return{
      dropdown,
      logout
    }
  }
}
</script>

<style scoped>

</style>