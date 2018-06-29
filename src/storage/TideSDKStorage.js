
/**
 * @class draw2d.storage.TideSDKStorage
 *
 * <b>BETA: changes can happen without notice</b>
 * <br>
 * <br>
 * TideSDK’s versatility allows you to couple your favorite web technologies, e.g. Draw2D,  with TideSDK’s powerful API to build native cross-platform desktop apps.
 * <br>
 * This storage provider contains methods that help a TideSDK application manage files and read/write data to them.
 * <br>
 * <br>
 * <b>Ensure that you have cut&past this method below to your index.html file. Additional you must pack your
 * TideSDK app with PHP runtime.</b><br>
 * <br>
 * This is so because the native TideSDK is unable to write binary data or resources to the filesystem.
 *
 *             <script type="text/php">
 *             function tideSDK_writeBase64AsBinaryData($fileName, $base64){
 *               $binary=base64_decode($base64);
 *               $file = fopen($fileName, "w");
 *               fwrite($file, $binary);
 *               fclose($file);
 *             }
 *             </script>
 *
 * @author Andreas Herz
 * @extends draw2d.storage.FileStorage
 */
import draw2d from '../packages';

draw2d.storage.TideSDKStorage = draw2d.storage.FileStorage.extend({
    NAME : "draw2d.storage.TideSDKStorage",

    /**
     * @constructor
     *
     */
    init: function(){
        this._super();

        this.initDone = false;
        // Check for the various File API support.
        if (typeof Ti!=="undefined" && typeof Ti.UI !=="undefined" && typeof Ti.UI.openFileChooserDialog!=="undefined") {
            // Great success! TideSDK are supported.
            // check now of the user has cut&paste the PHP method to write binary data to the desktop
            // This is required because TideSDK supports only "String"
            if(typeof "tideSDK_writeBase64AsBinaryData" ==="undefined"){
                throw "TideSDK binding for writing binary data not available. Please read documentation and cut&paste the PHP method 'tideSDK_writeBase64AsBinaryData' from there";
            }
        } else {
          throw "Application didn't run in the TideSDK desktop enviroment. TideSDKStorage is not available.";
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
     *        },this),
     *        function(){
     *          alert("loading file is not possible");
     *        });
     *     },this));
     *
     * @param {String} filenameFilter the file picker set a file name filter with the given pattern. Only files which contains the given string will be loaded
     * @param {Function} successCallback callback method if the user select a file and the content is loaded
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    pickFileAndLoad: function(filenameFilter, successCallback, errorCallback) {
        try{
            var callbackFunc = function(filenames){
                try{
                    fileSelected = filenames[0];

                    var readfi= Ti.Filesystem.getFile(fileSelected);
                    if (readfi.exists())
                    {
                       var Stream = Ti.Filesystem.getFileStream(readfi);
                       Stream.open(Ti.Filesystem.MODE_READ);
                       contents =Stream.read();
                       Stream.close();
                       successCallback({title:fileSelected}, contents.toString());
                    }
                    else{
                        errorCallback("unable to read file");
                    }
                }
                catch(e){
                    errorCallback(e);
                }
            };
            var options = {
               multiple: false,
               title: "Select files to open...",
               types : [filenameFilter],
               typesDescription: "Documents",
               path: Ti.Filesystem.getUserDirectory()
            };
            Ti.UI.openFileChooserDialog(callbackFunc, options);
        }
        catch(e){
            errorCallback(e);
        }
    },



    /**
     * @method
     * Request a filename for a new file. The application can use this platform depending
     * filename selector before the saveFile function is called.
     *
     * @since 4.2.0
     */
    promptForFilename: function(successCallback, abortCallback){
        var uw = Ti.UI.getCurrentWindow();
        uw.openSaveAsDialog(function(fn){

          if(fn.length===0){
              abortCallback();
          }
          else{
              successCallback(fn[0]);
          }
        },{
          "title": "Demo",

          "path": Ti.Filesystem.getApplicationDataDirectory(),
          "types": ["draw2d"],
          "multiple": false,
          "defaultFile": "newFile.draw2d"
        });
    },

    /**
     * @method
     * Save a file to the local file system. Either <b>file</b> is a string or a fileHandle.<br>
     * If it is a fileHandle a <b>updateFile</b> is called.
     *
     * @param {String} fileName the filename of the file
     * @param {String} content the content of the file base64 decoded
     * @param {String} contentIsBase64 indicates if the content already base64 encoded
     * @param {Function} successCallback callback method if the save operation finished
     * @param {Function} errorCallback callback method if any error happens
     * @since 4.0.0
     */
    saveFile: function(fileName, content, contentIsBase64,  successCallback, errorCallback) {
        try{
          if(contentIsBase64){
              tideSDK_writeBase64AsBinaryData(fileName, content);
          }
          else{
              //Doesn't have to exist yet.
              var fileHandle = Ti.Filesystem.getFile(fileName);
              var stream =  Ti.Filesystem.getFileStream(fileHandle);
              stream.open(Ti.Filesystem.MODE_WRITE,false);
              stream.write(content);
              stream.close();
          }

          successCallback({title: fileName});
        }
        catch(e){
            errorCallback();
        }
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
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    updateFile: function(fileHandle, content, contentIsBase64, successCallback, errorCallback) {
        this.saveFile(fileHandle.title, content, contentIsBase64,successCallback, errorCallback);
    },

    /**
     * @method
     * Save a new file in the storage provider.
     *
     *
     * @param {String} fileName the file name if the new file
     * @param {String} content the content of the file
     * @param {String} [contentIsBase64] indicates if the content already base64 encoded
     * @param {Function} successCallback the callback method after a successful save operation
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    insertFile: function(fileName, content, contentIsBase64, successCallback, errorCallback){
        this.saveFile(fileName, content, contentIsBase64, successCallback, errorCallback);
    }
});
