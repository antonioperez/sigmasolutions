(function () {

    angular
        .module('app')
        .controller('UploadsCtrl', [
            '$http',
            '$scope',
            'FileUploader',
            Ctrl
        ]);

    function Ctrl($http, $scope, FileUploader) {

        var auth = firebase.auth();
        var storageRef = firebase.storage().ref();

        var uploader = $scope.uploader = new FileUploader();

        uploader.uploadItem = function (value) {

            //HAD TO OVERWRITE EXISTING UPLOAD ITEM FUNCTION. 
            //BECAUSE IT IS SENDING TO A LOCAL PORT/URL. NEED TO SEND TO FIREBASE INSTEAD

            var file = value._file;           
            storageRef.child('userid/' + file.name).put(file).then(function (snapshot) {
                console.log('Uploaded a blob or file!');

            }, function (error) {
                // Handle unsuccessful uploads
                console.log(error);
            }, function () {

                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
            });

            var index = this.getIndexOfItem(value);
            var item = this.queue[index];
            var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';

            item._prepareToUploading();
            if(this.isUploading) return;

            this._onBeforeUploadItem(item);
            if (item.isCancel) return;

            item.isUploading = true;
            this.isUploading = true;
            this[transport](item);
            this._render();
        };



        // // CALLBACKS
        // uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/ , filter, options) {
        //     console.info('onWhenAddingFileFailed', item, filter, options);
        // };

        // uploader.onAfterAddingAll = function (addedFileItems) {
        //     console.info('onAfterAddingAll', addedFileItems);
        // };

        // uploader.onProgressItem = function (fileItem, progress) {
        //     console.info('onProgressItem', fileItem, progress);
        // };
        // uploader.onProgressAll = function (progress) {
        //     console.info('onProgressAll', progress);
        // };
        // uploader.onSuccessItem = function (fileItem, response, status, headers) {
        //     console.info('onSuccessItem', fileItem, response, status, headers);
        // };
        // uploader.onErrorItem = function (fileItem, response, status, headers) {

        // };
        // uploader.onCancelItem = function (fileItem, response, status, headers) {
        //     console.info('onCancelItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteItem = function (fileItem, response, status, headers) {
        //     console.info('onCompleteItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteAll = function () {
        //     console.info('onCompleteAll');
        // };

    }
})();