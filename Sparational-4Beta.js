//Copyright 2013-2023 Gilgamech Technologies
//SPArational.js v4.-7.0 - Make faster websites faster.
//Author: Stephen Gillie
//Created on: 8/3/2022
//Last updated: 12/1/2023
//Version history:
//4.-7.0 Add localStorage caching for webRequest.
//4.-8.0: Add beta channel for testing without disrupting sites. 
//3.23.3: Readd SPA rewrite section. 
//Notes:

/* Roadmap (subject to rearranging):
//4.-7.0 Add localStorage caching for webRequest, and indefinite 404 cache fallback for best offline service. Prepend with "Data source offline. Using cached data from (formatted date/time):"
//4.-6.0 Add reloadEvery parameter to webRequest, have it run on a timer, and have it use the indefinite fallback. Or maybe this should be a separate function? But make some way for automatic data reload. And add like colon-time detection after an anchor? Or require semantic tag?
//4.-5.0 finish convertMdToSpa HTTP passthrough
//4.-4.0 finish convertMdToSpa Markdown parsing
//4.-3.0 finish convertMdToSpa Semantic Markdown parsing
//4.-2.0 finish convertYamlToJson.
//4.-1.0 finish YAML SPA detection. 
//4.-0.0 finish direct-JSON display.
//4.0.0 Boom Clap
*/

//Depreciate the JML SPA file format for YAML - keep all the support but don't talk about it - if someone asks about JML or JSON, talk about YAML support and direct-JSON display. 
//- Convert all SPA to Semantic Markdown where possible, and YAML where not.
//- Change the SPA format from Json to Yaml.

/* # How to set up your own notes site: 
1. Already have both an AWS account and a GitHub account.
1. Create a new repo, S3 bucket, CloudFront distribution, IAM account, and DNS domain. 
1. Set up your domain in Route53, and have ACM automatically generate SSL certificates for it.
1. Configure the S3 bucket to redirect all 404s and error pages back to index.html.
1. Configure the CloudFront distribution to serve your S3 bucket to your domain. Have it use the auto-rotating SSL cert from ACM.
1. Add the S3 bucket's name, CloudFront distribution ID, and IAM account access key and secret key into the repo's environment variables. You will need to rotate keys like 4 times a year. 
1. Clone the repo locally (init with README.md) to your PC.
1. Copy index.html, footer.spa, and .github.yml to your new repo. 
1. Update footer.spa with your copyright and update index.html to point at it.
1. Add your content  in Markdown format. Remember to add a menu.md with your site layout. Add CSS files to style your content as you like.
1. Commit and push, wait for the build to complete, and start sending traffic to your beautiful website.
1. Repeat previous 2 steps whenever you like. All you need is love.
This system is funded by using the plot from Office Space and also Superman 2: it's so efficient that its costs are a rounding error. It would cost them more to bill you than they would get. Free tier:
- 5 GB storage
- 1 TB CDN data
  - 100 GB from S3 to CDN
- 10M HTTP requests from CDN
  - 20k from S3 to CDN
*/

