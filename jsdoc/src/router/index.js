import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/draw2d/geo',
    name: 'geo',
    props: { className: 'geo' },
    component: () => import(/* webpackChunkName: "draw2d_geo" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io',
    name: 'io',
    props: { className: 'io' },
    component: () => import(/* webpackChunkName: "draw2d_io" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io/json',
    name: 'json',
    props: { className: 'json' },
    component: () => import(/* webpackChunkName: "draw2d_io_json" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io/png',
    name: 'png',
    props: { className: 'png' },
    component: () => import(/* webpackChunkName: "draw2d_io_png" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io/svg',
    name: 'svg',
    props: { className: 'svg' },
    component: () => import(/* webpackChunkName: "draw2d_io_svg" */ '../views/package.vue')
  },
  {
    path: '/draw2d/storage',
    name: 'storage',
    props: { className: 'storage' },
    component: () => import(/* webpackChunkName: "draw2d_storage" */ '../views/package.vue')
  },
  {
    path: '/draw2d/util',
    name: 'util',
    props: { className: 'util' },
    component: () => import(/* webpackChunkName: "draw2d_util" */ '../views/package.vue')
  },
  {
    path: '/draw2d/util/spline',
    name: 'spline',
    props: { className: 'spline' },
    component: () => import(/* webpackChunkName: "draw2d_util_spline" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy',
    name: 'policy',
    props: { className: 'policy' },
    component: () => import(/* webpackChunkName: "draw2d_policy" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/canvas',
    name: 'canvas',
    props: { className: 'canvas' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/connection',
    name: 'connection',
    props: { className: 'connection' },
    component: () => import(/* webpackChunkName: "draw2d_policy_connection" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/line',
    name: 'line',
    props: { className: 'line' },
    component: () => import(/* webpackChunkName: "draw2d_policy_line" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/port',
    name: 'port',
    props: { className: 'port' },
    component: () => import(/* webpackChunkName: "draw2d_policy_port" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/figure',
    name: 'figure',
    props: { className: 'figure' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape',
    name: 'shape',
    props: { className: 'shape' },
    component: () => import(/* webpackChunkName: "draw2d_shape" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/basic',
    name: 'basic',
    props: { className: 'basic' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/dimetric',
    name: 'dimetric',
    props: { className: 'dimetric' },
    component: () => import(/* webpackChunkName: "draw2d_shape_dimetric" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/composition',
    name: 'composition',
    props: { className: 'composition' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composition" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/arrow',
    name: 'arrow',
    props: { className: 'arrow' },
    component: () => import(/* webpackChunkName: "draw2d_shape_arrow" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/node',
    name: 'node',
    props: { className: 'node' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/note',
    name: 'note',
    props: { className: 'note' },
    component: () => import(/* webpackChunkName: "draw2d_shape_note" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/diagram',
    name: 'diagram',
    props: { className: 'diagram' },
    component: () => import(/* webpackChunkName: "draw2d_shape_diagram" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/flowchart',
    name: 'flowchart',
    props: { className: 'flowchart' },
    component: () => import(/* webpackChunkName: "draw2d_shape_flowchart" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/analog',
    name: 'analog',
    props: { className: 'analog' },
    component: () => import(/* webpackChunkName: "draw2d_shape_analog" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/icon',
    name: 'icon',
    props: { className: 'icon' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/layout',
    name: 'layout',
    props: { className: 'layout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/pert',
    name: 'pert',
    props: { className: 'pert' },
    component: () => import(/* webpackChunkName: "draw2d_shape_pert" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/state',
    name: 'state',
    props: { className: 'state' },
    component: () => import(/* webpackChunkName: "draw2d_shape_state" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/widget',
    name: 'widget',
    props: { className: 'widget' },
    component: () => import(/* webpackChunkName: "draw2d_shape_widget" */ '../views/package.vue')
  },
  {
    path: '/draw2d/command',
    name: 'command',
    props: { className: 'command' },
    component: () => import(/* webpackChunkName: "draw2d_command" */ '../views/package.vue')
  },
  {
    path: '/draw2d/decoration',
    name: 'decoration',
    props: { className: 'decoration' },
    component: () => import(/* webpackChunkName: "draw2d_decoration" */ '../views/package.vue')
  },
  {
    path: '/draw2d/decoration/connection',
    name: 'connection',
    props: { className: 'connection' },
    component: () => import(/* webpackChunkName: "draw2d_decoration_connection" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout',
    name: 'layout',
    props: { className: 'layout' },
    component: () => import(/* webpackChunkName: "draw2d_layout" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/connection',
    name: 'connection',
    props: { className: 'connection' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/anchor',
    name: 'anchor',
    props: { className: 'anchor' },
    component: () => import(/* webpackChunkName: "draw2d_layout_anchor" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/mesh',
    name: 'mesh',
    props: { className: 'mesh' },
    component: () => import(/* webpackChunkName: "draw2d_layout_mesh" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/locator',
    name: 'locator',
    props: { className: 'locator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator" */ '../views/package.vue')
  },
  {
    path: '/draw2d/ui',
    name: 'ui',
    props: { className: 'ui' },
    component: () => import(/* webpackChunkName: "draw2d_ui" */ '../views/package.vue')
  },
  {
    path: '/draw2d',
    props: { className: 'draw2d' },
    name: 'draw2d',
    component: () => import(/* webpackChunkName: "draw2d" */ '../views/package.vue')
  }
]

