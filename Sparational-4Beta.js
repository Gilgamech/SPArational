//Copyright 2013-2023 Gilgamech Technologies
//SPArational.js v4.-6.0 - Make faster websites faster.
//Author: Stephen Gillie
//Created on: 8/3/2022
//Last updated: 12/2/2023
//Version history:
//4.-6.0 convertMdToSpa HTTP passthrough complete.
//4.-7.3 Add localStorage caching for webRequest, and indefinite page error cache fallback for best offline service. Caution: using this feature requires tombstoning deleted files.
//4.-7.2: Rename cje2 to convertJmlToElements. 
//Notes:

//Element tools
function getElement(elementId){
	return document.getElementById(elementId)
}

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
	if ((elementType == "text") || (elementType == "textarea") || (elementType == "select-one")|| (elementType == "number")) {
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

//Multisite tools
function convertWebElement(parentElement,URL){
	webRequest(URL,function(callback){
		let urlParts = URL.split(".");
		let extension = urlParts[urlParts.length -1];
		switch (extension) { //Be caps indifferent.
			case "spa": 
			case "spA": 
			case "sPa": 
			case "sPA": 
			case "Spa": 
			case "SpA": 
			case "SPa": 
			case "SPA": 
				convertJmlToElements(parentElement,rewriteJson(JSON.parse(callback)).pages.main.elements)
				break;
			case "csv": 
			case "csV": 
			case "cSv": 
			case "cSV": 
			case "Csv": 
			case "CsV": 
			case "CSv": 
			case "CSV": 
				convertMdArrayToTable(parentElement,"",eval(convertCsvToMdArray(callback)))
				break;
			case "md": 
			case "mD": 
			case "Md": 
			case "MD": 
				//console.log(parentElement)
				convertJmlToElements(parentElement,rewriteJson(JSON.parse(convertMdToSpa(callback)).pages.main.elements))
				break;
			case "yml": 
			case "yaml": 
				convertJmlToElements(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": [{\"elementParent\": \"parentElement\",\"innerText\":\"YAML not yet supported.\"}]}}}').pages.main.elements))
				//convertJmlToElements(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": ['+convertYamlToSpa(callback).replace(/[,]$/,"")+']}}}').pages.main.elements))
				break;
			case "json": 
				convertJmlToElements(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": [{\"elementParent\": \"parentElement\",\"innerText\":\"YAML not yet supported.\"}]}}}').pages.main.elements))
				//convertJmlToElements(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": ['+convertYamlToSpa(callback).replace(/[,]$/,"")+']}}}').pages.main.elements))
				break;
			default:
				convertJmlToElements(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": [{\"elementParent\": \"parentElement\",\"innerText\":\"Other page types not yet supported.\"}]}}}').pages.main.elements))
				break;
		}
	})
};

//Format transformations
function rewriteJson(data,baseData) {
	let n = 0;
	//Rewrite data - Works on any JSON, not just SPA files.
	for(element in data){
		if (typeof data[element] === "string") {
			if (data[element].substr(0,2) == "$_") {//Replace-o-rama! Full SPA pages - now in JML or YAML - can support $_ "dollarsign-underscore" variable replacement from anywhere within the document.
				data[element] = eval(data[element].replace("$_","baseData"))
			} else if (data[element].substr(0,4) == "http") {//Drop your load in the road! Leave a URL at the start of any line to have the page eventually load and display that data.
				data[element] = {"elementParent":"parentElement","elementType":"script","innerText":("convertWebElement(\"parentElement\",\""+data[element]+"\")")}
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

function convertJupyterToSpa(inputString) {
	var out
				console.log(inputString);
	var stringVar = JSON.stringify(inputString);
				console.log(stringVar);
	stringVar = stringVar.replace(/\["/g,'');
	stringVar = stringVar.replace(/"\]/g,'');
				console.log(stringVar);
}

function convertJupyterToSpa2(inputString) {
		stringVar = stringVar.replace('# ','"          "elementType": "p",');
		stringVar = stringVar + '</h1>"';
		inputString = JSON.parse(stringVar);
		return inputString;
}; 

function convertMdToSpa(markdown) {
//Markdown is for compositional data, so has a symbol-space-innerText format for most symbols, and symbol-innerText-symbol for the rest. 
	let out = ""
	let listIDs = []
	let prevTabLevel = 0
	let prevListItem = ""
	
	markdown = (markdown.split("\n")) 
	for (line of markdown)	 {
		let elementParent = "parentElement"
		let href = ""
		let tabLevel = 0
		let listIDLength = listIDs.length
		let symbol = line.split(" ")[0]
		let innerText = line.replace(symbol+" ","")
		//console.log("symbol: "+symbol+" innerText: "+innerText)
		let id = getBadPW();
		let firstChar = line.charAt(0);
		let secondChar = line.charAt(1);

		if (line.length == 0) { 
			out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"div\"},"
			continue
		}
		//Case off the 1st char, then 2nd char, etc.
		//Handle indenting
		switch (firstChar) {
			case " ":
			switch (secondChar) {
				case " ":
				//Tab level 
				tabLevel = line.match(/^\s*/).toString().split("  ").length
				line = line.replace(/^\s*/,"")
			}
		}
		//console.log("tabLevel "+tabLevel+" - prevTabLevel "+prevTabLevel+" |  line "+line)
		firstChar = line.charAt(0);
		secondChar = line.charAt(1);

		//Handle headers, lists, blockquotes, etc. Every switch has to have a default section appends out with JML for a P element having line as the innerText. 
		//Intake Markdown, output JML
		switch (firstChar) {
			case "#":
			//Headings
			switch (symbol) {
				case "#":
					out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"h1\",\"innerText\": \""+innerText+"\"},"
					break;
				case "##":
					out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"h2\",\"innerText\": \""+innerText+"\"},"
					break;
				case "###":
					out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"h3\",\"innerText\": \""+innerText+"\"},"
					break;
				case "####":
					out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"h4\",\"innerText\": \""+innerText+"\"},"
					break;
				case "#####":
					out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"h5\",\"innerText\": \""+innerText+"\"},"
					break;
				case "######":
					out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"h6\",\"innerText\": \""+innerText+"\"},"
					break;
			}
			break;				
			//blockquote
			case ">":
				out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"blockquote\",\"innerText\": \""+innerText+"\"},"
				//Subsequent lines need to inherit unless there's a line break, and subsequent lines with the same number of arrows need them removed. 
				break;
				
			//Unordered Lists
				//+ Sub-lists are made by indenting 2 spaces:
				//  - Marker character change forces new list start:
			case "+":
			case "-":
			case "*":
				switch (secondChar) {
					case " ":
						if (tabLevel == 0) { 
							listIDs[listIDs.length] = getBadPW();
						}  else if (tabLevel > prevTabLevel) { 
							listIDs[listIDs.length] = getBadPW();
						}  else if (tabLevel < prevTabLevel) {
							listIDs.pop();
						} 
						
						let id = listIDs[listIDs.length -1]
						let listLevel = listIDs[listIDs.length -2]
						
						if (tabLevel == 0) {
							prevListItem = elementParent
							console.log("First line: Add UL "+id+" of "+listIDs.length+" - prevListItem "+prevListItem)
							out += "{\"elementParent\": \""+prevListItem+"\",\"elementType\":\"ul\",\"id\": \""+id+"\"},"
						} else if (tabLevel > prevTabLevel) { 
							if (prevListItem == "") {prevListItem = listLevel}
							console.log("Add UL "+id+" of "+listIDs.length+" - prevListItem "+prevListItem)
							out += "{\"elementParent\": \""+prevListItem+"\",\"elementType\":\"ul\",\"id\": \""+id+"\"},"
						} else if (tabLevel < prevTabLevel) { 
							console.log("Remove UL "+id+" of "+listIDs.length+" - prevListItem "+prevListItem)
						}
						prevListItem = getBadPW();
						out += "{\"elementParent\": \""+id+"\",\"elementType\":\"li\",\"innerText\": \""+innerText.replace(/- /,"")+"\",\"id\": \""+prevListItem+"\"},"
						break;
				//This is where Bold gets dropped - because it's unhandled. 
					case "*":
						let newID = getBadPW();
						out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"p\",\"id\": \""+newID+"\"},"
						out += "{\"elementParent\": \""+newID+"\",\"elementType\":\"b\",\"innerText\": \""+line.replaceAll("**","")+"\"},"
						break;
					default:
						out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"p\",\"id\": \""+line+"\"},"
						break;
				}; //end switch secondChar
				break;
				
			//Ordered Lists
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				switch (secondChar) {
					case ".":
						if (tabLevel == 0) { 
							listIDs[listIDs.length] = getBadPW();
						}  else if (tabLevel > prevTabLevel) { 
							listIDs[listIDs.length] = getBadPW();
						}  else if (tabLevel < prevTabLevel) {
							listIDs.pop();
						} 
						
						let id = listIDs[listIDs.length -1]
						let listLevel = listIDs[listIDs.length -2]
						
						if (tabLevel == 0) {
							prevListItem = elementParent
							console.log("First line: Add OL "+id+" of "+listIDs.length+" - prevListItem "+prevListItem)
							out += "{\"elementParent\": \""+prevListItem+"\",\"elementType\":\"ol\",\"id\": \""+id+"\"},"
						} else if (tabLevel > prevTabLevel) { 
							if (prevListItem == "") {prevListItem = listLevel}
							console.log("Add OL "+id+" of "+listIDs.length+" - prevListItem "+prevListItem)
							out += "{\"elementParent\": \""+prevListItem+"\",\"elementType\":\"ol\",\"id\": \""+id+"\"},"
						} else if (tabLevel < prevTabLevel) { 
							console.log("Remove OL "+id+" of "+listIDs.length+" - prevListItem "+prevListItem)
						}
						prevListItem = getBadPW();
						out += "{\"elementParent\": \""+id+"\",\"elementType\":\"li\",\"innerText\": \""+innerText.replace(/- /,"")+"\",\"id\": \""+prevListItem+"\"},"
						break;
					default:
						out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"p\",\"id\": \""+line+"\"},"
						break;
				break;
				}; //end switch secondChar
			break;
			case "|":
				out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"p\",\"id\": \""+line+"\"},"
				//Split each | If above the ' ----' row it's a TH and below it's TD.
				//Wrap each line in TR tags.
				//THEAD wrapped in THEAD tags and body wrapped in TBODY tags
				//Wrap whole thing in Table tags
			break;
			case "h":
				if (line.substr(0,4) == "http") {//Drop your load in the road! Leave a URL at the start of any line to have the page eventually load and display that data.
					out += '{"httpPassthrough":"'+line+'"},'
				}; // end if element.substr
			break;
			default:
				out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"p\",\"innerText\": \""+line+"\"},"
				break;
		}; //end switch firstChar
		prevTabLevel = tabLevel
		
			//Links
			//This system splits out by JML, selects the last one, parses. 
			let outSplit = out.split("},{")
			outSplit = outSplit[outSplit.length -1]
			if (!(outSplit.match("^{"))) {outSplit = "{"+outSplit}
			let element = JSON.parse(outSplit.toString().replace(/},$/,"}"))
			if (element.httpPassthrough) {
				out = out.replaceAll(outSplit,'"'+element.httpPassthrough+'",')
			} else {
				
			//Takes the innerText value, and matches then splits from the same regex
				for (txt of element.innerText.split(/\[/g)) {
						txtSplit = txt.split(/\)/g)
						for (tex of txtSplit) {
							if (tex.includes("](")) {
								let regex = /\]\(/
								let txt0 = tex.split(regex)
								let innerText = txt0[0]
								let linkText = txt0[1]
								//Generates an ID if none. 
								if (element.id == null) {element.id = getBadPW()}

								//Replaces the innerText and linkText with the ID and re-caps. 
								out = out.replace("["+txt,"").replace(/"},$/,'","id":"'+element.id+'"},')
								
								out += "{\"elementParent\": \""+element.id+"\",\"elementType\":\"a\",\"innerText\": \"" +innerText +'\",\"href\":\"' +linkText +"\"},"
								//Encapsulates innerText then linkText with JML.  
								
								//Reattach the trailing text. 
								let endTxt = txtSplit[txtSplit.indexOf(tex)+1]
								if (endTxt) {
									out += "{\"elementParent\": \""+element.id+"\",\"elementType\":\"span\",\"innerText\": \"" +endTxt +"\"},"
								}; //end if endTxt
							}; //end if tex
						}; //end for tex
				}; //end for txt
			}; //end if element
			
	}; //end for line
	out = '{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": ['+out.replace(/[,]$/,"")+']}}}'
	return out;
}

//convertMdArrayToTable(parentElement,newTableID,convertCsvToMDArray(inputString),classList,styleList)
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

function convertJsonToSpa(inputString) {
//JSON won't always be so pretty, and might be at any state between pretty and minified. So might need to parse and stringify first. This is also a good time to check for a jmlVersion, since all SPA files have one.
//Instead of removing brackets, hide them by making their text color equal to their background color.
//Direct JSON goes right onto the page: 
	let out = ""
	inputString = inputString.replaceAll("{","").replaceAll("}","").replaceAll("[","").replaceAll("]","").replaceAll('"',"").split("\n")
	for (let n = 0; n<inputString;n++) {
					out += "{\"elementParent\": \"parentElement\",\"elementType\":\"h1\",\"innerText\": \""+inputString+"\"},"
		//appendElement("content", trimmedJson[n]+"\n")
	}
	return out;
}

function convertMdArrayToTable(parentElement,newTableID,array,classList,styleList) {
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
			addTable(parentElement,newTableID,out)
		} else {
			addColumn(newTableID,out)
		}
		if (classList != null) {
			addElement(returnTablePart('historyTable','COLGROUP').id,"",classList[column],"col",styleList[column])
		}
	};
}

//Supporting functions
//window.localStorage needs garbage collection - if there are more than like 25 pages, remove the oldest.
function webRequest($URI,$callback,$JSON,$verb="get",$file,onlineCacheDuration = 30,offlineCacheDuration = 86400) {
//if now is smaller than duration, read from cache.
	if (window.localStorage[$URI] && Date.now() < window.localStorage[$URI+":onlineCacheDuration"]) {
		console.log($URI+" cached for "+((window.localStorage[$URI+":onlineCacheDuration"]-Date.now())/1000)+" more seconds.")
		$status = "304";
		returnVar = window.localStorage[$URI];
		$callback(returnVar,$status);
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
					if (onlineCacheDuration > 0) {
						window.localStorage[$URI] = returnVar;
						window.localStorage[$URI+":onlineCacheDuration"] = (onlineCacheDuration * 1000) + Date.now();
						console.log("Caching "+$URI+" for "+((window.localStorage[$URI+":onlineCacheDuration"]-Date.now())/1000)+" seconds.")
					} else if (onlineCacheDuration <= 0) {
						window.localStorage[$URI] = null;
						window.localStorage[$URI+":onlineCacheDuration"] = Date.now();
						console.log("Invalidating "+$URI)
					}; //end if onlineCacheDuration
					$callback(returnVar,$status);
				}; // end xhRequest.readyState
			} else if (($status.toString().substr(0,1) == "4" || $status.toString().substr(0,1) == "5") && window.localStorage[$URI] && n==0) {
				console.log("Page "+$URI+" offline. Serving cached copy from "+(Date.now()-window.localStorage[$URI+":duration"])+" seconds ago.")
				$status = "304";
				returnVar = window.localStorage[$URI];
				$callback(returnVar,$status);
				n = (n*1) + 1;
			} else if (n==0) {
				$callback(" Error: "+xhRequest.statusText,$status);
			}; // end if $status
		} catch(e) {console.log(e)}; // end try
	}; // end xhRequest.onreadystatechange
	xhRequest.send($file);
}; // end webRequest

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
		webRequest("GET",link.href,function(a){ 
			let len = a.length;
			let works = " fails"
			if (len > 100) {works = " works"}
			appendElement(outputElement,"link "+href+ works+"\n");
			colorifyWords(outputElement, "works", "maxValueInArray")
			colorifyWords(outputElement, "fails", "red9")
		})
	}
};

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

