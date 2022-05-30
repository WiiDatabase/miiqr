var Fman = function() {};

Fman.downloadArray = function(data, filename) {
    // Download file
    if (data === undefined) {
        window.alert("Please i a file first");
        return;
    }
    tmpA = document.createElement("a");
    document.body.appendChild(tmpA);
    tmpA.style = "display: none";
    var blob = new Blob([data], { "type" : "application/octet-stream" });
    console.log(blob);
    if (typeof window.navigator.msSaveOrOpenBlob == 'function') { // Edge
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else { // Chrome & Firefox
        blobUrl = window.URL.createObjectURL(blob);
        tmpA.href = blobUrl;
        tmpA.download = filename;
        tmpA.click();
        setTimeout(function(){
            document.body.removeChild(tmpA);
            window.URL.revokeObjectURL(blobUrl);  
        }, 100);
    }
}

Fman.makeInput = function(selector, callback, options) {
	var defaults = {
		reader: "readAsArrayBuffer"
	};
	var opts = $.extend({}, defaults, options);
	var selector = $(selector);
	selector.parent().append(
		"<input type='file' class='hidden'>"
	);

	$("input", selector.parent()).on("change", {cb: callback, fn: opts.reader}, function(e) {
		var file = e.target.files[0];
		if (!file) {
		    return;
		}
		var reader = new FileReader();
		reader.onload = (function(callback){
		    var cb = callback;
		    return function(e){
		        cb(e.target.result);
		    };
		})(e.data.cb);
		reader[e.data.fn](file);
	});
	selector.on("click", function() {
		$("input", $(this).parent()).click();
	});
}