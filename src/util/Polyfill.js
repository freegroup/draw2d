// avoid iPad bounce effect during DragDrop
//
document.ontouchmove = function(e){e.preventDefault();};


Math.sign = function() {
    if (this < 0) {return -1;}
    return 1;
}

