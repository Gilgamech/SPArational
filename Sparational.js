//Copyright 2013-2023 Gilgamech Technologies
//SPArational.js v3.6.2 - Make faster websites faster.
//Author: Stephen Gillie
//Created on: 8/3/2022
//Last updated: 2/26/2023
//Version history:
//v3.7: Add radio element type.
//v3.8: Add locateElement.

//Element tools
function addElement($elementParent,innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId) {
	let radioButton = false;
	if (!$elementParent) {
		return;
	}; // end if elementType	
	if (!$elementType) {
		$elementType = "div"
	}; // end if elementType	
	if ($elementType == "radio") {
		$elementType = "input"
		radioButton = true;
	}
	var newElement = document.createElement($elementType);
	if (!$elementId) {
		$elementId = getBadPW();
	}; // end if divParent
	newElement.id = $elementId;
	if ($elementStyle) {
		newElement.style = $elementStyle
	}; // end if elementStyle
	if ($elementClass) {
		newElement.className = $elementClass
	}; // end if elementClass
	if ($elementParent == "body") {
		document.body.appendChild(newElement);
	} else if ($elementParent == "head") {
		document.head.appendChild(newElement);
	} else {
		document.getElementById($elementParent).appendChild(newElement);
	}; // end if divParent
	if ($elementType == "input" && innerText) {
		newElement.value = innerText
	} else if ($elementType == "img" && innerText) {
		newElement.title = innerText
	} else if (innerText) {
		newElement.innerText = innerText
	}; // end if elementType	
	if ($elementType == "a" && $href) {
		newElement.href = $href
	} else if ($elementType == "img" && $href) {
		newElement.src = $href
	} else if ($elementType == "script" && $href) {
		newElement.src = $href
	} else if ($elementType == "iframe" && $href) {
		newElement.src = $href
	} else if ($elementType == "link" && $href) {
		newElement.href = $href;
		newElement.rel = "stylesheet";
		newElement.type= "text/css";
	}; // end if elementType	
	if ($onChange) {
		document.getElementById($elementId).setAttribute("onchange", $onChange);
	}; // end if onChange	
	if ($onClick) {
		document.getElementById($elementId).setAttribute("onclick", $onClick);
	}; // end if onClick	
	if ($contentEditable) {
		document.getElementById($elementId).contentEditable = true;
	}; // end if contentEditable	
	if ($attributeType && $attributeAction) {
		document.getElementById($elementId).setAttribute($attributeType, $attributeAction);
	}; // end if attributeType
	if (radioButton == true) {
		document.getElementById($elementId).setAttribute("type", "radio");
		addElement($elementParent,innerText,"","label","","","","","","for",$elementId)
	}
	return $elementId
}; // end addElement	

function writeElement($elementId,data) {
	var $elementType = document.getElementById($elementId).type;
	if (($elementType == "text") || ($elementType == "textarea") || ($elementType == "number") || ($elementType == "select-one")) {
		document.getElementById($elementId).value = data;
	} else if (document.getElementById($elementId).tagName  == 'IMG') {
			document.getElementById($elementId).src = data;
	} else {
		document.getElementById($elementId).innerText = data;
	}; // end if elementType
}; // end writeElement

function readElement($elementId) {
	var $elementType = document.getElementById($elementId).type;
	if (($elementType == "text") || ($elementType == "textarea") || ($elementType == "select-one")|| ($elementType == "number")) {
		return document.getElementById($elementId).value;
	} else {
		return document.getElementById($elementId).innerText;
	}; // end if elementType
}; // end readElement

function deleteElement($elementId) {
	var $div = document.getElementById($elementId);
	if ($div) {
		$div.parentNode.removeChild($div);
	}	
}; // end removeBot

function appendElement($elementId,data) {
	writeElement($elementId,readElement($elementId) + data)
}; // end appendElement

function toggleElement($elementId) {
	if (document.getElementById($elementId).style.visibility == "visible") {
		document.getElementById($elementId).style.visibility="hidden";
	} else { 
		document.getElementById($elementId).style.visibility="visible";
	} // end if
}; // end toggleElement

function hideElement($elementId) {
	document.getElementById($elementId).style.visibility="hidden";
}; // end toggleElement

function showElement($elementId) {
	document.getElementById($elementId).style.visibility="visible";
}; // end toggleElement

