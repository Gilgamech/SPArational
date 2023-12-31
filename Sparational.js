//Copyright 2013-2023 Gilgamech Technologies
//SPArational.js v3.24 - Make faster websites faster.
//Author: Stephen Gillie
//Created on: 8/3/2022
//Last updated: 12/31/2023
//Version history:
//3.25.2 Add load time display to webRequest.
//3.25.1 Add timeThis to measure performance monitoring.
//3.25:Rewrite webRequest, convertJmlToElements, and convertMdToJml, including adding parseBlock and parseInline. 
//Notes:

//Init token vars
let tokenData = {
	"co":{"symbol":"`","regex":/\`/,"elementType":"code"},
	"de":{"symbol":"~~","regex":/\~{2}/,"elementType":"del"},
	"ea":{"symbol":"*","regex":/\*/,"elementType":"em"},
	"eu":{"symbol":"_","regex":/\_/,"elementType":"em"},
	"in":{"symbol":"++","regex":/\+{2}/,"elementType":"ins"},
	"ma":{"symbol":"==","regex":/\={2}/,"elementType":"mark"},
	"sa":{"symbol":"**","regex":/\*{2}/,"elementType":"strong"},
	"su":{"symbol":"__","regex":/\_{2}/,"elementType":"strong"},
	"sb":{"symbol":"~","regex":/\~/,"elementType":"sub"},
	"sp":{"symbol":"^","regex":/\^/,"elementType":"sup"},
	"a2":{"symbol":"<","regex":/\</,"elementType":"a"},
	"a3":{"symbol":">","regex":/\>/,"elementType":"a"},
	"ab":{"symbol":"*[","regex":/\*\[/,"elementType":"abbr"},
	"fi":{"symbol":"^[","regex":/\^\[/,"elementType":"a"},
	"fo":{"symbol":"[^","regex":/\[\^/,"elementType":"a"},
	"im":{"symbol":"![","regex":/\!\[/,"elementType":"img"},
	"an":{"symbol":"[","regex":/\[/,"elementType":"a"},
	"am":{"symbol":"](","regex":/\]\s*\(/,"elementType":"a"},
	"a4":{"symbol":"\")","regex":/"\)/,"elementType":"a"},
	"a5":{"symbol":"][","regex":/\]\s*\[/,"elementType":"a"},
	"a6":{"symbol":"]","regex":/\]/,"elementType":"a"},
	"a7":{"symbol":"]:","regex":/\]\s*\:\s*/,"elementType":"a"},
}

let tokenSplitter = "%%%%%%"
let tokenStart = "$$$"+tokenSplitter+"###"
let tokenEnd = "###"+tokenSplitter+"$$$"
let prevLI = ""

//DOM tools
//addElement("elementParent","innerText","elementClass","elementType","elementStyle","href","onChange","onClick","contentEditable","attributeType","attributeAction","elementId")
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
		$elementId = getRandomishString();
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
		getElement($elementParent).appendChild(newElement);
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
		getElement($elementId).setAttribute("onchange", $onChange);
	}; // end if onChange	
	if ($onClick) {
		getElement($elementId).setAttribute("onclick", $onClick);
	}; // end if onClick	
	if ($contentEditable) {
		getElement($elementId).contentEditable = true;
	}; // end if contentEditable	
	if ($attributeType && $attributeAction) {
		getElement($elementId).setAttribute($attributeType, $attributeAction);
	}; // end if attributeType
	if (radioButton == true) {
		getElement($elementId).setAttribute("type", "radio");
		addElement($elementParent,innerText,"","label","","","","","","for",$elementId)
	}
	return $elementId
}; // end addElement	

function getElement(elementId){
	return document.getElementById(elementId)
}

function writeElement(elementId,data) {
	var elementType = getElement(elementId).type;
	if ((elementType == "text") || (elementType == "textarea") || (elementType == "number") || (elementType == "select-one")) {
		getElement(elementId).value = data;
	} else if (getElement(elementId).tagName  == 'IMG') {
		getElement(elementId).src = data;
	} else {
		getElement(elementId).innerText = data;
	}; // end if elementType
}; // end writeElement

function readElement(elementId) {
	var elementType = getElement(elementId).type;
	if ((elementType == "text") || (elementType == "textarea") || (elementType == "number") || (elementType == "select-one")) {
		return getElement(elementId).value;
	} else {
		return getElement(elementId).innerText;
	}; // end if elementType
}; // end readElement

function deleteElement(elementId) {
	var element = getElement(elementId);
	if (element) {
		element.parentNode.removeChild(element);
	}	
}; // end removeBot

function appendElement(elementId,data) {
	writeElement(elementId,readElement(elementId) + data)
}; // end appendElement

function toggleElement(elementId) {
	if (getElement(elementId).style.visibility == "visible") {
		hideElement(elementId);
	} else { 
		showElement(elementId);
	} // end if
}; // end toggleElement

function hideElement(elementId) {
	getElement(elementId).style.visibility="hidden";
}; // end toggleElement

function showElement(elementId) {
	getElement(elementId).style.visibility="visible";
}; // end toggleElement

function identifyElements(parentElement) {
	getElement(parentElement).onmousedown = function(event){console.log("Element "+event.target.id+" at "+event.clientX+"," + event.clientY);}
}

function locateElement(innerId,outerId=(getElement(innerId).parentElement.id)) {
//Tells how far an element is off screen. 0 means visible.
	outerRect = getElement(outerId).getBoundingClientRect();
	innerRect = getElement(innerId).getBoundingClientRect();
	let out = [0,0]
	//Graphics rows increment from top downward, so more is lower.
	if (innerRect.bottom < outerRect.top || innerRect.bottom < 0 ) {
		out[0] = Math.max(outerRect.top,0) - innerRect.bottom
	}//above

	if (outerRect.bottom < innerRect.top || document.documentElement.clientHeight < innerRect.top ) {
		out[0] = Math.max(innerRect.top,0) - outerRect.bottom
	}//below
	
	
	if (innerRect.top > outerRect.bottom || innerRect.top > document.documentElement.clientHeight) {
		out[0] = Math.min(outerRect.bottom,document.documentElement.clientHeight) - innerRect.top
	} 
	//Graphics columns increment from left rightward, so more is righter.
	if (outerRect.left  > innerRect.right|| 0 >  innerRect.right) {
		out[1] = Math.max(outerRect.left,0) - innerRect.right
	}//left
	if (innerRect.left > outerRect.right || innerRect.left > document.documentElement.clientWidth) {
		out[1] = Math.min(outerRect.right,document.documentElement.clientWidth) - innerRect.left
	}//right
	return out;
}

function rebuildElement(elementId) {
	var oldElement = getElement(elementId);
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
	convertJmlToElements(newElement[0].elementParent,newElement);
}

//Network tools
function convertWebElement(parentElement,URL){
	let urlParts = URL.split(".");
	let extension = urlParts[urlParts.length -1].toLowerCase();
		switch (extension) { 
			case "jml":
			case "spa": //Need to swap this to YAML processing when 4.0 hits.
				webRequest(URL,function(callback){
					convertJmlToElements(parentElement,rewriteJson(JSON.parse(callback)).pages.main.elements)
				})
				break;
			case "csv": 
				webRequest(URL,function(callback){
					convertMdArrayToTable(parentElement,"",eval(convertCsvToMdArray(callback)))
				})
				break;
			case "md": 
				webRequest(URL,function(callback){
					convertJmlToElements(parentElement,JSON.parse('['+convertMdToJml(callback).replace(/[,]$/,"").replace(/\n/g,"")+']'))
				})
			case "js": 
				//convertJmlToElements(parentElement,rewriteJson(JSON.parse('[{\"elementType\":\"script\",\"href\":\"'+URL+'\"}]')))
				break;
			default: //Fallback to supplying a link.
				//convertJmlToElements(parentElement,rewriteJson(JSON.parse('[{\"elementType\":\"a\",\"href\":\"'+URL+'\"}]')))
				break;
		}
};

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
function webRequest(URI,$callback,$JSON,$verb="get",$file,onlineCacheDuration = 30,offlineCacheDuration = 86400) {
//if now is smaller than duration, read from cache.
    let timerStart = Date.now()
	if (window.localStorage[URI] && Date.now() < window.localStorage[URI+":onlineCacheDuration"]) {
		console.log(URI+" cached for "+((window.localStorage[URI+":onlineCacheDuration"]-Date.now())/1000)+" more seconds.")
		$status = "304";
		returnVar = window.localStorage[URI];
		$callback(returnVar,$status);
    let timerStop = Date.now()
    let totalTime = timerStop-timerStart;
    console.log("webRequest for "+URI+" took "+totalTime+" ms")
		return;
	}; //end if window.localStorage

	let n = 0;
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
	xhRequest.open($verb, URI, true);
	xhRequest.onreadystatechange = function () {
		try {
			$status = xhRequest.status;
			if ($status == "200") {
				if (xhRequest.readyState == 4) {
					returnVar = xhRequest.responseText;
					if ($JSON) {
						returnVar = JSON.parse(returnVar);
					}; // end if $JSON
					if (onlineCacheDuration > 0) {
						window.localStorage[URI] = returnVar;
						window.localStorage[URI+":onlineCacheDuration"] = (onlineCacheDuration * 1000) + Date.now();
						window.localStorage[URI+":offlineCacheDuration"] = (offlineCacheDuration * 1000) + Date.now();
						console.log("Caching "+URI+" for "+((window.localStorage[URI+":onlineCacheDuration"]-Date.now())/1000)+" seconds.")
					} else if (onlineCacheDuration <= 0) {
						window.localStorage[URI] = null;
						window.localStorage[URI+":onlineCacheDuration"] = Date.now();
						console.log("Invalidating "+URI)
					}; //end if onlineCacheDuration
					$callback(returnVar,$status);
				}; // end xhRequest.readyState
			} else if (($status.toString().substr(0,1) == "4" || $status.toString().substr(0,1) == "5") && window.localStorage[URI] && Date.now() < window.localStorage[URI+":offlineCacheDuration"] && n==0) { //&&
				console.log("Page "+URI+" offline. Serving cached copy.")
				$status = "304";
				returnVar = window.localStorage[URI];
				$callback(returnVar,$status);
				n = (n*1) + 1;
			} else if (n==0) {
				$callback(" Error: "+xhRequest.statusText,$status);
			}; // end if $status
		} catch(e) {console.log(e)}; // end try - This try catch captures errors within the callback too.
    let timerStop = Date.now()
    let totalTime = timerStop-timerStart;
    console.log("webRequest for "+URI+" took "+totalTime+" ms")
	}; // end xhRequest.onreadystatechange
	xhRequest.send($file);
}; // end webRequest

function reloadEvery(parentElement,URL,seconds = 60){
	let id = addElement(parentElement)
	convertWebElement(id,URL)
	setInterval(function () {
		rebuildElement(id)
		convertWebElement(id,URL)
	}, seconds*1000);
}

//Processors
function rewriteJson(data,baseData) {
	let n = 0;
	//Rewrite data - Works on any JSON, not just SPA files.
	for(element in data){
		if (typeof data[element] === "string") {
			if (data[element].substr(0,2) == "$_") {//Replace-o-rama! Full SPA pages - now in JML or YAML - can support $_ "dollarsign-underscore" variable replacement from anywhere within the document.
				data[element] = eval(data[element].replace("$_","baseData"))
			} else if (data[element].substr(0,4) == "http") {//Drop your load in the road! Leave a URL at the start of any line to have the page eventually load and display that data.
				data[element] = {"elementType":"script","innerText":("convertWebElement(\"parentElement\",\""+data[element]+"\")")}
			}; // end if element.substr
		} else if (typeof data[element] === "object") { 
			data[element] = rewriteJson(data[element],baseData)
		}; //end if typeof
	}; // end for let element
	return data;
}; // end function

function convertJmlToElements(parentElement,elements) {
	//Convert $JSON to Element 2 - full rebuild for v3.0.
	var eParent = elements[0].elementParent;
	elements = JSON.stringify(elements);
	elements = elements.replaceAll(eParent,parentElement);
	elements = JSON.parse(elements);
	
	for (let element of elements) {
		if (!element.elementParent) {
			element.elementParent = parentElement;
		}
		//console.log(element.elementParent)
		addElement(element.elementParent, element.innerText, element.elementClass, element.elementType, element.elementStyle, element.href, element.onChange, element.onClick, element.contentEditable, element.attributeType, element.attributeAction, element.id)
	}
}

function cje2(parentElement,elements) {
	var eParent = elements[0].elementParent;
	elements = JSON.stringify(elements);
	elements = elements.replaceAll(eParent,parentElement);
	elements = JSON.parse(elements);
	
	for (let element of elements) {
		if (!element.elementParent) {
			element.elementParent = parentElement;
		}
		//console.log(element.elementParent)
		addElement(element.elementParent, element.innerText, element.elementClass, element.elementType, element.elementStyle, element.href, element.onChange, element.onClick, element.contentEditable, element.attributeType, element.attributeAction, element.id)
	}
}

function convertJupyterToJml(inputString) {
	var out
				console.log(inputString);
	var stringVar = JSON.stringify(inputString);
				console.log(stringVar);
	stringVar = stringVar.replace(/\["/g,'');
	stringVar = stringVar.replace(/"\]/g,'');
				console.log(stringVar);
}

function convertJupyterToJml2(inputString) {
		stringVar = stringVar.replace('# ','"          "elementType": "p",');
		stringVar = stringVar + '</h1>"';
		inputString = JSON.parse(stringVar);
		return inputString;
}; 

function convertMdToJml(markdown,nestedParent = "parentElement") {
//Markdown is made of Blocks which are filled with data.
	let out = ""

	markdown = markdown.replace(/\n\s+\n/g,"\n\n")
	markdown = markdown.replace(/\n\t+\n/g,"\n\n")
	markdown = markdown.replace(/^\n*/g,"")
	markdown = markdown.replace(/\n*$/g,"")
	//If a line only has tabs or spaces, delete them.
	for (block of markdown.split("\n\n")) {
		let symbol = block.split(" ")[0]
		let blockSplit = block.split("\n")

		let elementParent = nestedParent
		let id = getRandomishString()

		if (symbol.match(/#{1,6}/)) {//Headings - Parsed.
			let innerText = block.replace(symbol+" ","")
			let elementType = ("h"+symbol.length)
			let elementHash = ""

			if (innerText.match(/#/)){
				elementHash = innerText.split(" ").filter(function( obj ) {
					return obj.match(/#/g,"");
				});
				innerText = innerText.replace(elementHash,"")
				elementHash = elementHash[0]
			}
			if (elementHash) {
				elementType = elementHash.split("#")[0]
				id = elementHash.split("#")[1]
			}
			out += parseInline(elementParent,innerText,elementType,id)
		
		} else if (symbol.match(/^\s*([-]+\s*){3,}\s*$/g)) {//horizontal row - Unparsed.
			out += "{\"elementType\":\"hr\"},"
			
		} else if (symbol.match(/[-+*]{1,1}/)) {//Unordered Lists - Nesting.
			out += parseBlock(block.replace(/\-[ ]/g,"").replace(/\+[ ]/g,"").replace(/\*[ ]/g,""),/\-[ ]/g,"ul","","li")
		
		} else if (symbol.match(/\d+[.]/)) {//Ordered Lists - Nesting.
			out += parseBlock(block,/[0-9]+[.][ ]/g,"ol","","li")
		
		} else if (symbol.match(/(>+\s*){1,}/g)) {//blockquote - Nesting.
			out += parseBlock(block.replace(/^>[ ]/g,"").replace(/\n>[ ]/g,"\n"),"","blockquote","","")
			
		} else if (symbol.match(/([|]\s*\S+\s*){1,}/g)) {//Tables
			out += "{\"elementType\":\"table\",\"id\": \""+id+"\"},"
			let elementType = "th"
			let Thead = blockSplit[0]
			let Tdata = blockSplit[1]//Was going to split and match on this, but how many tables have multiple header rows?
			//Use text-align: left; text-align: right; text-align: center;
			//Introduce other styling? Like with === instead of ---?
			let Tbody = block.replace(Thead+"\n","").replace(Tdata+"\n","")

			for (Tpart of [Thead,Tbody]) {
				let TpartId = getRandomishString();
				out += "{\"elementParent\": \""+id+"\",\"elementType\":\"thead\",\"id\": \""+TpartId+"\"},"
				for (line of Tpart.split("\n")) {
					let TRowID = getRandomishString();
					out += "{\"elementParent\": \""+TpartId+"\",\"elementType\":\"tr\",\"id\": \""+TRowID+"\"},"
					for (data of line.split("\|")) {
						if (data){
							out += "{\"elementParent\": \""+TRowID+"\",\"elementType\":\""+elementType+"\",\"innerText\": \""+data+"\"},"
						}; //end if data
					}; //end for data 
					elementType = "td"//After the first time through, change cell type from table header to table data. 
				}; //end for line
			}; //end for Tpart
			
		} else if (block.substr(0,3).match(/[:]{3}/g)) {//Div block - Nesting.
			/* Div definition 
			- Curly brackets and dots optional in the top line. 
			- Curly brackets and no line breaks required on bottom line. If you can't fit it in one line, put it into a function in another file and call it. 
			- elementType and id are attached to the hash. It can be anywhere in the top line.
			:::elementClass1 elementClass2 elementType#id elementClass3 elementClass4 elementClass5
			innerText
			:::{onClick_or_onChange_put_JS_here}
			*/
			//topLine.substr(0.3).match(botLine.substr(0.3))

			let elementType = "div"
			let divRegex = /^[:]{3}/g
			let elementHash = ""

			let topLine = blockSplit[0].replace(divRegex,"")
			let botLine = blockSplit[blockSplit.length -1].replace(divRegex,"")

			if (topLine.match(/#/)){
				elementHash = topLine.split(" ").filter(function( obj ) {
					return obj.match(/#/g,"");
				});
				elementHash = elementHash[0]
			}
			if (elementHash) {
				elementType = elementHash.split("#")[0]
				id = elementHash.split("#")[1]
			}
			
			let elementClass = topLine.replace(divRegex,"").replace(" "+elementHash,"")
			let innerText = JSON.stringify(blockSplit.slice(1,blockSplit.length -1)[0]) //innerText gets its outer quotes from the JSON.stringify, so doesn't need to have extra escaped quotes around it. 
            if (!(innerText)){innerText="\"\""}

			if (botLine.match(/^\{/)){
				let action = "onClick"
				let onAction = botLine.replace(divRegex,"").replace(/^{/g,"").replace(/\}$/g,"")
				if (elementType == "input" || elementType == "textarea") {
					action = "onChange"
				}
                out += "{\"elementType\":\""+elementType+"\",\"elementClass\":\""+elementClass+"\",\"innerText\":"+innerText+",\""+action+"\":\""+onAction+"\",\"id\": \""+id+"\"},"
			} else {
                out += "{\"elementType\":\""+elementType+"\",\"elementClass\":\""+elementClass+"\",\"innerText\":"+innerText+",\"id\": \""+id+"\"},"
			}
			if (innerText){
			}
		
		} else if (block.substr(0,4).match(/[ ]{4}/g) || block.substr(0,3).match(/[```]{3}/g) || block.substr(0,3).match(/[~]{3}/g)) {//Code block - don't process anything.
			out += parseBlock(block.replace(/^[ ]{4}/g,"").replace(/\n[ ]{4}/g,"\n"),"","pre",elementClass,"code")

		} else if (block.substr(0,4) == "http") {//Needs to be moved back to inline at some point.
			//Drop your load in the road! Leave a URL anywhere to have the page eventually load and display that data.
			let colonSplit = block.replace(/\n/g,"").split(":")
			let Url = colonSplit[0]+":"+colonSplit[1]
			let reloadEverySec = colonSplit[2]
			if (colonSplit[3]) {
				elementParent = colonSplit[3]
			}
			out += "{\"elementType\":\"script\",\"innerText\":\"convertWebElement('"+elementParent+"','"+Url+"')\"},"
			
		} else if (block.substr(0,5).match(/^-[ ]\[[X ]\]/g)) {//Task List block - Nesting.
			//This is an unordered list with a bunch of CSS: 
			//https://www.w3schools.com/howto/howto_js_todolist.asp
			out += parseBlock(block,/^-[ ]\[[X ]\]/g,"ul",elementClass,"li")

		} else if (block.match(/^.+\n:[ ]/g)) {//Definition List block - Parsed.
			out += parseBlock(block,/:[ ]/g,"dl",elementClass,"dd")

		} else {//Return everything else as a paragraph.
			out += parseInline(elementParent,block)
		};//end switch symbol
	};//end for block

	out = out
	return out;
}

