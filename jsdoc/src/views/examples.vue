<template>
  <div style="min-height: 100%; min-width:100%;" class="mt-5">
    <Navigation/>
    <router-view></router-view>
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
