var CollapsibleLocator =  {


    checkDelegate: function(port){
        
        // install delegate if required
        if(port.visible===false && typeof port.__restoreData==="undefined"){
            port.__restoreData = 
                {
                    getAbsoluteX : port.getAbsoluteX,
                    getAbsoluteY : port.getAbsoluteY,
                    getConnectionDirection : port.getConnectionDirection
                };
            
            port.getAbsoluteX = function(){
                if(this.parent===null){
                    return this.getX();
                }
                return this.getX() + this.parent.parent.getAbsoluteX();
            }.bind(port);
            
            port.getAbsoluteY = function(){
                if(this.parent===null){
                    return this.getY();
                }
                return this.getY() + this.parent.parent.getAbsoluteY();
            }.bind(port);
            
            port.getConnectionDirection=function(){
                return this.parent.parent.getBoundingBox().getDirection(this.getAbsolutePosition());
            };
        }
        else if(port.isVisible()===true && typeof port.__restoreData!=="undefined"){
            port.getAbsoluteX = port.__restoreData.getAbsoluteX;
            port.getAbsoluteY = port.__restoreData.getAbsoluteY;
            port.getConnectionDirection = port.__restoreData.getConnectionDirection;
            delete port.__restoreData;
        }
    }
};