function replaceSymbols(text) {
	for (key of getKeys(tokenData)) {
		let regex = new RegExp(tokenData[key].regex,"g")
		text = text.replace(regex,tokenStart+key+tokenEnd)//code - Unparsed.
	}
	return text
}

function parseBlock(block,regex="",outerType="",outerClass="",innerType="",regexReplace="") {
	//Takes unparsed block and splits off regex to return an element with children.
	let tabLevel = 0 //Could be called indentationLevel. 
	let listID = [] //listID holds UL IDs. 
	listID[0] = getRandomishString();
	let out = "{\"elementType\":\""+outerType+"\",\"elementClass\":\""+outerClass+"\",\"id\": \""+listID[listID.length -1]+"\"},"
	for (line of block.replace(regex,regexReplace).split("\n")) {
		//listID holds as many IDs as are at tabLevel, or double the number of spaces leading the line.
		tabLevel = line.match(/^\s*/).toString().split("  ").length//Gather the leading spaces and count the pairs to get the tabLevel.
		line = line.replace(/^\s*/,"")//Should be tabLevel*2 spaces, not a random number.
		while (tabLevel > listID.length) {//If listID.length is less than the tabLevel, then add IDs until they're the same.
			listID[listID.length] = getRandomishString();
			if (prevLI == "") {
				out += "{\"elementParent\":\""+listID[listID.length -2]+"\",\"elementType\":\"ul\",\"id\": \""+listID[listID.length -1]+"\"},"
			} else {
				out += "{\"elementParent\":\""+prevLI+"\",\"elementType\":\"ul\",\"id\": \""+listID[listID.length -1]+"\"},"
				prevLI = ""
			}
		}  
		while (tabLevel < listID.length) {//If the listID.length is greater than the tabLevel, then delete IDs until they're the same.
			listID.pop();
		} 
		if (innerType == "li") {
			prevLI = getRandomishString()
			out += parseInline(listID[listID.length -1],line,innerType,prevLI)
		} else {
			out += parseInline(listID[listID.length -1],line,innerType)
		}
	}
	return out;
}

