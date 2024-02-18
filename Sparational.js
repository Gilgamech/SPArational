//Copyright 2013-2024 Gilgamech Technologies
//SPArational.js v3.30.2 - Make faster websites faster.
//Author: Stephen Gillie
//Created on: 8/3/2022
//Last updated: 2/18/2024
//Version history:
//3.30.2 Add pending fixes to checkAllLinksOnPage
//3.30.1 Make LI names incremental under the UL/OL.
//3.30.0 Remove dollarsigns from all (most?) variable names. Except powers of 10.
//Notes:

/*Token data codes:
co: code
de: del
ea: emphasis asterisk
eu: emphasis underscore
in: insert
ma: mark
sa: strong asterisk
su: strong underscore
sb: sub(script)
sp: sup(erscript)
a2: a(nchor) open angle bracket
a3: a(nchor) close angle bracket
hr: href relative
ab: abbr(eviation)
fi: footnote inline
fo: footnote other
im: img 
an: a(nchor) bracket open (new) tag
am: a(nchor) bracket middle tag
a4: a(nchor) bracket close tag
a5: a(nchor) footnote/abbr middle tag
a6: a(nchor) footnote close tag
a7: a(nchor) footnote definition middle tag
ha: href absolute

Order of codes is important in preventing some from clobbering others.
*/

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
	"hr":{"symbol":"/","regex":/[ ]s\//,"elementType":"hr"},
	"ha":{"symbol":"http","regex":/http/,"elementType":"ha"},
}
let tokenA = "¤¤¤"
let tokenB = "ĦĦĦ"
let tokenSplitter = "ŒŒŒŒŒŒ"
let tokenStart = tokenA+tokenSplitter+tokenB
let tokenEnd = tokenB+tokenSplitter+tokenA

