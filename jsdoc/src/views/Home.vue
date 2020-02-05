<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Navigation msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'home',
  components: {
    Navigation
  }
}
</script>