function parseInline(parentElement,text,elementType="p",id = (getRandomishString())){
	//Takes unparsed block, replaces tokens, and splits off token to return an element with children.
	//Build parent element.
	let split = new RegExp(tokenSplitter)
	textSplit = replaceSymbols(text).split(split)
	if (parentElement) {
		out = "{\"elementParent\": \""+parentElement+"\",\"elementType\":\""+elementType+"\",\"innerText\":\""+textSplit[0].replace(/^\$\$/,"").replace(/\$\$$/,"")+"\",\"id\": \""+id+"\"},"
	} else {
		out = "{\"elementType\":\""+elementType+"\",\"innerText\":\""+textSplit[0].replace(/^\$\$/,"").replace(/\$\$$/,"")+"\",\"id\": \""+id+"\"},"
	}
	//Parse tokens into children of parent.
	for (let b = 1; b < textSplit.length -1; b+=4) {
	try {
		elementType = tokenData[textSplit[b].replace(/#/g,"")].elementType //Reuse the variable by clobbering the extant data.
		let innerText = textSplit[b+1].replace(/^\$\$/,"").replace(/\$\$$/,"")
		//let elementType = textSplit[b+2]
		let spanText = textSplit[b+3].replace(/^\$\$/,"").replace(/\$\$$/,"")
		
		if (elementType == "a") {
			let href = spanText.match(/\S*\)/)[0].replace(/\)$/,"")
			spanText = spanText.split(/\S*\)/)[1]
			out += "{\"elementParent\": \""+id+"\",\"elementType\":\""+elementType+"\",\"innerText\":\" "+innerText+"\",\"href\": \""+href+"\"},"
		} else {
			out += "{\"elementParent\": \""+id+"\",\"elementType\":\""+elementType+"\",\"innerText\": \""+innerText+"\"},"
		}
		if (spanText) {
			out += "{\"elementParent\": \""+id+"\",\"elementType\":\"span\",\"innerText\": \"" +spanText +"\"},"
		}; //end if endTxt
	} catch(e) {console.log(e)}
	}
	return out;
}

