<template>
  <div class="examples">
        Section: {{section.text}}

    <v-card
      class="d-flex flex-wrap"
      color="grey lighten-2"
      flat
      tile
    >
      <v-card
        v-for="example in section.children"
        :key="example.name"
        class="pa-2"
        outlined
        tile
      >
        {{example.name}}
      </v-card>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'ExamplesSection',

  components: {
  },
  data () {
    return {
      loading: false,
      section: {}
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
      this.section = this.examples[this.$attrs.index]
    }
  }
}
</script>
