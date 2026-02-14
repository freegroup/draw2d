import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/api/draw2d'
  },
  {
    path: '/api',
    component: () => import(/* webpackChunkName: "api" */ '../views/api.vue'),
    children: [
      {
        path: '/api/draw2d/geo',
        props: { className: 'draw2d.geo' },
        component: () => import(/* webpackChunkName: "api_draw2d_geo" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/geo/point',
        props: { className: 'draw2d.geo.Point' },
        component: () => import(/* webpackChunkName: "api_draw2d_geo_point" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/geo/positionconstants',
        props: { className: 'draw2d.geo.PositionConstants' },
        component: () => import(/* webpackChunkName: "api_draw2d_geo_positionconstants" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/geo/ray',
        props: { className: 'draw2d.geo.Ray' },
        component: () => import(/* webpackChunkName: "api_draw2d_geo_ray" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/geo/rectangle',
        props: { className: 'draw2d.geo.Rectangle' },
        component: () => import(/* webpackChunkName: "api_draw2d_geo_rectangle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/geo/util',
        props: { className: 'draw2d.geo.Util' },
        component: () => import(/* webpackChunkName: "api_draw2d_geo_util" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/io',
        props: { className: 'draw2d.io' },
        component: () => import(/* webpackChunkName: "api_draw2d_io" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/io/json',
        props: { className: 'draw2d.io.json' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_json" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/io/json/reader',
        props: { className: 'draw2d.io.json.Reader' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_json_reader" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/io/json/writer',
        props: { className: 'draw2d.io.json.Writer' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_json_writer" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/io/png',
        props: { className: 'draw2d.io.png' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_png" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/io/png/writer',
        props: { className: 'draw2d.io.png.Writer' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_png_writer" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/io/svg',
        props: { className: 'draw2d.io.svg' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_svg" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/io/svg/writer',
        props: { className: 'draw2d.io.svg.Writer' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_svg_writer" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/io/reader',
        props: { className: 'draw2d.io.Reader' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_reader" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/io/writer',
        props: { className: 'draw2d.io.Writer' },
        component: () => import(/* webpackChunkName: "api_draw2d_io_writer" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/util',
        props: { className: 'draw2d.util' },
        component: () => import(/* webpackChunkName: "api_draw2d_util" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/util/spline',
        props: { className: 'draw2d.util.spline' },
        component: () => import(/* webpackChunkName: "api_draw2d_util_spline" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/util/spline/catmullromspline',
        props: { className: 'draw2d.util.spline.CatmullRomSpline' },
        component: () => import(/* webpackChunkName: "api_draw2d_util_spline_catmullromspline" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/util/spline/cubicspline',
        props: { className: 'draw2d.util.spline.CubicSpline' },
        component: () => import(/* webpackChunkName: "api_draw2d_util_spline_cubicspline" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/util/arraylist',
        props: { className: 'draw2d.util.ArrayList' },
        component: () => import(/* webpackChunkName: "api_draw2d_util_arraylist" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/util/color',
        props: { className: 'draw2d.util.Color' },
        component: () => import(/* webpackChunkName: "api_draw2d_util_color" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/util/uuid',
        props: { className: 'draw2d.util.UUID' },
        component: () => import(/* webpackChunkName: "api_draw2d_util_uuid" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy',
        props: { className: 'draw2d.policy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/policy/canvas',
        props: { className: 'draw2d.policy.canvas' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/boundingboxselectionpolicy',
        props: { className: 'draw2d.policy.canvas.BoundingboxSelectionPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_boundingboxselectionpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/canvaspolicy',
        props: { className: 'draw2d.policy.canvas.CanvasPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_canvaspolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/coronadecorationpolicy',
        props: { className: 'draw2d.policy.canvas.CoronaDecorationPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_coronadecorationpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/decorationpolicy',
        props: { className: 'draw2d.policy.canvas.DecorationPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_decorationpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/defaultkeyboardpolicy',
        props: { className: 'draw2d.policy.canvas.DefaultKeyboardPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_defaultkeyboardpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/dropinterceptorpolicy',
        props: { className: 'draw2d.policy.canvas.DropInterceptorPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_dropinterceptorpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/extendedkeyboardpolicy',
        props: { className: 'draw2d.policy.canvas.ExtendedKeyboardPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_extendedkeyboardpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/fadeoutdecorationpolicy',
        props: { className: 'draw2d.policy.canvas.FadeoutDecorationPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_fadeoutdecorationpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/ghostmoveselectionpolicy',
        props: { className: 'draw2d.policy.canvas.GhostMoveSelectionPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_ghostmoveselectionpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/keyboardpolicy',
        props: { className: 'draw2d.policy.canvas.KeyboardPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_keyboardpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/panningselectionpolicy',
        props: { className: 'draw2d.policy.canvas.PanningSelectionPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_panningselectionpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/readonlyselectionpolicy',
        props: { className: 'draw2d.policy.canvas.ReadOnlySelectionPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_readonlyselectionpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/selectionpolicy',
        props: { className: 'draw2d.policy.canvas.SelectionPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_selectionpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/showchessboardeditpolicy',
        props: { className: 'draw2d.policy.canvas.ShowChessboardEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_showchessboardeditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/showdimetricgrideditpolicy',
        props: { className: 'draw2d.policy.canvas.ShowDimetricGridEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_showdimetricgrideditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/showdoteditpolicy',
        props: { className: 'draw2d.policy.canvas.ShowDotEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_showdoteditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/showgrideditpolicy',
        props: { className: 'draw2d.policy.canvas.ShowGridEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_showgrideditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/singleselectionpolicy',
        props: { className: 'draw2d.policy.canvas.SingleSelectionPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_singleselectionpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/snaptocentereditpolicy',
        props: { className: 'draw2d.policy.canvas.SnapToCenterEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_snaptocentereditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/snaptodimetricgrideditpolicy',
        props: { className: 'draw2d.policy.canvas.SnapToDimetricGridEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_snaptodimetricgrideditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/snaptoeditpolicy',
        props: { className: 'draw2d.policy.canvas.SnapToEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_snaptoeditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/snaptogeometryeditpolicy',
        props: { className: 'draw2d.policy.canvas.SnapToGeometryEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_snaptogeometryeditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/snaptogrideditpolicy',
        props: { className: 'draw2d.policy.canvas.SnapToGridEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_snaptogrideditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/snaptoinbetweeneditpolicy',
        props: { className: 'draw2d.policy.canvas.SnapToInBetweenEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_snaptoinbetweeneditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/snaptoverticeseditpolicy',
        props: { className: 'draw2d.policy.canvas.SnapToVerticesEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_snaptoverticeseditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/wheelzoompolicy',
        props: { className: 'draw2d.policy.canvas.WheelZoomPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_wheelzoompolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/canvas/zoompolicy',
        props: { className: 'draw2d.policy.canvas.ZoomPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_canvas_zoompolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/connection',
        props: { className: 'draw2d.policy.connection' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_connection" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/policy/line',
        props: { className: 'draw2d.policy.line' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_line" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/policy/line/lineselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.line.LineSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_line_lineselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/line/vertexselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.line.VertexSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_line_vertexselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/port',
        props: { className: 'draw2d.policy.port' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_port" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/policy/port/elasticstrapfeedbackpolicy',
        props: { className: 'draw2d.policy.port.ElasticStrapFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_port_elasticstrapfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/port/intrusiveportsfeedbackpolicy',
        props: { className: 'draw2d.policy.port.IntrusivePortsFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_port_intrusiveportsfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/port/portfeedbackpolicy',
        props: { className: 'draw2d.policy.port.PortFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_port_portfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure',
        props: { className: 'draw2d.policy.figure' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/policy/figure/antselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.AntSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_antselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/bigrectangleselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_bigrectangleselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/busselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.BusSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_busselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/dragdropeditpolicy',
        props: { className: 'draw2d.policy.figure.DragDropEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_dragdropeditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/figureeditpolicy',
        props: { className: 'draw2d.policy.figure.FigureEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_figureeditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/glowselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.GlowSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_glowselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/horizontaleditpolicy',
        props: { className: 'draw2d.policy.figure.HorizontalEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_horizontaleditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/raftselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.RaftSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_raftselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/rectangleselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.RectangleSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_rectangleselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/regioneditpolicy',
        props: { className: 'draw2d.policy.figure.RegionEditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_regioneditpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/resizeselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.ResizeSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_resizeselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/roundrectangleselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_roundrectangleselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/selectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.SelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_selectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/selectionpolicy',
        props: { className: 'draw2d.policy.figure.SelectionPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_selectionpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/slimselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.SlimSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_slimselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/vertexselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.VertexSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_vertexselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/figure/widthselectionfeedbackpolicy',
        props: { className: 'draw2d.policy.figure.WidthSelectionFeedbackPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_figure_widthselectionfeedbackpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/policy/editpolicy',
        props: { className: 'draw2d.policy.EditPolicy' },
        component: () => import(/* webpackChunkName: "api_draw2d_policy_editpolicy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape',
        props: { className: 'draw2d.shape' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/basic',
        props: { className: 'draw2d.shape.basic' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/basic/arc',
        props: { className: 'draw2d.shape.basic.Arc' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_arc" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/circle',
        props: { className: 'draw2d.shape.basic.Circle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_circle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/diamond',
        props: { className: 'draw2d.shape.basic.Diamond' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_diamond" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/ghostvertexresizehandle',
        props: { className: 'draw2d.shape.basic.GhostVertexResizeHandle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_ghostvertexresizehandle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/image',
        props: { className: 'draw2d.shape.basic.Image' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_image" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/label',
        props: { className: 'draw2d.shape.basic.Label' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_label" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/line',
        props: { className: 'draw2d.shape.basic.Line' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_line" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/lineendresizehandle',
        props: { className: 'draw2d.shape.basic.LineEndResizeHandle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_lineendresizehandle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/lineresizehandle',
        props: { className: 'draw2d.shape.basic.LineResizeHandle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_lineresizehandle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/linestartresizehandle',
        props: { className: 'draw2d.shape.basic.LineStartResizeHandle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_linestartresizehandle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/oval',
        props: { className: 'draw2d.shape.basic.Oval' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_oval" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/polyline',
        props: { className: 'draw2d.shape.basic.PolyLine' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_polyline" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/polygon',
        props: { className: 'draw2d.shape.basic.Polygon' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_polygon" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/rectangle',
        props: { className: 'draw2d.shape.basic.Rectangle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_rectangle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/text',
        props: { className: 'draw2d.shape.basic.Text' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_text" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/basic/vertexresizehandle',
        props: { className: 'draw2d.shape.basic.VertexResizeHandle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_basic_vertexresizehandle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/dimetric',
        props: { className: 'draw2d.shape.dimetric' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_dimetric" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/dimetric/rectangle',
        props: { className: 'draw2d.shape.dimetric.Rectangle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_dimetric_rectangle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/composite',
        props: { className: 'draw2d.shape.composite' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/composite/composite',
        props: { className: 'draw2d.shape.composite.Composite' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite_composite" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/composite/group',
        props: { className: 'draw2d.shape.composite.Group' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite_group" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/composite/jailhouse',
        props: { className: 'draw2d.shape.composite.Jailhouse' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite_jailhouse" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/composite/raft',
        props: { className: 'draw2d.shape.composite.Raft' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite_raft" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/composite/raftresizehandle',
        props: { className: 'draw2d.shape.composite.RaftResizeHandle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite_raftresizehandle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/composite/strongcomposite',
        props: { className: 'draw2d.shape.composite.StrongComposite' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite_strongcomposite" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/composite/weakcomposite',
        props: { className: 'draw2d.shape.composite.WeakComposite' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_composite_weakcomposite" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/arrow',
        props: { className: 'draw2d.shape.arrow' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_arrow" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/arrow/calligrapherarrowdownleft',
        props: { className: 'draw2d.shape.arrow.CalligrapherArrowDownLeft' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_arrow_calligrapherarrowdownleft" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/arrow/calligrapherarrowleft',
        props: { className: 'draw2d.shape.arrow.CalligrapherArrowLeft' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_arrow_calligrapherarrowleft" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node',
        props: { className: 'draw2d.shape.node' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/node/between',
        props: { className: 'draw2d.shape.node.Between' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_between" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node/end',
        props: { className: 'draw2d.shape.node.End' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_end" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node/fulcrum',
        props: { className: 'draw2d.shape.node.Fulcrum' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_fulcrum" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node/horizontalbus',
        props: { className: 'draw2d.shape.node.HorizontalBus' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_horizontalbus" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node/hub',
        props: { className: 'draw2d.shape.node.Hub' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_hub" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node/node',
        props: { className: 'draw2d.shape.node.Node' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_node" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node/start',
        props: { className: 'draw2d.shape.node.Start' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_start" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/node/verticalbus',
        props: { className: 'draw2d.shape.node.VerticalBus' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_node_verticalbus" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/note',
        props: { className: 'draw2d.shape.note' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_note" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/note/markdown',
        props: { className: 'draw2d.shape.note.Markdown' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_note_markdown" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/note/postit',
        props: { className: 'draw2d.shape.note.PostIt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_note_postit" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/diagram',
        props: { className: 'draw2d.shape.diagram' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_diagram" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/diagram/diagram',
        props: { className: 'draw2d.shape.diagram.Diagram' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_diagram_diagram" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/diagram/pie',
        props: { className: 'draw2d.shape.diagram.Pie' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_diagram_pie" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/diagram/sparkline',
        props: { className: 'draw2d.shape.diagram.Sparkline' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_diagram_sparkline" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/flowchart',
        props: { className: 'draw2d.shape.flowchart' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_flowchart" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/flowchart/document',
        props: { className: 'draw2d.shape.flowchart.Document' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_flowchart_document" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/analog',
        props: { className: 'draw2d.shape.analog' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_analog" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/analog/opamp',
        props: { className: 'draw2d.shape.analog.OpAmp' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_analog_opamp" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/analog/resistorbridge',
        props: { className: 'draw2d.shape.analog.ResistorBridge' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_analog_resistorbridge" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/analog/resistorvertical',
        props: { className: 'draw2d.shape.analog.ResistorVertical' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_analog_resistorvertical" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/analog/voltagesupplyhorizontal',
        props: { className: 'draw2d.shape.analog.VoltageSupplyHorizontal' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_analog_voltagesupplyhorizontal" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/analog/voltagesupplyvertical',
        props: { className: 'draw2d.shape.analog.VoltageSupplyVertical' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_analog_voltagesupplyvertical" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon',
        props: { className: 'draw2d.shape.icon' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/icon/acw',
        props: { className: 'draw2d.shape.icon.Acw' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_acw" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/alarm',
        props: { className: 'draw2d.shape.icon.Alarm' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_alarm" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/anonymous',
        props: { className: 'draw2d.shape.icon.Anonymous' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_anonymous" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/apple',
        props: { className: 'draw2d.shape.icon.Apple' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_apple" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/apps',
        props: { className: 'draw2d.shape.icon.Apps' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_apps" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowalt',
        props: { className: 'draw2d.shape.icon.ArrowAlt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowalt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowdown',
        props: { className: 'draw2d.shape.icon.ArrowDown' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowdown" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowleft',
        props: { className: 'draw2d.shape.icon.ArrowLeft' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowleft" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowleft2',
        props: { className: 'draw2d.shape.icon.ArrowLeft2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowleft2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowleftalt',
        props: { className: 'draw2d.shape.icon.ArrowLeftAlt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowleftalt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowright',
        props: { className: 'draw2d.shape.icon.ArrowRight' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowright" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowright2',
        props: { className: 'draw2d.shape.icon.ArrowRight2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowright2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/arrowup',
        props: { className: 'draw2d.shape.icon.ArrowUp' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_arrowup" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/attention',
        props: { className: 'draw2d.shape.icon.Attention' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_attention" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/aumade',
        props: { className: 'draw2d.shape.icon.Aumade' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_aumade" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/barchart',
        props: { className: 'draw2d.shape.icon.BarChart' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_barchart" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/biohazard',
        props: { className: 'draw2d.shape.icon.BioHazard' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_biohazard" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/book',
        props: { className: 'draw2d.shape.icon.Book' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_book" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/bookmark',
        props: { className: 'draw2d.shape.icon.Bookmark' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_bookmark" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/books',
        props: { className: 'draw2d.shape.icon.Books' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_books" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/bubble',
        props: { className: 'draw2d.shape.icon.Bubble' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_bubble" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/bug',
        props: { className: 'draw2d.shape.icon.Bug' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_bug" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/calendar',
        props: { className: 'draw2d.shape.icon.Calendar' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_calendar" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/cart',
        props: { className: 'draw2d.shape.icon.Cart' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_cart" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ccw',
        props: { className: 'draw2d.shape.icon.Ccw' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ccw" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/chat',
        props: { className: 'draw2d.shape.icon.Chat' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_chat" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/check',
        props: { className: 'draw2d.shape.icon.Check' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_check" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/chrome',
        props: { className: 'draw2d.shape.icon.Chrome' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_chrome" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/clip',
        props: { className: 'draw2d.shape.icon.Clip' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_clip" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/clock',
        props: { className: 'draw2d.shape.icon.Clock' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_clock" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/cloud',
        props: { className: 'draw2d.shape.icon.Cloud' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_cloud" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/cloud2',
        props: { className: 'draw2d.shape.icon.Cloud2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_cloud2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/clouddown',
        props: { className: 'draw2d.shape.icon.CloudDown' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_clouddown" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/cloudup',
        props: { className: 'draw2d.shape.icon.CloudUp' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_cloudup" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/cloudy',
        props: { className: 'draw2d.shape.icon.Cloudy' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_cloudy" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/code',
        props: { className: 'draw2d.shape.icon.Code' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_code" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/codetalk',
        props: { className: 'draw2d.shape.icon.CodeTalk' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_codetalk" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/commandline',
        props: { className: 'draw2d.shape.icon.CommandLine' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_commandline" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/connect',
        props: { className: 'draw2d.shape.icon.Connect' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_connect" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/contract',
        props: { className: 'draw2d.shape.icon.Contract' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_contract" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/crop',
        props: { className: 'draw2d.shape.icon.Crop' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_crop" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/cross',
        props: { className: 'draw2d.shape.icon.Cross' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_cross" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/cube',
        props: { className: 'draw2d.shape.icon.Cube' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_cube" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/customer',
        props: { className: 'draw2d.shape.icon.Customer' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_customer" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/db',
        props: { className: 'draw2d.shape.icon.Db' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_db" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/detour',
        props: { className: 'draw2d.shape.icon.Detour' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_detour" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/diagram',
        props: { className: 'draw2d.shape.icon.Diagram' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_diagram" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/disconnect',
        props: { className: 'draw2d.shape.icon.Disconnect' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_disconnect" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/dockbottom',
        props: { className: 'draw2d.shape.icon.DockBottom' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_dockbottom" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/dockleft',
        props: { className: 'draw2d.shape.icon.DockLeft' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_dockleft" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/dockright',
        props: { className: 'draw2d.shape.icon.DockRight' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_dockright" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/docktop',
        props: { className: 'draw2d.shape.icon.DockTop' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_docktop" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/dollar',
        props: { className: 'draw2d.shape.icon.Dollar' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_dollar" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/download',
        props: { className: 'draw2d.shape.icon.Download' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_download" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/dry',
        props: { className: 'draw2d.shape.icon.Dry' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_dry" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/employee',
        props: { className: 'draw2d.shape.icon.Employee' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_employee" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/end',
        props: { className: 'draw2d.shape.icon.End' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_end" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ethernet',
        props: { className: 'draw2d.shape.icon.Ethernet' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ethernet" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/exchange',
        props: { className: 'draw2d.shape.icon.Exchange' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_exchange" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/expand',
        props: { className: 'draw2d.shape.icon.Expand' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_expand" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/export',
        props: { className: 'draw2d.shape.icon.Export' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_export" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/fave',
        props: { className: 'draw2d.shape.icon.Fave' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_fave" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/feed',
        props: { className: 'draw2d.shape.icon.Feed' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_feed" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ff',
        props: { className: 'draw2d.shape.icon.Ff' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ff" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/firefox',
        props: { className: 'draw2d.shape.icon.Firefox' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_firefox" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/flag',
        props: { className: 'draw2d.shape.icon.Flag' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_flag" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/flickr',
        props: { className: 'draw2d.shape.icon.Flickr' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_flickr" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/folder',
        props: { className: 'draw2d.shape.icon.Folder' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_folder" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/font',
        props: { className: 'draw2d.shape.icon.Font' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_font" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/fork',
        props: { className: 'draw2d.shape.icon.Fork' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_fork" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/forkalt',
        props: { className: 'draw2d.shape.icon.ForkAlt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_forkalt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/fullcube',
        props: { className: 'draw2d.shape.icon.FullCube' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_fullcube" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/future',
        props: { className: 'draw2d.shape.icon.Future' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_future" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/graphael',
        props: { className: 'draw2d.shape.icon.GRaphael' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_graphael" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/gear',
        props: { className: 'draw2d.shape.icon.Gear' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_gear" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/gear2',
        props: { className: 'draw2d.shape.icon.Gear2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_gear2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/github',
        props: { className: 'draw2d.shape.icon.GitHub' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_github" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/githubalt',
        props: { className: 'draw2d.shape.icon.GitHubAlt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_githubalt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/glasses',
        props: { className: 'draw2d.shape.icon.Glasses' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_glasses" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/globe',
        props: { className: 'draw2d.shape.icon.Globe' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_globe" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/globealt',
        props: { className: 'draw2d.shape.icon.GlobeAlt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_globealt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/globealt2',
        props: { className: 'draw2d.shape.icon.GlobeAlt2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_globealt2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/hail',
        props: { className: 'draw2d.shape.icon.Hail' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_hail" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/hammer',
        props: { className: 'draw2d.shape.icon.Hammer' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_hammer" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/hammerandscrewdriver',
        props: { className: 'draw2d.shape.icon.HammerAndScrewDriver' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_hammerandscrewdriver" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/hangup',
        props: { className: 'draw2d.shape.icon.HangUp' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_hangup" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/help',
        props: { className: 'draw2d.shape.icon.Help' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_help" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/history',
        props: { className: 'draw2d.shape.icon.History' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_history" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/home',
        props: { className: 'draw2d.shape.icon.Home' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_home" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/imac',
        props: { className: 'draw2d.shape.icon.IMac' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_imac" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/icon',
        props: { className: 'draw2d.shape.icon.Icon' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_icon" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/icons',
        props: { className: 'draw2d.shape.icon.Icons' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_icons" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ie',
        props: { className: 'draw2d.shape.icon.Ie' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ie" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ie9',
        props: { className: 'draw2d.shape.icon.Ie9' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ie9" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/import',
        props: { className: 'draw2d.shape.icon.Import' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_import" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/info',
        props: { className: 'draw2d.shape.icon.Info' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_info" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/inkscape',
        props: { className: 'draw2d.shape.icon.InkScape' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_inkscape" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ipad',
        props: { className: 'draw2d.shape.icon.Ipad' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ipad" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/iphone',
        props: { className: 'draw2d.shape.icon.Iphone' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_iphone" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/jquery',
        props: { className: 'draw2d.shape.icon.JQuery' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_jquery" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/jigsaw',
        props: { className: 'draw2d.shape.icon.Jigsaw' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_jigsaw" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/key',
        props: { className: 'draw2d.shape.icon.Key' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_key" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/lab',
        props: { className: 'draw2d.shape.icon.Lab' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_lab" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/lamp',
        props: { className: 'draw2d.shape.icon.Lamp' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_lamp" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/lamp_alt',
        props: { className: 'draw2d.shape.icon.Lamp_alt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_lamp_alt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/landing',
        props: { className: 'draw2d.shape.icon.Landing' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_landing" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/landscape1',
        props: { className: 'draw2d.shape.icon.Landscape1' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_landscape1" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/landscape2',
        props: { className: 'draw2d.shape.icon.Landscape2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_landscape2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/linechart',
        props: { className: 'draw2d.shape.icon.LineChart' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_linechart" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/link',
        props: { className: 'draw2d.shape.icon.Link' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_link" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/linkedin',
        props: { className: 'draw2d.shape.icon.LinkedIn' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_linkedin" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/linux',
        props: { className: 'draw2d.shape.icon.Linux' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_linux" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/list',
        props: { className: 'draw2d.shape.icon.List' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_list" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/location',
        props: { className: 'draw2d.shape.icon.Location' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_location" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/lock',
        props: { className: 'draw2d.shape.icon.Lock' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_lock" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/locked',
        props: { className: 'draw2d.shape.icon.Locked' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_locked" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/magic',
        props: { className: 'draw2d.shape.icon.Magic' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_magic" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/magnet',
        props: { className: 'draw2d.shape.icon.Magnet' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_magnet" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/mail',
        props: { className: 'draw2d.shape.icon.Mail' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_mail" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/man',
        props: { className: 'draw2d.shape.icon.Man' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_man" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/merge',
        props: { className: 'draw2d.shape.icon.Merge' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_merge" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/mic',
        props: { className: 'draw2d.shape.icon.Mic' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_mic" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/micmute',
        props: { className: 'draw2d.shape.icon.MicMute' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_micmute" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/minus',
        props: { className: 'draw2d.shape.icon.Minus' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_minus" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/newwindow',
        props: { className: 'draw2d.shape.icon.NewWindow' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_newwindow" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/no',
        props: { className: 'draw2d.shape.icon.No' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_no" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/nomagnet',
        props: { className: 'draw2d.shape.icon.NoMagnet' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_nomagnet" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/nodejs',
        props: { className: 'draw2d.shape.icon.NodeJs' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_nodejs" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/notebook',
        props: { className: 'draw2d.shape.icon.Notebook' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_notebook" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/noview',
        props: { className: 'draw2d.shape.icon.Noview' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_noview" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/opera',
        props: { className: 'draw2d.shape.icon.Opera' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_opera" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/package',
        props: { className: 'draw2d.shape.icon.Package' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_package" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/page',
        props: { className: 'draw2d.shape.icon.Page' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_page" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/page2',
        props: { className: 'draw2d.shape.icon.Page2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_page2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/pallete',
        props: { className: 'draw2d.shape.icon.Pallete' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_pallete" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/palm',
        props: { className: 'draw2d.shape.icon.Palm' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_palm" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/paper',
        props: { className: 'draw2d.shape.icon.Paper' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_paper" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/parent',
        props: { className: 'draw2d.shape.icon.Parent' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_parent" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/pc',
        props: { className: 'draw2d.shape.icon.Pc' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_pc" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/pen',
        props: { className: 'draw2d.shape.icon.Pen' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_pen" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/pensil',
        props: { className: 'draw2d.shape.icon.Pensil' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_pensil" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/people',
        props: { className: 'draw2d.shape.icon.People' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_people" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/phone',
        props: { className: 'draw2d.shape.icon.Phone' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_phone" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/photo',
        props: { className: 'draw2d.shape.icon.Photo' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_photo" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/picker',
        props: { className: 'draw2d.shape.icon.Picker' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_picker" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/picture',
        props: { className: 'draw2d.shape.icon.Picture' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_picture" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/piechart',
        props: { className: 'draw2d.shape.icon.PieChart' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_piechart" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/plane',
        props: { className: 'draw2d.shape.icon.Plane' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_plane" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/plugin',
        props: { className: 'draw2d.shape.icon.Plugin' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_plugin" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/plus',
        props: { className: 'draw2d.shape.icon.Plus' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_plus" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/power',
        props: { className: 'draw2d.shape.icon.Power' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_power" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ppt',
        props: { className: 'draw2d.shape.icon.Ppt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ppt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/printer',
        props: { className: 'draw2d.shape.icon.Printer' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_printer" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/question',
        props: { className: 'draw2d.shape.icon.Question' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_question" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/question2',
        props: { className: 'draw2d.shape.icon.Question2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_question2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/quote',
        props: { className: 'draw2d.shape.icon.Quote' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_quote" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/rain',
        props: { className: 'draw2d.shape.icon.Rain' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_rain" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/raphael',
        props: { className: 'draw2d.shape.icon.Raphael' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_raphael" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/reflecth',
        props: { className: 'draw2d.shape.icon.ReflectH' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_reflecth" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/reflectv',
        props: { className: 'draw2d.shape.icon.ReflectV' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_reflectv" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/refresh',
        props: { className: 'draw2d.shape.icon.Refresh' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_refresh" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/resize2',
        props: { className: 'draw2d.shape.icon.Resize2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_resize2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/rotate',
        props: { className: 'draw2d.shape.icon.Rotate' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_rotate" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/ruler',
        props: { className: 'draw2d.shape.icon.Ruler' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_ruler" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/run',
        props: { className: 'draw2d.shape.icon.Run' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_run" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/rw',
        props: { className: 'draw2d.shape.icon.Rw' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_rw" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/safari',
        props: { className: 'draw2d.shape.icon.Safari' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_safari" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/screwdriver',
        props: { className: 'draw2d.shape.icon.ScrewDriver' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_screwdriver" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/search',
        props: { className: 'draw2d.shape.icon.Search' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_search" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/sencha',
        props: { className: 'draw2d.shape.icon.Sencha' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_sencha" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/settings',
        props: { className: 'draw2d.shape.icon.Settings' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_settings" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/settingsalt',
        props: { className: 'draw2d.shape.icon.SettingsAlt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_settingsalt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/shuffle',
        props: { className: 'draw2d.shape.icon.Shuffle' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_shuffle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/skull',
        props: { className: 'draw2d.shape.icon.Skull' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_skull" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/skype',
        props: { className: 'draw2d.shape.icon.Skype' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_skype" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/slideshare',
        props: { className: 'draw2d.shape.icon.SlideShare' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_slideshare" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/smile',
        props: { className: 'draw2d.shape.icon.Smile' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_smile" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/smile2',
        props: { className: 'draw2d.shape.icon.Smile2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_smile2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/snow',
        props: { className: 'draw2d.shape.icon.Snow' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_snow" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/split',
        props: { className: 'draw2d.shape.icon.Split' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_split" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/star',
        props: { className: 'draw2d.shape.icon.Star' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_star" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/star2',
        props: { className: 'draw2d.shape.icon.Star2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_star2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/star2off',
        props: { className: 'draw2d.shape.icon.Star2Off' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_star2off" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/star3',
        props: { className: 'draw2d.shape.icon.Star3' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_star3" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/star3off',
        props: { className: 'draw2d.shape.icon.Star3Off' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_star3off" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/staroff',
        props: { className: 'draw2d.shape.icon.StarOff' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_staroff" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/start',
        props: { className: 'draw2d.shape.icon.Start' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_start" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/sticker',
        props: { className: 'draw2d.shape.icon.Sticker' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_sticker" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/stop',
        props: { className: 'draw2d.shape.icon.Stop' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_stop" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/stopsign',
        props: { className: 'draw2d.shape.icon.StopSign' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_stopsign" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/stopwatch',
        props: { className: 'draw2d.shape.icon.StopWatch' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_stopwatch" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/sun',
        props: { className: 'draw2d.shape.icon.Sun' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_sun" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/svg',
        props: { className: 'draw2d.shape.icon.Svg' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_svg" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/tshirt',
        props: { className: 'draw2d.shape.icon.TShirt' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_tshirt" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/tag',
        props: { className: 'draw2d.shape.icon.Tag' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_tag" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/takeoff',
        props: { className: 'draw2d.shape.icon.TakeOff' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_takeoff" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/talke',
        props: { className: 'draw2d.shape.icon.Talke' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_talke" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/talkq',
        props: { className: 'draw2d.shape.icon.Talkq' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_talkq" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/temp',
        props: { className: 'draw2d.shape.icon.Temp' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_temp" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/thunder',
        props: { className: 'draw2d.shape.icon.Thunder' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_thunder" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/trash',
        props: { className: 'draw2d.shape.icon.Trash' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_trash" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/twitter',
        props: { className: 'draw2d.shape.icon.Twitter' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_twitter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/twitterbird',
        props: { className: 'draw2d.shape.icon.TwitterBird' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_twitterbird" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/umbrella',
        props: { className: 'draw2d.shape.icon.Umbrella' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_umbrella" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/undo',
        props: { className: 'draw2d.shape.icon.Undo' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_undo" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/unlock',
        props: { className: 'draw2d.shape.icon.Unlock' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_unlock" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/usb',
        props: { className: 'draw2d.shape.icon.Usb' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_usb" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/user',
        props: { className: 'draw2d.shape.icon.User' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_user" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/users',
        props: { className: 'draw2d.shape.icon.Users' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_users" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/video',
        props: { className: 'draw2d.shape.icon.Video' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_video" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/view',
        props: { className: 'draw2d.shape.icon.View' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_view" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/vim',
        props: { className: 'draw2d.shape.icon.Vim' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_vim" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/volume0',
        props: { className: 'draw2d.shape.icon.Volume0' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_volume0" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/volume1',
        props: { className: 'draw2d.shape.icon.Volume1' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_volume1" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/volume2',
        props: { className: 'draw2d.shape.icon.Volume2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_volume2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/volume3',
        props: { className: 'draw2d.shape.icon.Volume3' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_volume3" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/warning',
        props: { className: 'draw2d.shape.icon.Warning' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_warning" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/wheelchair',
        props: { className: 'draw2d.shape.icon.WheelChair' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_wheelchair" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/windows',
        props: { className: 'draw2d.shape.icon.Windows' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_windows" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/woman',
        props: { className: 'draw2d.shape.icon.Woman' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_woman" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/wrench',
        props: { className: 'draw2d.shape.icon.Wrench' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_wrench" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/wrench2',
        props: { className: 'draw2d.shape.icon.Wrench2' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_wrench2" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/wrench3',
        props: { className: 'draw2d.shape.icon.Wrench3' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_wrench3" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/zoomin',
        props: { className: 'draw2d.shape.icon.ZoomIn' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_zoomin" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/icon/zoomout',
        props: { className: 'draw2d.shape.icon.ZoomOut' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_icon_zoomout" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/layout',
        props: { className: 'draw2d.shape.layout' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_layout" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/layout/flexgridlayout',
        props: { className: 'draw2d.shape.layout.FlexGridLayout' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_layout_flexgridlayout" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/layout/horizontallayout',
        props: { className: 'draw2d.shape.layout.HorizontalLayout' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_layout_horizontallayout" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/layout/layout',
        props: { className: 'draw2d.shape.layout.Layout' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_layout_layout" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/layout/stacklayout',
        props: { className: 'draw2d.shape.layout.StackLayout' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_layout_stacklayout" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/layout/tablelayout',
        props: { className: 'draw2d.shape.layout.TableLayout' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_layout_tablelayout" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/layout/verticallayout',
        props: { className: 'draw2d.shape.layout.VerticalLayout' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_layout_verticallayout" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/box',
        props: { className: 'draw2d.shape.box' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_box" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/box/box',
        props: { className: 'draw2d.shape.box.Box' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_box_box" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/box/gridbox',
        props: { className: 'draw2d.shape.box.GridBox' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_box_gridbox" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/box/hbox',
        props: { className: 'draw2d.shape.box.HBox' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_box_hbox" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/box/stackbox',
        props: { className: 'draw2d.shape.box.StackBox' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_box_stackbox" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/box/tablebox',
        props: { className: 'draw2d.shape.box.TableBox' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_box_tablebox" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/box/vbox',
        props: { className: 'draw2d.shape.box.VBox' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_box_vbox" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/pert',
        props: { className: 'draw2d.shape.pert' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_pert" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/pert/activity',
        props: { className: 'draw2d.shape.pert.Activity' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_pert_activity" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/pert/start',
        props: { className: 'draw2d.shape.pert.Start' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_pert_start" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/state',
        props: { className: 'draw2d.shape.state' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_state" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/state/connection',
        props: { className: 'draw2d.shape.state.Connection' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_state_connection" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/state/end',
        props: { className: 'draw2d.shape.state.End' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_state_end" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/state/start',
        props: { className: 'draw2d.shape.state.Start' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_state_start" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/state/state',
        props: { className: 'draw2d.shape.state.State' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_state_state" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/widget',
        props: { className: 'draw2d.shape.widget' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_widget" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/shape/widget/slider',
        props: { className: 'draw2d.shape.widget.Slider' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_widget_slider" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/shape/widget/widget',
        props: { className: 'draw2d.shape.widget.Widget' },
        component: () => import(/* webpackChunkName: "api_draw2d_shape_widget_widget" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command',
        props: { className: 'draw2d.command' },
        component: () => import(/* webpackChunkName: "api_draw2d_command" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/command/command',
        props: { className: 'draw2d.command.Command' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_command" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandadd',
        props: { className: 'draw2d.command.CommandAdd' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandadd" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandaddvertex',
        props: { className: 'draw2d.command.CommandAddVertex' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandaddvertex" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandassignfigure',
        props: { className: 'draw2d.command.CommandAssignFigure' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandassignfigure" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandattr',
        props: { className: 'draw2d.command.CommandAttr' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandattr" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandboundingbox',
        props: { className: 'draw2d.command.CommandBoundingBox' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandboundingbox" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandcollection',
        props: { className: 'draw2d.command.CommandCollection' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandcollection" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandconnect',
        props: { className: 'draw2d.command.CommandConnect' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandconnect" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commanddelete',
        props: { className: 'draw2d.command.CommandDelete' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commanddelete" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commanddeletegroup',
        props: { className: 'draw2d.command.CommandDeleteGroup' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commanddeletegroup" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandgroup',
        props: { className: 'draw2d.command.CommandGroup' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandgroup" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandmove',
        props: { className: 'draw2d.command.CommandMove' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandmove" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandmoveconnection',
        props: { className: 'draw2d.command.CommandMoveConnection' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandmoveconnection" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandmoveline',
        props: { className: 'draw2d.command.CommandMoveLine' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandmoveline" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandmovevertex',
        props: { className: 'draw2d.command.CommandMoveVertex' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandmovevertex" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandmovevertices',
        props: { className: 'draw2d.command.CommandMoveVertices' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandmovevertices" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandreconnect',
        props: { className: 'draw2d.command.CommandReconnect' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandreconnect" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandremovevertex',
        props: { className: 'draw2d.command.CommandRemoveVertex' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandremovevertex" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandreplacevertices',
        props: { className: 'draw2d.command.CommandReplaceVertices' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandreplacevertices" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandresize',
        props: { className: 'draw2d.command.CommandResize' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandresize" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandrotate',
        props: { className: 'draw2d.command.CommandRotate' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandrotate" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandstack',
        props: { className: 'draw2d.command.CommandStack' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandstack" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandstackevent',
        props: { className: 'draw2d.command.CommandStackEvent' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandstackevent" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandstackeventlistener',
        props: { className: 'draw2d.command.CommandStackEventListener' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandstackeventlistener" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandtype',
        props: { className: 'draw2d.command.CommandType' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandtype" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/command/commandungroup',
        props: { className: 'draw2d.command.CommandUngroup' },
        component: () => import(/* webpackChunkName: "api_draw2d_command_commandungroup" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/decoration',
        props: { className: 'draw2d.decoration' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/decoration/connection',
        props: { className: 'draw2d.decoration.connection' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/decoration/connection/arrowdecorator',
        props: { className: 'draw2d.decoration.connection.ArrowDecorator' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection_arrowdecorator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/decoration/connection/bardecorator',
        props: { className: 'draw2d.decoration.connection.BarDecorator' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection_bardecorator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/decoration/connection/circledecorator',
        props: { className: 'draw2d.decoration.connection.CircleDecorator' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection_circledecorator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/decoration/connection/decorator',
        props: { className: 'draw2d.decoration.connection.Decorator' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection_decorator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/decoration/connection/diamonddecorator',
        props: { className: 'draw2d.decoration.connection.DiamondDecorator' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection_diamonddecorator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/decoration/connection/doublebardecorator',
        props: { className: 'draw2d.decoration.connection.DoubleBarDecorator' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection_doublebardecorator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/decoration/connection/openarrowdecorator',
        props: { className: 'draw2d.decoration.connection.OpenArrowDecorator' },
        component: () => import(/* webpackChunkName: "api_draw2d_decoration_connection_openarrowdecorator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout',
        props: { className: 'draw2d.layout' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/layout/connection',
        props: { className: 'draw2d.layout.connection' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/layout/connection/circuitconnectionrouter',
        props: { className: 'draw2d.layout.connection.CircuitConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_circuitconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/connectionrouter',
        props: { className: 'draw2d.layout.connection.ConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_connectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/directrouter',
        props: { className: 'draw2d.layout.connection.DirectRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_directrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/fanconnectionrouter',
        props: { className: 'draw2d.layout.connection.FanConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_fanconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/interactivemanhattanconnectionrouter',
        props: { className: 'draw2d.layout.connection.InteractiveManhattanConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_interactivemanhattanconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/manhattanbridgedconnectionrouter',
        props: { className: 'draw2d.layout.connection.ManhattanBridgedConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_manhattanbridgedconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/manhattanconnectionrouter',
        props: { className: 'draw2d.layout.connection.ManhattanConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_manhattanconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/muteablemanhattanconnectionrouter',
        props: { className: 'draw2d.layout.connection.MuteableManhattanConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_muteablemanhattanconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/rubberbandrouter',
        props: { className: 'draw2d.layout.connection.RubberbandRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_rubberbandrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/sketchconnectionrouter',
        props: { className: 'draw2d.layout.connection.SketchConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_sketchconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/splineconnectionrouter',
        props: { className: 'draw2d.layout.connection.SplineConnectionRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_splineconnectionrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/connection/vertexrouter',
        props: { className: 'draw2d.layout.connection.VertexRouter' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_connection_vertexrouter" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/anchor',
        props: { className: 'draw2d.layout.anchor' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_anchor" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/layout/anchor/centeredgeconnectionanchor',
        props: { className: 'draw2d.layout.anchor.CenterEdgeConnectionAnchor' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_anchor_centeredgeconnectionanchor" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/anchor/chopboxconnectionanchor',
        props: { className: 'draw2d.layout.anchor.ChopboxConnectionAnchor' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_anchor_chopboxconnectionanchor" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/anchor/connectionanchor',
        props: { className: 'draw2d.layout.anchor.ConnectionAnchor' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_anchor_connectionanchor" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/anchor/fanconnectionanchor',
        props: { className: 'draw2d.layout.anchor.FanConnectionAnchor' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_anchor_fanconnectionanchor" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/anchor/shortespathconnectionanchor',
        props: { className: 'draw2d.layout.anchor.ShortesPathConnectionAnchor' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_anchor_shortespathconnectionanchor" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/mesh',
        props: { className: 'draw2d.layout.mesh' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_mesh" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/layout/locator',
        props: { className: 'draw2d.layout.locator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/layout/locator/bottomlocator',
        props: { className: 'draw2d.layout.locator.BottomLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_bottomlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/centerlocator',
        props: { className: 'draw2d.layout.locator.CenterLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_centerlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/connectionlocator',
        props: { className: 'draw2d.layout.locator.ConnectionLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_connectionlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/draggablelocator',
        props: { className: 'draw2d.layout.locator.DraggableLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_draggablelocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/inputportlocator',
        props: { className: 'draw2d.layout.locator.InputPortLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_inputportlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/leftlocator',
        props: { className: 'draw2d.layout.locator.LeftLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_leftlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/locator',
        props: { className: 'draw2d.layout.locator.Locator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_locator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/manhattanmidpointlocator',
        props: { className: 'draw2d.layout.locator.ManhattanMidpointLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_manhattanmidpointlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/outputportlocator',
        props: { className: 'draw2d.layout.locator.OutputPortLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_outputportlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/parallelmidpointlocator',
        props: { className: 'draw2d.layout.locator.ParallelMidpointLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_parallelmidpointlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/polylinemidpointlocator',
        props: { className: 'draw2d.layout.locator.PolylineMidpointLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_polylinemidpointlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/portlocator',
        props: { className: 'draw2d.layout.locator.PortLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_portlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/rightlocator',
        props: { className: 'draw2d.layout.locator.RightLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_rightlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/smartdraggablelocator',
        props: { className: 'draw2d.layout.locator.SmartDraggableLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_smartdraggablelocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/toplocator',
        props: { className: 'draw2d.layout.locator.TopLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_toplocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/xyabsportlocator',
        props: { className: 'draw2d.layout.locator.XYAbsPortLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_xyabsportlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/layout/locator/xyrelportlocator',
        props: { className: 'draw2d.layout.locator.XYRelPortLocator' },
        component: () => import(/* webpackChunkName: "api_draw2d_layout_locator_xyrelportlocator" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/ui',
        props: { className: 'draw2d.ui' },
        component: () => import(/* webpackChunkName: "api_draw2d_ui" */ '../views/package.vue')
      },
      {
        path: '/api/draw2d/ui/labeleditor',
        props: { className: 'draw2d.ui.LabelEditor' },
        component: () => import(/* webpackChunkName: "api_draw2d_ui_labeleditor" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/ui/labelinplaceeditor',
        props: { className: 'draw2d.ui.LabelInplaceEditor' },
        component: () => import(/* webpackChunkName: "api_draw2d_ui_labelinplaceeditor" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/canvas',
        props: { className: 'draw2d.Canvas' },
        component: () => import(/* webpackChunkName: "api_draw2d_canvas" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/connection',
        props: { className: 'draw2d.Connection' },
        component: () => import(/* webpackChunkName: "api_draw2d_connection" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/figure',
        props: { className: 'draw2d.Figure' },
        component: () => import(/* webpackChunkName: "api_draw2d_figure" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/headlesscanvas',
        props: { className: 'draw2d.HeadlessCanvas' },
        component: () => import(/* webpackChunkName: "api_draw2d_headlesscanvas" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/hybridport',
        props: { className: 'draw2d.HybridPort' },
        component: () => import(/* webpackChunkName: "api_draw2d_hybridport" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/inputport',
        props: { className: 'draw2d.InputPort' },
        component: () => import(/* webpackChunkName: "api_draw2d_inputport" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/outputport',
        props: { className: 'draw2d.OutputPort' },
        component: () => import(/* webpackChunkName: "api_draw2d_outputport" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/port',
        props: { className: 'draw2d.Port' },
        component: () => import(/* webpackChunkName: "api_draw2d_port" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/corona',
        props: { className: 'draw2d.Corona' },
        component: () => import(/* webpackChunkName: "api_draw2d_corona" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/resizehandle',
        props: { className: 'draw2d.ResizeHandle' },
        component: () => import(/* webpackChunkName: "api_draw2d_resizehandle" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/svgfigure',
        props: { className: 'draw2d.SVGFigure' },
        component: () => import(/* webpackChunkName: "api_draw2d_svgfigure" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/selection',
        props: { className: 'draw2d.Selection' },
        component: () => import(/* webpackChunkName: "api_draw2d_selection" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/setfigure',
        props: { className: 'draw2d.SetFigure' },
        component: () => import(/* webpackChunkName: "api_draw2d_setfigure" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d/vectorfigure',
        props: { className: 'draw2d.VectorFigure' },
        component: () => import(/* webpackChunkName: "api_draw2d_vectorfigure" */ '../views/clazz.vue')
      },
      {
        path: '/api/draw2d',
        props: { className: 'draw2d' },
        component: () => import(/* webpackChunkName: "api_draw2d" */ '../views/package.vue')
      }
    ]
  },
  {
    path: '/examples',
    component: () => import(/* webpackChunkName: "examples" */ '../views/examples.vue'),
    children: [
      {
        path: '/examples/section0',
        props: { index: 0 },
        component: () => import(/* webpackChunkName: "example_section0" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section1',
        props: { index: 1 },
        component: () => import(/* webpackChunkName: "example_section1" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section2',
        props: { index: 2 },
        component: () => import(/* webpackChunkName: "example_section2" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section3',
        props: { index: 3 },
        component: () => import(/* webpackChunkName: "example_section3" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section4',
        props: { index: 4 },
        component: () => import(/* webpackChunkName: "example_section4" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section5',
        props: { index: 5 },
        component: () => import(/* webpackChunkName: "example_section5" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section6',
        props: { index: 6 },
        component: () => import(/* webpackChunkName: "example_section6" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section7',
        props: { index: 7 },
        component: () => import(/* webpackChunkName: "example_section7" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section8',
        props: { index: 8 },
        component: () => import(/* webpackChunkName: "example_section8" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section9',
        props: { index: 9 },
        component: () => import(/* webpackChunkName: "example_section9" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section10',
        props: { index: 10 },
        component: () => import(/* webpackChunkName: "example_section10" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section11',
        props: { index: 11 },
        component: () => import(/* webpackChunkName: "example_section11" */ '../views/example_section.vue')
      },
      {
        path: '/examples/section12',
        props: { index: 12 },
        component: () => import(/* webpackChunkName: "example_section12" */ '../views/example_section.vue')
      },
      {
        path: '/examples/galerie_shape_basic',
        props: { section: 0, example: 0 },
        component: () => import(/* webpackChunkName: "example_galerie_shape_basic" */ '../views/example.vue')
      },
      {
        path: '/examples/galerie_shape_diagram',
        props: { section: 0, example: 1 },
        component: () => import(/* webpackChunkName: "example_galerie_shape_diagram" */ '../views/example.vue')
      },
      {
        path: '/examples/galerie_shape_analog',
        props: { section: 0, example: 2 },
        component: () => import(/* webpackChunkName: "example_galerie_shape_analog" */ '../views/example.vue')
      },
      {
        path: '/examples/galerie_shape_widget',
        props: { section: 0, example: 3 },
        component: () => import(/* webpackChunkName: "example_galerie_shape_widget" */ '../views/example.vue')
      },
      {
        path: '/examples/galerie_shape_icon',
        props: { section: 0, example: 4 },
        component: () => import(/* webpackChunkName: "example_galerie_shape_icon" */ '../views/example.vue')
      },
      {
        path: '/examples/galerie_shape_node',
        props: { section: 0, example: 5 },
        component: () => import(/* webpackChunkName: "example_galerie_shape_node" */ '../views/example.vue')
      },
      {
        path: '/examples/galerie_shape_note',
        props: { section: 0, example: 6 },
        component: () => import(/* webpackChunkName: "example_galerie_shape_note" */ '../views/example.vue')
      },
      {
        path: '/examples/galerie_box',
        props: { section: 1, example: 0 },
        component: () => import(/* webpackChunkName: "example_galerie_box" */ '../views/example.vue')
      },
      {
        path: '/examples/box_collapsible',
        props: { section: 1, example: 1 },
        component: () => import(/* webpackChunkName: "example_box_collapsible" */ '../views/example.vue')
      },
      {
        path: '/examples/box_tablelayout',
        props: { section: 1, example: 2 },
        component: () => import(/* webpackChunkName: "example_box_tablelayout" */ '../views/example.vue')
      },
      {
        path: '/examples/box_zoom_stack',
        props: { section: 1, example: 3 },
        component: () => import(/* webpackChunkName: "example_box_zoom_stack" */ '../views/example.vue')
      },
      {
        path: '/examples/box_mixed_layout',
        props: { section: 1, example: 4 },
        component: () => import(/* webpackChunkName: "example_box_mixed_layout" */ '../views/example.vue')
      },
      {
        path: '/examples/box_db',
        props: { section: 1, example: 5 },
        component: () => import(/* webpackChunkName: "example_box_db" */ '../views/example.vue')
      },
      {
        path: '/examples/box_gridbox',
        props: { section: 1, example: 6 },
        component: () => import(/* webpackChunkName: "example_box_gridbox" */ '../views/example.vue')
      },
      {
        path: '/examples/box_tablebox',
        props: { section: 1, example: 7 },
        component: () => import(/* webpackChunkName: "example_box_tablebox" */ '../views/example.vue')
      },
      {
        path: '/examples/composite_raft',
        props: { section: 2, example: 0 },
        component: () => import(/* webpackChunkName: "example_composite_raft" */ '../views/example.vue')
      },
      {
        path: '/examples/composite_group',
        props: { section: 2, example: 1 },
        component: () => import(/* webpackChunkName: "example_composite_group" */ '../views/example.vue')
      },
      {
        path: '/examples/composite_jailhouse',
        props: { section: 2, example: 2 },
        component: () => import(/* webpackChunkName: "example_composite_jailhouse" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_custom_simple',
        props: { section: 3, example: 0 },
        component: () => import(/* webpackChunkName: "example_shape_custom_simple" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_timer',
        props: { section: 3, example: 1 },
        component: () => import(/* webpackChunkName: "example_shape_timer" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_anim_circle',
        props: { section: 3, example: 2 },
        component: () => import(/* webpackChunkName: "example_shape_anim_circle" */ '../views/example.vue')
      },
      {
        path: '/examples/figure_locator',
        props: { section: 3, example: 3 },
        component: () => import(/* webpackChunkName: "example_figure_locator" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_with_contextmenu',
        props: { section: 3, example: 4 },
        component: () => import(/* webpackChunkName: "example_connection_with_contextmenu" */ '../views/example.vue')
      },
      {
        path: '/examples/policy_selectionmenu',
        props: { section: 3, example: 5 },
        component: () => import(/* webpackChunkName: "example_policy_selectionmenu" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_db',
        props: { section: 3, example: 6 },
        component: () => import(/* webpackChunkName: "example_shape_db" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_collapsible',
        props: { section: 3, example: 7 },
        component: () => import(/* webpackChunkName: "example_shape_collapsible" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_zoom_stack',
        props: { section: 3, example: 8 },
        component: () => import(/* webpackChunkName: "example_shape_zoom_stack" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_zoom_svg',
        props: { section: 3, example: 9 },
        component: () => import(/* webpackChunkName: "example_shape_zoom_svg" */ '../views/example.vue')
      },
      {
        path: '/examples/shape_tablelayout',
        props: { section: 3, example: 10 },
        component: () => import(/* webpackChunkName: "example_shape_tablelayout" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_dblclick_figure',
        props: { section: 4, example: 0 },
        component: () => import(/* webpackChunkName: "example_interaction_dblclick_figure" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_dblclick_policy',
        props: { section: 4, example: 1 },
        component: () => import(/* webpackChunkName: "example_interaction_dblclick_policy" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_labeledit_inplace',
        props: { section: 4, example: 2 },
        component: () => import(/* webpackChunkName: "example_interaction_labeledit_inplace" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_click',
        props: { section: 4, example: 3 },
        component: () => import(/* webpackChunkName: "example_interaction_click" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_slider',
        props: { section: 4, example: 4 },
        component: () => import(/* webpackChunkName: "example_interaction_slider" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_pie',
        props: { section: 4, example: 5 },
        component: () => import(/* webpackChunkName: "example_interaction_pie" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_labeledit_dialog',
        props: { section: 4, example: 6 },
        component: () => import(/* webpackChunkName: "example_connection_labeledit_dialog" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_labeledit_inplace',
        props: { section: 4, example: 7 },
        component: () => import(/* webpackChunkName: "example_connection_labeledit_inplace" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_toFront',
        props: { section: 4, example: 8 },
        component: () => import(/* webpackChunkName: "example_interaction_toFront" */ '../views/example.vue')
      },
      {
        path: '/examples/interaction_draggable_decoration',
        props: { section: 4, example: 9 },
        component: () => import(/* webpackChunkName: "example_interaction_draggable_decoration" */ '../views/example.vue')
      },
      {
        path: '/examples/resizehandle_replace_global',
        props: { section: 5, example: 0 },
        component: () => import(/* webpackChunkName: "example_resizehandle_replace_global" */ '../views/example.vue')
      },
      {
        path: '/examples/resizehandle_styled_css',
        props: { section: 5, example: 1 },
        component: () => import(/* webpackChunkName: "example_resizehandle_styled_css" */ '../views/example.vue')
      },
      {
        path: '/examples/port_semantic_group',
        props: { section: 6, example: 0 },
        component: () => import(/* webpackChunkName: "example_port_semantic_group" */ '../views/example.vue')
      },
      {
        path: '/examples/port_locator',
        props: { section: 6, example: 1 },
        component: () => import(/* webpackChunkName: "example_port_locator" */ '../views/example.vue')
      },
      {
        path: '/examples/port_serialize',
        props: { section: 6, example: 2 },
        component: () => import(/* webpackChunkName: "example_port_serialize" */ '../views/example.vue')
      },
      {
        path: '/examples/port_decoration',
        props: { section: 6, example: 3 },
        component: () => import(/* webpackChunkName: "example_port_decoration" */ '../views/example.vue')
      },
      {
        path: '/examples/port_hide',
        props: { section: 6, example: 4 },
        component: () => import(/* webpackChunkName: "example_port_hide" */ '../views/example.vue')
      },
      {
        path: '/examples/buildin_commandstack',
        props: { section: 7, example: 0 },
        component: () => import(/* webpackChunkName: "example_buildin_commandstack" */ '../views/example.vue')
      },
      {
        path: '/examples/buildin_zoom',
        props: { section: 7, example: 1 },
        component: () => import(/* webpackChunkName: "example_buildin_zoom" */ '../views/example.vue')
      },
      {
        path: '/examples/buildin_bridge',
        props: { section: 7, example: 2 },
        component: () => import(/* webpackChunkName: "example_buildin_bridge" */ '../views/example.vue')
      },
      {
        path: '/examples/buildin_event',
        props: { section: 7, example: 3 },
        component: () => import(/* webpackChunkName: "example_buildin_event" */ '../views/example.vue')
      },
      {
        path: '/examples/tooltip_diy',
        props: { section: 8, example: 0 },
        component: () => import(/* webpackChunkName: "example_tooltip_diy" */ '../views/example.vue')
      },
      {
        path: '/examples/databinding_watchjs',
        props: { section: 9, example: 0 },
        component: () => import(/* webpackChunkName: "example_databinding_watchjs" */ '../views/example.vue')
      },
      {
        path: '/examples/databinding_backbone',
        props: { section: 9, example: 1 },
        component: () => import(/* webpackChunkName: "example_databinding_backbone" */ '../views/example.vue')
      },
      {
        path: '/examples/databinding_backbone_modelbinder',
        props: { section: 9, example: 2 },
        component: () => import(/* webpackChunkName: "example_databinding_backbone_modelbinder" */ '../views/example.vue')
      },
      {
        path: '/examples/databinding_js',
        props: { section: 9, example: 3 },
        component: () => import(/* webpackChunkName: "example_databinding_js" */ '../views/example.vue')
      },
      {
        path: '/examples/databinding_rivets',
        props: { section: 9, example: 4 },
        component: () => import(/* webpackChunkName: "example_databinding_rivets" */ '../views/example.vue')
      },
      {
        path: '/examples/policy_canvas_decoration',
        props: { section: 10, example: 0 },
        component: () => import(/* webpackChunkName: "example_policy_canvas_decoration" */ '../views/example.vue')
      },
      {
        path: '/examples/policy_selection_handling',
        props: { section: 10, example: 1 },
        component: () => import(/* webpackChunkName: "example_policy_selection_handling" */ '../views/example.vue')
      },
      {
        path: '/examples/policy_selection_feedback',
        props: { section: 10, example: 2 },
        component: () => import(/* webpackChunkName: "example_policy_selection_feedback" */ '../views/example.vue')
      },
      {
        path: '/examples/policy_snap_to',
        props: { section: 10, example: 3 },
        component: () => import(/* webpackChunkName: "example_policy_snap_to" */ '../views/example.vue')
      },
      {
        path: '/examples/policy_figure_constraint',
        props: { section: 10, example: 4 },
        component: () => import(/* webpackChunkName: "example_policy_figure_constraint" */ '../views/example.vue')
      },
      {
        path: '/examples/policy_drag_copy',
        props: { section: 10, example: 5 },
        component: () => import(/* webpackChunkName: "example_policy_drag_copy" */ '../views/example.vue')
      },
      {
        path: '/examples/io_json_basic',
        props: { section: 11, example: 0 },
        component: () => import(/* webpackChunkName: "example_io_json_basic" */ '../views/example.vue')
      },
      {
        path: '/examples/io_json_extend',
        props: { section: 11, example: 1 },
        component: () => import(/* webpackChunkName: "example_io_json_extend" */ '../views/example.vue')
      },
      {
        path: '/examples/io_json_connections',
        props: { section: 11, example: 2 },
        component: () => import(/* webpackChunkName: "example_io_json_connections" */ '../views/example.vue')
      },
      {
        path: '/examples/io_json_dyn_labels',
        props: { section: 11, example: 3 },
        component: () => import(/* webpackChunkName: "example_io_json_dyn_labels" */ '../views/example.vue')
      },
      {
        path: '/examples/io_svg_basic',
        props: { section: 11, example: 4 },
        component: () => import(/* webpackChunkName: "example_io_svg_basic" */ '../views/example.vue')
      },
      {
        path: '/examples/io_json_multi_document',
        props: { section: 11, example: 5 },
        component: () => import(/* webpackChunkName: "example_io_json_multi_document" */ '../views/example.vue')
      },
      {
        path: '/examples/io_png_overview',
        props: { section: 11, example: 6 },
        component: () => import(/* webpackChunkName: "example_io_png_overview" */ '../views/example.vue')
      },
      {
        path: '/examples/io_png_crop',
        props: { section: 11, example: 7 },
        component: () => import(/* webpackChunkName: "example_io_png_crop" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_drop',
        props: { section: 12, example: 0 },
        component: () => import(/* webpackChunkName: "example_connection_drop" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_vertex',
        props: { section: 12, example: 1 },
        component: () => import(/* webpackChunkName: "example_connection_vertex" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_locator',
        props: { section: 12, example: 2 },
        component: () => import(/* webpackChunkName: "example_connection_locator" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_decoration',
        props: { section: 12, example: 3 },
        component: () => import(/* webpackChunkName: "example_connection_decoration" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_with_contextmenu',
        props: { section: 12, example: 4 },
        component: () => import(/* webpackChunkName: "example_connection_with_contextmenu" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_router',
        props: { section: 12, example: 5 },
        component: () => import(/* webpackChunkName: "example_connection_router" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_rubberband',
        props: { section: 12, example: 6 },
        component: () => import(/* webpackChunkName: "example_connection_rubberband" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_segment_handling',
        props: { section: 12, example: 7 },
        component: () => import(/* webpackChunkName: "example_connection_segment_handling" */ '../views/example.vue')
      },
      {
        path: '/examples/buildin_bridge',
        props: { section: 12, example: 8 },
        component: () => import(/* webpackChunkName: "example_buildin_bridge" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_anchor_chopbox',
        props: { section: 12, example: 9 },
        component: () => import(/* webpackChunkName: "example_connection_anchor_chopbox" */ '../views/example.vue')
      },
      {
        path: '/examples/connection_anchor_fan',
        props: { section: 12, example: 10 },
        component: () => import(/* webpackChunkName: "example_connection_anchor_fan" */ '../views/example.vue')
      }
    ]
  }
]

