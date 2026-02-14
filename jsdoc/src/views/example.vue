<template>
  <div class="example-container">
    <div class="example-card">
      <div class="example-header">
        <div class="example-info">
          <h2 class="example-title">{{ example.text }}</h2>
          <p class="example-description">{{ example.description }}</p>
        </div>
        <a class="github-link" target="_blank" :href="'https://github.com/freegroup/draw2d/tree/master/examples/'+example.url.replace('index.html','')">
          <v-icon small class="mr-1">code</v-icon>
          View Source
        </a>
      </div>
      <div class="example-content">
        <iframe :src="'examples/'+example.url" class="example-iframe"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
  components: {},
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
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.example = this.examples[this.$attrs.section].children[this.$attrs.example]
    }
  }
}
</script>

<style scoped>
.example-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.example-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.example-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
  flex-shrink: 0;
}

.example-info {
  flex: 1;
  padding-right: 16px;
  min-width: 0;
}

.example-title {
  color: #1a1a2e;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  letter-spacing: -0.3px;
}

.example-description {
  color: #6b7280;
  font-size: 13px;
  line-height: 1.4;
  margin: 0;
}

.github-link {
  display: flex;
  align-items: center;
  color: #667eea;
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 16px;
  background: rgba(102, 126, 234, 0.1);
  transition: all 0.2s;
  flex-shrink: 0;
}

.github-link:hover {
  background: rgba(102, 126, 234, 0.2);
}

.github-link .v-icon {
  color: #667eea;
}

.example-content {
  flex: 1;
  position: relative;
  background: #fafafa;
  min-height: 0;
}

.example-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
