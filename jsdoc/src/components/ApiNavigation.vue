<template>
  <v-navigation-drawer app clipped permanent class="nav-sidebar">
    <div class="sidebar-header">
      <img src="../assets/logo.svg" alt="Draw2D" class="sidebar-logo" />
      <span class="sidebar-title">Draw2D</span>
    </div>
    <div class="search-container">
      <v-icon class="search-icon" size="18">search</v-icon>
      <input type="text" placeholder="Search API..." v-model="searchText" class="filter-field">
    </div>
    <v-treeview
      :items="treeItems"
      :search="searchText"
      :open.sync="openItems"
      item-key="id"
      item-text="name"
      dense
      hoverable
      activatable
      :active.sync="activeItems"
      open-on-click
      class="nav-tree"
    >
      <template v-slot:label="{ item }">
        <router-link
          :to="item.path"
          class="tree-link"
          :class="{ 'active-link': isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </template>
    </v-treeview>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'ApiNavigation',
  data () {
    return {
      searchText: '',
      openItems: [],
      activeItems: []
    }
  },
  computed: {
    treeItems () {
      return this.convertTree(this.$router.options.tree)
    }
  },
  methods: {
    convertTree (nodes, parentId = '') {
      if (!nodes) return []
      return nodes.map((node, index) => {
        const id = parentId ? `${parentId}-${index}` : `${index}`
        return {
          id,
          name: node.text,
          path: node.data?.path || '',
          children: node.children ? this.convertTree(node.children, id) : undefined
        }
      })
    },
    isActive (path) {
      return this.$route.path === path
    }
  }
}
</script>

<style scoped>
.nav-sidebar {
  background: white !important;
  border-right: 1px solid #eee !important;
  padding-top: 20px !important;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-logo {
  width: 28px;
  height: 28px;
}

.sidebar-title {
  color: #1a1a2e;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.search-container {
  position: relative;
  padding: 12px 16px;
}

.search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.filter-field {
  display: block;
  width: 100%;
  padding: 10px 10px 10px 36px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #f5f5f5;
  color: #333;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.filter-field::placeholder {
  color: #999;
}

.filter-field:focus {
  border-color: #667eea;
  background: white;
}

.tree-link {
  color: #333 !important;
  text-decoration: none !important;
  font-size: 13px;
  display: block;
  padding: 2px 0;
}

.tree-link:hover {
  color: #1976D2 !important;
}

.tree-link.active-link {
  color: #D81B60 !important;
  font-weight: 600;
}
</style>

<style>
/* Global styles for v-treeview - reduced indentation */
.nav-sidebar .v-treeview {
  padding: 4px 8px !important;
}

.nav-sidebar .v-treeview-node__root {
  min-height: 28px !important;
  padding-left: 0 !important;
}

.nav-sidebar .v-treeview-node__content {
  margin-left: 0 !important;
}

.nav-sidebar .v-treeview-node__label {
  font-size: 13px !important;
}

.nav-sidebar .v-treeview-node__level {
  width: 12px !important;
}

.nav-sidebar .v-treeview-node--leaf > .v-treeview-node__root {
  padding-left: 8px !important;
}

.nav-sidebar .v-treeview-node__toggle {
  color: #666 !important;
  width: 20px !important;
}

.nav-sidebar .v-treeview-node__prepend {
  min-width: 0 !important;
}
</style>