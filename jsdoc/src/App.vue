<template>
  <v-app class="beemusic-app">
    <v-app-bar app
               clipped-left
               height="56"
               flat
               class="beemusic-header">
      <div class="header-content">
        <div class="d-flex align-center">
          <v-img
            alt="Draw2D Logo"
            class="shrink mr-3"
            contain
            src="./assets/logo.svg"
            transition="scale-transition"
            width="28"
          />
          <span class="header-title">Draw2D JavaScript graph and diagramming lib</span>
        </div>
        <v-spacer></v-spacer>
        <a href="https://github.com/freegroup/draw2d/releases/latest" target="_blank" class="release-btn">
          <span>Latest Release</span>
          <v-icon small class="ml-1">open_in_new</v-icon>
        </a>
      </div>
      <template v-slot:extension>
        <div class="tabs-container">
          <router-link to="/api" class="nav-tab" :class="{ active: $route.path.startsWith('/api') }">
            API
          </router-link>
          <router-link to="/examples" class="nav-tab" :class="{ active: $route.path.startsWith('/examples') }">
            Examples
          </router-link>
        </div>
      </template>
    </v-app-bar>

    <v-content class="main-content">
      <v-container fluid ma-0 pa-0 fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({})
}
</script>

<style>
/* BeeMusic-inspired App Styles */
.beemusic-app {
  background: #f8f9fa !important;
}

.beemusic-header {
  background: white !important;
  border-bottom: 1px solid #eee !important;
  box-shadow: none !important;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 8px;
}

.header-title {
  color: #1a1a2e;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.release-btn {
  display: flex;
  align-items: center;
  color: #667eea;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(102, 126, 234, 0.1);
  transition: all 0.2s;
}

.release-btn:hover {
  background: rgba(102, 126, 234, 0.2);
}

.tabs-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  width: 100%;
  background: #f8f9fa;
  border-top: 1px solid #eee;
}

.nav-tab {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 10px;
  transition: all 0.2s ease;
  background: transparent;
}

.nav-tab:hover {
  background: #e9ecef;
  color: #333;
}

.nav-tab.active {
  color: white;
  background: #1a1a2e;
  font-weight: 600;
}

.main-content {
  background: transparent !important;
}

/* Override Vuetify defaults */
.v-toolbar__extension {
  padding: 0 !important;
}
</style>
