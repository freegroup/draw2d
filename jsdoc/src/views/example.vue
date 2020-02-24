<template>
  <div  style="min-height: 100%;min-width:100%">
    <div style="position:absolute">
      <v-icon>arrow_forward</v-icon><a target="_examples" :href="'https://github.com/freegroup/draw2d/tree/master/examples/'+example.url.replace('index.html','')"> Source on Github</a>
    </div>
    <iframe :src="'examples/'+example.url" width="100%" height="100%" style="margin-top:40px;height: calc(100% - 40px); min-width:100%;;position:absolute">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'Example',

  components: {
  },
  data () {
    return {
      example: {}
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    examples () {
      return this.$router.options.examples
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.example = this.examples[this.$attrs.section].children[this.$attrs.example]
    }
  }
}
</script>

<style>
</style>
