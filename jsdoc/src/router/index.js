import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/draw2d/geo',
    props: { className: 'draw2d.geo' },
    component: () => import(/* webpackChunkName: "draw2d_geo" */ '../views/package.vue')
  },
  {
    path: '/draw2d/geo/point',
    props: { className: 'draw2d.geo.Point' },
    component: () => import(/* webpackChunkName: "draw2d_geo_point" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/geo/rectangle',
    props: { className: 'draw2d.geo.Rectangle' },
    component: () => import(/* webpackChunkName: "draw2d_geo_rectangle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/io',
    props: { className: 'draw2d.io' },
    component: () => import(/* webpackChunkName: "draw2d_io" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io/json',
    props: { className: 'draw2d.io.json' },
    component: () => import(/* webpackChunkName: "draw2d_io_json" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io/json/writer',
    props: { className: 'draw2d.io.json.Writer' },
    component: () => import(/* webpackChunkName: "draw2d_io_json_writer" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/io/png',
    props: { className: 'draw2d.io.png' },
    component: () => import(/* webpackChunkName: "draw2d_io_png" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io/png/writer',
    props: { className: 'draw2d.io.png.Writer' },
    component: () => import(/* webpackChunkName: "draw2d_io_png_writer" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/io/svg',
    props: { className: 'draw2d.io.svg' },
    component: () => import(/* webpackChunkName: "draw2d_io_svg" */ '../views/package.vue')
  },
  {
    path: '/draw2d/io/svg/writer',
    props: { className: 'draw2d.io.svg.Writer' },
    component: () => import(/* webpackChunkName: "draw2d_io_svg_writer" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/io/reader',
    props: { className: 'draw2d.io.Reader' },
    component: () => import(/* webpackChunkName: "draw2d_io_reader" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/io/writer',
    props: { className: 'draw2d.io.Writer' },
    component: () => import(/* webpackChunkName: "draw2d_io_writer" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/storage',
    props: { className: 'draw2d.storage' },
    component: () => import(/* webpackChunkName: "draw2d_storage" */ '../views/package.vue')
  },
  {
    path: '/draw2d/util',
    props: { className: 'draw2d.util' },
    component: () => import(/* webpackChunkName: "draw2d_util" */ '../views/package.vue')
  },
  {
    path: '/draw2d/util/spline',
    props: { className: 'draw2d.util.spline' },
    component: () => import(/* webpackChunkName: "draw2d_util_spline" */ '../views/package.vue')
  },
  {
    path: '/draw2d/util/spline/catmullromspline',
    props: { className: 'draw2d.util.spline.CatmullRomSpline' },
    component: () => import(/* webpackChunkName: "draw2d_util_spline_catmullromspline" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/util/spline/cubicspline',
    props: { className: 'draw2d.util.spline.CubicSpline' },
    component: () => import(/* webpackChunkName: "draw2d_util_spline_cubicspline" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/util/arraylist',
    props: { className: 'draw2d.util.ArrayList' },
    component: () => import(/* webpackChunkName: "draw2d_util_arraylist" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/util/color',
    props: { className: 'draw2d.util.Color' },
    component: () => import(/* webpackChunkName: "draw2d_util_color" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/util/uuid',
    props: { className: 'draw2d.util.UUID' },
    component: () => import(/* webpackChunkName: "draw2d_util_uuid" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy',
    props: { className: 'draw2d.policy' },
    component: () => import(/* webpackChunkName: "draw2d_policy" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/canvas',
    props: { className: 'draw2d.policy.canvas' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/canvas/boundingboxselectionpolicy',
    props: { className: 'draw2d.policy.canvas.BoundingboxSelectionPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_boundingboxselectionpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/canvaspolicy',
    props: { className: 'draw2d.policy.canvas.CanvasPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_canvaspolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/coronadecorationpolicy',
    props: { className: 'draw2d.policy.canvas.CoronaDecorationPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_coronadecorationpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/decorationpolicy',
    props: { className: 'draw2d.policy.canvas.DecorationPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_decorationpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/defaultkeyboardpolicy',
    props: { className: 'draw2d.policy.canvas.DefaultKeyboardPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_defaultkeyboardpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/dropinterceptorpolicy',
    props: { className: 'draw2d.policy.canvas.DropInterceptorPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_dropinterceptorpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/extendedkeyboardpolicy',
    props: { className: 'draw2d.policy.canvas.ExtendedKeyboardPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_extendedkeyboardpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/fadeoutdecorationpolicy',
    props: { className: 'draw2d.policy.canvas.FadeoutDecorationPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_fadeoutdecorationpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/ghostmoveselectionpolicy',
    props: { className: 'draw2d.policy.canvas.GhostMoveSelectionPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_ghostmoveselectionpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/keyboardpolicy',
    props: { className: 'draw2d.policy.canvas.KeyboardPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_keyboardpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/panningselectionpolicy',
    props: { className: 'draw2d.policy.canvas.PanningSelectionPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_panningselectionpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/readonlyselectionpolicy',
    props: { className: 'draw2d.policy.canvas.ReadOnlySelectionPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_readonlyselectionpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/selectionpolicy',
    props: { className: 'draw2d.policy.canvas.SelectionPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_selectionpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/showchessboardeditpolicy',
    props: { className: 'draw2d.policy.canvas.ShowChessboardEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_showchessboardeditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/showdimetricgrideditpolicy',
    props: { className: 'draw2d.policy.canvas.ShowDimetricGridEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_showdimetricgrideditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/showdoteditpolicy',
    props: { className: 'draw2d.policy.canvas.ShowDotEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_showdoteditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/showgrideditpolicy',
    props: { className: 'draw2d.policy.canvas.ShowGridEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_showgrideditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/singleselectionpolicy',
    props: { className: 'draw2d.policy.canvas.SingleSelectionPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_singleselectionpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/snaptocentereditpolicy',
    props: { className: 'draw2d.policy.canvas.SnapToCenterEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_snaptocentereditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/snaptodimetricgrideditpolicy',
    props: { className: 'draw2d.policy.canvas.SnapToDimetricGridEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_snaptodimetricgrideditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/snaptoeditpolicy',
    props: { className: 'draw2d.policy.canvas.SnapToEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_snaptoeditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/snaptogeometryeditpolicy',
    props: { className: 'draw2d.policy.canvas.SnapToGeometryEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_snaptogeometryeditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/snaptogrideditpolicy',
    props: { className: 'draw2d.policy.canvas.SnapToGridEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_snaptogrideditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/snaptoinbetweeneditpolicy',
    props: { className: 'draw2d.policy.canvas.SnapToInBetweenEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_snaptoinbetweeneditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/snaptoverticeseditpolicy',
    props: { className: 'draw2d.policy.canvas.SnapToVerticesEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_snaptoverticeseditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/wheelzoompolicy',
    props: { className: 'draw2d.policy.canvas.WheelZoomPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_wheelzoompolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/canvas/zoompolicy',
    props: { className: 'draw2d.policy.canvas.ZoomPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_canvas_zoompolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/connection',
    props: { className: 'draw2d.policy.connection' },
    component: () => import(/* webpackChunkName: "draw2d_policy_connection" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/line',
    props: { className: 'draw2d.policy.line' },
    component: () => import(/* webpackChunkName: "draw2d_policy_line" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/line/lineselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.line.LineSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_line_lineselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/line/vertexselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.line.VertexSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_line_vertexselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/port',
    props: { className: 'draw2d.policy.port' },
    component: () => import(/* webpackChunkName: "draw2d_policy_port" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/port/elasticstrapfeedbackpolicy',
    props: { className: 'draw2d.policy.port.ElasticStrapFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_port_elasticstrapfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/port/intrusiveportsfeedbackpolicy',
    props: { className: 'draw2d.policy.port.IntrusivePortsFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_port_intrusiveportsfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/port/portfeedbackpolicy',
    props: { className: 'draw2d.policy.port.PortFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_port_portfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure',
    props: { className: 'draw2d.policy.figure' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure" */ '../views/package.vue')
  },
  {
    path: '/draw2d/policy/figure/antselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.AntSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_antselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/bigrectangleselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_bigrectangleselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/busselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.BusSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_busselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/dragdropeditpolicy',
    props: { className: 'draw2d.policy.figure.DragDropEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_dragdropeditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/figureeditpolicy',
    props: { className: 'draw2d.policy.figure.FigureEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_figureeditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/glowselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.GlowSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_glowselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/horizontaleditpolicy',
    props: { className: 'draw2d.policy.figure.HorizontalEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_horizontaleditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/rectangleselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.RectangleSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_rectangleselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/regioneditpolicy',
    props: { className: 'draw2d.policy.figure.RegionEditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_regioneditpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/resizeselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.ResizeSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_resizeselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/roundrectangleselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_roundrectangleselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/selectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.SelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_selectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/selectionpolicy',
    props: { className: 'draw2d.policy.figure.SelectionPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_selectionpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/slimselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.SlimSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_slimselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/vertexselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.VertexSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_vertexselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/figure/widthselectionfeedbackpolicy',
    props: { className: 'draw2d.policy.figure.WidthSelectionFeedbackPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_figure_widthselectionfeedbackpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/policy/editpolicy',
    props: { className: 'draw2d.policy.EditPolicy' },
    component: () => import(/* webpackChunkName: "draw2d_policy_editpolicy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape',
    props: { className: 'draw2d.shape' },
    component: () => import(/* webpackChunkName: "draw2d_shape" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/basic',
    props: { className: 'draw2d.shape.basic' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/basic/arc',
    props: { className: 'draw2d.shape.basic.Arc' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_arc" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/circle',
    props: { className: 'draw2d.shape.basic.Circle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_circle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/diamond',
    props: { className: 'draw2d.shape.basic.Diamond' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_diamond" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/ghostvertexresizehandle',
    props: { className: 'draw2d.shape.basic.GhostVertexResizeHandle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_ghostvertexresizehandle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/image',
    props: { className: 'draw2d.shape.basic.Image' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_image" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/label',
    props: { className: 'draw2d.shape.basic.Label' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_label" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/line',
    props: { className: 'draw2d.shape.basic.Line' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_line" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/lineendresizehandle',
    props: { className: 'draw2d.shape.basic.LineEndResizeHandle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_lineendresizehandle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/lineresizehandle',
    props: { className: 'draw2d.shape.basic.LineResizeHandle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_lineresizehandle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/linestartresizehandle',
    props: { className: 'draw2d.shape.basic.LineStartResizeHandle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_linestartresizehandle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/oval',
    props: { className: 'draw2d.shape.basic.Oval' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_oval" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/polyline',
    props: { className: 'draw2d.shape.basic.PolyLine' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_polyline" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/polygon',
    props: { className: 'draw2d.shape.basic.Polygon' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_polygon" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/rectangle',
    props: { className: 'draw2d.shape.basic.Rectangle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_rectangle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/text',
    props: { className: 'draw2d.shape.basic.Text' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_text" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/basic/vertexresizehandle',
    props: { className: 'draw2d.shape.basic.VertexResizeHandle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_basic_vertexresizehandle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/dimetric',
    props: { className: 'draw2d.shape.dimetric' },
    component: () => import(/* webpackChunkName: "draw2d_shape_dimetric" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/dimetric/rectangle',
    props: { className: 'draw2d.shape.dimetric.Rectangle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_dimetric_rectangle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/composite',
    props: { className: 'draw2d.shape.composite' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composite" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/composite/composite',
    props: { className: 'draw2d.shape.composite.Composite' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composite_composite" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/composite/group',
    props: { className: 'draw2d.shape.composite.Group' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composite_group" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/composite/jailhouse',
    props: { className: 'draw2d.shape.composite.Jailhouse' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composite_jailhouse" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/composite/raft',
    props: { className: 'draw2d.shape.composite.Raft' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composite_raft" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/composite/strongcomposite',
    props: { className: 'draw2d.shape.composite.StrongComposite' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composite_strongcomposite" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/composite/weakcomposite',
    props: { className: 'draw2d.shape.composite.WeakComposite' },
    component: () => import(/* webpackChunkName: "draw2d_shape_composite_weakcomposite" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/arrow',
    props: { className: 'draw2d.shape.arrow' },
    component: () => import(/* webpackChunkName: "draw2d_shape_arrow" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/arrow/calligrapherarrowdownleft',
    props: { className: 'draw2d.shape.arrow.CalligrapherArrowDownLeft' },
    component: () => import(/* webpackChunkName: "draw2d_shape_arrow_calligrapherarrowdownleft" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/arrow/calligrapherarrowleft',
    props: { className: 'draw2d.shape.arrow.CalligrapherArrowLeft' },
    component: () => import(/* webpackChunkName: "draw2d_shape_arrow_calligrapherarrowleft" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node',
    props: { className: 'draw2d.shape.node' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/node/between',
    props: { className: 'draw2d.shape.node.Between' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_between" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node/end',
    props: { className: 'draw2d.shape.node.End' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_end" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node/fulcrum',
    props: { className: 'draw2d.shape.node.Fulcrum' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_fulcrum" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node/horizontalbus',
    props: { className: 'draw2d.shape.node.HorizontalBus' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_horizontalbus" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node/hub',
    props: { className: 'draw2d.shape.node.Hub' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_hub" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node/node',
    props: { className: 'draw2d.shape.node.Node' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_node" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node/start',
    props: { className: 'draw2d.shape.node.Start' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_start" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/node/verticalbus',
    props: { className: 'draw2d.shape.node.VerticalBus' },
    component: () => import(/* webpackChunkName: "draw2d_shape_node_verticalbus" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/note',
    props: { className: 'draw2d.shape.note' },
    component: () => import(/* webpackChunkName: "draw2d_shape_note" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/note/postit',
    props: { className: 'draw2d.shape.note.PostIt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_note_postit" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/diagram',
    props: { className: 'draw2d.shape.diagram' },
    component: () => import(/* webpackChunkName: "draw2d_shape_diagram" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/diagram/diagram',
    props: { className: 'draw2d.shape.diagram.Diagram' },
    component: () => import(/* webpackChunkName: "draw2d_shape_diagram_diagram" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/diagram/pie',
    props: { className: 'draw2d.shape.diagram.Pie' },
    component: () => import(/* webpackChunkName: "draw2d_shape_diagram_pie" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/diagram/sparkline',
    props: { className: 'draw2d.shape.diagram.Sparkline' },
    component: () => import(/* webpackChunkName: "draw2d_shape_diagram_sparkline" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/flowchart',
    props: { className: 'draw2d.shape.flowchart' },
    component: () => import(/* webpackChunkName: "draw2d_shape_flowchart" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/flowchart/document',
    props: { className: 'draw2d.shape.flowchart.Document' },
    component: () => import(/* webpackChunkName: "draw2d_shape_flowchart_document" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/analog',
    props: { className: 'draw2d.shape.analog' },
    component: () => import(/* webpackChunkName: "draw2d_shape_analog" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/analog/opamp',
    props: { className: 'draw2d.shape.analog.OpAmp' },
    component: () => import(/* webpackChunkName: "draw2d_shape_analog_opamp" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/analog/resistorbridge',
    props: { className: 'draw2d.shape.analog.ResistorBridge' },
    component: () => import(/* webpackChunkName: "draw2d_shape_analog_resistorbridge" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/analog/resistorvertical',
    props: { className: 'draw2d.shape.analog.ResistorVertical' },
    component: () => import(/* webpackChunkName: "draw2d_shape_analog_resistorvertical" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/analog/voltagesupplyhorizontal',
    props: { className: 'draw2d.shape.analog.VoltageSupplyHorizontal' },
    component: () => import(/* webpackChunkName: "draw2d_shape_analog_voltagesupplyhorizontal" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/analog/voltagesupplyvertical',
    props: { className: 'draw2d.shape.analog.VoltageSupplyVertical' },
    component: () => import(/* webpackChunkName: "draw2d_shape_analog_voltagesupplyvertical" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon',
    props: { className: 'draw2d.shape.icon' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/icon/acw',
    props: { className: 'draw2d.shape.icon.Acw' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_acw" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/alarm',
    props: { className: 'draw2d.shape.icon.Alarm' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_alarm" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/anonymous',
    props: { className: 'draw2d.shape.icon.Anonymous' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_anonymous" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/apple',
    props: { className: 'draw2d.shape.icon.Apple' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_apple" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/apps',
    props: { className: 'draw2d.shape.icon.Apps' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_apps" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowalt',
    props: { className: 'draw2d.shape.icon.ArrowAlt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowalt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowdown',
    props: { className: 'draw2d.shape.icon.ArrowDown' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowdown" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowleft',
    props: { className: 'draw2d.shape.icon.ArrowLeft' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowleft" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowleft2',
    props: { className: 'draw2d.shape.icon.ArrowLeft2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowleft2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowleftalt',
    props: { className: 'draw2d.shape.icon.ArrowLeftAlt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowleftalt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowright',
    props: { className: 'draw2d.shape.icon.ArrowRight' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowright" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowright2',
    props: { className: 'draw2d.shape.icon.ArrowRight2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowright2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/arrowup',
    props: { className: 'draw2d.shape.icon.ArrowUp' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_arrowup" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/attention',
    props: { className: 'draw2d.shape.icon.Attention' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_attention" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/aumade',
    props: { className: 'draw2d.shape.icon.Aumade' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_aumade" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/barchart',
    props: { className: 'draw2d.shape.icon.BarChart' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_barchart" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/biohazard',
    props: { className: 'draw2d.shape.icon.BioHazard' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_biohazard" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/book',
    props: { className: 'draw2d.shape.icon.Book' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_book" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/bookmark',
    props: { className: 'draw2d.shape.icon.Bookmark' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_bookmark" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/books',
    props: { className: 'draw2d.shape.icon.Books' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_books" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/bubble',
    props: { className: 'draw2d.shape.icon.Bubble' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_bubble" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/bug',
    props: { className: 'draw2d.shape.icon.Bug' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_bug" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/calendar',
    props: { className: 'draw2d.shape.icon.Calendar' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_calendar" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/cart',
    props: { className: 'draw2d.shape.icon.Cart' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_cart" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ccw',
    props: { className: 'draw2d.shape.icon.Ccw' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ccw" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/chat',
    props: { className: 'draw2d.shape.icon.Chat' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_chat" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/check',
    props: { className: 'draw2d.shape.icon.Check' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_check" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/chrome',
    props: { className: 'draw2d.shape.icon.Chrome' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_chrome" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/clip',
    props: { className: 'draw2d.shape.icon.Clip' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_clip" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/clock',
    props: { className: 'draw2d.shape.icon.Clock' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_clock" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/cloud',
    props: { className: 'draw2d.shape.icon.Cloud' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_cloud" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/cloud2',
    props: { className: 'draw2d.shape.icon.Cloud2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_cloud2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/clouddown',
    props: { className: 'draw2d.shape.icon.CloudDown' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_clouddown" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/cloudup',
    props: { className: 'draw2d.shape.icon.CloudUp' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_cloudup" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/cloudy',
    props: { className: 'draw2d.shape.icon.Cloudy' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_cloudy" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/code',
    props: { className: 'draw2d.shape.icon.Code' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_code" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/codetalk',
    props: { className: 'draw2d.shape.icon.CodeTalk' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_codetalk" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/commandline',
    props: { className: 'draw2d.shape.icon.CommandLine' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_commandline" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/connect',
    props: { className: 'draw2d.shape.icon.Connect' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_connect" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/contract',
    props: { className: 'draw2d.shape.icon.Contract' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_contract" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/crop',
    props: { className: 'draw2d.shape.icon.Crop' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_crop" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/cross',
    props: { className: 'draw2d.shape.icon.Cross' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_cross" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/cube',
    props: { className: 'draw2d.shape.icon.Cube' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_cube" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/customer',
    props: { className: 'draw2d.shape.icon.Customer' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_customer" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/db',
    props: { className: 'draw2d.shape.icon.Db' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_db" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/detour',
    props: { className: 'draw2d.shape.icon.Detour' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_detour" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/diagram',
    props: { className: 'draw2d.shape.icon.Diagram' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_diagram" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/disconnect',
    props: { className: 'draw2d.shape.icon.Disconnect' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_disconnect" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/dockbottom',
    props: { className: 'draw2d.shape.icon.DockBottom' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_dockbottom" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/dockleft',
    props: { className: 'draw2d.shape.icon.DockLeft' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_dockleft" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/dockright',
    props: { className: 'draw2d.shape.icon.DockRight' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_dockright" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/docktop',
    props: { className: 'draw2d.shape.icon.DockTop' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_docktop" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/dollar',
    props: { className: 'draw2d.shape.icon.Dollar' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_dollar" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/download',
    props: { className: 'draw2d.shape.icon.Download' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_download" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/dry',
    props: { className: 'draw2d.shape.icon.Dry' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_dry" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/employee',
    props: { className: 'draw2d.shape.icon.Employee' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_employee" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/end',
    props: { className: 'draw2d.shape.icon.End' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_end" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ethernet',
    props: { className: 'draw2d.shape.icon.Ethernet' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ethernet" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/exchange',
    props: { className: 'draw2d.shape.icon.Exchange' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_exchange" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/expand',
    props: { className: 'draw2d.shape.icon.Expand' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_expand" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/export',
    props: { className: 'draw2d.shape.icon.Export' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_export" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/fave',
    props: { className: 'draw2d.shape.icon.Fave' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_fave" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/feed',
    props: { className: 'draw2d.shape.icon.Feed' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_feed" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ff',
    props: { className: 'draw2d.shape.icon.Ff' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ff" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/firefox',
    props: { className: 'draw2d.shape.icon.Firefox' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_firefox" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/flag',
    props: { className: 'draw2d.shape.icon.Flag' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_flag" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/flickr',
    props: { className: 'draw2d.shape.icon.Flickr' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_flickr" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/folder',
    props: { className: 'draw2d.shape.icon.Folder' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_folder" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/font',
    props: { className: 'draw2d.shape.icon.Font' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_font" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/fork',
    props: { className: 'draw2d.shape.icon.Fork' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_fork" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/forkalt',
    props: { className: 'draw2d.shape.icon.ForkAlt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_forkalt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/fullcube',
    props: { className: 'draw2d.shape.icon.FullCube' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_fullcube" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/future',
    props: { className: 'draw2d.shape.icon.Future' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_future" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/graphael',
    props: { className: 'draw2d.shape.icon.GRaphael' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_graphael" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/gear',
    props: { className: 'draw2d.shape.icon.Gear' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_gear" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/gear2',
    props: { className: 'draw2d.shape.icon.Gear2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_gear2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/github',
    props: { className: 'draw2d.shape.icon.GitHub' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_github" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/githubalt',
    props: { className: 'draw2d.shape.icon.GitHubAlt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_githubalt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/glasses',
    props: { className: 'draw2d.shape.icon.Glasses' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_glasses" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/globe',
    props: { className: 'draw2d.shape.icon.Globe' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_globe" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/globealt',
    props: { className: 'draw2d.shape.icon.GlobeAlt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_globealt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/globealt2',
    props: { className: 'draw2d.shape.icon.GlobeAlt2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_globealt2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/hail',
    props: { className: 'draw2d.shape.icon.Hail' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_hail" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/hammer',
    props: { className: 'draw2d.shape.icon.Hammer' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_hammer" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/hammerandscrewdriver',
    props: { className: 'draw2d.shape.icon.HammerAndScrewDriver' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_hammerandscrewdriver" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/hangup',
    props: { className: 'draw2d.shape.icon.HangUp' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_hangup" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/help',
    props: { className: 'draw2d.shape.icon.Help' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_help" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/history',
    props: { className: 'draw2d.shape.icon.History' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_history" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/home',
    props: { className: 'draw2d.shape.icon.Home' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_home" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/imac',
    props: { className: 'draw2d.shape.icon.IMac' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_imac" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/icon',
    props: { className: 'draw2d.shape.icon.Icon' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_icon" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/icons',
    props: { className: 'draw2d.shape.icon.Icons' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_icons" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ie',
    props: { className: 'draw2d.shape.icon.Ie' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ie" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ie9',
    props: { className: 'draw2d.shape.icon.Ie9' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ie9" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/import',
    props: { className: 'draw2d.shape.icon.Import' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_import" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/info',
    props: { className: 'draw2d.shape.icon.Info' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_info" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/inkscape',
    props: { className: 'draw2d.shape.icon.InkScape' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_inkscape" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ipad',
    props: { className: 'draw2d.shape.icon.Ipad' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ipad" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/iphone',
    props: { className: 'draw2d.shape.icon.Iphone' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_iphone" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/jquery',
    props: { className: 'draw2d.shape.icon.JQuery' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_jquery" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/jigsaw',
    props: { className: 'draw2d.shape.icon.Jigsaw' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_jigsaw" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/key',
    props: { className: 'draw2d.shape.icon.Key' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_key" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/lab',
    props: { className: 'draw2d.shape.icon.Lab' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_lab" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/lamp',
    props: { className: 'draw2d.shape.icon.Lamp' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_lamp" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/lamp_alt',
    props: { className: 'draw2d.shape.icon.Lamp_alt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_lamp_alt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/landing',
    props: { className: 'draw2d.shape.icon.Landing' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_landing" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/landscape1',
    props: { className: 'draw2d.shape.icon.Landscape1' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_landscape1" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/landscape2',
    props: { className: 'draw2d.shape.icon.Landscape2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_landscape2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/linechart',
    props: { className: 'draw2d.shape.icon.LineChart' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_linechart" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/link',
    props: { className: 'draw2d.shape.icon.Link' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_link" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/linkedin',
    props: { className: 'draw2d.shape.icon.LinkedIn' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_linkedin" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/linux',
    props: { className: 'draw2d.shape.icon.Linux' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_linux" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/list',
    props: { className: 'draw2d.shape.icon.List' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_list" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/location',
    props: { className: 'draw2d.shape.icon.Location' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_location" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/lock',
    props: { className: 'draw2d.shape.icon.Lock' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_lock" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/locked',
    props: { className: 'draw2d.shape.icon.Locked' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_locked" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/magic',
    props: { className: 'draw2d.shape.icon.Magic' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_magic" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/magnet',
    props: { className: 'draw2d.shape.icon.Magnet' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_magnet" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/mail',
    props: { className: 'draw2d.shape.icon.Mail' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_mail" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/man',
    props: { className: 'draw2d.shape.icon.Man' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_man" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/merge',
    props: { className: 'draw2d.shape.icon.Merge' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_merge" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/mic',
    props: { className: 'draw2d.shape.icon.Mic' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_mic" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/micmute',
    props: { className: 'draw2d.shape.icon.MicMute' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_micmute" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/minus',
    props: { className: 'draw2d.shape.icon.Minus' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_minus" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/newwindow',
    props: { className: 'draw2d.shape.icon.NewWindow' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_newwindow" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/no',
    props: { className: 'draw2d.shape.icon.No' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_no" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/nomagnet',
    props: { className: 'draw2d.shape.icon.NoMagnet' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_nomagnet" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/nodejs',
    props: { className: 'draw2d.shape.icon.NodeJs' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_nodejs" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/notebook',
    props: { className: 'draw2d.shape.icon.Notebook' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_notebook" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/noview',
    props: { className: 'draw2d.shape.icon.Noview' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_noview" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/opera',
    props: { className: 'draw2d.shape.icon.Opera' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_opera" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/package',
    props: { className: 'draw2d.shape.icon.Package' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_package" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/page',
    props: { className: 'draw2d.shape.icon.Page' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_page" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/page2',
    props: { className: 'draw2d.shape.icon.Page2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_page2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/pallete',
    props: { className: 'draw2d.shape.icon.Pallete' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_pallete" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/palm',
    props: { className: 'draw2d.shape.icon.Palm' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_palm" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/paper',
    props: { className: 'draw2d.shape.icon.Paper' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_paper" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/parent',
    props: { className: 'draw2d.shape.icon.Parent' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_parent" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/pc',
    props: { className: 'draw2d.shape.icon.Pc' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_pc" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/pen',
    props: { className: 'draw2d.shape.icon.Pen' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_pen" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/pensil',
    props: { className: 'draw2d.shape.icon.Pensil' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_pensil" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/people',
    props: { className: 'draw2d.shape.icon.People' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_people" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/phone',
    props: { className: 'draw2d.shape.icon.Phone' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_phone" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/photo',
    props: { className: 'draw2d.shape.icon.Photo' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_photo" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/picker',
    props: { className: 'draw2d.shape.icon.Picker' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_picker" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/picture',
    props: { className: 'draw2d.shape.icon.Picture' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_picture" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/piechart',
    props: { className: 'draw2d.shape.icon.PieChart' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_piechart" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/plane',
    props: { className: 'draw2d.shape.icon.Plane' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_plane" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/plugin',
    props: { className: 'draw2d.shape.icon.Plugin' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_plugin" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/plus',
    props: { className: 'draw2d.shape.icon.Plus' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_plus" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/power',
    props: { className: 'draw2d.shape.icon.Power' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_power" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ppt',
    props: { className: 'draw2d.shape.icon.Ppt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ppt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/printer',
    props: { className: 'draw2d.shape.icon.Printer' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_printer" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/question',
    props: { className: 'draw2d.shape.icon.Question' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_question" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/question2',
    props: { className: 'draw2d.shape.icon.Question2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_question2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/quote',
    props: { className: 'draw2d.shape.icon.Quote' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_quote" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/rain',
    props: { className: 'draw2d.shape.icon.Rain' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_rain" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/raphael',
    props: { className: 'draw2d.shape.icon.Raphael' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_raphael" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/reflecth',
    props: { className: 'draw2d.shape.icon.ReflectH' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_reflecth" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/reflectv',
    props: { className: 'draw2d.shape.icon.ReflectV' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_reflectv" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/refresh',
    props: { className: 'draw2d.shape.icon.Refresh' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_refresh" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/resize2',
    props: { className: 'draw2d.shape.icon.Resize2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_resize2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/rotate',
    props: { className: 'draw2d.shape.icon.Rotate' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_rotate" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/ruler',
    props: { className: 'draw2d.shape.icon.Ruler' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_ruler" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/run',
    props: { className: 'draw2d.shape.icon.Run' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_run" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/rw',
    props: { className: 'draw2d.shape.icon.Rw' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_rw" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/safari',
    props: { className: 'draw2d.shape.icon.Safari' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_safari" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/screwdriver',
    props: { className: 'draw2d.shape.icon.ScrewDriver' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_screwdriver" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/search',
    props: { className: 'draw2d.shape.icon.Search' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_search" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/sencha',
    props: { className: 'draw2d.shape.icon.Sencha' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_sencha" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/settings',
    props: { className: 'draw2d.shape.icon.Settings' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_settings" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/settingsalt',
    props: { className: 'draw2d.shape.icon.SettingsAlt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_settingsalt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/shuffle',
    props: { className: 'draw2d.shape.icon.Shuffle' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_shuffle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/skull',
    props: { className: 'draw2d.shape.icon.Skull' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_skull" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/skype',
    props: { className: 'draw2d.shape.icon.Skype' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_skype" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/slideshare',
    props: { className: 'draw2d.shape.icon.SlideShare' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_slideshare" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/smile',
    props: { className: 'draw2d.shape.icon.Smile' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_smile" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/smile2',
    props: { className: 'draw2d.shape.icon.Smile2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_smile2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/snow',
    props: { className: 'draw2d.shape.icon.Snow' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_snow" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/split',
    props: { className: 'draw2d.shape.icon.Split' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_split" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/star',
    props: { className: 'draw2d.shape.icon.Star' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_star" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/star2',
    props: { className: 'draw2d.shape.icon.Star2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_star2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/star2off',
    props: { className: 'draw2d.shape.icon.Star2Off' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_star2off" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/star3',
    props: { className: 'draw2d.shape.icon.Star3' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_star3" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/star3off',
    props: { className: 'draw2d.shape.icon.Star3Off' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_star3off" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/staroff',
    props: { className: 'draw2d.shape.icon.StarOff' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_staroff" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/start',
    props: { className: 'draw2d.shape.icon.Start' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_start" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/sticker',
    props: { className: 'draw2d.shape.icon.Sticker' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_sticker" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/stop',
    props: { className: 'draw2d.shape.icon.Stop' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_stop" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/stopsign',
    props: { className: 'draw2d.shape.icon.StopSign' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_stopsign" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/stopwatch',
    props: { className: 'draw2d.shape.icon.StopWatch' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_stopwatch" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/sun',
    props: { className: 'draw2d.shape.icon.Sun' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_sun" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/svg',
    props: { className: 'draw2d.shape.icon.Svg' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_svg" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/tshirt',
    props: { className: 'draw2d.shape.icon.TShirt' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_tshirt" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/tag',
    props: { className: 'draw2d.shape.icon.Tag' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_tag" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/takeoff',
    props: { className: 'draw2d.shape.icon.TakeOff' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_takeoff" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/talke',
    props: { className: 'draw2d.shape.icon.Talke' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_talke" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/talkq',
    props: { className: 'draw2d.shape.icon.Talkq' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_talkq" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/temp',
    props: { className: 'draw2d.shape.icon.Temp' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_temp" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/thunder',
    props: { className: 'draw2d.shape.icon.Thunder' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_thunder" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/trash',
    props: { className: 'draw2d.shape.icon.Trash' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_trash" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/twitter',
    props: { className: 'draw2d.shape.icon.Twitter' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_twitter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/twitterbird',
    props: { className: 'draw2d.shape.icon.TwitterBird' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_twitterbird" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/umbrella',
    props: { className: 'draw2d.shape.icon.Umbrella' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_umbrella" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/undo',
    props: { className: 'draw2d.shape.icon.Undo' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_undo" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/unlock',
    props: { className: 'draw2d.shape.icon.Unlock' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_unlock" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/usb',
    props: { className: 'draw2d.shape.icon.Usb' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_usb" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/user',
    props: { className: 'draw2d.shape.icon.User' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_user" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/users',
    props: { className: 'draw2d.shape.icon.Users' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_users" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/video',
    props: { className: 'draw2d.shape.icon.Video' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_video" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/view',
    props: { className: 'draw2d.shape.icon.View' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_view" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/vim',
    props: { className: 'draw2d.shape.icon.Vim' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_vim" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/volume0',
    props: { className: 'draw2d.shape.icon.Volume0' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_volume0" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/volume1',
    props: { className: 'draw2d.shape.icon.Volume1' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_volume1" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/volume2',
    props: { className: 'draw2d.shape.icon.Volume2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_volume2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/volume3',
    props: { className: 'draw2d.shape.icon.Volume3' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_volume3" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/warning',
    props: { className: 'draw2d.shape.icon.Warning' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_warning" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/wheelchair',
    props: { className: 'draw2d.shape.icon.WheelChair' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_wheelchair" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/windows',
    props: { className: 'draw2d.shape.icon.Windows' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_windows" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/woman',
    props: { className: 'draw2d.shape.icon.Woman' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_woman" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/wrench',
    props: { className: 'draw2d.shape.icon.Wrench' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_wrench" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/wrench2',
    props: { className: 'draw2d.shape.icon.Wrench2' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_wrench2" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/wrench3',
    props: { className: 'draw2d.shape.icon.Wrench3' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_wrench3" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/zoomin',
    props: { className: 'draw2d.shape.icon.ZoomIn' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_zoomin" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/icon/zoomout',
    props: { className: 'draw2d.shape.icon.ZoomOut' },
    component: () => import(/* webpackChunkName: "draw2d_shape_icon_zoomout" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/layout',
    props: { className: 'draw2d.shape.layout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/layout/flexgridlayout',
    props: { className: 'draw2d.shape.layout.FlexGridLayout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout_flexgridlayout" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/layout/horizontallayout',
    props: { className: 'draw2d.shape.layout.HorizontalLayout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout_horizontallayout" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/layout/layout',
    props: { className: 'draw2d.shape.layout.Layout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout_layout" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/layout/stacklayout',
    props: { className: 'draw2d.shape.layout.StackLayout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout_stacklayout" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/layout/tablelayout',
    props: { className: 'draw2d.shape.layout.TableLayout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout_tablelayout" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/layout/verticallayout',
    props: { className: 'draw2d.shape.layout.VerticalLayout' },
    component: () => import(/* webpackChunkName: "draw2d_shape_layout_verticallayout" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/pert',
    props: { className: 'draw2d.shape.pert' },
    component: () => import(/* webpackChunkName: "draw2d_shape_pert" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/pert/activity',
    props: { className: 'draw2d.shape.pert.Activity' },
    component: () => import(/* webpackChunkName: "draw2d_shape_pert_activity" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/pert/start',
    props: { className: 'draw2d.shape.pert.Start' },
    component: () => import(/* webpackChunkName: "draw2d_shape_pert_start" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/state',
    props: { className: 'draw2d.shape.state' },
    component: () => import(/* webpackChunkName: "draw2d_shape_state" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/state/connection',
    props: { className: 'draw2d.shape.state.Connection' },
    component: () => import(/* webpackChunkName: "draw2d_shape_state_connection" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/state/end',
    props: { className: 'draw2d.shape.state.End' },
    component: () => import(/* webpackChunkName: "draw2d_shape_state_end" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/state/start',
    props: { className: 'draw2d.shape.state.Start' },
    component: () => import(/* webpackChunkName: "draw2d_shape_state_start" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/state/state',
    props: { className: 'draw2d.shape.state.State' },
    component: () => import(/* webpackChunkName: "draw2d_shape_state_state" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/widget',
    props: { className: 'draw2d.shape.widget' },
    component: () => import(/* webpackChunkName: "draw2d_shape_widget" */ '../views/package.vue')
  },
  {
    path: '/draw2d/shape/widget/slider',
    props: { className: 'draw2d.shape.widget.Slider' },
    component: () => import(/* webpackChunkName: "draw2d_shape_widget_slider" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/shape/widget/widget',
    props: { className: 'draw2d.shape.widget.Widget' },
    component: () => import(/* webpackChunkName: "draw2d_shape_widget_widget" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command',
    props: { className: 'draw2d.command' },
    component: () => import(/* webpackChunkName: "draw2d_command" */ '../views/package.vue')
  },
  {
    path: '/draw2d/command/command',
    props: { className: 'draw2d.command.Command' },
    component: () => import(/* webpackChunkName: "draw2d_command_command" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandadd',
    props: { className: 'draw2d.command.CommandAdd' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandadd" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandaddvertex',
    props: { className: 'draw2d.command.CommandAddVertex' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandaddvertex" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandassignfigure',
    props: { className: 'draw2d.command.CommandAssignFigure' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandassignfigure" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandattr',
    props: { className: 'draw2d.command.CommandAttr' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandattr" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandboundingbox',
    props: { className: 'draw2d.command.CommandBoundingBox' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandboundingbox" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandcollection',
    props: { className: 'draw2d.command.CommandCollection' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandcollection" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandconnect',
    props: { className: 'draw2d.command.CommandConnect' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandconnect" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commanddelete',
    props: { className: 'draw2d.command.CommandDelete' },
    component: () => import(/* webpackChunkName: "draw2d_command_commanddelete" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commanddeletegroup',
    props: { className: 'draw2d.command.CommandDeleteGroup' },
    component: () => import(/* webpackChunkName: "draw2d_command_commanddeletegroup" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandgroup',
    props: { className: 'draw2d.command.CommandGroup' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandgroup" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandmove',
    props: { className: 'draw2d.command.CommandMove' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandmove" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandmoveconnection',
    props: { className: 'draw2d.command.CommandMoveConnection' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandmoveconnection" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandmoveline',
    props: { className: 'draw2d.command.CommandMoveLine' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandmoveline" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandmovevertex',
    props: { className: 'draw2d.command.CommandMoveVertex' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandmovevertex" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandmovevertices',
    props: { className: 'draw2d.command.CommandMoveVertices' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandmovevertices" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandreconnect',
    props: { className: 'draw2d.command.CommandReconnect' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandreconnect" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandremovevertex',
    props: { className: 'draw2d.command.CommandRemoveVertex' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandremovevertex" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandreplacevertices',
    props: { className: 'draw2d.command.CommandReplaceVertices' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandreplacevertices" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandresize',
    props: { className: 'draw2d.command.CommandResize' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandresize" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandrotate',
    props: { className: 'draw2d.command.CommandRotate' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandrotate" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandstack',
    props: { className: 'draw2d.command.CommandStack' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandstack" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandstackevent',
    props: { className: 'draw2d.command.CommandStackEvent' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandstackevent" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandstackeventlistener',
    props: { className: 'draw2d.command.CommandStackEventListener' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandstackeventlistener" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandtype',
    props: { className: 'draw2d.command.CommandType' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandtype" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/command/commandungroup',
    props: { className: 'draw2d.command.CommandUngroup' },
    component: () => import(/* webpackChunkName: "draw2d_command_commandungroup" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/decoration',
    props: { className: 'draw2d.decoration' },
    component: () => import(/* webpackChunkName: "draw2d_decoration" */ '../views/package.vue')
  },
  {
    path: '/draw2d/decoration/connection',
    props: { className: 'draw2d.decoration.connection' },
    component: () => import(/* webpackChunkName: "draw2d_decoration_connection" */ '../views/package.vue')
  },
  {
    path: '/draw2d/decoration/connection/arrowdecorator',
    props: { className: 'draw2d.decoration.connection.ArrowDecorator' },
    component: () => import(/* webpackChunkName: "draw2d_decoration_connection_arrowdecorator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/decoration/connection/bardecorator',
    props: { className: 'draw2d.decoration.connection.BarDecorator' },
    component: () => import(/* webpackChunkName: "draw2d_decoration_connection_bardecorator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/decoration/connection/circledecorator',
    props: { className: 'draw2d.decoration.connection.CircleDecorator' },
    component: () => import(/* webpackChunkName: "draw2d_decoration_connection_circledecorator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/decoration/connection/decorator',
    props: { className: 'draw2d.decoration.connection.Decorator' },
    component: () => import(/* webpackChunkName: "draw2d_decoration_connection_decorator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/decoration/connection/diamonddecorator',
    props: { className: 'draw2d.decoration.connection.DiamondDecorator' },
    component: () => import(/* webpackChunkName: "draw2d_decoration_connection_diamonddecorator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout',
    props: { className: 'draw2d.layout' },
    component: () => import(/* webpackChunkName: "draw2d_layout" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/connection',
    props: { className: 'draw2d.layout.connection' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/connection/circuitconnectionrouter',
    props: { className: 'draw2d.layout.connection.CircuitConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_circuitconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/connectionrouter',
    props: { className: 'draw2d.layout.connection.ConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_connectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/directrouter',
    props: { className: 'draw2d.layout.connection.DirectRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_directrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/fanconnectionrouter',
    props: { className: 'draw2d.layout.connection.FanConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_fanconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/interactivemanhattanconnectionrouter',
    props: { className: 'draw2d.layout.connection.InteractiveManhattanConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_interactivemanhattanconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/manhattanbridgedconnectionrouter',
    props: { className: 'draw2d.layout.connection.ManhattanBridgedConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_manhattanbridgedconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/manhattanconnectionrouter',
    props: { className: 'draw2d.layout.connection.ManhattanConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_manhattanconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/muteablemanhattanconnectionrouter',
    props: { className: 'draw2d.layout.connection.MuteableManhattanConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_muteablemanhattanconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/rubberbandrouter',
    props: { className: 'draw2d.layout.connection.RubberbandRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_rubberbandrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/sketchconnectionrouter',
    props: { className: 'draw2d.layout.connection.SketchConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_sketchconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/splineconnectionrouter',
    props: { className: 'draw2d.layout.connection.SplineConnectionRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_splineconnectionrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/connection/vertexrouter',
    props: { className: 'draw2d.layout.connection.VertexRouter' },
    component: () => import(/* webpackChunkName: "draw2d_layout_connection_vertexrouter" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/anchor',
    props: { className: 'draw2d.layout.anchor' },
    component: () => import(/* webpackChunkName: "draw2d_layout_anchor" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/anchor/centeredgeconnectionanchor',
    props: { className: 'draw2d.layout.anchor.CenterEdgeConnectionAnchor' },
    component: () => import(/* webpackChunkName: "draw2d_layout_anchor_centeredgeconnectionanchor" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/anchor/chopboxconnectionanchor',
    props: { className: 'draw2d.layout.anchor.ChopboxConnectionAnchor' },
    component: () => import(/* webpackChunkName: "draw2d_layout_anchor_chopboxconnectionanchor" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/anchor/connectionanchor',
    props: { className: 'draw2d.layout.anchor.ConnectionAnchor' },
    component: () => import(/* webpackChunkName: "draw2d_layout_anchor_connectionanchor" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/anchor/fanconnectionanchor',
    props: { className: 'draw2d.layout.anchor.FanConnectionAnchor' },
    component: () => import(/* webpackChunkName: "draw2d_layout_anchor_fanconnectionanchor" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/anchor/shortespathconnectionanchor',
    props: { className: 'draw2d.layout.anchor.ShortesPathConnectionAnchor' },
    component: () => import(/* webpackChunkName: "draw2d_layout_anchor_shortespathconnectionanchor" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/mesh',
    props: { className: 'draw2d.layout.mesh' },
    component: () => import(/* webpackChunkName: "draw2d_layout_mesh" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/locator',
    props: { className: 'draw2d.layout.locator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator" */ '../views/package.vue')
  },
  {
    path: '/draw2d/layout/locator/bottomlocator',
    props: { className: 'draw2d.layout.locator.BottomLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_bottomlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/centerlocator',
    props: { className: 'draw2d.layout.locator.CenterLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_centerlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/connectionlocator',
    props: { className: 'draw2d.layout.locator.ConnectionLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_connectionlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/draggablelocator',
    props: { className: 'draw2d.layout.locator.DraggableLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_draggablelocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/inputportlocator',
    props: { className: 'draw2d.layout.locator.InputPortLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_inputportlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/leftlocator',
    props: { className: 'draw2d.layout.locator.LeftLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_leftlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/locator',
    props: { className: 'draw2d.layout.locator.Locator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_locator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/manhattanmidpointlocator',
    props: { className: 'draw2d.layout.locator.ManhattanMidpointLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_manhattanmidpointlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/outputportlocator',
    props: { className: 'draw2d.layout.locator.OutputPortLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_outputportlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/parallelmidpointlocator',
    props: { className: 'draw2d.layout.locator.ParallelMidpointLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_parallelmidpointlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/polylinemidpointlocator',
    props: { className: 'draw2d.layout.locator.PolylineMidpointLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_polylinemidpointlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/portlocator',
    props: { className: 'draw2d.layout.locator.PortLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_portlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/rightlocator',
    props: { className: 'draw2d.layout.locator.RightLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_rightlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/smartdraggablelocator',
    props: { className: 'draw2d.layout.locator.SmartDraggableLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_smartdraggablelocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/toplocator',
    props: { className: 'draw2d.layout.locator.TopLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_toplocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/xyabsportlocator',
    props: { className: 'draw2d.layout.locator.XYAbsPortLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_xyabsportlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/layout/locator/xyrelportlocator',
    props: { className: 'draw2d.layout.locator.XYRelPortLocator' },
    component: () => import(/* webpackChunkName: "draw2d_layout_locator_xyrelportlocator" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/ui',
    props: { className: 'draw2d.ui' },
    component: () => import(/* webpackChunkName: "draw2d_ui" */ '../views/package.vue')
  },
  {
    path: '/draw2d/ui/labeleditor',
    props: { className: 'draw2d.ui.LabelEditor' },
    component: () => import(/* webpackChunkName: "draw2d_ui_labeleditor" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/ui/labelinplaceeditor',
    props: { className: 'draw2d.ui.LabelInplaceEditor' },
    component: () => import(/* webpackChunkName: "draw2d_ui_labelinplaceeditor" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/canvas',
    props: { className: 'draw2d.Canvas' },
    component: () => import(/* webpackChunkName: "draw2d_canvas" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/connection',
    props: { className: 'draw2d.Connection' },
    component: () => import(/* webpackChunkName: "draw2d_connection" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/figure',
    props: { className: 'draw2d.Figure' },
    component: () => import(/* webpackChunkName: "draw2d_figure" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/headlesscanvas',
    props: { className: 'draw2d.HeadlessCanvas' },
    component: () => import(/* webpackChunkName: "draw2d_headlesscanvas" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/hybridport',
    props: { className: 'draw2d.HybridPort' },
    component: () => import(/* webpackChunkName: "draw2d_hybridport" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/inputport',
    props: { className: 'draw2d.InputPort' },
    component: () => import(/* webpackChunkName: "draw2d_inputport" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/outputport',
    props: { className: 'draw2d.OutputPort' },
    component: () => import(/* webpackChunkName: "draw2d_outputport" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/port',
    props: { className: 'draw2d.Port' },
    component: () => import(/* webpackChunkName: "draw2d_port" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/corona',
    props: { className: 'draw2d.Corona' },
    component: () => import(/* webpackChunkName: "draw2d_corona" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/resizehandle',
    props: { className: 'draw2d.ResizeHandle' },
    component: () => import(/* webpackChunkName: "draw2d_resizehandle" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/svgfigure',
    props: { className: 'draw2d.SVGFigure' },
    component: () => import(/* webpackChunkName: "draw2d_svgfigure" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/selection',
    props: { className: 'draw2d.Selection' },
    component: () => import(/* webpackChunkName: "draw2d_selection" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/setfigure',
    props: { className: 'draw2d.SetFigure' },
    component: () => import(/* webpackChunkName: "draw2d_setfigure" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d/vectorfigure',
    props: { className: 'draw2d.VectorFigure' },
    component: () => import(/* webpackChunkName: "draw2d_vectorfigure" */ '../views/clazz.vue')
  },
  {
    path: '/draw2d',
    props: { className: 'draw2d' },
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
            data: { path: '/draw2d/shape/composite' },
            text: 'composite'
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
