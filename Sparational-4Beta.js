//Copyright 2013-2023 Gilgamech Technologies
//SPArational.js v4.-6.1 - Make faster websites faster.
//Author: Stephen Gillie
//Created on: 8/3/2022
//Last updated: 12/7/2023
//Version history:
//4.-6.1: Full rewrite of Markdown parser, including breaking out Paragraph inline parsing to a separate function. 
//4.-6.0 convertMdToSpa HTTP passthrough complete.
//4.-7.3 Add localStorage caching for webRequest, and indefinite page error cache fallback for best offline service. 
//Notes:
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Sitelets can't load themselves or they would cause a loop.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Will do nestables later. Nestable means the innerText goes through the block parser again, and might reattach itself under instead of having to rebuild the parent.
//Are there impossible nesting combinations?

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
	let urlParts = URL.split(".");
	let extension = urlParts[urlParts.length -1].toLowerCase();
		switch (extension) { //Be caps indifferent.
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
				//console.log(parentElement)
				webRequest(URL,function(callback){
					convertJmlToElements(parentElement,rewriteJson(JSON.parse(convertMdToSpa(callback))))
				})
				break;
			default: //Fallback to supplying a link.
				convertJmlToElements(parentElement,rewriteJson(JSON.parse('[{\"elementType\":\"a\",\"href\":\"'+URL+'\"}')))
				break;
		}
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
//Markdown is made of Blocks which are filled with data.
	let out = ""
	let listIDs = []
	let prevTabLevel = 0
	let prevListItem = ""

	markdown = markdown.replace(/\n\s+\n/g,"\n\n")
	markdown = markdown.replace(/\n\t+\n/g,"\n\n")

