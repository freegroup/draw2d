<template>
  <v-app>
    <!-- Hauptbereich mit AppBar oben -->
    <v-app-bar
      app
      clipped-left
      height="100"
      extension-height="50"
      flat
      dark
      color="#1a1a2e"
      :style="{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }"
    >
      <!-- Hauptbereich der AppBar -->
      <v-toolbar-title class="d-flex align-center">
        <v-img
          alt="Draw2D Logo"
          contain
          src="./assets/logo.svg"
          max-width="36"
          class="mr-3"
        />
        <div class="d-flex flex-column">
          <span class="text-h6 font-weight-bold white--text">Draw2D</span>
          <span class="caption white--text text--lighten-2" style="opacity: 0.7">
            Interactive diagrams & visual editing
          </span>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- GitHub Link -->
      <v-btn
        href="https://github.com/freegroup/draw2d"
        target="_blank"
        text
        class="mr-2"
      >
        <v-icon left small>mdi-github</v-icon>GitHub
      </v-btn>

      <!-- Release Button -->
      <v-btn
        href="https://github.com/freegroup/draw2d/releases/latest"
        target="_blank"
        rounded
        small
        color="#667eea"
        class="font-weight-bold"
      >
        v@VERSION@
        <v-icon right small>mdi-open-in-new</v-icon>
      </v-btn>

      <!-- Extension Slot für Tabs -->
      <template v-slot:extension>
        <v-tabs
          background-color="white"
          color="#1a1a2e"
          slider-color="#1a1a2e"
        >
          <v-tab to="/api" class="tab-item">
            <v-icon left small>mdi-book-open-variant</v-icon>API Reference
          </v-tab>

          <v-tab to="/examples" class="tab-item">
            <v-icon left small>mdi-view-grid</v-icon>Examples
          </v-tab>

        </v-tabs>
      </template>
    </v-app-bar>

    <!-- Hauptinhalt -->
    <v-main>
      <v-container fluid class="pt-5 fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({})
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.v-application {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

/* Schatten für AppBar */
.v-app-bar {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
}

/* Tabs styling */
.v-tabs .v-tab {
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0;
  color: rgba(0, 0, 0, 0.6) !important;
}

.v-tabs .v-tab--active {
  font-weight: 600;
  color: #1a1a2e !important;
}

/* Main content spacing - add extra margin below the app bar */
.v-main__wrap {
  margin-top: 20px;
}
</style>