function convertCsvToMdArray(inputString) {
	let out = ""
	for (line of inputString.split("\n")) {
	out += "["+line+"],"
	}
	out = out.replace("\[\],","") // Nip any blank rows.
	out = out.replace(/[,]$/,"")
	out = "["+out+"]"
	return out;
}

function mdArrayToTable(parentElement,newTableID,array,classList,styleList) {
	//Inputs a multidimensional array (e.g. [["a","b"],[1,2],[3,4]]) and outputs a table.
	if (!newTableID) {
		newTableID = getRandomishString();
	}; // end if divParent
	for (column=0;column<array[0].length;column++){
		var out = [];
		for (row=0;row<array.length;row++){
			out.push(array[row][column])
		}
		if (column == 0) {
			addTable(parentElement,newTableID,out)
		} else {
			addColumn(newTableID,out)
		}
		if (classList != null) {
			addElement(returnTablePart('historyTable','COLGROUP').id,"",classList[column],"col",styleList[column])
		}
	};
}

function convertYamlToJson(yaml) {
	let data = []
	let nextLine = []
	//let result = yaml.split("\n").filter((word) => word.match(":"));
	for (line of yaml.split("\n")) {
		let lineSplit = line.split("#")[0]
		let datum = lineSplit.replaceAll(" ","").split(":")
		if (datum[0] == ""){
			continue
		} else if (datum[1] == ""){
			let indentedItems = ""
			data[datum[0]] = convertYamlToJson(indentedItems)
		} else if (datum[0].substr(0,2) == "  "){
			//data[datum[0]] = []
			//need to retain/define the nth datum[0] to reparent under. Just like the reparent code for Markdown.
			//on 2 spaces before the dash, nest under an intermediate UL. parentElement = addElement(parentElement,"","ul")
		} else {
			data[datum[0]] = datum[1]
		}
	}
	return data
}

