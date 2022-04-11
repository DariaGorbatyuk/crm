<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link v-for="link in links"
                 :key="link.pathName"
                 active-class="active"
                 :to="{name: link.pathName}"
                 custom
                 v-slot="{ navigate, href, route, isActive, isExactActive }"
    >
      <li :class="[isExactActive && 'active']">
        <a :href="href" class="waves-effect waves-orange pointer"
           @click="navigate">{{ link.title }}</a>
      </li>
    </router-link>

  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: ['isOpen'],
  setup() {
    const links = [
      {
        title: 'Счет',
        pathName: 'home'
      },
      {
        title: 'История',
        pathName: 'history'
      },
      {
        title: 'Планирование',
        pathName: 'planning'
      },
      {
        title: 'Новая запись',
        pathName: 'record'
      },
      {
        title: 'Категории',
        pathName: 'categories'
      },
    ]
    return {
      links
    }
  }
}
</script>

<style scoped>

</style>