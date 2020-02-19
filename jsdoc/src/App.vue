<template>
  <v-app>
    <v-app-bar app color="primary" clipped-left >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn  href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text >
        <span class="mr-2">Latest lll Release</span>
        <v-icon>open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <Navigation v-model="drawer"  />

    <v-content>
      <router-view/>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'App',

  components: {
    Navigation
  },
  data: () => ({
    drawer: true
  })
}
</script>
