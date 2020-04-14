/**
 * adding support method to check if the node is already visible
 **/
(function() {
    Raphael.el.isVisible = function() {
        return (this.node.style.display !== "none");
    }
})();
