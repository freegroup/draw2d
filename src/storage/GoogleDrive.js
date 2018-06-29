/**
 * <b>BETA: changes can happen without notice</b>
 * <br>
 * <br>
 * Applications that use this interface must abide by all existing Terms of Service of the Google Drive API.<br>
 * Most importantly, you must correctly identify yourself in your requests. Please read the documentation below before
 * you send any "getting started" questions or any bug reports<br>
 *
 * https://developers.google.com/picker/docs/
 *
 *
 * Example usage of the google drive and auth libs. Please note that I didn't use a parallel loading
 * mechanism for the google dependencies. I did this just to simplify the example code.<br>
 *
 *        var app=null;
 *
 *        // call this after the DOM onLoad
 *        //
 *        function initApp(){
 *              // configure the google drive FilePicker API
 *              //
 *              draw2d.storage.GoogleDrive.developerKey = <YOUR_GOOGLE_DEVELOPER_KEY>;
 *              draw2d.storage.GoogleDrive.clientId     = <YOUR_GOOGLE_CIENT_ID>;
 *
 *              // load all dependencies for the google drive api.
 *              // TODO: switch to parallel loading of scripts .. this is just a hack
 *              //
 *              gapi.load('auth', {'callback': function(){
 *                     gapi.load('picker', {'callback': function(){
 *                         gapi.client.load('drive', 'v2', function(){
 *
 *                             // all google libs loaded well. you can now init the application.
 *                             //
 *                             app  = new example.Application();
 *                         });
 *                     }});
 *                  }
 *              });
 *        }
 *
 * @author Andreas Herz
 * @extends draw2d.storage.FileStorage
 */
import draw2d from '../packages';

