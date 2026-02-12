
// extending raphael with a polygon function
Raphael.fn.polygon = function(pointString) {
  let poly  = ['M'];
  let point = pointString.split(' ');
      
  for(let i=0; i < point.length; i++) {
     let c = point[i].split(',');
     for(let j=0; j < c.length; j++) {
        let d = parseFloat(c[j]);
        if (!isNaN(d))
          poly.push(d);
     };
     if (i == 0)
      poly.push('L');
  }
  poly.push('Z');
  
  return this.path(poly);
};