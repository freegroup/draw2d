<template>
  <div>
    <h2>Package: <b>{{ $attrs.className }}</b></h2>
    <div v-if="clazz.namespaces.length > 0 ">
      <h3>Namespaces</h3>
      <ul id="example-1">
        <li v-for="item in clazz.namespaces" :key="item.name">
          <router-link :to="'/'+item.namespace.split('.').join('/')+'/'+item.name.toLowerCase()">{{item.name}}</router-link>
        </li>
      </ul>
    </div>

    <div v-if="clazz.classes.length > 0 ">
      <h3>Classes</h3>
      <ul id="example-2">
        <li v-for="item in clazz.classes" :key="item.name">
          <router-link :to="'/'+item.namespace.split('.').join('/')+'/'+item.name.toLowerCase()">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      clazz: {
        namespaces: [],
        classes: []
      }
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
          this.clazz.classes = this.clazz.classes || []
          this.clazz.namespaces = this.clazz.namespaces || []
          console.log(this.clazz)
        })
        .catch(error => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
</script>