//HTML tools
function colorifyWords(divid, replaceWord, replaceClass) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace("\\","")
	var str = getElement(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="' + replaceClass + '">' + replaceWord + '</span>');
	getElement(divid).innerHTML = str;
}; // end colorifyWords

function colorifyMultipleWords(divList,wordList,replaceClass){
	for (var wordName = 0;wordName<wordList.length;wordName++){
		for (var divName = 0;divName<divList.length;divName++){
			colorifyWords(divList[divName],wordList[wordName],replaceClass);
		}
	}
}

function addPopupToWord(divid, replaceWord, popupText,outputClasses) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace(/\\/g,"")
	var str = getElement(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="popup '+outputClasses+'">' + replaceWord + '<span>' + popupText + '</span></span>');
	getElement(divid).innerHTML = str;
}; // end addPopupToWord

function addLinkToWord(divid, replaceWord, URI) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replaceAll("\\","")
	var str = getElement(divid).innerHTML;
	str = str.replace(replaceRegex, '<a href="'+URI+'">' + replaceWord + '</a>');
	getElement(divid).innerHTML = str;
}; // end addLinkToWord

//[["innerText","elementType","elementId","Url"]]
function addList(parentElement,inputArray,titleText,titleClass) {
	addElement(parentElement,titleText,titleClass)
	for (var i = 0; i < inputArray.length; i++) {
		addElement(parentElement,inputArray[i][0],"",inputArray[i][1],"",inputArray[i][3],"","","","","",inputArray[i][2]);
	}
}