const tree = [
  {
    data: { path: '/api/draw2d' },
    text: 'draw2d',
    children: [
      {
        data: { path: '/api/draw2d/geo' },
        text: 'geo'
      },
      {
        data: { path: '/api/draw2d/io' },
        text: 'io',
        children: [
          {
            data: { path: '/api/draw2d/io/json' },
            text: 'json'
          },
          {
            data: { path: '/api/draw2d/io/png' },
            text: 'png'
          },
          {
            data: { path: '/api/draw2d/io/svg' },
            text: 'svg'
          }
        ]
      },
      {
        data: { path: '/api/draw2d/util' },
        text: 'util',
        children: [
          {
            data: { path: '/api/draw2d/util/spline' },
            text: 'spline'
          }
        ]
      },
      {
        data: { path: '/api/draw2d/policy' },
        text: 'policy',
        children: [
          {
            data: { path: '/api/draw2d/policy/canvas' },
            text: 'canvas'
          },
          {
            data: { path: '/api/draw2d/policy/connection' },
            text: 'connection'
          },
          {
            data: { path: '/api/draw2d/policy/line' },
            text: 'line'
          },
          {
            data: { path: '/api/draw2d/policy/port' },
            text: 'port'
          },
          {
            data: { path: '/api/draw2d/policy/figure' },
            text: 'figure'
          }
        ]
      },
      {
        data: { path: '/api/draw2d/shape' },
        text: 'shape',
        children: [
          {
            data: { path: '/api/draw2d/shape/basic' },
            text: 'basic'
          },
          {
            data: { path: '/api/draw2d/shape/dimetric' },
            text: 'dimetric'
          },
          {
            data: { path: '/api/draw2d/shape/composite' },
            text: 'composite'
          },
          {
            data: { path: '/api/draw2d/shape/arrow' },
            text: 'arrow'
          },
          {
            data: { path: '/api/draw2d/shape/node' },
            text: 'node'
          },
          {
            data: { path: '/api/draw2d/shape/note' },
            text: 'note'
          },
          {
            data: { path: '/api/draw2d/shape/diagram' },
            text: 'diagram'
          },
          {
            data: { path: '/api/draw2d/shape/flowchart' },
            text: 'flowchart'
          },
          {
            data: { path: '/api/draw2d/shape/analog' },
            text: 'analog'
          },
          {
            data: { path: '/api/draw2d/shape/icon' },
            text: 'icon'
          },
          {
            data: { path: '/api/draw2d/shape/layout' },
            text: 'layout'
          },
          {
            data: { path: '/api/draw2d/shape/box' },
            text: 'box'
          },
          {
            data: { path: '/api/draw2d/shape/pert' },
            text: 'pert'
          },
          {
            data: { path: '/api/draw2d/shape/state' },
            text: 'state'
          },
          {
            data: { path: '/api/draw2d/shape/widget' },
            text: 'widget'
          }
        ]
      },
      {
        data: { path: '/api/draw2d/command' },
        text: 'command'
      },
      {
        data: { path: '/api/draw2d/decoration' },
        text: 'decoration',
        children: [
          {
            data: { path: '/api/draw2d/decoration/connection' },
            text: 'connection'
          }
        ]
      },
      {
        data: { path: '/api/draw2d/layout' },
        text: 'layout',
        children: [
          {
            data: { path: '/api/draw2d/layout/connection' },
            text: 'connection'
          },
          {
            data: { path: '/api/draw2d/layout/anchor' },
            text: 'anchor'
          },
          {
            data: { path: '/api/draw2d/layout/mesh' },
            text: 'mesh'
          },
          {
            data: { path: '/api/draw2d/layout/locator' },
            text: 'locator'
          }
        ]
      },
      {
        data: { path: '/api/draw2d/ui' },
        text: 'ui'
      }
    ]
  }
]

