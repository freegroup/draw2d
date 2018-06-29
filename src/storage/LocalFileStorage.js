/**
 * @class draw2d.storage.LocalFileStorage
 *
 * <b>BETA: changes can happen without notice</b>
 * <br>
 * <br>
 * Storage provider for the HTML5 FileAPI.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.storage.FileStorage
 */
import draw2d from '../packages';

draw2d.storage.LocalFileStorage = draw2d.storage.FileStorage.extend({
    NAME : "draw2d.storage.LocalFileStorage",

    /**
     * @constructor
     *
     */
    init: function(){
        this._super();

        this.initDone = false;
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          // Great success! All the File APIs are supported.
        } else {
          alert('The File APIs are not fully supported in this browser.');
          return;
        }

        this.initDone = true;

    },

    /**
     * @method
     *
     * Open the file picker and load the selected file.<br>
     *
     * Example usage:
     *
     *      this.openButton.on("click",$.proxy(function(){
     *         this.filePicker.pickFileAndLoad($.proxy(function(file, fileData){
     *            // save the fileHandle for further save operations
     *            this.file = file;
     *
     *            // cleanup the canvas
     *            this.canvas.clear();
     *
     *            // load the JSON into the canvas
     *            var reader = new draw2d.io.json.Reader();
     *            reader.unmarshal(canvas, JSON.parse(fileData));
     *        },this));
     *     },this));
     *
     * @param {String} filenameFilter the file picker set a file name filter with the given pattern. Only files which contains the given string will be loaded
     * @param {Function} successCallback callback method if the user select a file and the content is loaded
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    pickFileAndLoad: function(filenameFilter, successCallback, errorCallback) {
        // #modal-background
        var modalBackgroundCSS = {
                "display": "block",
                "position": "fixed",
                "top": 0,
                "left": 0,
                "width": "100%",
                "height": "100%",
                "background-color": "white",
                "opacity": .50,
                "-webkit-opacity": .5,
                "-moz-opacity": .5,
                "filter": "alpha(opacity=50)",
                "z-index": 1000 };

       var modelContentCSS= {
                "background-color": "white",
                "border-radius": "10px",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "box-shadow": "0 0 20px 0 #222",
                "-webkit-box-shadow": "0 0 20px 0 #222",
                "-moz-box-shadow": " 0 20px 0 #222",
                "display": "block",
                "height": "240px",
                "left": "50%",
                "margin": "-120px 0 0 -160px",
                "padding": "10px",
                "position": "absolute",
                "top":"50%",
                "width": "320px",
                "z-index": "1000"
        };


       $("body").append($('<div id="modal-background"></div>'+
                       '<div id="modal-content">'+
                       '    <input type="file" id="storage_files" name="files"  />'+
                       '</div>'));

        // open a dialog as modal div above the document body
        //
       $("#modal-background").css(modalBackgroundCSS);
       $("#modal-content").css(modelContentCSS);

       $("#modal-background, #modal-close").click(function () {
           $("#modal-background, #modal-content").remove();
       });

       $('#storage_files').on('change', function(event){
           $("#modal-background, #modal-content").remove();
           var f = event.target.files[0]; // FileList object
           f.title = f.name;
           var reader = new FileReader();

           // Closure to capture the file information.
           reader.onload = function(e) {
               // Render thumbnail.
               successCallback(f, e.target.result);
           };
           // Read in the image file as a data URL.
           reader.readAsText(f);
       });
    },


    /**
     * @method
     * Save a file to the google drive back end. Either <b>file</b> is a string or a fileHandle.<br>
     * If it is a fileHnadle a <b>updateFile</b> is called.
     *
     * @param {String} fileName the filename of the file
     * @param {String} content the content of the file base64 decoded
     * @param {String} contentIsBase64 indicates if the content already base64 encoded
     * @param {Function} successCallback callback method if the save operation finished
     * @since 4.0.0
     */
    saveFile: function(fileName, content, contentIsBase64,  successCallback) {
        var blob = new Blob([content]);
        saveAs(blob, fileName);
        successCallback({title: fileName});
    },

    /**
     * @method
     * Save a already loaded file.
     *
     *
     * @param {Object} fileHandle the file handle of the pickFileAndLoad method
     * @param {String} content the file content
     * @param {String} contentIsBase64 indicates if the content already base64 encoded
     * @param {Function} successCallback the callback method if the file has been saved successfully.
     *
     * @since 4.0.0
     */
    updateFile: function(fileHandle, content, contentIsBase64, successCallback) {
        this.saveFile(fileHandle.title, content, contentIsBase64,successCallback);
    },

    /**
     * @method
     * Save a new file in the storage provider.
     *
     *
     * @param {String} fileName the file name if the new file
     * @param {String} content the content of the file
     * @param {String} [contentIsBase64] idicates if the content already base64 encoded
     * @param {Function} successCallback the callback method after a successful save operation
     *
     * @since 4.0.0
     */
    insertFile: function(fileName, content, contentIsBase64, successCallback){
        this.saveFile(fileName, content, contentIsBase64, successCallback);
    }
});
