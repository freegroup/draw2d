/**
 *
 * @private
 */
export default {

    geo: {
    },

    io:{
      json:{},
      png:{},
      svg:{}
    },

    storage:{
    },

    util : {
      spline: {}
    },

    shape : {
      basic:{},
      composite:{},
      arrow:{},
      node: {},
      note: {},
      diagram:{},
      flowchart:{},
      analog:{},
      icon:{},
      layout:{},
      pert:{},
      state:{},
      widget:{}
    },

    policy : {
      canvas:{},
      connection:{},
      line:{},
      port:{},
      figure:{}
    },

    command : {
    },

    decoration:{
      connection:{}
    },

    layout: {
      connection :{},
      anchor :{},
      mesh :{},
      locator: {}
    },

    ui :{
    },

    isTouchDevice : (
      //Detect iPhone
      (navigator.platform.indexOf("iPhone") != -1) ||
      //Detect iPod
      (navigator.platform.indexOf("iPod") != -1)||
      //Detect iPad
      (navigator.platform.indexOf("iPad") != -1)
    )

}



