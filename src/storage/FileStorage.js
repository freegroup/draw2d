
/**
 * @class draw2d.storage.FileStorage
 *
 * <b>BETA: changes can happen without notice</b>
 * <br>
 * <br>
 * FileStorage is an file storage abstraction library for Draw2D. It allows you to easily
 * read and write files to any supported file storage backends with a simple an consistent
 * API. FileStorage also supports storing metadata if the storage backend supports it.
 *
 * There are a number of different ways to store your files when you're building an application
 * with Draw2D. There's the local file system of the server, Databases and of course there are
 * cloud-based CDN solutions such as Google Drive, Amazon S3 and many more.
 *
 * From application point of view, it's not optimal to deeply bind your implementation to any single
 * storage backend, as there might be a need to be able to change that later. For example, you might
 * first use a local filesystem when you start developing but the change to a more advanced solution
 * when the application matures. This is when FileStorage becomes handy. Using the simple API of
 * FileStorage you are able to change the storage backend without needing to change the code using it.
 *
 *
 */
import draw2d from '../packages';

draw2d.storage.FileStorage = Class.extend({
    NAME : "draw2d.storage.FileStorage",

    /**
     * @constructor
     *
     */
    init: function(){
    },

    requiresLogin: function(){
        return false;
    },

    isLoggedIn: function(callback){
        callback(false);
    },

    /**
     * @method
     *
     * @param {String} filenameFilter the file picker set a file name filter with the given pattern. Only files which contains the given string will be loaded
     * @param {Function} successCallback callback method if the user select a file and the content is loaded
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    pickFileAndLoad: function(filenameFilter, successCallback, errorCallback, abortCallback)
    {
    },


    /**
     * @method
     * Request a filename for a new file. The application can use this platform depending
     * filename selector before the saveFile function is called.
     *
     * @since 4.2.0
     */
    promptForFilename: function(successCallback, abortCallback){
        var fileName = prompt(draw2d.Configuration.i18n.dialog.filenamePrompt);
        if(!fileName){
            if(abortCallback){
                abortCallback();
            }
        }
        else{
            successCallback(fileName);
        }
    },

    /**
     * @method
     * Save a file to the google drive bakcend. Either <b>file</b> is a string or a fileHandle.<br>
     * If it is a fileHnadle a <b>updateFile</b> is called.
     *
     * @param {String} fileName the filename of the file
     * @param {String} content the content of the file base64 decoded
     * @param {Boolean} contentIsBase64 indicates if the provided content base64 encoded
     * @param {String} base64Thumbnail thumbnail of the canvas
     * @param {Function} successCallback callback method if the save operation finished
     * @param {Function} errorCallback method to call if any error happens
     * @since 4.0.0
     */
    saveFile: function(fileName, content, contentIsBase64, base64Thumbnail, successCallback, errorCallback)
    {

    },

    /**
     * @method
     * Save a already loaded file.
     *
     *
     * @param {Object} fileHandle the file handle of the pickFileAndLoad method
     * @param {String} content the file content as base64 coded content
     * @param {Boolean} contentIsBase64 indicates if the provided content base64 encoded
     * @param {Function} successCallback the callback method if the file has been saved successfully.
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    updateFile: function(fileHandle, content, contentIsBase64, successCallback, errorCallback)
    {
    },

    /**
     * @method
     * Save a new file in the storage provider.
     *
     *
     * @param {String} fileName the file name if the new file
     * @param {String} content the content of the file as base64 encoded
     * @param {Boolean} contentIsBase64 indicates if the provided content base64 encoded
     * @param {Function} successCallback the callback method after a successful save operation
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    insertFile: function(fileName, content, contentIsBase64, successCallback, errorCallback)
    {
    }
});
