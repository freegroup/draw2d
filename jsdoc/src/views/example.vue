<template>
  <div  style="min-height: 100%;min-width:100%">
    <iframe :src="'examples/'+example.url" width="100%" height="100%" style="min-height: 100%;min-width:100%;;position:absolute">
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