function identifyElements(parentElement) {
	document.getElementById(parentElement).onmousedown = function(event){console.log("Element "+event.target.id+" at "+event.clientX+"," + event.clientY);}
}

function locateElement(outerId,innerId) {
//Tells how far an element is off screen. 0 means visible.
	outerRect = document.getElementById(outerId).getBoundingClientRect();
	innerRect = document.getElementById(innerId).getBoundingClientRect();
	let out = [0,0]
	//Graphics rows increment from top downward, so more is lower.
	if (innerRect.bottom < outerRect.top || innerRect.bottom < 0 ) {
		out[0] = Math.max(outerRect.top,0) - innerRect.bottom
	} 
	if (innerRect.top > outerRect.bottom || innerRect.top > document.documentElement.clientHeight) {
		out[0] = Math.min(outerRect.bottom,document.documentElement.clientHeight) - innerRect.top
	} 
	//Graphics columns increment from left rightward, so more is righter.
	if (outerRect.left  > innerRect.right|| 0 >  innerRect.right) {
		out[1] = Math.max(outerRect.left,0) - innerRect.right
	} 
	if (innerRect.left > outerRect.right || innerRect.left > document.documentElement.clientWidth) {
		out[1] = Math.min(outerRect.right,document.documentElement.clientWidth) - innerRect.left
	} 
	return out;
}

//buildElementRow('advancedPageDiv',$GilMain,'',getKeys($GilMain),'delPage');
function rebuildElement(elementId) {
	var oldElement = document.getElementById(elementId);
	var newElement = [];
	newElement[0] = {};
	newElement[0].id = elementId
	if (oldElement.parentNode.id) {newElement[0].elementParent = oldElement.parentNode.id}else(newElement[0].elementParent = "body");
	if (oldElement.type) {newElement[0].elementType = oldElement.type};
	if (oldElement.class) {newElement[0].elementClass = oldElement.class};
	//if (oldElement.style) {newElement[0].elementStyle = oldElement.style};
	//if (oldElement.href) {newElement[0].href = oldElement.href};
	//if (oldElement.onchange) {newElement[0].onChange = oldElement.onchange};
	//if (oldElement.onclick) {newElement[0].onClick = oldElement.onclick};
	//if (oldElement.contentEditable) {newElement[0].contentEditable = oldElement.contentEditable};

	console.log(JSON.stringify(newElement));
	deleteElement(elementId)
	//cje2(oldElement.parentNode,newElement);
	cje2(newElement[0].elementParent,newElement);
}

//Sitelet tools
function sideloadSitelet(siteletURI) {
	
}

//Format transformations
function rwjs($JSON) {
	//Rewrite $JSON
	//Works on any JSON, not just SPA files.
	for (var p = 0; p < getKeys($JSON.pages).length; p++) {
		var page = $JSON.pages[getKeys($JSON.pages)[p]]
		for (var e = 0; e < page.elements.length; e++) {
			if (typeof page.elements[e] == "string") {
				/* if (page.elements[e].substr(0,4) == "http") {
					$JSON.pages[getKeys($JSON.pages)[p]].elements[e] = await webRequestAsync("get",page.elements[e],"JSON");
				} else  */
					if (page.elements[e].substr(0,2) == "$_") {
					$JSON.pages[getKeys($JSON.pages)[p]].elements[e] = eval(page.elements[e].replace("$_","$JSON"))
				}; // end if elements
			}//end if typeof
		}; // end for elements
	}; // end for pages
			return $JSON;
	//faster: stringify, 
	
}; // end function

async function rwjs2($JSON) {
	for (var p = 0; p < getKeys($JSON.pages).length; p++) {
		var page = $JSON.pages[getKeys($JSON.pages)[p]]
		for (var e = 0; e < page.elements.length; e++) {
			if (typeof page.elements[e] == "string") {
				if (page.elements[e].substr(0,4) == "http") {
					$JSON.pages[getKeys($JSON.pages)[p]].elements[e] = await webRequestAsync("get",page.elements[e],"JSON");
				} else if (page.elements[e].substr(0,2) == "$_") {
					$JSON.pages[getKeys($JSON.pages)[p]].elements[e] = eval(page.elements[e].replace("$_","$JSON"))
				}; // end if elements
			}//end if typeof
		}; // end for elements
	}; // end for pages
				return $JSON;
}; // end function