const tree = [
  {
    data: { path: '/draw2d' },
    text: 'draw2d',
    children: [
      {
        data: { path: '/draw2d/geo' },
        text: 'geo'
      },
      {
        data: { path: '/draw2d/io' },
        text: 'io',
        children: [
          {
            data: { path: '/draw2d/io/json' },
            text: 'json'
          },
          {
            data: { path: '/draw2d/io/png' },
            text: 'png'
          },
          {
            data: { path: '/draw2d/io/svg' },
            text: 'svg'
          }
        ]
      },
      {
        data: { path: '/draw2d/storage' },
        text: 'storage'
      },
      {
        data: { path: '/draw2d/util' },
        text: 'util',
        children: [
          {
            data: { path: '/draw2d/util/spline' },
            text: 'spline'
          }
        ]
      },
      {
        data: { path: '/draw2d/policy' },
        text: 'policy',
        children: [
          {
            data: { path: '/draw2d/policy/canvas' },
            text: 'canvas'
          },
          {
            data: { path: '/draw2d/policy/connection' },
            text: 'connection'
          },
          {
            data: { path: '/draw2d/policy/line' },
            text: 'line'
          },
          {
            data: { path: '/draw2d/policy/port' },
            text: 'port'
          },
          {
            data: { path: '/draw2d/policy/figure' },
            text: 'figure'
          }
        ]
      },
      {
        data: { path: '/draw2d/shape' },
        text: 'shape',
        children: [
          {
            data: { path: '/draw2d/shape/basic' },
            text: 'basic'
          },
          {
            data: { path: '/draw2d/shape/dimetric' },
            text: 'dimetric'
          },
          {
            data: { path: '/draw2d/shape/composition' },
            text: 'composition'
          },
          {
            data: { path: '/draw2d/shape/arrow' },
            text: 'arrow'
          },
          {
            data: { path: '/draw2d/shape/node' },
            text: 'node'
          },
          {
            data: { path: '/draw2d/shape/note' },
            text: 'note'
          },
          {
            data: { path: '/draw2d/shape/diagram' },
            text: 'diagram'
          },
          {
            data: { path: '/draw2d/shape/flowchart' },
            text: 'flowchart'
          },
          {
            data: { path: '/draw2d/shape/analog' },
            text: 'analog'
          },
          {
            data: { path: '/draw2d/shape/icon' },
            text: 'icon'
          },
          {
            data: { path: '/draw2d/shape/layout' },
            text: 'layout'
          },
          {
            data: { path: '/draw2d/shape/pert' },
            text: 'pert'
          },
          {
            data: { path: '/draw2d/shape/state' },
            text: 'state'
          },
          {
            data: { path: '/draw2d/shape/widget' },
            text: 'widget'
          }
        ]
      },
      {
        data: { path: '/draw2d/command' },
        text: 'command'
      },
      {
        data: { path: '/draw2d/decoration' },
        text: 'decoration',
        children: [
          {
            data: { path: '/draw2d/decoration/connection' },
            text: 'connection'
          }
        ]
      },
      {
        data: { path: '/draw2d/layout' },
        text: 'layout',
        children: [
          {
            data: { path: '/draw2d/layout/connection' },
            text: 'connection'
          },
          {
            data: { path: '/draw2d/layout/anchor' },
            text: 'anchor'
          },
          {
            data: { path: '/draw2d/layout/mesh' },
            text: 'mesh'
          },
          {
            data: { path: '/draw2d/layout/locator' },
            text: 'locator'
          }
        ]
      },
      {
        data: { path: '/draw2d/ui' },
        text: 'ui'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  tree,
  routes
})

export default router