function addBlogPost(parentElement,dateText,dateLink,inputArray) {
	let innerElement = dateLink.replace("#","")
	addElement(parentElement,"","textBubbleBG","","","","","","","","",innerElement)
	addList(innerElement,inputArray,"","");
	addLinkToWord(parentElement,dateText,dateLink)
	addElement(parentElement,"","","br")
	addElement(parentElement,"","","br")
}

//Form building tools
//addInputField(parentElement,preInput,Input,PostInput,onChange,varName){
function addInputField(parentElement,preInput,Input,PostInput,onChange,varName,fieldType="input"){
	addElement(parentElement,preInput+": ","","span")
	addElement(parentElement,Input,"",fieldType,"","",onChange,"","","value",Input,varName)
	addElement(parentElement,PostInput,"","span")
	addElement(parentElement,"","","br")
}

//Supporting functions

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

function getRandomishString() {
	//Returns a "random" string of dubious cryptographic strength. Good for non-clobbering DIV names but think twice before using as a password.
	return Math.random().toString(36).slice(-20).replace("0.","");
 }
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

function getNumberFromDiv(numericDiv,digits=0) {
	return getRoundedNumber(readElement(numericDiv),digits)
};

function mdIndexOf(array, searchString) {
//https://stackoverflow.com/questions/16102263/to-find-index-of-multidimensional-array-in-javascript
//Currently only works on 2d arrays, but could be extended to nd arrays. 
	for (var i = 0; i < array.length; i++) {
			var index = array[i].indexOf(searchString);
		if (index > -1) {
			return [i, index];
		}
	}
}

