//Requires <script src="https://www.gilgamech.com/js/Sparational.js"></script> above this script in the HTML page.
//<script>addPage('divid');</script>

function buildRgbPage(parentElement) {
	$inputClasses = "img-rounded col-md-12 col-xs-12 "
	$inputStyles = "font-size: 4vw; width: 50vw;"
	//addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)	
	addElement(parentElement,"","","","container img-rounded","","","","","","","wrapper")
	addElement('wrapper',"","","","img-rounded col-md-3 hidden-xs","","","","","","","spacer")
	addElement('wrapper',"","","","img-rounded col-md-6 col-xs-12","","","","","","","RGBCalc")

	addElement('RGBCalc',"RGB Calculator","contentTitles img-rounded ","",$inputStyles,"","","","","","","RGBCalcLabel")
	addElement('RGBCalc',"","","","","","","","","","","calcArea")

	addElement('calcArea',"","","","","","","","","","","htmlColorRow")
	addElement('htmlColorRow',"",$inputClasses,"input","color: #000;"+$inputStyles,"","updateRgbColor()","","","maxlength",  "7","htmlRow")

	addElement('calcArea',"","","","","","","","","","","redCRow")
	addElement('redCRow',171,$inputClasses,"input","color: #fff;"+$inputStyles,"","updateRgbDivColor('redRow');","","","type","number","redRow")

	addElement('calcArea',"","","","","","","","","","","greenCRow")
	addElement('greenCRow',205,$inputClasses,"input","color: #fff;"+$inputStyles,"","updateRgbDivColor('greenRow');","","","type","number","greenRow")	
	
	addElement('calcArea',"","","","","","","","","","","blueCRow")
	addElement('blueCRow',239,$inputClasses,"input","color: #fff;"+$inputStyles,"","updateRgbDivColor('blueRow');","","","type","number","blueRow")
	
	updateRgbDivColor('redRow');
	updateRgbDivColor('greenRow');
	updateRgbDivColor('blueRow');
}; // end addPage

function updateRgbColor() { 
	
	$hex = hexToRgb(readElement("htmlRow"));
	writeElement("redRow",$hex.r);
	writeElement("greenRow",$hex.g);
	writeElement("blueRow",$hex.b);
	
	document.getElementById("contentLabel").style.backgroundColor
	= readElement("htmlRow");
}; // end updateRgbColor

function updateRgbDivColor($divId) { 
	var $colorRatio = .25;
	var $Color = getNumberFromDiv($divId);
	if ($Color < 0) {
		writeElement($divId,0);
		$Color = getNumberFromDiv($divId);
	}; // end if Color
	if ($Color > 255) {
		writeElement($divId,255);
		$Color = getNumberFromDiv($divId);
	}; // end if Color
	$Color2 = Math.round(($Color) * $colorRatio);
	
	switch ($divId) {
		case "redRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color,$Color2,$Color2
			); // end document.getElementById
		break;
		case "greenRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color,$Color2
			); // end document.getElementById
		break;
		case "blueRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color2,$Color
			); // end document.getElementById
		break;
	}; // end switch divColor

	writeElement("htmlRow",rgbToHex(
		getNumberFromDiv("redRow"),
		getNumberFromDiv("greenRow"),
		getNumberFromDiv("blueRow")
	));
	
	document.getElementById("RGBCalcLabel").style.backgroundColor = readElement("htmlRow");

}; // end updateRedDivColor

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};// end componentToHex

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};// end rgbToHex

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};// end hexToRgb
	
