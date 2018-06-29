(function ($, undefined) {
    $.fn.caretPosition = function(pos) {
        if(typeof pos ==="undefined"){
            var el = $(this).get(0);
            var pos = 0;
            if('selectionStart' in el) {
                pos = el.selectionStart;
            } else if('selection' in document) {
                el.focus();
                var Sel = document.selection.createRange();
                var SelLength = document.selection.createRange().text.length;
                Sel.moveStart('character', -el.value.length);
                pos = Sel.text.length - SelLength;
            }
            return pos;
        }
        else{
            var el = $(this).get(0);
            if (el.setSelectionRange) {
                el.setSelectionRange(pos, pos);
              } else if (el.createTextRange) {
                var range = el.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
              }
        }
    };
})(jQuery);