//Monitoring and performance tools
function checkAllLinksOnPage(outputElement){
	appendElement(outputElement,"\nReading "+document.links.length+" Document Links\n");
	for (link of document.links) {
		let href = link.href
			let len = a.length;
		webRequest(link.href,function(content,statusCode){
			let works = " fails"
			if (len > 100) {works = " works"}
			appendElement(outputElement,"link "+href+ works+"\n");
			colorifyWords(outputElement, "works", "maxValueInArray")
			colorifyWords(outputElement, "fails", "red9")
		})
	}
};

function timeThis(callback) {
    let timerStart = Date.now()
    callback()
    let timerStop = Date.now()
    let totalTime = timerStop-timerStart;
    console.log("Took "+totalTime+" ms")
}

function getElementContrast(elementId) {
	let textColor = window.getComputedStyle(getElement(elementId)).color
	let backgroundColor = window.getComputedStyle(getElement(elementId)).backgroundColor
	
	while (backgroundColor == 'rgba(0, 0, 0, 0)') {//If the background is transparent, cycle up through parent elements until you find one whose background isn't transparent.
		backgroundColor = window.getComputedStyle(getElement(elementId).parentElement).backgroundColor
		elementId = getElement(elementId).parentElement.id
	}
	//Convert from RGB code to sums ready for adding.
	textColor = textColor.replaceAll("rgb\(","").replaceAll(",","+").replaceAll("\)","")
	backgroundColor = backgroundColor.replaceAll("rgb\(","").replaceAll(",","+").replaceAll("\)","")
	//Return the absolute difference, to not confuse with negative numbers when bright text is on a dark background. 
	return Math.abs(eval(textColor) - eval(backgroundColor))
}

//Table building tools
function addTable(parentElement,newTableID,columnData,divClass) {
	var newDiv = addElement(parentElement,"",divClass,"div");
	var newTable = addElement(newDiv,"","","table","","","","","","","",newTableID)
	var newColGroup = addElement(newTable,"","","colgroup");
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

function deleteColumn(tableid){
	var allRows = getElement(tableid).rows;
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
	var tb = getElement(tableid)
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
  table = getElement(tableid);
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
  table = getElement(tableid);
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
 var table = getElement(tableid);
 var rows = table.getElementsByTagName("tr");
    
 for (i = 0; i < rows.length; i++) {
   var currentRow = table.rows[i];
   currentRow.onclick = createClickHandler(col,tableid);
 }
}

function returnTablePart(tableid,tablePart) {
	var table = getElement(tableid);
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

