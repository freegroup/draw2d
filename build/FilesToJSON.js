let glob = require('glob');
let fs = require('fs');

class FilesToJSON{

  constructor(params){
    this.pattern = params.pattern
    this.filename = params.filename
  }

  // Setup the plugin instance with options...

  apply(compiler){
    compiler.plugin('done', () =>{
      glob(this.pattern,  (err, files) => {
        if (err) {
          console.log(err);
        } else {
          fs.writeFile(this.filename, "var examples= "+JSON.stringify(files,undefined,2), (err)=>{
            console.log(err)
          });
        }
      });
    })
  }
}


module.exports = FilesToJSON;
