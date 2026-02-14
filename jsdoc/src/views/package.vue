<template>
  <div class="api-container">
    <div class="api-card">
      <div class="api-header">
        <v-breadcrumbs :items="items" class="api-breadcrumbs"></v-breadcrumbs>
      </div>
      <div class="api-content">
        <h2 class="api-title">{{ $attrs.className }}</h2>
        <p class="api-description" v-html="clazz.description"></p>

        <div v-if="clazz.namespaces.length > 0" class="api-section">
          <h3 class="section-title">Namespaces</h3>
          <ul class="namespaces">
            <li v-for="item in clazz.namespaces" :key="item.name">
              <router-link :to="'/api/'+item.namespace.split('.').join('/')+'/'+item.name.toLowerCase()">{{item.name}}</router-link>
            </li>
          </ul>
        </div>

        <div v-if="clazz.classes.length > 0" class="api-section">
          <h3 class="section-title">Classes</h3>
          <ul class="classes">
            <li v-for="item in clazz.classes" :key="item.name">
              <router-link :to="'/api/'+item.namespace.split('.').join('/')+'/'+item.name.toLowerCase()">{{item.name}}</router-link>
            </li>
          </ul>
        </div>
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
    '$route': 'fetchData'
  },
  computed: {
    items () {
      if (this.clazz.namespace) {
        let segments = this.clazz.namespace.split('.')
        let path = '#/api'
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
      axios.get('./data/' + this.$attrs.className + '.json')
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

<style scoped>
.api-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  overflow: auto;
}

.api-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  min-height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid lightgray;
}

.api-header {
  padding: 12px 20px 0 20px;
  background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
  border-bottom: 1px solid #f0f0f0;
}

.api-breadcrumbs {
  padding: 0 !important;
  padding-bottom: 8px !important;
}

.api-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.api-title {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 300;
  color: #dd6288;
  letter-spacing: -0.5px;
}

.api-description {
  color: #4a5568;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.api-section {
  margin-top: 24px;
}

.section-title {
  margin: 0 0 12px 0;
  font-size: 22px;
  font-weight: 500;
  color: #2d3748;
}

.classes {
  border-left: 4px solid #00BCD4;
  list-style-type: none;
  background: linear-gradient(135deg, rgba(0,188,212,0.05) 0%, rgba(0,188,212,0.02) 100%);
  padding: 16px 20px;
  margin: 0;
  border-radius: 0 8px 8px 0;
}

.classes li {
  padding: 6px 0;
}

.classes a {
  color: #00838f;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.classes a:hover {
  color: #006064;
}

.namespaces {
  border-left: 4px solid #dd6288;
  list-style-type: none;
  background: linear-gradient(135deg, rgba(221,98,136,0.05) 0%, rgba(221,98,136,0.02) 100%);
  padding: 16px 20px;
  margin: 0;
  border-radius: 0 8px 8px 0;
}

.namespaces li {
  padding: 6px 0;
}

.namespaces a {
  color: #c2185b;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.namespaces a:hover {
  color: #880e4f;
}
</style>