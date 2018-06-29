(function(document) {
  'use strict';

  document.addEventListener('polymer-ready', function() {

      var template = document.querySelector('template[is="auto-binding"]');
      template.pages = [
        {name: 'Single', hash: 'one'},
        {name: 'page', hash: 'two'},
        {name: 'app', hash: 'three'}
      
      ];
      
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
