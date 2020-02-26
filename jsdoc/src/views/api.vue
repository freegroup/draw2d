<template>
  <div style="width:100%">
    <Navigation/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/ApiNavigation.vue'

export default {
  name: 'Api',

  components: {
    Navigation
  }
}
</script>
