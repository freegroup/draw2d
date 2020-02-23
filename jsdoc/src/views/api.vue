<template>
  <div class="about">

    <Navigation/>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Api',

  components: {
    Navigation
  }
}
</script>
