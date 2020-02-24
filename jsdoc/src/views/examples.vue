<template>
  <div class="examples">

    <Navigation/>

    <v-content>
      <v-container fluid>
        Examples
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
import Navigation from '@/components/ExamplesNavigation.vue'

export default {
  name: 'Examples',

  components: {
    Navigation
  }
}
</script>
