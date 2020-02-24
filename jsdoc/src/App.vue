<template>
  <v-app>
    <v-app-bar app
               color="primary"
               clipped-left
               height="20"
               elevate-on-scroll
               shrink-on-scroll
               fade-img-on-scroll>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title>Draw2D JavaScript graph and diagramming lib</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn  href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text >
        <span class="mr-2">Latest Release</span>
        <v-icon>open-in-new</v-icon>
      </v-btn>

        <template v-slot:extension>
          <v-tabs
            light
            color="white"
            background-color="#e91e63"
          >
            <v-tab to="/api">API</v-tab>
            <v-tab to="/examples">Examples</v-tab>
          </v-tabs>
        </template>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid ma-0 pa-0  fill-height>
        <router-view>
        </router-view>
      </v-container>
    </v-content>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({

    items: [
      'Appetizers', 'Entrees', 'Deserts', 'Cocktails'
    ]
  })
}
</script>

<style>
.v-toolbar__title {
  color:white !important;
}
</style>