//DOM tools
//addElement("elementParent","innerText","elementClass","elementType","elementStyle","href","onChange","onClick","contentEditable","attributeType","attributeAction","elementId")
function addElement(elementParent,innerText,elementClass,elementType,elementStyle,href,onChange,onClick,contentEditable,attributeType,attributeAction,elementId) {
	let radioButton = false;
	if (!elementParent) {
		return;
	}; // end if elementType	
	if (!elementType) {
		elementType = "div"
	}; // end if elementType	
	if (elementType == "radio") {
		elementType = "input"
		radioButton = true;
	}
	if (elementType == "video") {
		let intermediateElementId = getRandomishString();
		addElement(elementParent,"","iframe-container","div","","","","","","","",intermediateElementId)
		elementParent = intermediateElementId
		elementType = "iframe"
	}
	var newElement = document.createElement(elementType);
	if (!elementId) {
		elementId = getRandomishString();
	}; // end if divParent
	newElement.id = elementId;
	if (elementStyle) {
		newElement.style = elementStyle
	}; // end if elementStyle
	if (elementClass) {
		newElement.className = elementClass
	}; // end if elementClass
	if (elementParent == "body") {
		document.body.appendChild(newElement);
	} else if (elementParent == "head") {
		document.head.appendChild(newElement);
	} else {
		getElement(elementParent).appendChild(newElement);
	}; // end if divParent
	if (elementType == "input" && innerText) {
		newElement.value = innerText
	} else if (elementType == "img" && innerText) {
		newElement.title = innerText
	} else if (innerText) {
		newElement.innerText = innerText
	}; // end if elementType	
	if (elementType == "a" && href) {
		newElement.href = href
	} else if (elementType == "img" && href) {
		newElement.src = href
	} else if (elementType == "script" && href) {
		newElement.src = href
	} else if (elementType == "iframe" && href) {
		newElement.src = href
	} else if (elementType == "link" && href) {
		newElement.href = href;
		newElement.rel = "stylesheet";
		newElement.type= "text/css";
	}; // end if elementType	
	if (onChange) {
		getElement(elementId).setAttribute("onchange", onChange);
	}; // end if onChange	
	if (onClick) {
		getElement(elementId).setAttribute("onclick", onClick);
	}; // end if onClick	
	if (contentEditable) {
		getElement(elementId).contentEditable = true;
	}; // end if contentEditable	
	if (attributeType && attributeAction) {
		getElement(elementId).setAttribute(attributeType, attributeAction);
	}; // end if attributeType
	if (radioButton == true) {
		getElement(elementId).setAttribute("type", "radio");
		addElement(elementParent,innerText,"","label","","","","","","for",elementId)//"for" is the attributeType and elementId is the attributeAction. So the label has "for: radioButton"
	}
	if (elementType == "video") {
		getElement(elementId).setAttribute("allowfullscreen", "true");
	}
	return elementId
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
				break;
			case "js": 
				convertJmlToElements(parentElement,JSON.parse('[{\"elementType\":\"script\",\"href\":\"'+URL+'\"}]'))
				break;
			case "png": 
			case "gif": 
			case "jpg": 
				convertJmlToElements(parentElement,JSON.parse('[{\"elementType\":\"img\",\"innerText\":\"'+URL+'\",\"href\":\"'+URL+'\"}]'))
				break;
			default:
				if (URL.match("https://www.youtube.com/embed/")) {
					convertJmlToElements(parentElement,JSON.parse('[{\"elementType\":\"video\",\"innerText\":\"YouTube video\",\"href\":\"'+URL+'\"}]'))
				} else { //Fallback to supplying a link.
				convertJmlToElements(parentElement,JSON.parse('[{\"elementType\":\"a\",\"innerText\":\"'+URL+'\",\"href\":\"'+URL+'\"}]'))
				}
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
function webRequest(URI,callback,JSON,verb="get",file,onlineCacheDuration = 30,offlineCacheDuration = 86400) {
//if now is smaller than duration, read from cache.
    let timerStart = Date.now()
	if (window.localStorage[URI] && Date.now() < window.localStorage[URI+":onlineCacheDuration"]) {
		console.log(URI+" cached for "+((window.localStorage[URI+":onlineCacheDuration"]-Date.now())/1000)+" more seconds.")
		status = "304";
		returnVar = window.localStorage[URI];
		callback(returnVar,status);
    let timerStop = Date.now()
    let totalTime = timerStop-timerStart;
    console.log("Cached webRequest for "+URI+" took "+totalTime+" ms")
		return;
	}; //end if window.localStorage

	let n = 0;
	var status;
	var xhRequest = new XMLHttpRequest();
	var returnVar;
	if (verb == "POST") {
		xhRequest.overrideMimeType("text/plain");
	} else if (verb == "GET") {
		xhRequest.overrideMimeType("application/json");
	} else if (verb == "PUT") {
		xhRequest.overrideMimeType("application/json");
	} else {
		xhRequest.overrideMimeType("text/plain");
	}; // end if verb
	xhRequest.open(verb, URI, true);
	xhRequest.onreadystatechange = function () {
		try {
			status = xhRequest.status;
			if (status == "200") {
				if (xhRequest.readyState == 4) {
					returnVar = xhRequest.responseText;
					if (JSON) {
						returnVar = JSON.parse(returnVar);
					}; // end if JSON
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
					callback(returnVar,status);
				}; // end xhRequest.readyState
			} else if ((status.toString().substr(0,1) == "4" || status.toString().substr(0,1) == "5") && window.localStorage[URI] && Date.now() < window.localStorage[URI+":offlineCacheDuration"] && n==0) { //&&
				console.log("Page "+URI+" offline. Serving cached copy.")
				status = "304";
				returnVar = window.localStorage[URI];
				callback(returnVar,status);
				n = (n*1) + 1;
			} else if (n==0) {
				callback(" Error: "+xhRequest.statusText,status);
			}; // end if status
		} catch(e) {console.log(e)}; // end try - This try catch captures errors within the callback too.
    let timerStop = Date.now()
    let totalTime = timerStop-timerStart;
    console.log("Full webRequest for "+URI+" took "+totalTime+" ms")
	}; // end xhRequest.onreadystatechange
	xhRequest.send(file);
}; // end webRequest

function reloadEvery(parentElement,URL,callback,JSON,seconds = 60){
	let id = addElement(parentElement)
	webRequest(URL,function(response){callback(response,id)},JSON)
	setInterval(function () {
		rebuildElement(id)
		webRequest(URL,function(response){callback(response,id)},JSON)
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
		let elementHash = ""

		if (symbol.match(/#{1,6}/)) {//Headings - Parsed.
			let innerText = block.replace(symbol+" ","")
			let elementType = ("h"+symbol.length)
			elementHash = ""

			/*
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
            out += parseInline(elementParent,innerText.elementType,id)
			*/
            out += parseInline(elementParent,innerText,elementType)
		
		} else if (symbol.match(/^\s*([-]+\s*){3,}\s*$/g)) {//horizontal row - Unparsed.
			out += "{\"elementType\":\"hr\"},"
			
		} else if (symbol.match(/^[-+*]{1,1}/)) {//Unordered Lists - Nesting.
			out += parseBlock(block,/-[ ]/,"ul","","li")
		
		} else if (symbol.match(/^\d+[.]/)) {//Ordered Lists - Nesting.
			out += parseBlock(block,/[0-9]+[.][ ]/,"ol","","li")
		
		} else if (symbol.match(/(>+\s*){1,}/g)) {//blockquote - Nesting.
			out += parseBlock(block.replace(/^>[ ]/g,"").replace(/\n>[ ]/g,"\n"),"","blockquote","","")
			
		} else if (symbol.match(/([|]\s*\S+\s*){1,}/g)) {//Tables
			let Tableid = id
			let THead = blockSplit[0]
			let TData = blockSplit[1]//Was going to split and match on this, but how many tables have multiple header rows?
			let TBody = block.replace(THead+"\n","").replace(TData+"\n","")

			if (THead.match(/#/)){
				elementHash = THead.split(" ").filter(function( obj ) {
					return obj.match(/#/g);
				});
				elementHash = elementHash[0]
				if (elementHash.split("#")[1]) {
					Tableid = elementHash.split("#")[1]
					THead = THead.replace(" "+elementHash,"")
				}
			}

			for (let setting = 0; setting < columnSettings.length; setting++) {
				if (columnSettings[setting].match(!"-ns-")){
					//insertOnclick += "\"onClick\":\"sortTable('replaceWithCol','"+Tableid+"')\",";
					//Needs some way to inject col.
                } 
				if (columnSettings[setting].match("-:")){
				//right justify
				} else if (columnSettings[setting].match(":-")){
					//left justify
				} else if (columnSettings[setting].match("-:-")){
					//center justify
				} 
				if (columnSettings[setting].match("-h-")){
				} 
			}//end for setting

			let elementType = "th"
			out += "{\"elementType\":\"table\",\"id\": \""+Tableid+"\"},"
			let elementTPart = "thead"
			let row = 0;

			for (TPart of [THead,TBody]) {
				let TPartID = Tableid+"-"+elementTPart
				out += "{\"elementParent\": \""+Tableid+"\",\"elementType\":\""+elementTPart+"\",\"id\": \""+TPartID+"\"},"
				for (line of TPart.split("\n")) {
					let col = 0;
					let TRowID = TPartID+"-r"+row
					out += "{\"elementParent\": \""+TPartID+"\",\"elementType\":\"tr\",\"id\": \""+TRowID+"\"},"
					for (data of line.split("\|")) {
						if (data){
							let TDataID = TRowID+"-c"+col
					if (TPart == THead) {
							out += "{\"elementParent\": \""+TRowID+"\",\"elementType\":\""+elementType+"\",\"innerText\": \""+data+"\",\"onClick\":\"sortTable("+col+",'"+Tableid+"')\",\"id\": \""+TDataID+"\"},"
					} else {
							out += "{\"elementParent\": \""+TRowID+"\",\"elementType\":\""+elementType+"\",\"innerText\": \""+data+"\",\"id\": \""+TDataID+"\"},"
					}
						}; //end if data
						col++
					}; //end for data 
					row++
					//After the first time through, change cell type from table header to table body data. 
					elementType = "td"
					elementTPart = "tbody"
				}; //end for line
			}; //end for TPart

			let THeadSplit = THead.replace("|").split("\|")
			let columnSettings = TData.replace("|").split("\|")
			let scriptText = ""
			for (let setting = 0; setting < columnSettings.length; setting++) {
				let currentSetting = columnSettings[setting]
				if (currentSetting.match("math")){
					//|---f-math('Hectares'*'USD per hectare')-|
					
					let mathSetting = currentSetting.replace("-1","n1").split("-").filter(function( obj ) {//Clobbers -1, -2, .. -n, etc.
						return obj.match(/math/g);
					});
					mathSetting = mathSetting[0].replace("n1","-1").replace("math(","").replaceAll(")","")
					mathSetting = mathSetting.split("'")
					
					let inputACol = mathSetting[1];
					if (typeof(inputACol) == "string") {
						inputACol = THeadSplit.indexOf(inputACol)
					}
				
					let rowBAdj = ""
					let inputBCol = ""
					let ColBTableid = Tableid
					if (mathSetting[3]) {
						if (mathSetting[3].match(/\(/)) {
							if (mathSetting[3].split("(")[0] == "") {
								ColBTableid = ""
								inputBCol = mathSetting[3].split("(")[1]
							} else {
								inputBCol = mathSetting[3].split("(")[0]
								rowBAdj = mathSetting[3].split("(")[1]
								if (typeof(inputBCol) == "string") {
									inputBCol = THeadSplit.indexOf(inputBCol)
								}
							}
						} else {
							inputBCol = mathSetting[3]
							if (typeof(inputBCol) == "string") {
								inputBCol = THeadSplit.indexOf(inputBCol)
							}
						}
					}//end if mathSetting
					mathSetting[2] = mathSetting[2].replace("+","add").replace("-","subtract").replace("*","multiply").replace("/","divide").replace("%","percent")
			console.log("Tableid: "+Tableid+" inputACol: "+inputACol+" inputBCol: "+inputBCol+" rowBAdj: "+rowBAdj+" setting "+setting+" mathSetting[2]: "+mathSetting[2])
					if (THead.replace("|").split("\|")[setting]) {
						//let newOutColumnName = THead.replace("|").split("\|")[setting]
						//scriptText += "columnMath('"+Tableid+"','"+inputACol+"','"+ColBTableid+"','"+inputBCol+"','"+rowBAdj+"','"+Tableid+"','"+setting+"','"+mathSetting[2]+"',4,'','"+newOutColumnName+"');"
					} else {
					}
					scriptText += "columnMath('"+Tableid+"','"+inputACol+"','"+ColBTableid+"','"+inputBCol+"','"+rowBAdj+"','"+Tableid+"','"+setting+"','"+mathSetting[2]+"',4);"//,'','"+newOutColumnName+"');"
				}//end if match math
				if (columnSettings[setting].match('-f-')){
					scriptText += "formatMax('"+setting+"','"+Tableid+"');";
				} 
				//Add colgroup above and parent under.
				if (columnSettings[setting].match("class")){
					classSetting = topLine.split("-").filter(function( obj ) {
						return obj.match(/class/);
					});
				} 
				if (columnSettings[setting].match("style")){
					styleSetting = topLine.split("-").filter(function( obj ) {
						return obj.match(/style/);
					});
				}
			}//end for setting
			out += "{\"elementType\":\"script\",\"innerText\": \""+scriptText+"\"},"
			/*columnMath definition
			Use text-align: left; text-align: right; text-align: center;
			Make them all sortable. Use 'ns' to turn off.
			|--1--|---2---|---3---|-4--|--5--|----6----|
			|Date|Name|Type|Qty|Price|Income|
			|------|--------|----|---f-:|---f-|---=(Qty+Price)-f--|
			Autodetect if sort is alpha or number based on first row of body. (Where do I have this?)
			columnMath:
			=(col1 symbol col2, rounding)
			- none - (copy A)
			+ - add
			- - subtract
			* - multiply
			/ - divide
			% - percent (divide then multiply by 100 - NOT modulus) 
			columnMath(Tableid,inputACol,Tableid,inputBCol,rowBAdj,Tableid,outputCol,mathOperation,4,formatMaxOutput,newOutColumnName)
			Can use either column numbers (starting at 0) or column name.
			Other codes: 
			f - formatMax(targetColumn,Tableid)
			ns - Not sortable
			: - justify (place on side or middle)
			h - header column (gets th instead of td)
			*/
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
			let eParent = id
			elementHash = ""

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
				if (elementHash.split("#")[1]) {
					eParent = elementHash.split("#")[1]
				}
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
                out += "{\"elementParent\": \""+nestedParent+"\",\"elementType\":\""+elementType+"\",\"elementClass\":\""+elementClass+"\",\"innerText\":"+innerText+",\""+action+"\":\""+onAction+"\",\"id\": \""+eParent+"\"},"
			} else {
                out += "{\"elementParent\": \""+nestedParent+"\",\"elementType\":\""+elementType+"\",\"elementClass\":\""+elementClass+"\",\"innerText\":"+innerText+",\"id\": \""+eParent+"\"},"
			}
		
		} else if (block.substr(0,4).match(/[ ]{4}/g)) {//Code block - don't process anything.
			let outerClass = ""
			let innerClass = ""
			let text = block.replace(/^[ ]{4}/g,"").replace(/\n[ ]{4}/g,"\n")//Replace leading 4 spaces.
			let innerText = JSON.stringify(text) //innerText gets its outer quotes from the JSON.stringify, so doesn't need to have extra escaped quotes around it. 
			out += "{\"elementType\":\"pre\",\"elementClass\":\""+outerClass+"\",\"id\": \""+id+"\"},"
			out += "{\"elementParent\": \""+id+"\",\"elementType\":\"code\",\"elementClass\":\""+innerClass+"\",\"innerText\":"+innerText+"\},"
		} else if (block.substr(0,3).match(/[```]{3}/g) || block.substr(0,3).match(/[~]{3}/g)) {//Code block - don't process anything.
			let outerClass = ""
			let innerClass = ""
			let text = block.replace(/^```\n/,"").replace(/\n```$/,"")//Replace wrapping carets.
			text = text.replace(/^~~~\n/,"").replace(/\n~~~$/,"")//Replace wrapping tildes.
			let innerText = JSON.stringify(text) //innerText gets its outer quotes from the JSON.stringify, so doesn't need to have extra escaped quotes around it. 
			out += "{\"elementType\":\"pre\",\"elementClass\":\""+outerClass+"\",\"id\": \""+id+"\"},"
			out += "{\"elementParent\": \""+id+"\",\"elementType\":\"code\",\"elementClass\":\""+innerClass+"\",\"innerText\":"+innerText+"\},"
		} else if (block.substr(0,5).match(/^-[ ]\[[X ]\]/g)) {//Task List block - Nesting.
			//This is an unordered list with a bunch of CSS: 
			//https://www.w3schools.com/howto/howto_js_todolist.asp
			out += parseBlock(block,/^-[ ]\[[X ]\]/g,"ul","","li")

		} else if (block.match(/^.+\n:[ ]/g)) {//Definition List block - Parsed.
			out += parseBlock(block,/:[ ]/g,"dl","","dd")

		} else {//Return everything else as a paragraph.
			out += parseInline(elementParent,block)
		};//end switch symbol
	};//end for block
	
	return out;
}

function replaceSymbols(text) {
	for (key of getKeys(tokenData)) {
		let token = tokenStart+key+tokenEnd
		let regex = new RegExp(tokenData[key].regex,"g")
		let regexEscape = new RegExp("\\\\"+token,"g")
		let regexSpaces = new RegExp(" "+token+" ","g")
		let regexToken = new RegExp(token,"g")
		text = text.replace(regex,token)
		//It's easier (faster and less complex) to replace all and then replace back the escaped ones after.
		text = text.replace(regexEscape,tokenData[key].symbol)//Escaping The Backslashes - don't miss this potent sequel to the action-packed HTML thriller Escaping The Ampersands.
		text = text.replace(regexSpaces," "+tokenData[key].symbol+" ")
		//Detect URIs as either containing HTTP for an absolute link, or starting with a slash for a relative link. 
		//But don't escape anchor or image tokens in this way, so they'll still be picked up by parseInline.
		for (split of text.split(" ")){
			if ((key == "hr") && (split.substr(0,1) == "/")){
				let splitReplace = token+split
				text = text.replaceAll(split,splitReplace)
			} else if ((split.match("http") || (split.substr(0,1) == "/")) && (key != "am") && (key != "an") && (key != "im")) {
				let splitReplace = split.replaceAll(regexToken,tokenData[key].symbol)
				text = text.replaceAll(split,splitReplace)
				if ((split.substr(0,4) == "http") && (key == "ha"))  {
					text = text.replace(regex,token)
				}; // end if split
			}; // end split match
		}; // end for split
	}; // end for key
	text = text.replaceAll("¤¤¤ŒŒŒŒŒŒĦĦĦamĦĦĦŒŒŒŒŒŒ¤¤¤¤¤¤ŒŒŒŒŒŒĦĦĦhaĦĦĦŒŒŒŒŒŒ¤¤¤","¤¤¤ŒŒŒŒŒŒĦĦĦamĦĦĦŒŒŒŒŒŒ¤¤¤http")
	return text
}

function parseBlock(block,regex="",outerType="",outerClass="",innerType="",regexReplace="") {
	//Takes unparsed block and splits off regex to return an element with children.
	let prevLI = ""
	let tabLevel = 0 //Could be called indentationLevel. 
	let listID = [] //listID holds UL IDs. 
	let inc = 0;
	listID[0] = getRandomishString();
	let out = "{\"elementType\":\""+outerType+"\",\"elementClass\":\""+outerClass+"\",\"id\": \""+listID[listID.length -1]+"\"},"
	let emitType = "ul"
	if (outerClass == "ol") {
		emitType = outerClass;
	}
	for (line of block.split("\n")) {
		//listID holds as many IDs as are at tabLevel, or double the number of spaces leading the line.
		tabLevel = line.match(/^\s*/).toString().split("  ").length//Gather the leading spaces and count the pairs to get the tabLevel.
		line = line.replace(/^\s*/,"")//Should be tabLevel*2 spaces, not a random number.
		line = line.replace(regex,regexReplace)
		while (tabLevel > listID.length) {//If listID.length is less than the tabLevel, then add IDs and nesting UL/OL until they're the same.
			listID[listID.length] = listID[listID.length -1]+"-"+emitType+inc
			if (prevLI == "") {
				out += "{\"elementParent\":\""+listID[listID.length -2]+"\",\"elementType\":\""+emitType+"\",\"id\": \""+listID[listID.length -1]+"\"},"
			} else {
				out += "{\"elementParent\":\""+prevLI+"\",\"elementType\":\""+emitType+"\",\"id\": \""+listID[listID.length -1]+"\"},"
				prevLI = ""
			}
		}  
		while (tabLevel < listID.length) {//If the listID.length is greater than the tabLevel, then delete IDs until they're the same.
			listID.pop();
		} 
		//Once the list level is sorted, add the list items. If it's a list item, set up to parent any UL/OL children above.
		if (innerType == "li") {
			prevLI = listID[listID.length -1]+"-li"+inc
			out += parseInline(listID[listID.length -1],line,innerType,prevLI)
		} else {
			out += parseInline(listID[listID.length -1],line,innerType)
		}
	inc++
	}
	return out;
}

function parseInline(parentElement= "parentElement",text,elementType="p",id = (getRandomishString()),elementClass="",action,onAction){
	//Takes unparsed block, replaces tokens, and splits off token to return an element with children.
	//Build parent element.
	let split = new RegExp(tokenSplitter)
	textSplit = replaceSymbols(text).split(split)

	let regexBegin = new RegExp('^'+tokenA)
	let regexSymbol = new RegExp(tokenB,'g')
	let regexEnd = new RegExp(tokenA+'$')
	let firstText = textSplit[0].replace(regexBegin,"").replace(regexEnd,"")
	if (action && onAction) {
		out = "{\"elementParent\": \""+parentElement+"\",\"elementType\":\""+elementType+"\",\"elementClass\":\""+elementClass+"\",\""+action+"\":\""+onAction+"\",\"innerText\":\""+firstText+"\",\"id\": \""+id+"\"},"
	} else {
		out = "{\"elementParent\": \""+parentElement+"\",\"elementType\":\""+elementType+"\",\"elementClass\":\""+elementClass+"\",\"innerText\":\""+firstText+"\",\"id\": \""+id+"\"},"
	}
	//Parse tokens into children of parent.
	for (let b = 1; b < textSplit.length -1; b+=4) {
	try {
		elementType = tokenData[textSplit[b].replace(regexSymbol,"")].elementType //Reuse the variable by clobbering the extant data.
		let innerText = textSplit[b+1].replace(regexBegin,"").replace(regexEnd,"")
		//let elementType = textSplit[b+2]
		let spanText = ""
		if ((elementType == "a") || (elementType == "img")) {
			spanText = textSplit[b+3].replace(regexBegin,"").replace(regexEnd,"")
			let href = spanText.match(/\S*\)/)[0].replace(/\)$/,"")
			spanText = spanText.split(/\S*\)/)[1]
			out += "{\"elementParent\": \""+id+"\",\"elementType\":\""+elementType+"\",\"innerText\":\""+innerText+"\",\"href\": \""+href+"\"},"
			
		} else if (elementType == "ha") {
			let href = innerText.split(/[ ]/)[0]
			spanText = innerText.replace(href,"")
			innerText = innerText.split(/[ ]/)[0]
			//Drop your load in the road! Leave a URL anywhere to have the page eventually load and display that data.
			let colonSplit = href.split(":")
			href = colonSplit[0]+":"+colonSplit[1]
			let reloadEverySec = colonSplit[2]
			let eParent = id
			if (colonSplit[3]) {
				eParent = colonSplit[3]
			}
			if (reloadEverySec) {
				out += "{\"elementParent\": \""+eParent+"\",\"elementType\":\"script\",\"innerText\":\"reloadEvery('"+eParent+"','http"+href+"','"+reloadEverySec+"')\"},"
			} else {
				out += "{\"elementParent\": \""+eParent+"\",\"elementType\":\"script\",\"innerText\":\"convertWebElement('"+eParent+"','http"+href+"')\"},"
			}
		} else if (elementType == "hr") {
			let href = innerText.split(/[ ]/)[0]
			spanText = innerText.replace(href,"")
			innerText = innerText.split(/[ ]/)[0]
			//Drop your load in the road! Leave a URL anywhere to have the page eventually load and display that data.
			let colonSplit = href.split(":")
			href = colonSplit[0]
			let reloadEverySec = colonSplit[1]
			let eParent = id
			if (colonSplit[2]) {
				eParent = colonSplit[2]
			}
			if (reloadEverySec) {
				out += "{\"elementParent\": \""+eParent+"\",\"elementType\":\"script\",\"innerText\":\"reloadEvery('"+eParent+"','"+href+"','"+reloadEverySec+"')\"},"
			} else {
				out += "{\"elementParent\": \""+eParent+"\",\"elementType\":\"script\",\"innerText\":\"convertWebElement('"+eParent+"','"+href+"')\"},"
			}
			
		} else {
			spanText = textSplit[b+3].replace(regexBegin,"").replace(regexEnd,"")
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

function textToNumNotation(inputObject) {
	if (typeof inputObject == "string") {
		inputObject = inputObject.replace(/,/g,"");
		if (inputObject.substring(inputObject.length -1,inputObject.length) == "k") {
			inputObject = inputObject.replace(/k/g," thousand");
		}
		if (inputObject.substring(inputObject.length -2,2) == "bn") {
			inputObject = inputObject.replace(/bn/g," billion");
		}
		var splitObject = inputObject.split(" ");
		var value = splitObject[0]
		var significand = splitObject[1]
		switch (significand){
			case "decillion":
				significand = $decillion;
				break;
			case "nonillion":
				significand = $nonillion;
				break;
			case "octillion":
				significand = $octillion;
				break;
			case "septillion":
				significand = $septillion;
				break;
			case "sixtillion":
				significand = $sixtillion;
				break;
			case "quintillion":
				significand = $quintillion;
				break;
			case "quadrillion":
				significand = $quadrillion;
				break;
			case "trillion":
				significand = $trillion;
				break;
			case "billion":
				significand = $billion;
				break;
			case "million":
				significand = $million;
				break;
			case "thousand":
				significand = $thousand;
				break;
			default:
				significand = 1;
				break;
		}
		outputItem = value * significand;
		return outputItem;
	} else if (typeof inputObject == "number") {
		return inputObject;
	} else {
		return inputObject;
	}
}

function numToTextNotation(inputObject,round) {
	var significand = ""
	var outputValue
	if (typeof inputObject == "string") {
		inputObject = inputObject.replace(/,/g,"") *1;
	}
	if (inputObject >= $decillion){
		outputValue = getRoundedNumber(inputObject/$decillion,round);
		significand = " decillion";
	}else if (inputObject >= $nonillion){
		outputValue = getRoundedNumber(inputObject/$nonillion,round);
		significand = " nonillion";
	}else if (inputObject >= $octillion){
		outputValue = getRoundedNumber(inputObject/$octillion,round);
		significand = " octillion";
	}else if (inputObject >= $septillion){
		outputValue = getRoundedNumber(inputObject/$septillion,round);
		significand = " septillion";
	}else if (inputObject >= $sixtillion){
		outputValue = getRoundedNumber(inputObject/$sixtillion,round);
		significand = " sixtillion";
	}else if (inputObject >= $quintillion){
		outputValue = getRoundedNumber(inputObject/$quintillion,round);
		significand = " quintillion";
	}else if (inputObject >= $quadrillion){
		outputValue = getRoundedNumber(inputObject/$quadrillion,round);
		significand = " quadrillion";
	}else if (inputObject >= $trillion){
		outputValue = getRoundedNumber(inputObject/$trillion,round);
		significand = " trillion";
	}else if (inputObject >= $billion){
		outputValue = getRoundedNumber(inputObject/$billion,round);
		significand = " billion";
	}else if (inputObject >= $million){
		outputValue = getRoundedNumber(inputObject/$million,round);
		significand = " million";
	}else if (inputObject >= $thousand){
		outputValue = getRoundedNumber(inputObject/$thousand,round);
		significand = "k";
	}else{
		outputValue = getRoundedNumber(inputObject,round);
	}
	if (isNaN(outputValue) == true) {
		outputValue = 0;
	}
	return outputValue + significand;
}

function detectEnter(keypress,callback,keycode=13){
    if(keypress.keyCode === keycode){
        keypress.preventDefault(); // Ensure it is only this code that runs
		callback();
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
		webRequest(href,function(content,statusCode){
			let works = " fails"
			if ((statusCode == 200) || (statusCode == 304)) {works = " works"}
			appendElement(outputElement,"link "+href+ works+"\n");
			colorifyWords(outputElement, "works", "maxValueInArray")
			colorifyWords(outputElement, "fails", "red9")
		})
	}
	for (image of document.images) {
		let href = image.src
		webRequest(href,function(content,statusCode){
			let works = " fails"
			if ((statusCode == 200) || (statusCode == 304)) {works = " works"}
			appendElement(outputElement,"image "+href+ works+"\n");
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

function addColumn(tableid,columnData,headLess) {//Need to extend table ID schema to these. i.e. Table1001-tbody-r8-c1
	var rowCount = 0;
	if (headLess != "true") {
		var tableHead = returnTablePart(tableid,"THEAD");
		for (var currentRow=0; currentRow<tableHead.rows.length; currentRow++) {
			rowCount++
			if (typeof(columnData) == "object") {
				addElement(tableHead.rows[currentRow].id,columnData[currentRow],"","th","","","","sortTable("+(tableHead.children[0].children.length)+",'"+tableid+"')");
			} else {
				addElement(tableHead.rows[currentRow].id,columnData,"","th","","","","sortTable("+(tableHead.children[0].children.length)+",'"+tableid+"')");
			}
		}
	}
	var tableBody = returnTablePart(tableid,"TBODY");
	try {
		for (var currentRow=0; currentRow<tableBody.rows.length-rowCount+1; currentRow++) {
			if (typeof(columnData) == "object") {
					addElement(tableBody.rows[currentRow].id,columnData[currentRow+rowCount],"","td");
				} else {
					addElement(tableBody.rows[currentRow].id,"","","td");
			}
		}
	} catch {}
}

function deleteColumn(tableid){
	var allRows = getElement(tableid).rows;
	for (var i=0; i<allRows.length; i++) {
		if (allRows[i].cells.length > 1) {
			allRows[i].deleteCell(-1);
		}
	}
}

function columnMath(TableAid,inputACol,TableBid,inputBCol,rowBAdj,TableOutid,outputCol,mathOperation,roundDigits=4,formatMaxOutput,newOutColumnName) {
	var TableA = returnTablePart(TableAid,"TBODY");
	let TableBListed = true;
	if (TableBid == "") {
		TableBid = TableAid;
		TableBListed = false;
	}
	var TableB = returnTablePart(TableBid,"TBODY");
	var TableOut = returnTablePart(TableOutid,"TBODY");
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
			if (TableBListed == true) {
				if (TableAHead.children[0].children[inputACol].innerText == TableBHead.children[0].children[inputBCol].innerText) {
					newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathVerb;
				} else {
					newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathOperator + TableBHead.children[0].children[inputBCol].innerText;
				}
			} else {
				newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathOperator + numToTextNotation(inputBCol);
			}

			addColumn(TableOutid,["",""],"true");
		}
	}
		
	for (var currentRow = (0-rowBAdj); currentRow < TableA.children.length; currentRow++) {
		var childrenOfA = TableA.children[currentRow];
		var childrenOfB;
		var childrenOfOut = TableOut.children[currentRow];
		
		var InputAText = textToNumNotation(childrenOfA.children[inputACol].innerText);
		var InputBText;
		
		if (TableBListed == true) {
			thisRow = currentRow+(rowBAdj *1)
			childrenOfB = TableB.children[thisRow];
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

function sortTable(currentColumn,tableid) {
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
			if (typeof(currentCell).innerText == "string") {
				if (currentCell.innerHTML.toLowerCase() > nextCell.innerHTML.toLowerCase()) {
				  // If so, mark as a switch and break the loop:
				  shouldSwitch = true;
				  break;
				}
			} else if (typeof(currentCell).innerText == "number") {
				if ((textToNumNotation(currentCell.innerHTML.replace("$",""))) > (textToNumNotation(nextCell.innerHTML.replace("$","")))) {
				  // If so, mark as a switch and break the loop:
				  shouldSwitch = true;
				  break;
				}
			} else {
				console.log(typeof(currentCell))
			}// end if typeof
		} else if (dir == "desc") {
			if (typeof(currentCell).innerText == "string") {
				if (currentCell.innerHTML.toLowerCase() < nextCell.innerHTML.toLowerCase()) {
					// If so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (typeof(currentCell).innerText == "number") {
				if ((textToNumNotation(currentCell.innerHTML.replace("$",""))) < (textToNumNotation(nextCell.innerHTML.replace("$","")))) {
				  // If so, mark as a switch and break the loop:
				  shouldSwitch = true;
				  break;
				}
			}// end if typeof
		}//end if dir
	}//end for currentRow
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
	//tablePart can be THEAD, TBODY, or COLGROUP, and the table has to have these defined or the function will have nothing to return. 
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
