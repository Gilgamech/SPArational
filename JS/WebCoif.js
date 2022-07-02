//WebCoif
// A lttle JS hat for your web browser, so it can read JSON sites too.


var $WebcoifVer = 400;
var $website;
var $cachingVar;
var $pageSettingsJson;
var $timerInterval;

//buildElementRow('advancedPageDiv',$GilMain,'',getKeys($GilMain),'delPage');
function rebuildElement($elementId) {
	var $oldElement = document.getElementById($elementId);
	var $newElement = {};
	$newElement.elements = [];
	$newElement.elements[0] = {};
	$newElement.elements[0].id = $elementId
	if ($oldElement.parentNode.id) {$newElement.elements[0].elementParent = $oldElement.parentNode.id}else($newElement.elements[0].elementParent = "body");
	if ($oldElement.type) {$newElement.elements[0].elementType = $oldElement.type};
	if ($oldElement.class) {$newElement.elements[0].elementClass = $oldElement.class};
	//if ($oldElement.style) {$newElement.elements[0].elementStyle = $oldElement.style};
	//if ($oldElement.href) {$newElement.elements[0].href = $oldElement.href};
	//if ($oldElement.onchange) {$newElement.elements[0].onChange = $oldElement.onchange};
	//if ($oldElement.onclick) {$newElement.elements[0].onClick = $oldElement.onclick};
	//if ($oldElement.contentEditable) {$newElement.elements[0].contentEditable = $oldElement.contentEditable};

	console.log(JSON.stringify($newElement));
	removeElement($elementId)
	//cje($oldElement.parentNode,$newElement);
	cje($newElement.elements[0].elementParent,$newElement);
}

function addMenuItem($elementParent,$innerText,$onClick,$class,$href) {
	var $innerParent = getBadPW();
	var $parentType = getElementType($elementParent);
	var $elementType = "li"
	
	if ($elementParent == 'Div') {
		$elementType = "p"
	} else if ($elementParent == 'UList') {
		$elementType = "li"
	} else {
		$elementType = "li"
	}; // end if divParent
	
	var $innerParent = addElement($elementParent,"",$class,$elementType)
	addElement($innerParent,$innerText,$class,"a","",$href,"",$onClick)
}; // end addMenuItem	

// Page engine
function rbp($pageName) {
	try {
		removeElement("headWrapper");
		removeElement("NavDDWrapper");
		removeElement("bodyWrapper");
		removeElement("footWrapper");
		window.clearInterval($timerInterval);
		
		cje("body",$website.wrapperVar);
		cje("footWrapper",$website.pages.footer);
		
		if ($website.pages[$pageName]) {
			cje("bodyWrapper",$website.pages[$pageName]);
		} else {
			// Simple 404 page.
			cje("bodyWrapper",{elements:[{elementParent:"parentElement",innerText:"404 page not found"}]})
		}; // end if GilJSVersion

	} catch(e){
		console.log("webCoifErr: Err in rbp: " + e);
		//console.log("webCoifErr: Err in rbp: " + e);
	};
}; // end rbp

function rwjs3($jsonVar) {
	var $stringVar = JSON.stringify($jsonVar);
	var $gilThis = new RegExp("[$]_.", 'g');
	$stringVar = $stringVar.replace($gilThis,"$website.");
	$jsonVar = JSON.parse($stringVar);
	return $jsonVar;
}; // end cje

function rwjs($jsonVar) {
	if ($jsonVar) {
		try {
	var $stringVar = JSON.stringify($jsonVar);
	var $listVar = $stringVar.replace(/[^0-9A-Za-z\.\$\_\[\]]+/gi, " ").replace(/\s\s+/g, ' ').split(" ").filter( onlyUnique );
	$listVar.forEach(function($twoString){
		$twoString.replace(/\s\s+/g,' ').split(" ").forEach(function($eachString){
			if ($eachString.startsWith("$website.")) {
				var $rgxVar = new RegExp("\\" + $eachString,'g');
				var $replace = eval($eachString);
				$stringVar = $stringVar.replace($rgxVar,$replace);
			}; //end if eachString
		}); // end foreach twoString
	}); // end foreach listVar
		
	$jsonVar = JSON.parse($stringVar);
	return $jsonVar;
		} catch(e) { 
			console.log("webCoifErr: Err in rwjs: " + e);
		}; // end try
	}; // end if jsonVar
}; // end rwjs

window.onload = function(){
	$pageSettingsJson = readElement("pageSettingsJson")
	xhrRequest("GET",$pageSettingsJson,function(response) {
		removeElement("deleteme");
		$website = rwjs3(response);
		var $Gil2 = rwjs(rwjs($website));
		if ($Gil2) {$website = $Gil2}
		cje("head",$website.pages.header);
		cje("body",$website.pages.nav);
		rbp($website.startingPage);
	},"JSON"); // end xhrRequest
}; // end window.onload

		// Populate menu from pages.
		//getKeys($website.pages).forEach(function($element){
			//if ($website.pages[$element].pageTitle) {
				//addMenuItem("nav2ddc",$website.pages[$element].pageTitle,"rbp('" + $element + "');",$website.pages[$element].elementClass,$website.pages[$element].href);
			// }; // end if GilJSVersion
		// }); // end foreach jsonVar