draw2d.storage.GoogleDrive = draw2d.storage.FileStorage.extend({

    NAME : "draw2d.storage.GoogleDrive",

    /**
     * @constructor
     *
     */
    init: function(){
        this._super();

        this.checkDependencies();

        this.onFileSelectedAndLoadedCallback = function(fileName, fileData){};

        gapi.client.setApiKey(draw2d.storage.GoogleDrive.developerKey);

        this.fileHandleCache = []; // name->handle mapping
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
     *           alert("unalbe to load file");
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
        this.checkDependencies();

        if(typeof successCallback ==="function"){
            this.onFileSelectedAndLoadedCallback = successCallback;
        }

        // Check if the user has already authenticated
        var token = gapi.auth.getToken();
        if (token) {
            this._showPicker();
        } else {
            // The user has not yet authenticated with Google
            // We need to do the authentication before displaying the Drive picker.
            this._doAuth(false, $.proxy(this._showPicker,this));
        }
    },


    /**
     * @method
     * Save a file to the google drive backend. Either <b>file</b> is a string or a fileHandle.<br>
     * If it is a fileHnadle a <b>updateFile</b> is called.
     *
     * @param {String} fileName the filename of the file
     * @param {String} base64Content the content of the file base64 decoded
     * @param {Boolean} contentIsBase64 indicates if the provided content base64 encoded
     * @param {Function} successCallback callback method if the save operation finished
     * @since 4.0.0
     */
    saveFile: function(fileName, content, contentIsBase64, successCallback, errorCallback) {
    	var file = this.fileHandleCache[fileName];
    	if(typeof file === "undefined"){
    		this.insertFile(fileName, content, contentIsBase64, successCallback, errorCallback);
    	}
    	else{
    		this.updateFile(file, content, contentIsBase64, successCallback, errorCallback);
    	}
    },

    /**
     * @method
     * Save a already loaded file on the google drive.
     *
     *
     * Example usage:
     *
     *       this.saveButton.on("click",$.proxy(function(){
     *          var writer = new draw2d.io.json.Writer();
     *          writer.marshal(this.canvas,$.proxy(function(json){
     *              var base64Content = draw2d.util.Base64.encode(JSON.stringify(json, null, 2));
     *              this.filePicker.updateFile(this.fileHandle, content, false, $.proxy(function(file){
     *                  // save the new file handle for further operations
     *                  //
     *                  this.fileHandle = file;
     *
     *                  // inform the user about the success.
     *                  //
     *                  alert("File saved");
     *              },this));
     *          },this));
     *      },this));
     *
     * @param {Object} fileHandle the file handle of the pickFileAndLoad method
     * @param {String} base64Content the file content as base64 coded content
     * @param {String} contentIsBase64 indicates if the provided content base64 encoded
     * @param {Function} successCallback the callback method if the file has been saved successfully.
     *
     * @since 4.0.0
     */
    updateFile: function(fileHandle, content, contentIsBase64,  successCallback, errorCallback) {
        this.checkDependencies();

        // Check if the user has already authenticated
        var token = gapi.auth.getToken();
        if (token) {
            this._updateFile(fileHandle, content, contentIsBase64, successCallback, errorCallback);
        } else {
            // The user has not yet authenticated with Google
            // We need to do the authentication before displaying the Drive picker.
            this._doAuth(false, $.proxy(function(){
                this._updateFile(fileHandle, content, contentIsBase64, successCallback, errorCallback);
            },this));
        }
    },

    _updateFile: function(fileHandle, content, contentIsBase64, successCallback, errorCallback) {

        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";

        var contentType = fileHandle.type || 'application/octet-stream';
        var metadata = {'mimeType': contentType};

        if(contentIsBase64===false){
            content = draw2d.util.Base64.encode(content);
        }

        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            content +
            close_delim;

        gapi.client.request({
            'path': '/upload/drive/v2/files/'+fileHandle.id,
            'method': 'PUT',
            'params': {'fileId': fileHandle.id, 'uploadType': 'multipart'},
            'headers': {'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'},
            'body': multipartRequestBody,
            callback:$.proxy(function(file){
                if(file ===false){
                    if(typeof errorCallback !=="undefined"){
                        errorCallback();
                    }
                }
                else if (typeof successCallback ==="function") {
                    this.updateCache(file);
                    successCallback(file);
                }
            },this)
        });
    },

    /**
     * @method
     * Save a new file on the google drive.
     *
     * Example usage:
     *
     *       this.saveAsButton.on("click",$.proxy(function(){
     *          var writer = new draw2d.io.json.Writer();
     *          writer.marshal(this.canvas,$.proxy(function(json){
     *               var base64Content = draw2d.util.Base64.encode(JSON.stringify(json, null, 2));
     *               var fileName = prompt("Enter filename:");
     *               if(!fileName){
     *                   return;
     *               }
     *               this.filePicker.insertFile(fileName, content, false, $.proxy(function(file){
     *                   // store the file handle for further google drive operations
     *                   //
     *                   this.fileHandle = file;
     *                   alert("File saved as: "+fileName);
     *               },this));
     *          },this));
     *      },this));
     *
     * @param {String} fileName the file name if the new file
     * @param {String} base64Content the content of the file as base64 encoded
     * @param {String} [base64Thumbnail] thumbnail of the image base64 decoded. Can be null
     * @param {Function} the callback method after a successful save operation
     *
     * @since 4.0.0
     */
    insertFile: function(fileName, content, contentIsBase64, successCallback, errorCallback){
        this.checkDependencies();

        // Check if the user has already authenticated
        var token = gapi.auth.getToken();
        if (token) {
            this._insertFile(fileName, content, contentIsBase64,successCallback, errorCallback);
        } else {
            // The user has not yet authenticated with Google
            // We need to do the authentication before displaying the Drive picker.
            this._doAuth(false, $.proxy(function(){
                this._insertFile(fileName, content, contentIsBase64, successCallback, errorCallback);
            },this));
        }
    },

    _insertFile: function(fileName, content, contentIsBase64, successCallback, errorCallback){

        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";
        var contentType = "application/json";
        var metadata = {
            'title':  fileName,
            'mimeType': contentType
         };


        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            content +
            close_delim;

        var request = gapi.client.request({
              'path': '/upload/drive/v2/files',
              'method': 'POST',
              'params': {'uploadType': 'multipart', 'useContentAsIndexableText':false},
              'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
              },
              'body': multipartRequestBody});
        request.execute($.proxy(function(file){
            if(file===false){
                if (errorCallback) {
                    errorCallback(file);
                }
            }
            else{
                this.updateCache(file);
                if (successCallback) {
                    successCallback(file);
                }
            }
        },this));
    },

    /**
     * Show the file picker once authentication has been done.
     * @private
     */
    _showPicker: function() {
        var accessToken = gapi.auth.getToken().access_token;
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setQuery("title:draw2d");
        this.picker = new google.picker.PickerBuilder().
            addView(view).
            setAppId(draw2d.storage.GoogleDrive.clientId).
            setOAuthToken(accessToken).
            setCallback($.proxy(this._pickerCallback,this));

       this.picker.build().setVisible(true);
    },

    /**
     * Called when a file has been selected in the Google Drive file picker.
     * @private
     */
    _pickerCallback: function(data) {
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var file = data[google.picker.Response.DOCUMENTS][0];
            var id = file[google.picker.Document.ID];
            var request = gapi.client.drive.files.get({fileId: id});

            request.execute($.proxy(this._fileGetCallback,this));
        }
    },
    /**
     * Called when file details have been retrieved from Google Drive.
     * @private
     */
    _fileGetCallback: function(file) {
      jQuery.ajax(
                file.downloadUrl,{
                        headers: {'Authorization': 'Bearer ' + gapi.auth.getToken().access_token }
                }
        ).done($.proxy(function(data) {
            this.updateCache(file);
            this.onFileSelectedAndLoadedCallback(file, data);

            var basename = file.title.replace(".draw2d","");
            this.loadRelatedCacheEntries(basename);
        },this));

    },


    /**
     * Called when the Google Drive API has finished loading.
     * @private
     */
    _driveApiLoaded: function() {
        this._doAuth(true);
    },

    /**
     * Authenticate with Google Drive via the Google JavaScript API.
     * @private
     */
    _doAuth: function(immediate, callback) {
        gapi.auth.authorize({
            client_id: draw2d.storage.GoogleDrive.clientId + '.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive',
            immediate: immediate
        }, callback);
    },

    /**
     * @method
     * check all dependendies for the google drive api usage.
     * @private
     */
    checkDependencies: function(){

        // Load the drive API
        if(typeof gapi === "undefined"){
            throw "Google drive API js files not loaded yet";
        }

        if(draw2d.storage.GoogleDrive.developerKey==="" || draw2d.storage.GoogleDrive.clientId===""){
            var error  ="You must set the Google Drive key and clientId before usage. Please read documentation before usage";
            throw error;
        }
    },

    /**
     * @method
     * Load related file names and id into the cache for fast lookup of the file ID's of
     * generated files like PNG, JS,...
     *
     * @private
     */
    loadRelatedCacheEntries: function(filePattern){
        searchQuery =  'trashed = false and hidden = false and "root" in parents';
        if(!filePattern){
            searchQuery = searchQuery+' and title contains "draw2d"';
        }
        else{
            searchQuery = searchQuery+' and title contains "'+filePattern+'"';
        }

        var retrievePageOfFiles = $.proxy(function(request, result) {
          request.execute($.proxy(function(resp) {
            result = result.concat(resp.items);
            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
              request = gapi.client.drive.files.list({
                  'pageToken': nextPageToken,
                  'fields':'items(id,modifiedDate,title)',
                  'q' : searchQuery
                  });
              retrievePageOfFiles(request, result);
            }
            else {
              // update the cache with the new fileHandles
              $.each(result, $.proxy(function(i,e){
                  this.updateCache(e);
              },this));
            }
          },this));
        },this);
        var initialRequest = gapi.client.drive.files.list({
            'fields':'items(id,modifiedDate,title)',
            'q' : searchQuery
            });
        retrievePageOfFiles(initialRequest, []);
    },

    /**
     * @method
     * Add the file handle to the cache. Required to lookup the file.id for file save operations for
     * PNG or other generated files. This avoids duplicate entries in Google Drive like "fileX (1).png, fileX (2).png,..."
     *
     * @private
     */
    updateCache: function(file){
        var existing = this.fileHandleCache[file.title];
        if(!existing || existing.timestamp < file.timestamp){
            file.timestamp = Date.parse(file.modifiedDate);
            this.fileHandleCache[file.title] = file;
        }
    }
});


draw2d.storage.GoogleDrive.developerKey = "";
draw2d.storage.GoogleDrive.clientId     = "";
