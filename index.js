//CirroNimble Sparational module
// index.JS
// Comments are fundamental
// aSecretToEverybody


//{ Init vars
var $http = require("http");
var $serviceName = "SPArational";
var $servicePort = (process.env.PORT || 5001);
var sparational = require("sparational");
sparational.sequelize = new sparational.Sequelize(process.env.DATABASE_URL || 'postgres://postgres:dbpasswd@127.0.0.1:5432/postgres', {logging: false});
//}

//{ functions
String.prototype.hexEncode = function(){
    var hex, i;
 
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
 
    return result
}
String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
 
    return back;
}
String.prototype.octEncode = function(){
    var hex, i;
 
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(8);
        result += ("000"+hex).slice(-4);
    }
 
    return result
}
String.prototype.octDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 8));
    }
 
    return back;
}
function swimmersEncode($swimmers){
    return $swimmers .octEncode().replace(/0/g,"~-~ ").replace(/1/g,"-~- ").replace(/2/g,"   ").replace(/3/g,"O_|").replace(/4/g,"o__").replace(/5/g,"o,").replace(/6/g,"o_").replace(/7/g,",")
}
function swimmersDecode($swimmers){
    return $swimmers.replace(/\~-~ /g,0).replace(/-~- /g,1).replace(/   /g,2).replace(/O_\|/g,3).replace(/o__/g,4).replace(/o,/g,5).replace(/o\_/g,6).replace(/,/g,7).octDecode() 
}var $page_views = 0;

function getBadPW() { return Math.random().toString(36).slice(-20).slice(2); };
function writeLog($msg) { 
	$msg = $msg.toString().replace(/'/g,"~~")
	sparational.sequelize.query("INSERT INTO Logs (servicename, err) SELECT '"+$serviceName+"','"+$msg+"'").then(([$PagesResults, metadata]) => {
	}).catch(function(err) {
		console.log('writeLog Insert error: '); 
		console.log(err); 
	}) //	.then()
};
//}

//{ Framework - SPArational
$http.createServer(function (request, response) {
	writeLog(request.method +"request from address:" + request.connection.remoteAddress + " on path: "+request.connection.remotePort+" for path " + request.url)
if (request.url == "/undefined/favicon.ico") {
	response.end() 
} else {
	sparational.html("www.sparational.com",function($callback) {
		response.end($callback)
	})
}}).listen($servicePort);
//}

//{ End items
writeLog('Service is running on port ' + $servicePort);
console.log($serviceName + ' is running on port ' + $servicePort);
//}

