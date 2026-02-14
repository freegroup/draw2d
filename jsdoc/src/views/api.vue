<template>
  <div style="width:100%" class="mt-5">
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
