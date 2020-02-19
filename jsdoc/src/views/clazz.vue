<template>
  <div>
    <h2>Package: <b>{{ clazz.namespace }}</b></h2>
    <h2>Class: <b>{{ $attrs.className }}</b></h2>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      clazz: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      console.log(this.$attrs.className)
      this.loading = true
      axios.get('/data/' + this.$attrs.className + '.json')
        .then(response => {
          this.loading = false
          this.clazz = response.data
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
</script>