//Parse page on \n\n into blocks.
	for (block of markdown.split("\n\n")) {
		let symbol = block.split(" ")[0]
		//console.log("symbol: "+symbol+" innerText: "+innerText)

		let elementParent = "parentElement"
		let href = ""
		let listIDLength = listIDs.length
		let elementType = ""
		let id = getRandomishString()

		inSplit = block.split("\n")
		let topLine = inSplit[0]//.replace(/^[:]{3}/g,"")
		let botLine = inSplit[inSplit.length -1]//.replace(/^[:]{3}/g,"")
		let topSplit = topLine.split(" ")
		let botSplit = botLine.split(" ")
		let elementHash = topSplit[2]
			
		if (elementHash) {
			let elementType = elementHash.split("#")[0]
			let id = elementHash.split("#")[1]
		}
		
		let innerText = block.replace(topLine+"\n","").replace("\n"+botLine,"")
		let headerSplit = innerText.replace("}","").split("{#")
		innerText = innerText.replaceAll("{#"+headerSplit[1]+"}","")
		let header = headerSplit[0]
		id = headerSplit[1]

		console.log(symbol)
		switch (symbol) {
			//Headings - Parsed.
			case "#":
				out += "{\"elementType\":\"h1\",\"innerText\": \""+header+"\"},"
				break;
			case "##":
				out += "{\"elementType\":\"h1\",\"innerText\": \""+header+"\"},"
				break;
			case "###":
				out += "{\"elementType\":\"h1\",\"innerText\": \""+header+"\"},"
				break;
			case "####":
				out += "{\"elementType\":\"h1\",\"innerText\": \""+header+"\"},"
				break;
			case "#####":
				out += "{\"elementType\":\"h1\",\"innerText\": \""+header+"\"},"
				break;
			case "######":
				out += "{\"elementType\":\"h1\",\"innerText\": \""+header+"\"},"
				break;

			//Unordered Lists - Nesting.
				//+ Sub-lists are made by indenting 2 spaces:
				//  - Marker character change forces new list start
			case "+":
			case "-":
			case "*":
				out += parseBlock(block.replace(/\-[ ]/g,"").replace(/\+[ ]/g,"").replace(/\*[ ]/g,""),"","ul","","li")
				break;

/*
				if (tabLevel == 0) { 
					listIDs[listIDs.length] = getRandomishString();
				}  else if (tabLevel > prevTabLevel) { 
					listIDs[listIDs.length] = getRandomishString();
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
				prevListItem = getRandomishString();
				out += "{\"elementParent\": \""+id+"\",\"elementType\":\"li\",\"innerText\": \""+innerText.replace(/- /,"")+"\",\"id\": \""+prevListItem+"\"},"
				break;
*/
				
			//Ordered Lists - Nesting.
			//Need to replace with regex, to match numbers of any length.
			case "0.": 
			case "1.":
			case "2.":
			case "3.":
			case "4.":
			case "5.":
			case "6.":
			case "7.":
			case "8.":
			case "9.":
				out += parseBlock(block,/[0-9]+[.][ ]/g,"ol","","li")
				break;
/*
//Ordered Lists
if (tabLevel == 0) { 
	listIDs[listIDs.length] = getRandomishString();
}  else if (tabLevel > prevTabLevel) { 
	listIDs[listIDs.length] = getRandomishString();
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
prevListItem = getRandomishString();
out += "{\"elementParent\": \""+id+"\",\"elementType\":\"li\",\"innerText\": \""+innerText.replace(/- /,"")+"\",\"id\": \""+prevListItem+"\"},"
*/

			default: //Fall out of the symbol replacement system and into a RegExp replacement system. 
				if (symbol.match(/^\s*([-]+\s*){3,}\s*$/g)) {//horizontal row - Unparsed.
					out += "{\"elementType\":\"hr\"},"
					
				} else if (block.substr(0,4) == "http") {//Needs to be moved back to inline at some point.
					//Drop your load in the road! Leave a URL anywhere to have the page eventually load and display that data.
					out += "{\"httpPassthrough\": \""+block.replace(/\n/g,"")+"\"},"
					
				} else if (symbol.match(/(>+\s*){1,}/g)) {//blockquote - Nesting.
					out += parseBlock(block.replace(/^>[ ]/g,"").replace(/\n>[ ]/g,"\n"),"","blockquote","","")
					
				} else if (symbol.match(/([|]\s*\S+\s*){1,}/g)) {//Tables
					out += "{\"elementType\":\"table\",\"id\": \""+id+"\"},"
					let table = block
					let regex = /\n+.*\|\-{3,}.*\n+/g //The all-dashes line
					let Thead = table.split(regex)[0]
					let Tbody = table.split(regex)[1]
					let Tdata = table.match(regex) //Justification data
					//Use text-align: left; text-align: right; text-align: center;
					//Introduce other styling? Like with === instead of ---?

					let TheadId = getRandomishString();
					let TbodyId = getRandomishString();
					out += "{\"elementParent\": \""+id+"\",\"elementType\":\"thead\",\"id\": \""+TheadId+"\"},"
					out += "{\"elementParent\": \""+id+"\",\"elementType\":\"tbody\",\"id\": \""+TbodyId+"\"},"

					for (line of Thead.split("\n")) {
						let TRID = getRandomishString();
						out += "{\"elementParent\": \""+TheadId+"\",\"elementType\":\"tr\",\"id\": \""+TRID+"\"},"
						for (data of line.split("\|")) {
							if (data){
								out += "{\"elementParent\": \""+TRID+"\",\"elementType\":\"th\",\"innerText\": \""+data+"\"},"
							}
						}
					}
					for (line of Tbody.split("\n")) {
						let TRID = getRandomishString();
						out += "{\"elementParent\": \""+TbodyId+"\",\"elementType\":\"tr\",\"id\": \""+TRID+"\"},"
						for (data of line.split("\|")) {
							if (data){
								out += "{\"elementParent\": \""+TRID+"\",\"elementType\":\"td\",\"innerText\": \""+data+"\"},"
							}
						}
					}
					
				} else if (block.substr(0,3).match(/[:]{3}/g)) {//Div block - Nesting.
					/* Div definition
					:::elementClass1 elementClass2 elementType#id .elementClass3 .elementClass4 .elementClass5
					innerText
					:::{onClick_or_onChange_put_JS_here}
					*/

					//let leadingDelineator = topSplit.split("\{")
					let elementClass = topLine.replace(elementHash+" ","") //Needs to snip leading delineator
					let trailingDelineator = botSplit.split("\{")
					let onSomething = botSplit.replace(trailingDelineator[0],"").replace(/\}$/,"")

					if (topLine.match("#")){
						id = topLine.split("#")[1].split(" ")[0]
						if (id.match(":")){
							id = id.split(":")[0]
						}
					} 
					elementClass = topLine.replaceAll("#"+id,"").replaceAll(elementType,"").replaceAll("\.","")
					innerText = JSON.stringify(block.replace(inSplit[0]+"\n","").replace("\n"+inSplit[inSplit.length -1],""))
					let onClick = ""
					if (botLine.match("\{")){
						onClick = botLine.replace(/^{/g,"").replace(/\}$/g,"")
					}
					out += "{\"elementType\":\""+elementType+"\",\"elementClass\":\""+elementClass+"\",\"innerText\":"+innerText+",\"onClick\":\""+onClick+"\",\"id\": \""+id+"\"},"


				} else if (block.substr(0,4).match(/[ ]{4}/g) || block.substr(0,3).match(/[```]{3}/g) || block.substr(0,3).match(/[~]{3}/g)) {//Code block - don't process anything.
					out += parseBlock(block.replace(/^[ ]{4}/g,"").replace(/\n[ ]{4}/g,"\n"),"","pre",elementClass,"code")
				break;
					




				} else if (block.substr(0,5).match(/^-[ ]\[[X ]\]/g)) {//Task List block - Nesting.
					//This is an unordered list with a bunch of CSS: 
					//https://www.w3schools.com/howto/howto_js_todolist.asp
					out += parseBlock(block,/^-[ ]\[[X ]\]/g,"ul",elementClass,"li")


				} else if (block.match(/^.+\n:[ ]/g)) {//Definition List block - Parsed.
					//This is an unordered list with a bunch of CSS: 
					//https://www.w3schools.com/howto/howto_js_todolist.asp
					out += parseBlock(block,/:[ ]/g,"dl",elementClass,"dd")



				} else {//Return everything else as a paragraph.
					out += parseInline(block)
				};//end if symbol
				break;
		};//end switch symbol
	};//end for block

	out = '['+out.replace(/[,]$/,"")+']'
	return out;
}

function parseBlock(block,regex="",outerType="",outerClass="",innerType="",regexReplace="") {
	let out = ""
	let id = getRandomishString();
	
	out += "{\"elementType\":\""+outerType+"\",\"elementClass\":\""+outerClass+"\",\"id\": \""+id+"\"},"
	for (line of block.replace(regex,regexReplace).split("\n")) {
		out += "{\"elementParent\": \""+id+"\",\"elementType\":\""+innerType+"\",\"innerText\": \""+line+"\"},"
	}
	return out;
}

//Set up regexes for token+text, because these sections have to start with a nonspace letter or number, and have to end with the same. So can be regex'd.
let tokenData = {
"de":{"regex":/\~{2}/,"elementType":"del"},
"in":{"regex":/\+{2}/,"elementType":"ins"},
"ma":{"regex":/\={2}/,"elementType":"mark"},
"sa":{"regex":/\*{2}/,"elementType":"strong"},
"su":{"regex":/\_{2}/,"elementType":"strong"},
"a2":{"regex":/\</,"elementType":"a"},
"a3":{"regex":/\>/,"elementType":"a"},
"ab":{"regex":/\*\[/,"elementType":"a"},
"an":{"regex":/[ ]\[/,"elementType":"a"},
"co":{"regex":/\`/,"elementType":"code"},
"ea":{"regex":/\*/,"elementType":"em"},
"eu":{"regex":/\_/,"elementType":"em"},
"fi":{"regex":/\^\[/,"elementType":"a"},
"fo":{"regex":/\[\^/,"elementType":"a"},
"im":{"regex":/\!\[/,"elementType":"img"},
"q1":{"regex":/\]\s*\(/,"elementType":"a"},
"q2":{"regex":/"\)/,"elementType":"a"},
"q4":{"regex":/\]\s*\[/,"elementType":"a"},
"q5":{"regex":/\]/,"elementType":"a"},
"q6":{"regex":/[ ]\[/,"elementType":"a"},
"q7":{"regex":/\]\s*\:\s*/,"elementType":"a"},
"sb":{"regex":/\~/,"elementType":"sub"},
"sp":{"regex":/\^/,"elementType":"sup"},
}

//Instead of foreaching across tokens, need to foreach across token occurrence in the string. So tokens need to have identical beginnings.
//Hashes toward the token.
let tokenSplitter = "%%%%%%"
let tokenStart = "$$$"+tokenSplitter+"###"
let tokenEnd = "###"+tokenSplitter+"$$$"
//Bracket defined objects are just like other inline objects, but have a weird closing tag, and numerous internal tags to define different object data. 

function replaceSymbols(text) {
	//Have to split out inline code first so the contents don't get parsed.
	for (key of getKeys(tokenData)) {
		//for (index in tokenData.length) {
		let regex = new RegExp(tokenData[key].regex,"g")
		//console.log(regex)
		text = text.replace(regex,tokenStart+key+tokenEnd)//code - Unparsed.
	}
	return text
}

//let text = "Site *frames* are a way to fully isolate site **data** from the HTML bootstrap. A site frame is meant to hold a small amount of JS and other 'connective tissue' to ~~support~~ ++describe++ a site, as it ==calls== **data** from near and far. This is enabled through the new URL replacement feature:"
//convertJmlToElements("content",JSON.parse("["+parseInline(text)+"]"))
function parseInline(text,elementType="p"){
	let split = new RegExp(tokenSplitter)
	let id = getRandomishString();
	blockSplit = replaceSymbols(text).split(split)
	block = "{\"elementType\":\""+elementType+"\",\"innerText\":\""+blockSplit[0].replace(/^\$\$/,"").replace(/\$\$$/,"")+"\",\"id\": \""+id+"\"},"
	for (let b = 1; b < blockSplit.length -1; b+=4) {
		
	//t2.match(/\]\(\S*\)/)
	//t3.match(/\S*\)/)
	//t3.split(/\S*\)/)

        //console.log(block)
		elementType = tokenData[blockSplit[b].replace(/#/g,"")].elementType //Reuse the variable by clobbering the extant data.
		let innerText = blockSplit[b+1].replace(/^\$\$/,"").replace(/\$\$$/,"")
		//let elementType = blockSplit[b+2]
		let spanText = blockSplit[b+3].replace(/^\$\$/,"").replace(/\$\$$/,"")
		
		if (elementType == "a") {
			let href = spanText.match(/\S*\)/)[0].replace(/\)$/,"")
			spanText = spanText.split(/\S*\)/)[1]
			block += "{\"elementParent\": \""+id+"\",\"elementType\":\""+elementType+"\",\"innerText\":\" "+innerText+"\",\"href\": \""+href+"\"},"
		} else {
			block += "{\"elementParent\": \""+id+"\",\"elementType\":\""+elementType+"\",\"innerText\": \""+innerText+"\"},"
		}
		if (spanText) {
			block += "{\"elementParent\": \""+id+"\",\"elementType\":\"span\",\"innerText\": \"" +spanText +"\"},"
		}; //end if endTxt
	}
	return block;
}
//[innerText](http://website.com/)
//[innerText](/local/reference/)

/*
[innerText](href "attributeAction*") - Inline

[innerText][id] - Direct
[id]: href "attributeAction*"

[innerText] - Indirect
[innerText]: href "attributeAction*"

*Needs "attributeTitle":"Title"
*/

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

//Supporting functions
//Have PathName area, to put file URL, and if it doesn't come from there, error. As an optional security check. 
//Add the reloadEvery duration in seconds following a colon following an HTTP passthru. Needs to be built into the script feeding convertWebElement and convertWebElement itself, as well as webRequest or a wrapper as a timer.

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
						window.localStorage[$URI+":offlineCacheDuration"] = (offlineCacheDuration * 1000) + Date.now();
						console.log("Caching "+$URI+" for "+((window.localStorage[$URI+":onlineCacheDuration"]-Date.now())/1000)+" seconds.")
					} else if (onlineCacheDuration <= 0) {
						window.localStorage[$URI] = null;
						window.localStorage[$URI+":onlineCacheDuration"] = Date.now();
						console.log("Invalidating "+$URI)
					}; //end if onlineCacheDuration
					$callback(returnVar,$status);
				}; // end xhRequest.readyState
			} else if (($status.toString().substr(0,1) == "4" || $status.toString().substr(0,1) == "5") && window.localStorage[$URI] && Date.now() < window.localStorage[$URI+":offlineCacheDuration"] && n==0) { //&&
				console.log("Page "+$URI+" offline. Serving cached copy.")
				$status = "304";
				returnVar = window.localStorage[$URI];
				$callback(returnVar,$status);
				n = (n*1) + 1;
			} else if (n==0) {
				$callback(" Error: "+xhRequest.statusText,$status);
			}; // end if $status
		} catch(e) {console.log(e)}; // end try - This try catch captures errors within the callback too.
	}; // end xhRequest.onreadystatechange
	xhRequest.send($file);
}; // end webRequest

function getRandomishString() {
	return Math.random().toString(36).slice(-20).replace("0.","");
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