function cje2(parentElement,elements) {
	//Convert $JSON to Element 2 - full rebuild.
	var eParent = elements[0].elementParent;
	elements = JSON.stringify(elements);
	elements = elements.replaceAll(eParent,parentElement);
	elements = JSON.parse(elements);
	
	for (let element of elements) {
		if (!element.elementParent) {
			element.elementParent = parentElement;
		}
		console.log(element.elementParent)
		addElement(element.elementParent, element.innerText, element.elementClass, element.elementType, element.elementStyle, element.href, element.onChange, element.onClick, element.contentEditable, element.attributeType, element.attributeAction, element.id)
	}
}

function convertMarkdownToSpa($inputString) {
	var $out
				console.log($inputString);
	var $stringVar = JSON.stringify($inputString);
				console.log($stringVar);
	$stringVar = $stringVar.replace(/\["/g,'');
	$stringVar = $stringVar.replace(/"\]/g,'');
				console.log($stringVar);
	
	if ($stringVar.indexOf('#### ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h4"}]}
	} else if ($stringVar.indexOf('### ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h3"}]}
	} else if ($stringVar.indexOf('## ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h2"}]}
	} else if ($stringVar.indexOf('# ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h1"}]}
	} else if ($stringVar.indexOf('\**') > -1 ) {
		$stringVar = $stringVar.replace(/\**/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"strong"}]}
	} else if ($stringVar.indexOf('__') > -1 ) {
		$stringVar = $stringVar.replace(/__/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"strong"}]}
	} else if ($stringVar.indexOf('\*') > -1 ) {
		$stringVar = $stringVar.replace(/\*/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"em"}]}
	} else if ($stringVar.indexOf('_') > -1 ) {
		$stringVar = $stringVar.replace(/_/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"em"}]}
	} else {
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar}]}
	}; // end if cell
			console.log($out);
	return $out;
}

function convertJupyterToSpa($inputString) {
	var $out
				console.log($inputString);
	var $stringVar = JSON.stringify($inputString);
				console.log($stringVar);
	$stringVar = $stringVar.replace(/\["/g,'');
	$stringVar = $stringVar.replace(/"\]/g,'');
				console.log($stringVar);
	
	if ($stringVar.indexOf('#### ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h4"}]}
	} else if ($stringVar.indexOf('### ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h3"}]}
	} else if ($stringVar.indexOf('## ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h2"}]}
	} else if ($stringVar.indexOf('# ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h1"}]}
	} else if ($stringVar.indexOf('\**') > -1 ) {
		$stringVar = $stringVar.replace(/\**/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"strong"}]}
	} else if ($stringVar.indexOf('__') > -1 ) {
		$stringVar = $stringVar.replace(/__/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"strong"}]}
	} else if ($stringVar.indexOf('\*') > -1 ) {
		$stringVar = $stringVar.replace(/\*/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"em"}]}
	} else if ($stringVar.indexOf('_') > -1 ) {
		$stringVar = $stringVar.replace(/_/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"em"}]}
	} else {
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar}]}
	}; // end if cell
			console.log($out);
	return $out;
}; 

function convertJupyterToSpa2($inputString) {
		$stringVar = $stringVar.replace('# ','"          "elementType": "p",');
		$stringVar = $stringVar + '</h1>"';
		$inputString = JSON.parse($stringVar);
		return $inputString;
}; 

//Text tools
function colorifyWords(divid, replaceWord, replaceClass) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace("\\","")
	var str = document.getElementById(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="' + replaceClass + '">' + replaceWord + '</span>');
	document.getElementById(divid).innerHTML = str;
}; // end colorifyWords

function colorifyMultipleWords (divList,wordList,replaceClass){
	for (var wordName = 0;wordName<wordList.length;wordName++){
		for (var divName = 0;divName<divList.length;divName++){
			colorifyWords(divList[divName],wordList[wordName],replaceClass);
		}
	}
}

function addPopupToWord(divid, replaceWord, popupText,outputClasses) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace(/\\/g,"")
	var str = document.getElementById(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="popup '+outputClasses+'">' + replaceWord + '<span>' + popupText + '</span></span>');
	document.getElementById(divid).innerHTML = str;
}; // end addPopupToWord

function addLinkToWord(divid, replaceWord, URI) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replaceAll("\\","")
	var str = document.getElementById(divid).innerHTML;
	str = str.replace(replaceRegex, '<a href="'+URI+'">' + replaceWord + '</a>');
	document.getElementById(divid).innerHTML = str;
}; // end addLinkToWord

