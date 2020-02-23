<template>
  <v-navigation-drawer app clipped  >
    <input type="text" placeholder="Type to filter..." v-model="treeFilter" class="filter-field">
    <tree
      :data="routes"
      :options="treeOptions"
      :filter="treeFilter"
      v-model="selectedNode">
      <div slot-scope="{ node }">
        <router-link class="node-text" :to="node.data.path" exact>{{ node.text }}</router-link>
      </div>
    </tree>
  </v-navigation-drawer>
</template>
<style>

  .filter-field {
    display: block;
    width: 100%;
    padding: 3px;
    border: 1px solid #e8e8e8;
  }
  .tree-root {
    padding: 1px;
    box-sizing: border-box;
    font-size: 12px;
    font-family: sans-serif;
  }
  .tree-content {
    display: flex;
    align-items: center;
    padding: 0 !important;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
  }
  .tree-children {
    padding: 0 !important;
    padding-left: 15px !important;
  }
  .tree-node.selected>.tree-content {
    background-color: rgba(231, 238, 247, 0.19) !important;
  }
  .tree-node:not(.selected)>.tree-content:hover {
    background: rgba(246, 248, 251, 0.13) !important;
  }

  .tree-arrow.expanded.has-child:after {
    transform: rotate(45deg) translateY(-50%) translateX(-2px) !important;
  }
  .tree-arrow {
    margin-left: 15px !important;
  }
  .tree-arrow.has-child {
    width: 15px !important;
    margin-left: 0px !important;
  }
  .tree-arrow.has-child:after {
    position: absolute;
    left: 5px !important;
    top: 50%;
    height: 5px !important;
    width: 5px !important;
    transform: rotate(-45deg) translateY(-50%) translateX(0);
    transition: transform .25s;
    transform-origin: center;
    border: 1px solid black !important;
    border-left: 0 !important;
    border-top: 0 !important;
  }
  .tree-anchor {
    flex-grow: 2;
    outline: 0;
    display: flex;
    text-decoration: none;
    vertical-align: top;
    margin-left: 0 !important;
    padding: 0 !important;
    user-select: none;
  }

  .node-text{
    color: #2196f3 !important;
    font-size: 14px !important;
    padding-left: 5px !important;
    text-decoration: none  !important;
  }

</style>

<script>
export default {
  props: [
  ],
  name: 'home',
  computed: {
    routes () {
      return this.$router.options.tree
    }
  },
  data: () => {
    return {
      selectedNode: null,
      treeFilter: '',
      treeOptions: {
        multiple: false,
        filter: {
          plainList: true
        }
      }
    }
  }
}
</script>