/*Sparational 4.0 - Boom Clap
It's in the name - rational single page applications.
Floats like a microservice, stings like a monolith, and dodges like a cloud.
Anyone can make the simple complicated. Simplifying the complicated takes real creativity. 

Data formats: 
  - Debate adding PathName security feature.
jmlVersion 30OCT2023
SPA-YAML-Version: 30OCT2023
Semantic Markdown 
- with TildeBox 
~[semanticTag:id](inner text)~//optional onclick or onchange JS code.~

~[input:inputId](1) ~[button](+1)~writeElement('inputId',readElement('inputId'+1))~



- HTML stub should be like 12 lines: Doctype, HTML, Head, maybe a couple of meta elements, Sparational call, CWE, end Head, Body, Content div, end Content div, end Body, end HTML. 
  - PageFrames to do the heavy lifting between bootstrap and data. Bootstrap HTML -> Page Frame -> Menu, data, and footer
Secrets Storage? Like storing an API key somewhere that other sites can't read it. Is this what cookies are for?
- Not just loads data from arbitrary sources, but can refresh that data every x seconds. 
- YAML is just JSON without punctuation.

Depreciations:  ("Most" of these should goto Gilgamech.js or another site-specific file like cryptography.js)
- webRequestAsync
- rwjs2
- colorifyWords
- colorifyMultipleWords
- Depreciating page classes. All pages are sitelets.
  - Sitelets are data described in either SPA or another supported data language, that's rendered by the one page engine. Some are designed to be full page and might look funny within another, and some might be partial page and look funny as full page.
- Lose all of the dollar signs in parameter names.
- Depreciating most hybrid use cases. There are SPA sites - sitelets and some call sitelets, and there are HTML sites that call sitelets. 
- 

Modifications:
- Simplify linking to another section: "onClick": "rebuildElement('content');cje2('content',sites.pages.info.elements);", (Need to know that the page JS stores the page data in 'sites'.)
- If no data source is specified, it defaults to looking for an index.spa/.yaml/.md/.jupyter in the root.
- Spaconfig as a text file or section with config info.
	- SPA files would have a spaconfig section off the main variable.
	- Other data sources would have a separate .spaconfig (schema) file whose contents or location are defined in the same call as the data source.
- Fix the 0. at the beginning of getBadPW.	
- All sitelets have to have their main page elements at $_.pages.main.elements. Additional pages can be described elsewhere under $_.pages
- Lowercase the \Sites\ folder.
- In webRequest, move Verb later in the parameters, to use the defautlt "Get".
Should we add like previousElement as a wildcard, like parentElement? Should these have a dollar sign or percent in front?
- Rename getBadPW
- Uri not URL
- Rename functions from "ToSpa" to "SpaToJml" as a better description of what they do.

Additions: 
- Starting anything with HTTP:// will load whatever's there. 
  - Sitelets can be called simply by declaring their URL. As we simply declare a location using '$_' for local replacement, like "$_.sections.titleBanner" - so too should we be able to just say "https://www.Gilgamech.com/sitelets/menu.yml" and have the page engine (CYE/CME/CJE) call and render this location.
	- This will need a new function CWE that will take a parentElement and a URL, and whenever the URL loads it tries to CJE the contents. 
	- Sitelets can't load themselves or they would cause a loop. 
	- Have SiteletUrl area, to put sitelet URL, and if it doesn't come from there, error. As a security check. 
- Support for:
	- InfoGrid pages (Some kind of JSON - we already have this or we'd depreciate. Might depreciate later anyway.)
	- Markdown files (CME)
	- YAML files (CYE)
		- on 2 spaces before the dash, nest under an intermediate UL. parentElement = addElement(parentElement,"","ul")
	- Jupyter files (CJE)
- Adding more monitoring and alerting systems. 
- Add auto-menu feature based on directory listing.
- JML specs to documentation
- Rename JML to SPA
- webRequest auto-caching to prevent timeouts?

 What does serverless monitoring look like? (What about network, DNS, CDN, etc?)
- Test
	- QA (Developer manually reviews code changes in local file before committing.)
	- Unit (link tests, unused parent elements - "parent enumerated but not childed", not adhering to jmlVersion spec, )
	- Regression (Selenium? Maybe write a testing system?)
	- Performance (Lighthouse etc?)
	- UAT (Developer manually reviews code changes in public site after CI/CD.)
- Release
	- Alerting: Receive real-time notifications about critical events or anomalies.
		- checkAllLinksOnPage
		- Network outage for different page parts. 
		- Verbose page errors
		- Should the page write back to a bucket or other location with an emergency code, which could fire a phone alert? How to prevent false calls? (Or is this something that should be too light to bother?)
		- CORS rules for library sites.
	- Integration: Seamlessly connect and exchange data between different systems or tools.
		- How many different tools or systems? 
	- Collection: Gather information from diverse sources to enhance decision-making.
		- Get S3 logging data? 
		- Get data from user devices? Needs user opt-in and privacy policy.
			- Exfiltration/write?
			- CDN logs instead?
	- Storage: Safely store and manage data for future analysis and reference.
		- Public S3 bucket or similar.
	- Analysis: Extract valuable insights from data to drive informed actions.
		(S3 logs and analytics, network causes and issues)
	- Visualization: Present data in a visually comprehensible format for better understanding.
		(Page loads from different regions? )
	- Reporting and Compliance: Generate reports and ensure adherence to regulatory standards.
		(Verify page loads against ad network, maybe SSL or other reporting?)
		Feature Use Telemetry


Sales points:
Hosting:
- Lightning fast network and framework. Not physically possible to be faster without being in the same room. 
- Simplest way to construct websites. Not physically possible to be easier without being psychic. 
- Cheapest way to host websites. Sign up now for 1 million free page loads per month!


Framework:
- Entirely synchronous (except webRequest calls) 

*/

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
	cje2(newElement[0].elementParent,newElement);
}