//Supporting functions
var spaRationalCachingVar = [];
function webRequest($verb,$URI,$callback,$JSON,$file,$cached) {
//if now is smaller than duration, read from cache.
	if (spaRationalCachingVar[$URI] && Date.now() < spaRationalCachingVar[$URI+":duration"]) {
		console.log($URI+" cached for "+((spaRationalCachingVar[$URI+":duration"]-Date.now())/1000)+" more seconds.")
		$status = "304";
		returnVar = spaRationalCachingVar[$URI];
		$callback(returnVar,$status);
		return;
	}; //end if spaRationalCachingVar

	var $status;
	var xhRequest = new XMLHttpRequest();
	var returnVar;
	if ($verb == "POST") {
		xhRequest.overrideMimeType("text/plain");
	} else if ($verb == "GET") {
		xhRequest.overrideMimeType("application/json");
	} else if ($verb == "PUT") {
		xhRequest.overrideMimeType("application/json");
	} else {
		xhRequest.overrideMimeType("text/plain");
	}; // end if $verb
	xhRequest.open($verb, $URI, true);
	xhRequest.onreadystatechange = function () {
		try {
			$status = xhRequest.status;
			if ($status == "200") {
				if (xhRequest.readyState == 4) {
					returnVar = xhRequest.responseText;
					if ($JSON) {
						returnVar = JSON.parse(returnVar);
					}; // end if $JSON
					if ($cached > 0) {
						spaRationalCachingVar[$URI] = returnVar;
						spaRationalCachingVar[$URI+":duration"] = ($cached * 1000) + Date.now();
						console.log("Caching "+$URI+" for "+((spaRationalCachingVar[$URI+":duration"]-Date.now())/1000)+" more seconds.")
					} else if ($cached = 0) {
						spaRationalCachingVar[$URI] = null;
						spaRationalCachingVar[$URI+":duration"] = Date.now();
						console.log("Invalidating "+$URI)
					}; //end if $cached
					$callback(returnVar,$status);
				}; // end xhRequest.readyState
			} else {
				$callback(" Error: "+xhRequest.statusText,$status);
			}; // end if $status
		} catch(e) {console.log(e)}; // end try
	}; // end xhRequest.onreadystatechange
	xhRequest.send($file);
}; // end webRequest

function webRequestAsync($verb,$URI,$JSON,$file,$cached) {
//if now is smaller than duration, read from cache.
	if (spaRationalCachingVar[$URI] && Date.now() < spaRationalCachingVar[$URI+":duration"]) {
		console.log($URI+" cached for "+((spaRationalCachingVar[$URI+":duration"]-Date.now())/1000)+" more seconds.")
		$status = "304";
		returnVar = spaRationalCachingVar[$URI];
		$callback(returnVar,$status);
		return;
	}; //end if spaRationalCachingVar

	return new Promise(resolve => {
	var $status;
	var xhRequest = new XMLHttpRequest();
	var returnVar;
	if ($verb == "POST") {
		xhRequest.overrideMimeType("text/plain");
	} else if ($verb == "GET") {
		xhRequest.overrideMimeType("application/json");
	} else if ($verb == "PUT") {
		xhRequest.overrideMimeType("application/json");
	} else {
		xhRequest.overrideMimeType("text/plain");
	}; // end if $verb
	xhRequest.open($verb, $URI, true);
	xhRequest.onreadystatechange = function () {
		try {
			$status = xhRequest.status;
			if ($status == "200") {
				if (xhRequest.readyState == 4) {
					returnVar = xhRequest.responseText;
					if ($JSON) {
						returnVar = JSON.parse(returnVar);
					}; // end if $JSON
					if ($cached > 0) {
						spaRationalCachingVar[$URI] = returnVar;
						spaRationalCachingVar[$URI+":duration"] = ($cached * 1000) + Date.now();
						console.log("Caching "+$URI+" for "+((spaRationalCachingVar[$URI+":duration"]-Date.now())/1000)+" more seconds.")
					} else if ($cached = 0) {
						spaRationalCachingVar[$URI] = null;
						spaRationalCachingVar[$URI+":duration"] = Date.now();
						console.log("Invalidating "+$URI)
					}; //end if $cached
					resolve(returnVar,$status);
				}; // end xhRequest.readyState
			} else {
				resolve(" Error: "+xhRequest.statusText,$status);
			}; // end if $status
		} catch(e) {console.log(e)}; // end try
	}; // end xhRequest.onreadystatechange
	xhRequest.send($file);
	})
}; // end webRequestAsync