const examples = [
  {
    'text': 'Basic Figures',
    'children': [
      {
        'name': 'galerie_shape_basic',
        'text': 'draw2d.shape.basic.*',
        'description': 'Gallery of basic shapes: rectangles, circles, lines, polygons and more.',
        'url': 'galerie_shape_basic/index.html',
        'icon': 'galerie_shape_basic/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/galerie_shape_basic'
        }
      },
      {
        'name': 'galerie_shape_diagram',
        'text': 'draw2d.shape.diagram.*',
        'description': 'Diagram elements: pie charts, sparklines, bar charts for data visualization.',
        'url': 'galerie_shape_diagram/index.html',
        'icon': 'galerie_shape_diagram/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/galerie_shape_diagram'
        }
      },
      {
        'name': 'galerie_shape_analog',
        'text': 'draw2d.shape.analog.*',
        'description': 'Analog components: resistors, capacitors, LEDs for circuit diagrams.',
        'url': 'galerie_shape_analog/index.html',
        'icon': 'galerie_shape_analog/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/galerie_shape_analog'
        }
      },
      {
        'name': 'galerie_shape_widget',
        'text': 'draw2d.shape.widget.*',
        'description': 'Interactive widgets: sliders, buttons, and form elements.',
        'url': 'galerie_shape_widget/index.html',
        'icon': 'galerie_shape_widget/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/galerie_shape_widget'
        }
      },
      {
        'name': 'galerie_shape_icon',
        'text': 'draw2d.shape.icon.*',
        'description': 'Vector icons collection for use in diagrams and flowcharts.',
        'url': 'galerie_shape_icon/index.html',
        'icon': 'galerie_shape_icon/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/galerie_shape_icon'
        }
      },
      {
        'name': 'galerie_shape_node',
        'text': 'draw2d.shape.node.*',
        'description': 'Base shapes with ports (visible or hidden) - the foundation for any shape that can have connections.',
        'url': 'galerie_shape_node/index.html',
        'icon': 'galerie_shape_node/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/galerie_shape_node'
        }
      },
      {
        'name': 'galerie_shape_note',
        'text': 'draw2d.shape.note.*',
        'description': 'Note shapes: PostIt for sticky notes, Markdown for rich text annotations.',
        'url': 'galerie_shape_note/index.html',
        'icon': 'galerie_shape_note/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/galerie_shape_note'
        }
      }
    ],
    'data': {
      'path': '/examples/section0'
    }
  },
  {
    'text': 'Box Layout (Experimental)',
    'children': [
      {
        'name': 'galerie_box',
        'text': 'Box Gallery',
        'description': 'New layout system: VBox, HBox, and GridBox for automatic child positioning.',
        'url': 'galerie_box/index.html',
        'icon': 'galerie_box/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/galerie_box'
        }
      },
      {
        'name': 'box_collapsible',
        'text': 'Collapsible Box',
        'description': 'Expandable/collapsible container using VBox and HBox layouts.',
        'url': 'box_collapsible/index.html',
        'icon': 'box_collapsible/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/box_collapsible'
        }
      },
      {
        'name': 'box_tablelayout',
        'text': 'Dynamic Layout Sizing',
        'description': 'VBox/HBox that automatically calculates and adapts to children\'s size constraints (min/max width/height).',
        'url': 'box_tablelayout/index.html',
        'icon': 'box_tablelayout/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/box_tablelayout'
        }
      },
      {
        'name': 'box_zoom_stack',
        'text': 'Zoom StackBox',
        'description': 'StackBox that switches visible layer based on zoom level.',
        'url': 'box_zoom_stack/index.html',
        'icon': 'box_zoom_stack/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/box_zoom_stack'
        }
      },
      {
        'name': 'box_mixed_layout',
        'text': 'Mixed Figure Layouts',
        'description': 'Combine different figure types (icons, labels, shapes) in nested VBox/HBox layouts.',
        'url': 'box_mixed_layout/index.html',
        'icon': 'box_mixed_layout/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/box_mixed_layout'
        }
      },
      {
        'name': 'box_db',
        'text': 'Database Table (VBox)',
        'description': 'Database table with dynamic rows and ports using VBox layout.',
        'url': 'box_db/index.html',
        'icon': 'box_db/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/box_db'
        }
      },
      {
        'name': 'box_gridbox',
        'text': 'GridBox Layout',
        'description': 'CSS Grid-like 2D layout with flexible column/row definitions: \'100px\' (fixed), \'pref\' (content size), \'grow\' (fill available). Supports colspan, rowspan, and cell alignment.',
        'url': 'box_gridbox/index.html',
        'icon': 'box_gridbox/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/box_gridbox'
        }
      },
      {
        'name': 'box_tablebox',
        'text': 'TableBox Layout',
        'description': 'Simple table layout with addRow(...) API. Strings auto-convert to Labels. Supports mixed content (Labels, Icons), auto column sizing, and cellPadding. Ideal for key-value displays.',
        'url': 'box_tablebox/index.html',
        'icon': 'box_tablebox/icon.png',
        'status': 'new',
        'data': {
          'path': '/examples/box_tablebox'
        }
      }
    ],
    'data': {
      'path': '/examples/section1'
    }
  },
  {
    'text': 'Composite Figures',
    'children': [
      {
        'name': 'composite_raft',
        'text': 'Raft Composite',
        'description': 'Soft grouping - figures on the \'raft\' move together when dragged, but can be freely removed. Loosely coupled container.',
        'url': 'composite_raft/index.html',
        'icon': 'composite_raft/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/composite_raft'
        }
      },
      {
        'name': 'composite_group',
        'text': 'Group Composite',
        'description': 'Transparent group container for organizing related figures.',
        'url': 'composite_group/index.html',
        'icon': 'composite_group/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/composite_group'
        }
      },
      {
        'name': 'composite_jailhouse',
        'text': 'Jailhouse Composite',
        'description': 'Strong grouping - figures placed inside are trapped and move together. Cannot be dragged out once added.',
        'url': 'composite_jailhouse/index.html',
        'icon': 'composite_jailhouse/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/composite_jailhouse'
        }
      }
    ],
    'data': {
      'path': '/examples/section2'
    }
  },
  {
    'text': 'Custom Figures',
    'children': [
      {
        'name': 'shape_custom_simple',
        'text': 'Triangle Figure',
        'description': 'How to create a custom vector shape from scratch.',
        'url': 'shape_custom_simple/index.html',
        'icon': 'shape_custom_simple/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/shape_custom_simple'
        }
      },
      {
        'name': 'shape_timer',
        'text': 'Timer Label',
        'description': 'Label with internal timer that auto-updates its text.',
        'url': 'shape_timer/index.html',
        'icon': 'shape_timer/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/shape_timer'
        }
      },
      {
        'name': 'shape_anim_circle',
        'text': 'Animated Figure',
        'description': 'Continuously animated shape with drag&drop support.',
        'url': 'shape_anim_circle/index.html',
        'icon': 'shape_anim_circle/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/shape_anim_circle'
        }
      },
      {
        'name': 'figure_locator',
        'text': 'Locator for children shapes',
        'description': 'Position child figures relative to parent using locators.',
        'url': 'figure_locator/index.html',
        'icon': 'figure_locator/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/figure_locator'
        }
      },
      {
        'name': 'connection_with_contextmenu',
        'text': 'Connection with context menu',
        'description': 'Custom connection class with right-click context menu.',
        'url': 'connection_with_contextmenu/index.html',
        'icon': 'connection_with_contextmenu/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_with_contextmenu'
        }
      },
      {
        'name': 'policy_selectionmenu',
        'text': 'Show menu on selection',
        'description': 'Flyout menu appears when a figure is selected.',
        'url': 'policy_selectionmenu/index.html',
        'icon': 'policy_selectionmenu/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/policy_selectionmenu'
        }
      },
      {
        'name': 'shape_db',
        'text': 'Dynamic ports and rows in a shape',
        'description': 'Database table with add/remove row functionality and dynamic ports.',
        'url': 'shape_db/index.html',
        'icon': 'shape_db/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/shape_db'
        }
      },
      {
        'name': 'shape_collapsible',
        'text': 'Collapsible shape',
        'description': 'Shape that can expand/collapse to show/hide details.',
        'url': 'shape_collapsible/index.html',
        'icon': 'shape_collapsible/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/shape_collapsible'
        }
      },
      {
        'name': 'shape_zoom_stack',
        'text': 'Change figure on Zoom',
        'description': 'Different visual representation at different zoom levels.',
        'url': 'shape_zoom_stack/index.html',
        'icon': 'shape_zoom_stack/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/shape_zoom_stack'
        }
      },
      {
        'name': 'shape_zoom_svg',
        'text': 'Change SVG on Zoom',
        'description': 'SVG content changes based on canvas zoom level.',
        'url': 'shape_zoom_svg/index.html',
        'icon': 'shape_zoom_svg/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/shape_zoom_svg'
        }
      },
      {
        'name': 'shape_tablelayout',
        'text': 'Table layout',
        'description': 'Grid-based layout for positioning child figures in cells.',
        'url': 'shape_tablelayout/index.html',
        'icon': 'shape_tablelayout/icon.png',
        'status': 'updated',
        'data': {
          'path': '/examples/shape_tablelayout'
        }
      }
    ],
    'data': {
      'path': '/examples/section3'
    }
  },
  {
    'text': 'Interaction with Figures',
    'children': [
      {
        'name': 'interaction_dblclick_figure',
        'text': 'DblClick Figure',
        'description': 'Handle double-click events directly in a figure class.',
        'url': 'interaction_dblclick_figure/index.html',
        'icon': 'interaction_dblclick_figure/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/interaction_dblclick_figure'
        }
      },
      {
        'name': 'interaction_dblclick_policy',
        'text': 'DblClick Policy',
        'description': 'Handle double-click events using an edit policy.',
        'url': 'interaction_dblclick_policy/index.html',
        'icon': 'interaction_dblclick_policy/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/interaction_dblclick_policy'
        }
      },
      {
        'name': 'interaction_labeledit_inplace',
        'text': 'DblClick Figure with label',
        'description': 'Edit labels directly on the canvas with double-click.',
        'url': 'interaction_labeledit_inplace/index.html',
        'icon': 'interaction_labeledit_inplace/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/interaction_labeledit_inplace'
        }
      },
      {
        'name': 'interaction_click',
        'text': 'Click Figure with Sparkline',
        'description': 'Click events combined with animated sparkline charts.',
        'url': 'interaction_click/index.html',
        'icon': 'interaction_click/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/interaction_click'
        }
      },
      {
        'name': 'interaction_slider',
        'text': 'Slider / Sparkline',
        'description': 'Connect slider input to animated sparkline output.',
        'url': 'interaction_slider/index.html',
        'icon': 'interaction_slider/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/interaction_slider'
        }
      },
      {
        'name': 'interaction_pie',
        'text': 'Slider with Pie Chart',
        'description': 'Three sliders controlling pie chart segment sizes.',
        'url': 'interaction_pie/index.html',
        'icon': 'interaction_pie/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/interaction_pie'
        }
      },
      {
        'name': 'connection_labeledit_dialog',
        'text': 'Edit a Label with a dialog',
        'description': 'Edit connection labels using a popup dialog.',
        'url': 'connection_labeledit_dialog/index.html',
        'icon': 'connection_labeledit_dialog/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_labeledit_dialog'
        }
      },
      {
        'name': 'connection_labeledit_inplace',
        'text': 'Inplace label editor',
        'description': 'Edit connection labels directly on the canvas.',
        'url': 'connection_labeledit_inplace/index.html',
        'icon': 'connection_labeledit_inplace/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_labeledit_inplace'
        }
      },
      {
        'name': 'interaction_toFront',
        'text': 'Bring to front',
        'description': 'Clicked figure moves to front of Z-order.',
        'url': 'interaction_toFront/index.html',
        'icon': 'interaction_toFront/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/interaction_toFront'
        }
      },
      {
        'name': 'interaction_draggable_decoration',
        'text': 'Draggable figure decoration',
        'description': 'Decorations that can be repositioned via drag&drop.',
        'url': 'interaction_draggable_decoration/index.html',
        'icon': 'interaction_draggable_decoration/icon.png',
        'status': 'updated',
        'data': {
          'path': '/examples/interaction_draggable_decoration'
        }
      }
    ],
    'data': {
      'path': '/examples/section4'
    }
  },
  {
    'text': 'Customize defaults',
    'children': [
      {
        'name': 'resizehandle_replace_global',
        'text': 'Custom ResizeHandles',
        'description': 'Replace default resize handles with custom shapes.',
        'url': 'resizehandle_replace_global/index.html',
        'icon': 'resizehandle_replace_global/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/resizehandle_replace_global'
        }
      },
      {
        'name': 'resizehandle_styled_css',
        'text': 'Style ResizeHandles via CSS',
        'description': 'Style resize handle appearance using CSS rules.',
        'url': 'resizehandle_styled_css/index.html',
        'icon': 'resizehandle_styled_css/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/resizehandle_styled_css'
        }
      }
    ],
    'data': {
      'path': '/examples/section5'
    }
  },
  {
    'text': 'Managing port',
    'children': [
      {
        'name': 'port_semantic_group',
        'text': 'Restricted Connections',
        'description': 'Only ports in the same semantic group can connect.',
        'url': 'port_semantic_group/index.html',
        'icon': 'port_semantic_group/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/port_semantic_group'
        }
      },
      {
        'name': 'port_locator',
        'text': 'Position of ports',
        'description': 'Place ports at specific positions using locators.',
        'url': 'port_locator/index.html',
        'icon': 'port_locator/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/port_locator'
        }
      },
      {
        'name': 'port_serialize',
        'text': 'Create ports from JSON',
        'description': 'Save and restore port configurations via JSON.',
        'url': 'port_serialize/index.html',
        'icon': 'port_serialize/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/port_serialize'
        }
      },
      {
        'name': 'port_decoration',
        'text': 'Create ports with configurable default values',
        'description': 'Ports with visual config panel for default values.',
        'url': 'port_decoration/index.html',
        'icon': 'port_decoration/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/port_decoration'
        }
      },
      {
        'name': 'port_hide',
        'text': 'Hide/Show ports if connected',
        'description': 'Automatically hide connected ports, show on disconnect.',
        'url': 'port_hide/index.html',
        'icon': 'port_hide/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/port_hide'
        }
      }
    ],
    'data': {
      'path': '/examples/section6'
    }
  },
  {
    'text': 'Build in Functions',
    'children': [
      {
        'name': 'buildin_commandstack',
        'text': 'Undo & Redo',
        'description': 'Built-in command stack for undo/redo operations.',
        'url': 'buildin_commandstack/index.html',
        'icon': 'buildin_commandstack/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/buildin_commandstack'
        }
      },
      {
        'name': 'buildin_zoom',
        'text': 'Zoom',
        'description': 'Canvas zoom in/out functionality with slider control.',
        'url': 'buildin_zoom/index.html',
        'icon': 'buildin_zoom/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/buildin_zoom'
        }
      },
      {
        'name': 'buildin_bridge',
        'text': 'Bridge',
        'description': 'Automatic bridge rendering at connection crossings.',
        'url': 'buildin_bridge/index.html',
        'icon': 'buildin_bridge/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/buildin_bridge'
        }
      },
      {
        'name': 'buildin_event',
        'text': 'Canvas events',
        'description': 'Listen to canvas events: add, remove, select, zoom, clear.',
        'url': 'buildin_event/index.html',
        'icon': 'buildin_event/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/buildin_event'
        }
      }
    ],
    'data': {
      'path': '/examples/section7'
    }
  },
  {
    'text': 'Tooltip Examples',
    'children': [
      {
        'name': 'tooltip_diy',
        'text': 'Basic Tooltip',
        'description': 'Custom tooltip implementation without external libraries.',
        'url': 'tooltip_diy/index.html',
        'icon': 'tooltip_diy/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/tooltip_diy'
        }
      }
    ],
    'data': {
      'path': '/examples/section8'
    }
  },
  {
    'text': 'Databinding',
    'children': [
      {
        'name': 'databinding_watchjs',
        'text': 'Watch.JS',
        'description': 'Two-way data binding using Watch.JS library.',
        'url': 'databinding_watchjs/index.html',
        'icon': 'databinding_watchjs/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/databinding_watchjs'
        }
      },
      {
        'name': 'databinding_backbone',
        'text': 'Backbone.JS',
        'description': 'Data binding with Backbone.js models.',
        'url': 'databinding_backbone/index.html',
        'icon': 'databinding_backbone/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/databinding_backbone'
        }
      },
      {
        'name': 'databinding_backbone_modelbinder',
        'text': 'Backbone.ModelBinder',
        'description': 'Enhanced Backbone binding with ModelBinder plugin.',
        'url': 'databinding_backbone_modelbinder/index.html',
        'icon': 'databinding_backbone_modelbinder/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/databinding_backbone_modelbinder'
        }
      },
      {
        'name': 'databinding_js',
        'text': 'JavaScript',
        'description': 'Simple property view with pure JavaScript binding.',
        'url': 'databinding_js/index.html',
        'icon': 'databinding_js/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/databinding_js'
        }
      },
      {
        'name': 'databinding_rivets',
        'text': 'RivetsJS',
        'description': 'Declarative data binding using Rivets.js.',
        'url': 'databinding_rivets/index.html',
        'icon': 'databinding_rivets/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/databinding_rivets'
        }
      }
    ],
    'data': {
      'path': '/examples/section9'
    }
  },
  {
    'text': 'Edit Policy',
    'children': [
      {
        'name': 'policy_canvas_decoration',
        'text': 'Canvas Decoration',
        'description': 'Control port visibility with canvas decoration policies.',
        'url': 'policy_canvas_decoration/index.html',
        'icon': 'policy_canvas_decoration/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/policy_canvas_decoration'
        }
      },
      {
        'name': 'policy_selection_handling',
        'text': 'Selection Handling',
        'description': 'Different selection policies: single, multi, panning.',
        'url': 'policy_selection_handling/index.html',
        'icon': 'policy_selection_handling/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/policy_selection_handling'
        }
      },
      {
        'name': 'policy_selection_feedback',
        'text': 'Selection Feedback',
        'description': 'Customize visual feedback when figures are selected.',
        'url': 'policy_selection_feedback/index.html',
        'icon': 'policy_selection_feedback/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/policy_selection_feedback'
        }
      },
      {
        'name': 'policy_snap_to',
        'text': 'SnapTo Policy',
        'description': 'Snap figures to grid or other figure edges during drag.',
        'url': 'policy_snap_to/index.html',
        'icon': 'policy_snap_to/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/policy_snap_to'
        }
      },
      {
        'name': 'policy_figure_constraint',
        'text': 'Drag&Drop edit policy',
        'description': 'Constrain drag movement: horizontal, vertical, or bounded.',
        'url': 'policy_figure_constraint/index.html',
        'icon': 'policy_figure_constraint/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/policy_figure_constraint'
        }
      },
      {
        'name': 'policy_drag_copy',
        'text': 'Copy during Drag&Drop',
        'description': 'Hold [Shift] while dragging to copy instead of move.',
        'url': 'policy_drag_copy/index.html',
        'icon': 'policy_drag_copy/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/policy_drag_copy'
        }
      }
    ],
    'data': {
      'path': '/examples/section10'
    }
  },
  {
    'text': 'Read/Write',
    'children': [
      {
        'name': 'io_json_basic',
        'text': 'Basic JSON',
        'description': 'Load and save canvas content as JSON.',
        'url': 'io_json_basic/index.html',
        'icon': 'io_json_basic/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_json_basic'
        }
      },
      {
        'name': 'io_json_extend',
        'text': 'Extended JSON',
        'description': 'Save custom figure attributes to JSON.',
        'url': 'io_json_extend/index.html',
        'icon': 'io_json_extend/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_json_extend'
        }
      },
      {
        'name': 'io_json_connections',
        'text': 'JSON with Connections',
        'description': 'Load/save diagrams including all connections.',
        'url': 'io_json_connections/index.html',
        'icon': 'io_json_connections/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_json_connections'
        }
      },
      {
        'name': 'io_json_dyn_labels',
        'text': 'Figure with dynamic labels',
        'description': 'Save figures with variable number of child labels.',
        'url': 'io_json_dyn_labels/index.html',
        'icon': 'io_json_dyn_labels/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_json_dyn_labels'
        }
      },
      {
        'name': 'io_svg_basic',
        'text': 'SVG Export',
        'description': 'Export canvas to SVG for Inkscape or other editors.',
        'url': 'io_svg_basic/index.html',
        'icon': 'io_svg_basic/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_svg_basic'
        }
      },
      {
        'name': 'io_json_multi_document',
        'text': 'Reading multiple JSON files',
        'description': 'Merge multiple JSON files into one canvas.',
        'url': 'io_json_multi_document/index.html',
        'icon': 'io_json_multi_document/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_json_multi_document'
        }
      },
      {
        'name': 'io_png_overview',
        'text': 'PNG Export',
        'description': 'Export canvas as PNG image with preview.',
        'url': 'io_png_overview/index.html',
        'icon': 'io_png_overview/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_png_overview'
        }
      },
      {
        'name': 'io_png_crop',
        'text': 'Crop PNG Export',
        'description': 'Export only the area containing figures to PNG.',
        'url': 'io_png_crop/index.html',
        'icon': 'io_png_crop/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/io_png_crop'
        }
      }
    ],
    'data': {
      'path': '/examples/section11'
    }
  },
  {
    'text': 'Connection Examples',
    'children': [
      {
        'name': 'connection_drop',
        'text': 'Connection Drop',
        'description': 'Drop a figure onto a connection to insert it inline.',
        'url': 'connection_drop/index.html',
        'icon': 'connection_drop/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_drop'
        }
      },
      {
        'name': 'connection_vertex',
        'text': 'Editable Vertex Locator',
        'description': 'Add, remove, or drag connection vertices interactively.',
        'url': 'connection_vertex/index.html',
        'icon': 'connection_vertex/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_vertex'
        }
      },
      {
        'name': 'connection_locator',
        'text': 'Connection Locator',
        'description': 'Attach labels at specific positions along connections.',
        'url': 'connection_locator/index.html',
        'icon': 'connection_locator/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_locator'
        }
      },
      {
        'name': 'connection_decoration',
        'text': 'Connection Decoration',
        'description': 'Arrow, diamond, circle decorations at connection endpoints.',
        'url': 'connection_decoration/index.html',
        'icon': 'connection_decoration/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_decoration'
        }
      },
      {
        'name': 'connection_with_contextmenu',
        'text': 'Connection with context menu',
        'description': 'Custom connection with right-click context menu.',
        'url': 'connection_with_contextmenu/index.html',
        'icon': 'connection_with_contextmenu/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_with_contextmenu'
        }
      },
      {
        'name': 'connection_router',
        'text': 'Connection Router',
        'description': 'Different routing algorithms: direct, manhattan, spline.',
        'url': 'connection_router/index.html',
        'icon': 'connection_router/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_router'
        }
      },
      {
        'name': 'connection_rubberband',
        'text': 'Rubber band Router',
        'description': 'Custom router with elastic rubber band behavior.',
        'url': 'connection_rubberband/index.html',
        'icon': 'connection_rubberband/icon.png',
        'status': 'updated',
        'data': {
          'path': '/examples/connection_rubberband'
        }
      },
      {
        'name': 'connection_segment_handling',
        'text': 'Connection segment add/remove',
        'description': 'Right-click to add or remove connection segments.',
        'url': 'connection_segment_handling/index.html',
        'icon': 'connection_segment_handling/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_segment_handling'
        }
      },
      {
        'name': 'buildin_bridge',
        'text': 'Bridge',
        'description': 'Automatic bridge rendering at connection crossings.',
        'url': 'buildin_bridge/index.html',
        'icon': 'buildin_bridge/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/buildin_bridge'
        }
      },
      {
        'name': 'connection_anchor_chopbox',
        'text': 'Chopbox Anchor',
        'description': 'Connect to figure bounding box instead of fixed ports.',
        'url': 'connection_anchor_chopbox/index.html',
        'icon': 'connection_anchor_chopbox/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_anchor_chopbox'
        }
      },
      {
        'name': 'connection_anchor_fan',
        'text': 'Parallel Connections',
        'description': 'Multiple parallel connections using FanConnectionAnchor.',
        'url': 'connection_anchor_fan/index.html',
        'icon': 'connection_anchor_fan/icon.png',
        'status': 'normal',
        'data': {
          'path': '/examples/connection_anchor_fan'
        }
      }
    ],
    'data': {
      'path': '/examples/section12'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  examples,
  tree,
  routes
})

export default router