//Multisite tools
function convertWebElement(parentElement,URL,frameJml){
    //frameJml is JML injected into the frame.
	webRequest("Get",URL,function(callback){
		let urlParts = URL.split(".");
		let extension = urlParts[urlParts.length -1];
		switch (extension) {
			case "spa": 
				let parsedRewrite = ""
				if (frameJml) {
					let parsedPage = JSON.parse(callback)
					let parsedFrame = JSON.parse(frameJml)
					parsedPage.frame = []
					for (key of getKeys(parsedFrame)) {
						//Quick and dirty way to copy one sub-variable to the other.
						cmd = "parsedPage.frame."+key+"= parsedFrame."+key; 
						console.log(cmd); 
						eval(cmd)
					}
					parsedRewrite = rewriteJson(rewriteJson(parsedPage,parsedPage),parsedPage)
				} else {
					parsedRewrite = rewriteJson(JSON.parse(callback))
				}
				cje2(parentElement,parsedRewrite.pages.main.elements)
				break;
			case "csv": 
				convertMdArrayToTable(parentElement,"",eval(convertCsvToMdArray(callback)))
				break;
			case "md": 
				//console.log(parentElement)
				cje2(parentElement,rewriteJson(JSON.parse(convertMdToSpa(callback)).pages.main.elements))
				break;
			case "yaml": 
				cje2(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": [{\"elementParent\": \"parentElement\",\"innerText\":\"Other page types not yet supported.\"}]}}}').pages.main.elements))
				//cje2(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": ['+convertYamlToSpa(callback).replace(/[,]$/,"")+']}}}').pages.main.elements))
				break;
			default:
				cje2(parentElement,rewriteJson(JSON.parse('{\"jmlVersion\": \"30OCT2023\",\"pages\": {\"main\": {\"elements\": [{\"elementParent\": \"parentElement\",\"innerText\":\"Other page types not yet supported.\"}]}}}').pages.main.elements))
				break;
		}
	},"","",30)
};
//convertWebElement can take MDArray and output a table. What would be the extension on that?

//Format transformations
function rewriteJson(data,baseData) {
	let n = 0;
	//Rewrite data - Works on any JSON, not just SPA files.
	for(element in data){
	//console.log(data[element])

		if (typeof data[element] === "string") {
			if (data[element].substr(0,2) == "$_") {//Replace-o-rama! Full SPA pages - now in JML or YAML - can support $_ "dollarsign-underscore" variable replacement from anywhere within the document.
				//console.log(eval(data[element].replace("$_","baseData")))
				//try{ console.log("bd: "+JSON.stringify(baseData))}catch{}
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

function cje2(parentElement,elements) {
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
				//Split each | If above the ' ----' row it's a TH and below it's TD.
				//Wrap each line in TR tags.
				//THEAD wrapped in THEAD tags and body wrapped in TBODY tags
				//Wrap whole thing in Table tags
			break;
			default:
				out += "{\"elementParent\": \""+elementParent+"\",\"elementType\":\"p\",\"innerText\": \""+line+"\"},"
				break;
		}; //end switch firstChar
		prevTabLevel = tabLevel
		
		//Semantic Tags
//~[input:inputId](Placeholder)
//~[button:buttonId](+1)~writeElement('inputId',readElement('inputId'+1))~
			//This system splits out by JML, selects the last one, parses. 
			let outSplit = out.split("},{")
			outSplit = outSplit[outSplit.length -1]
			if (!(outSplit.match("^{"))) {outSplit = "{"+outSplit}
			//console.log("outSplit: "+outSplit)
			let element = JSON.parse(outSplit.toString().replace(/},$/,"}"))
			//Takes the innerText value, and matches then splits from the same regex
			//~[button:buttonId](+1)~writeElement('inputId',readElement('inputId'+1))~
			let tilde = element.innerText.split(/~/g) 
			//'',[button:buttonId](+1), writeElement('inputId',readElement('inputId'+1)),''
			//tilde[1] = ID section
			//tilde[2] = onClick
			//"~"+tilde[1]+"~"+tilde[2]+"~"
			let tildeReplace = "~"+tilde[1]+"~"+tilde[2]+"~"
			
			for (txt of element.innerText.split(/~\[/g)) {
				//button:buttonId](+1)~writeElement('inputId',readElement('inputId'+1))~
					if (txt.includes("](")) {
						//button:buttonId](+1, writeElement('inputId',readElement('inputId'+1))~
						txtSplit = txt.split(/\)~/g)[0]
						//button:buttonId](+1
						//writeElement('inputId',readElement('inputId'+1))"
						
						txt0 = txtSplit.split(/\]\(/)
						//button:buttonId
						//+1
						
						//elementType = button
						let elementType = txt0[0].split(":")[0]
						//elementId = buttonId
						let elementId = txt0[0].split(":")[1]
						//innerText = +1
						let innerText = txt0[1]
						//onClick = writeElement('inputId',readElement('inputId'+1))
						let onClick = tilde[2]
						//Generates an ID if none. 
						if (element.id == null) {element.id = getBadPW()}
						
						//Replaces the innerText and linkText with the ID and re-caps. 
						console.log(txt)
						out = out.replace(tildeReplace,"").replace(/~},$/,'","id":"'+element.id+'"},')
						
//~[button:buttonId](+1)"writeElement('inputId',readElement('inputId'+1))"
						
						//Encapsulates innerText then linkText with JML.  
						out += "{\"elementParent\": \""+element.id+"\",\"elementType\":\""+elementType+"\",\"innerText\": \""+innerText +"\",\"onClick\": \""+onClick +"\",\"id\":\""+elementId +"\"},"
						
						//Reattach the trailing text. 
						let endTxt = txt[txt.indexOf(tildeReplace)+1]
						if (endTxt) {
							out += "{\"elementParent\": \""+element.id+"\",\"elementType\":\"span\",\"innerText\": \"" +endTxt +"\"},"
						}; //end if endTxt
					}; //end if txt
			}; //end for txt
			
		//Images
		//a.match(/!\[\S+\]\(\S+\)/g)
		// ![image](URL "alt text")
		
			//Links
			//This system splits out by JML, selects the last one, parses. 
			outSplit = out.split("},{")
			outSplit = outSplit[outSplit.length -1]
			if (!(outSplit.match("^{"))) {outSplit = "{"+outSplit}
			//console.log("outSplit: "+outSplit)
			element = JSON.parse(outSplit.toString().replace(/},$/,"}"))
			//Takes the innerText value, and matches then splits from the same regex
			for (txt of element.innerText.split(/\[/g)) {
					txtSplit = txt.split(/\)/g)
					for (tex of txtSplit) {
						if (tex.includes("](")) {
							let regex = /\]\(/
							txt0 = tex.split(regex)
							let innerText = txt0[0]
							let linkText = txt0[1]
							//Generates an ID if none. 
							if (element.id == null) {element.id = getBadPW()}

							//Replaces the innerText and linkText with the ID and re-caps. 
							out = out.replace("["+txt,"").replace(/"},$/,'","id":"'+element.id+'"},')
							
							//Encapsulates innerText then linkText with JML.  
							out += "{\"elementParent\": \""+element.id+"\",\"elementType\":\"a\",\"innerText\": \"" +innerText +'\",\"href\":\"' +linkText +"\"},"
							
							//Reattach the trailing text. 
							let endTxt = txtSplit[txtSplit.indexOf(tex)+1]
							if (endTxt) {
								out += "{\"elementParent\": \""+element.id+"\",\"elementType\":\"span\",\"innerText\": \"" +endTxt +"\"},"
							}; //end if endTxt
						}; //end if tex
					}; //end for tex
			}; //end for txt
			
/*//Effects  - need to regex and replace inline
case "**":
	//Replace needs to happen before the case above, to prevent these as being interpreted as bullets when they start a line. Also it needs to happen after, because it needs to read from before. So the Bold section needs to skip - difference between bold and bullet is a space between? Or maybe regex it and set a variable saying which? 
	
	innerText = innerText.replaceAll("**","")
	elementType = "strong"
	break;
case "*":
	innerText = innerText.replaceAll("*","")
	elementType = "i"
	break;
case "__":
	innerText = innerText.replaceAll("__","")
	elementType = "stsrong"
	break;
case "_":
	innerText = innerText.replaceAll("_","")
	elementType = "i"
	break;
case "~~":
	innerText = innerText.replaceAll("~~","")
	elementType = "strike"
	break;
//Code
case "`":
	elementType = "code"
	break;
	


## 
Like links, Images also have a footnote style syntax
![Alt text][id]
[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)
Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
Shortcuts (emoticons): :-) :-( 8-) ;)

Superscript 19^th^
Subscript H~2~O
++Inserted text++
==Marked text==
Footnote 1 link[^first].
Footnote 2 link[^second].
Inline footnote^[Text of inline footnote] definition.
Duplicated footnote reference[^second].
[^first]: Footnote **can have markup**
	and multiple paragraphs.
[^second]: Footnote text.

        }
*/

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
function webRequest($URI,$callback,$JSON,$verb="get",$file,$cached) {
//if now is smaller than duration, read from cache.
	if (window.localStorage[$URI] && Date.now() < window.localStorage[$URI+":duration"]) {
		console.log($URI+" cached for "+((window.localStorage[$URI+":duration"]-Date.now())/1000)+" more seconds.")
		$status = "304";
		returnVar = window.localStorage[$URI];
		$callback(returnVar,$status);
		return;
	}; //end if window.localStorage

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
						window.localStorage[$URI] = returnVar;
						window.localStorage[$URI+":duration"] = ($cached * 1000) + Date.now();
						console.log("Caching "+$URI+" for "+((window.localStorage[$URI+":duration"]-Date.now())/1000)+" more seconds.")
					} else if ($cached = 0) {
						window.localStorage[$URI] = null;
						window.localStorage[$URI+":duration"] = Date.now();
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