function getBadPW() {
	return Math.random().toString(36).slice(-20);
 }

function getKeys(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}; // end getKeys

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}; //end function onlyUnique

function textToNumNotation($inputObject) {
	if (typeof $inputObject == "string") {
		$inputObject = $inputObject.replace(/,/g,"");
		if ($inputObject.substring($inputObject.length -1,$inputObject.length) == "k") {
			$inputObject = $inputObject.replace(/k/g," thousand");
		}
		if ($inputObject.substring($inputObject.length -2,2) == "bn") {
			$inputObject = $inputObject.replace(/bn/g," billion");
		}
		var $splitObject = $inputObject.split(" ");
		var $value = $splitObject[0]
		var $significand = $splitObject[1]
		switch ($significand){
			case "decillion":
				$significand = $decillion;
				break;
			case "nonillion":
				$significand = $nonillion;
				break;
			case "octillion":
				$significand = $octillion;
				break;
			case "septillion":
				$significand = $septillion;
				break;
			case "sixtillion":
				$significand = $sixtillion;
				break;
			case "quintillion":
				$significand = $quintillion;
				break;
			case "quadrillion":
				$significand = $quadrillion;
				break;
			case "trillion":
				$significand = $trillion;
				break;
			case "billion":
				$significand = $billion;
				break;
			case "million":
				$significand = $million;
				break;
			case "thousand":
				$significand = $thousand;
				break;
			default:
				$significand = 1;
				break;
		}
		$outputItem = $value * $significand;
		return $outputItem;
	} else if (typeof $inputObject == "number") {
		return $inputObject;
	} else {
		return $inputObject;
	}
}

function numToTextNotation($inputObject,round) {
	var $significand = ""
	var $outVal2
	if (typeof $inputObject == "string") {
		$inputObject = $inputObject.replace(/,/g,"") *1;
	}
	if ($inputObject >= $decillion){
		$outVal2 = getRoundedNumber($inputObject/$decillion,round);
		$significand = " decillion";
	}else if ($inputObject >= $nonillion){
		$outVal2 = getRoundedNumber($inputObject/$nonillion,round);
		$significand = " nonillion";
	}else if ($inputObject >= $octillion){
		$outVal2 = getRoundedNumber($inputObject/$octillion,round);
		$significand = " octillion";
	}else if ($inputObject >= $septillion){
		$outVal2 = getRoundedNumber($inputObject/$septillion,round);
		$significand = " septillion";
	}else if ($inputObject >= $sixtillion){
		$outVal2 = getRoundedNumber($inputObject/$sixtillion,round);
		$significand = " sixtillion";
	}else if ($inputObject >= $quintillion){
		$outVal2 = getRoundedNumber($inputObject/$quintillion,round);
		$significand = " quintillion";
	}else if ($inputObject >= $quadrillion){
		$outVal2 = getRoundedNumber($inputObject/$quadrillion,round);
		$significand = " quadrillion";
	}else if ($inputObject >= $trillion){
		$outVal2 = getRoundedNumber($inputObject/$trillion,round);
		$significand = " trillion";
	}else if ($inputObject >= $billion){
		$outVal2 = getRoundedNumber($inputObject/$billion,round);
		$significand = " billion";
	}else if ($inputObject >= $million){
		$outVal2 = getRoundedNumber($inputObject/$million,round);
		$significand = " million";
	}else if ($inputObject >= $thousand){
		$outVal2 = getRoundedNumber($inputObject/$thousand,round);
		$significand = "k";
	}else{
		$outVal2 = getRoundedNumber($inputObject,round);
	}
	if (isNaN($outVal2) == true) {
		$outVal2 = 0;
	}
	return $outVal2 + $significand;
}

function detectEnter($keypress,$callback,$keycode=13){
    if($keypress.keyCode === $keycode){
        $keypress.preventDefault(); // Ensure it is only this code that runs
		$callback();
    };
}; // end detectEnter

function getRoundedNumber(number,digits){
	return Math.round(number*Math.pow(10, digits))/Math.pow(10, digits);
}

