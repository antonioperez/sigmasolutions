var genGuid = function () {
    var date = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
        var rand = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (char == 'x' ? rand : (rand & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

var downloadFile = function (url, payload, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.responseType = 'arraybuffer';    
    xhr.onload = function () {
        if (this.status === 200) {
            var filename = "";
            if (payload.outputName) {
                filename = payload.outputName;
            } else {
                //random guid name
                filename = genGuid();
            }

            //filename needs the .zip in order to get a zip file. TODO: better check in case of multiple. 
            filename += ".zip"

            var type = xhr.getResponseHeader('Content-Type');
            var blob = new Blob([this.response], {
                type: type
            });

            //is IE?
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE workaround"
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);
                if (filename) {

                    var atag = document.createElement("a");
                    // safari fix
                    if (typeof atag.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        atag.href = downloadUrl;
                        atag.download = filename;
                        document.body.appendChild(atag);
                        atag.click();
                    }
                } else {
                    window.location = downloadUrl;
                }

                setTimeout(function () {
                    // let the browser know not to keep the reference to the file any longer
                    URL.revokeObjectURL(downloadUrl);
                }, 100);

                callback();
            }
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send($.param(payload));
}