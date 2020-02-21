<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <div class="page">
      <h2>{{ $attrs.className }}</h2>
      <div v-if="clazz.namespaces.length > 0 ">
        <h3>Namespaces</h3>
        <ul class="namespaces">
          <li v-for="item in clazz.namespaces" :key="item.name">
            <router-link :to="'/'+item.namespace.split('.').join('/')+'/'+item.name.toLowerCase()">{{item.name}}</router-link>
          </li>
        </ul>
      </div>

      <div v-if="clazz.classes.length > 0 ">
        <h3>Classes</h3>
        <ul class="classes">
          <li v-for="item in clazz.classes" :key="item.name">
            <router-link :to="'/'+item.namespace.split('.').join('/')+'/'+item.name.toLowerCase()">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
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
  computed: {
    items () {
      if (this.clazz.namespace) {
        let segments = this.clazz.namespace.split('.')
        let path = ''
        segments = segments.map(s => {
          path = path + '/' + s
          return { text: s, disabled: false, href: path }
        })
        return segments
      }
      return []
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      axios.get('<%= BASE_URL %>/data/' + this.$attrs.className + '.json')
        .then(response => {
          this.loading = false
          this.clazz = response.data
          this.clazz.classes = this.clazz.classes || []
          this.clazz.namespaces = this.clazz.namespaces || []
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
body{
  font-family: "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
}
h2{
  margin-top: 0;
  margin-bottom: 10.5px;
  font-size: 32px;
  font-weight: 300;
  color: #dd6288;
}

h3{
  margin-top: 21px;
  margin-bottom: 10.5px;
  font-size: 26px;
  font-weight: 300;
}

h4{
  margin-top: 16px;
  margin-bottom: 10.5px;
  font-size: 19px;
  font-weight: 300;
}
.page{
  padding:15px;
  padding-left:0px;
  padding-top:0;
}

.classes {
  border-left: 8px solid #00BCD4;
  list-style-type: none;
  background-color: rgba(0,0,0,0.02);
  padding-top: 10px;
  padding-bottom: 10px;
}

.namespaces {
  border-left: 8px solid #dd6288;
  list-style-type: none;
  background-color: rgba(0,0,0,0.02);
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>

<style>
  body{
    font-family: "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
  }
  .v-breadcrumbs{
    padding-bottom:0;
    padding-left:0 !important;
  }
  .v-data-table p{
    margin:0 !important;
  }
</style>