function getNumberFromDiv($numericDiv) {
	return Math.round(
		readElement($numericDiv) *1
	)
};

//Table building tools
function addTable(parentDivID,newTableID,columnData,divClass) {
	var newDiv = addElement(parentDivID,"",divClass,"div");
	var newTable = addElement(newDiv,"","","table","","","","","","","",newTableID)
	var newThead = addElement(newTable,"","","thead");
	var newTbody = addElement(newTable,"","","tbody");
	var newTR = addElement(newThead,"","","tr");
	addElement(newTR,columnData[0],"","th","","","","sortAlphaTable(0,'"+newTableID+"')");
	var rowCount = 1;
	
	for (var currentRow=0; currentRow<columnData.length-rowCount; currentRow++) {
		newTR = addElement(newTbody,"","","tr");
		addElement(newTR,columnData[currentRow+rowCount],"","td");
	}
}

function addColumn(tableid,columnData,headLess) {
	var rowCount = 0;
	if (headLess != "true") {
		var tableHead = returnTablePart(tableid,"THEAD");
		for (var currentRow=0; currentRow<tableHead.rows.length; currentRow++) {
			rowCount++
			addElement(tableHead.rows[currentRow].id,columnData[currentRow],"","th","","","","sortNumTable("+(tableHead.children[0].children.length)+",'"+tableid+"')");
		}
	}

	var tableBody = returnTablePart(tableid,"TBODY");
	for (var currentRow=0; currentRow<columnData.length-rowCount; currentRow++) {
		addElement(tableBody.rows[currentRow].id,columnData[currentRow+rowCount],"","td");
	}
}

//need pagination
function mdArrayToTable(parentDivID,newTableID,array) {
	//Inputs a multidimensional array (e.g. [["a","b"],[1,2],[3,4]]) and outputs a table.
	if (!newTableID) {
		newTableID = getBadPW();
	}; // end if divParent
	for (column=0;column<array[0].length;column++){
		var out = [];
		for (row=0;row<array.length;row++){
			out.push(array[row][column])
		}
		if (column == 0) {
			addTable(parentDivID,newTableID,out)
		} else {
			addColumn(newTableID,out)
		}
	};
}

function deleteColumn(tableid){
	var allRows = document.getElementById(tableid).rows;
	for (var i=0; i<allRows.length; i++) {
		if (allRows[i].cells.length > 1) {
			allRows[i].deleteCell(-1);
		}
	}
}

function columnMath(TableAid,inputACol,TableBid,inputBCol,rowBAdj,TableOutid,outputCol,mathOperation,roundDigits,formatMaxOutput,newOutColumnName) {
	var TableA = returnTablePart(TableAid,"TBODY");
	var TableB;
	var TableOut = returnTablePart(TableOutid,"TBODY");
	
	if (TableBid != "") {
		TableB = returnTablePart(TableBid,"TBODY");
	}
	if (outputCol >= TableOut.children[0].children.length) {
		if (newOutColumnName == null) {
			var TableAHead = returnTablePart(TableAid,"THEAD");
			var TableBHead = returnTablePart(TableBid,"THEAD");
			var mathOperator;

			switch(mathOperation) {
			  case "none":
				mathOperator = "";
				mathVerb = "";
				break;
			  case "add":
				mathOperator = " + ";
				mathVerb = " sum";
				break;
			  case "subtract":
				mathOperator = " - ";
				mathVerb = " change";
				break;
			  case "multiply":
				mathOperator = " * ";
				mathVerb = " multiple";
				break;
			  case "divide":
				mathOperator = " / ";
				mathVerb = " rate";
				break;
			  case "percent":
				mathOperator = " % ";
				mathVerb = " percent";
				break;
			  default:
				mathOperator = " ? ";
				mathVerb = " error";
				break;
			}
			if (TableBid != "") {
				if (TableAHead.children[0].children[inputACol].innerText == TableBHead.children[0].children[inputBCol].innerText) {
					newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathVerb;
				} else {
					newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathOperator + TableBHead.children[0].children[inputBCol].innerText;
				}
			} else {
				newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathOperator + numToTextNotation(inputBCol);
			}
		}

		addColumn(TableOutid,newOutColumnName);
	}
		
	for (var currentRow = (0-rowBAdj); currentRow < TableA.children.length; currentRow++) {
		var childrenOfA = TableA.children[currentRow];
		var childrenOfB;
		var childrenOfOut = TableOut.children[currentRow];
		
		var InputAText = textToNumNotation(childrenOfA.children[inputACol].innerText);
		var InputBText;
		
		if (TableBid != "") {
			childrenOfB = TableB.children[currentRow+rowBAdj];
			InputBText = textToNumNotation(childrenOfB.children[inputBCol].innerText);
		} else {
			InputBText = textToNumNotation(inputBCol);
		}
	
		switch(mathOperation) {
		  case "none":
			childrenOfOut.children[outputCol].innerText = childrenOfA.children[inputACol].innerText;
			break;
		  case "add":
			childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   +   (InputBText*1), roundDigits);
			break;
		  case "subtract":
			childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   -   (InputBText*1), roundDigits);
			break;
		  case "multiply":
			childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   *   (InputBText*1), roundDigits);
			break;
		  case "divide":
			if ((InputAText *1)   /   (InputBText*1)  == Infinity) {
				childrenOfOut.children[outputCol].innerText = 0;
			} else {
				childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   /   (InputBText*1), roundDigits);
			}
			break;
		  case "percent":
			if (((InputAText *1)   /   (InputBText*1)) *100 == Infinity) {
				childrenOfOut.children[outputCol].innerText = 0;
			} else {
				childrenOfOut.children[outputCol].innerText = numToTextNotation(((InputAText *1)   /   (InputBText*1))   *100, roundDigits);
			}
			break;
		  default:
			// code block
			break;
		}
		if (currentRow+1 == TableOut.children.length+rowBAdj && formatMaxOutput == "true") {
			formatMax(outputCol,TableAid);
		}
	} //end for TableA 
}

