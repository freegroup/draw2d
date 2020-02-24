<template>
  <div class="ma-2" style="min-height: 100vw;">
   <div class="headline">
      {{section.text}}
   </div>
    <v-layout row wrap>
        <v-card
          class="ma-4"
          v-for="example in section.children"
          :key="example.name"
          max-width="350"
          elevation="2"
          :to="example.data.path"
          hover
          light
        >
          <v-card-subtitle>
            {{example.text}}
          </v-card-subtitle>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
             <v-card-text v-text="example.description"></v-card-text>
            </div>
            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img
                :src="'./examples/'+example.name+'/icon.png'"
                width="120"
                height="90"
                class="preview"
                ></v-img>
            </v-avatar>
          </div>
        </v-card>

    </v-layout>
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
<style>

.preview{
  border: 1px solid #80808030;
}
</style>