function formatMax(targetColumn,tableid) {
	var tb = document.getElementById(tableid)
	var subtotal = returnAllValues(targetColumn,tableid);
	var maxValue = getMaxOfArray(subtotal); 
	var minValue = getMinOfArray(subtotal); 
	var tbody = returnTablePart(tableid,"TBODY")
			
	for (var currentRow = 0; currentRow < tbody.children.length; currentRow++) {
	var childrenOftBody = tbody.children[currentRow];
		for (var currentCell = 0; currentCell < childrenOftBody.children.length; currentCell++) {
			if (currentCell == targetColumn) {
				var currentCellValue = textToNumNotation(childrenOftBody.children[currentCell].innerText);
			if (currentCellValue == Infinity) {
				childrenOftBody.children[currentCell].innerText = 0;
			} else if (currentCellValue == maxValue) {
				childrenOftBody.children[currentCell].classList.add("maxValueInArray");
			} else {
				var percent = ((currentCellValue - minValue) / (maxValue - minValue))*100;
				childrenOftBody.children[currentCell].style.background = "linear-gradient(90deg, green ,white " + percent + "%)";
			} // end if currentCell
			}
		} // end for tr 
	} //end for tbody 
}

//Table supporting functions
function sortAlphaTable(currentColumn,tableid) {
  var table, rows, switching, currentRow, currentCell, nextCell, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableid);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the first, which contains table headers): */
    for (currentRow = 1; currentRow < (rows.length - 1); currentRow++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare, one from current row and one from the next: */
      currentCell = rows[currentRow].getElementsByTagName("td")[currentColumn];
      nextCell = rows[currentRow + 1].getElementsByTagName("td")[currentColumn];
      /* Check if the two rows should switch place, based on the direction, asc or desc: */
      if (dir == "asc") {
        if (currentCell.innerHTML.toLowerCase() > nextCell.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (currentCell.innerHTML.toLowerCase() < nextCell.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch and mark that a switch has been done: */
      rows[currentRow].parentNode.insertBefore(rows[currentRow + 1], rows[currentRow]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortNumTable(currentColumn,tableid) {
  var table, rows, switching, currentRow, currentCell, nextCell, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableid);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the first, which contains table headers): */
    for (currentRow = 1; currentRow < (rows.length - 1); currentRow++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare, one from current row and one from the next: */
      currentCell = rows[currentRow].getElementsByTagName("td")[currentColumn];
      nextCell = rows[currentRow + 1].getElementsByTagName("td")[currentColumn];
      /* Check if the two rows should switch place, based on the direction, asc or desc: */
      if (dir == "asc") {
        if ((textToNumNotation(currentCell.innerHTML.replace("$",""))) > (textToNumNotation(nextCell.innerHTML.replace("$","")))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if ((textToNumNotation(currentCell.innerHTML.replace("$",""))) < (textToNumNotation(nextCell.innerHTML.replace("$","")))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch and mark that a switch has been done: */
      rows[currentRow].parentNode.insertBefore(rows[currentRow + 1], rows[currentRow]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function rotateArray(inArray,num){
	//Moves the first number in the array to be the last number.
	var outArray = inArray.slice(num, inArray.length);
	for (let n=0;n<num;n++) {
		outArray.push(inArray[n]);
	}
	return outArray;
}

function transposeArray(arr) {
	//inspired by (and partially written during) HackerRank Array Manipulation Challenge.
	//https://www.hackerrank.com/challenges/crush/problem
	//Transposes an array in linear time to the number of columns (length of the 2nd dimension).
	//Doesn't support non-alphanumeric characters yet. 
	
    //Create a new array that's as long as the old one was wide.
    var out = Array(arr[0].length); 
    //Replace every N letters, numbers, and commas with a single plus.
    var regex = new RegExp('(,[A-Za-z0-9]+){'+(out.length-1)+'},','g')
    //Cycle through the array, summing arr column C to index item C.
    var nextItemLoc = 0
	for (let c = 0; c<out.length; c++) {
        //Cast the array to string, slice off the first C columns in the first row, then 
		//regex the columns you don't want, split off the array members you don't want, 
		//and eval. Arrays are comma-separated, making this easy.
		out[c] = eval("["+arr.toString().slice(nextItemLoc).replace(regex,"+").split(",")[0].replace("+",",")+"]")
        //Move forward to the next item.
        nextItemLoc = arr.toString().indexOf(",",nextItemLoc)+1
    }
    return out;
}

function groupArray(arrayToGroup) {
	var newGroup = [],
		groupingArray = {},
		i, j, currentItem;
	for (i = 0, j = arrayToGroup.length; i < j; i++) {
		currentItem = arrayToGroup[i];
		if (!(currentItem.itemName in groupingArray)) {
			groupingArray[currentItem.itemName] = {itemName: currentItem.itemName, Types: []};
			newGroup.push(groupingArray[currentItem.itemName]);
		}
		groupingArray[currentItem.itemName].Types.push(currentItem.Type);
	}
	return newGroup;
}

function returnAllValues(col,tableid) {
	var subtotal = [];
	var tbody = returnTablePart(tableid,"TBODY")
	
	for (var j = 0; j < tbody.children.length; j++) {
		var el = tbody.children[j];
			for (var k = 0; k < el.children.length; k++) {
				if (k == col) {
					subtotal.push(textToNumNotation(el.children[k].innerText));
				} 
			} // end for tr 
	} //end for tbody 
	return subtotal
} // end function 

function getMaxOfArray(array) {
  return Math.max.apply(Math, array);
}

function getMinOfArray(array) {
  return Math.min.apply(Math, array);
}

function fasterArrayMax(arr) {
	return eval("Math.max("+arr.toString()+")")
}

function fasterArrayMin(arr) {
	return eval("Math.min("+arr.toString()+")")
}

function addRowHandlers(col,tableid) {
 var table = document.getElementById(tableid);
 var rows = table.getElementsByTagName("tr");
    
 for (i = 0; i < rows.length; i++) {
   var currentRow = table.rows[i];
   currentRow.onclick = createClickHandler(col,tableid);
 }
}

function returnTablePart(tableid,tablePart) {
	var table = document.getElementById(tableid);
	var tableData;
	for (var i = 0; i < table.children.length; i++) {
		if (table.children[i].tagName === tablePart) {
			tableData = table.children[i];
		}
	} //end for tb.children
	return tableData;
}

function createClickHandler(col,table) {
  return function() { 
	formatMax(col,table)
  };
}

//textToNumNotation power values
var $thousand = 1000;
var $million = $thousand *$thousand;
var $billion = $million *$thousand;
var $trillion = $billion *$thousand;
var $quadrillion = $trillion *$thousand;
var $quintillion = $quadrillion *$thousand;
var $sixtillion = $quadrillion *$thousand;
var $septillion = $sixtillion *$thousand;
var $octillion = $septillion *$thousand;
var $nonillion = $octillion *$thousand;
var $decillion = $nonillion *$thousand;


