//Author: Stephen Gillie
//Created: 8/14/2022
//Updated: 8/14/2022
//Notes: Add all 3 of the following lines to your index.html. The calculator should show up at the bottom of the page.
//<script src="https://www.Sparational.com/Sparational.js"></script>
//<script src='https://www.Sparational.com/sitelets/rgb.js'></script>
//<script>buildRgbSitelet('body');</script>

function buildRgbSitelet(parentElement) {
	$inputClasses = "img-rounded col-md-12 col-xs-12 "
	$inputStyles = "font-size: 4vw; width: 50vw;"
	//addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)	
	addElement(parentElement,"","","","container img-rounded","","","","","","","rgbSiteletWrapper")
	addElement('rgbSiteletWrapper',"","","","img-rounded col-md-3 hidden-xs","","","","","","","rgbSiteletspacer")
	addElement('rgbSiteletWrapper',"","","","img-rounded col-md-6 col-xs-12","","","","","","","rgbSiteletCalc")

	addElement('rgbSiteletCalc',"RGB Calculator","contentTitles img-rounded ","",$inputStyles,"","","","","","","rgbSiteletCalcLabel")
	var rgbSiteletCalcArea = addElement('rgbSiteletCalc')

	var rgbSiteletHtmlRow = addElement(rgbSiteletCalcArea)
	addElement(rgbSiteletHtmlRow,"",$inputClasses,"input","color: #000;"+$inputStyles,"","updateRgbColor()","","","maxlength",  "7","rgbSiteletHtmlInput")

	var rgbSiteletRedRow = addElement(rgbSiteletCalcArea)
	addElement(rgbSiteletRedRow,171,$inputClasses,"input","color: #fff;"+$inputStyles,"","updateRgbDivColor('rgbSiteletRedInput');","","","type","number","rgbSiteletRedInput")

	addElement(rgbSiteletCalcArea,"","","","","","","","","","","rgbSiteletGreenRow")
	addElement('rgbSiteletGreenRow',205,$inputClasses,"input","color: #fff;"+$inputStyles,"","updateRgbDivColor('rgbSiteletGreenInput');","","","type","number","rgbSiteletGreenInput")	
	
	addElement(rgbSiteletCalcArea,"","","","","","","","","","","rgbSiteletBlueRow")
	addElement('rgbSiteletBlueRow',239,$inputClasses,"input","color: #fff;"+$inputStyles,"","updateRgbDivColor('rgbSiteletBlueInput');","","","type","number","rgbSiteletBlueInput")
	
	updateRgbDivColor('rgbSiteletRedInput');
	updateRgbDivColor('rgbSiteletGreenInput');
	updateRgbDivColor('rgbSiteletBlueInput');
}; // end addPage

function updateRgbColor() { 
	
	$hex = hexToRgb(readElement("rgbSiteletHtmlInput"));
	writeElement("rgbSiteletRedInput",$hex.r);
	writeElement("rgbSiteletGreenInput",$hex.g);
	writeElement("rgbSiteletBlueInput",$hex.b);
	
	document.getElementById("contentLabel").style.backgroundColor
	= readElement("rgbSiteletHtmlInput");
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
		case "rgbSiteletRedInput": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color,$Color2,$Color2
			); // end document.getElementById
		break;
		case "rgbSiteletGreenInput": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color,$Color2
			); // end document.getElementById
		break;
		case "rgbSiteletBlueInput": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color2,$Color
			); // end document.getElementById
		break;
	}; // end switch divColor

	writeElement("rgbSiteletHtmlInput",rgbToHex(
		getNumberFromDiv("rgbSiteletRedInput"),
		getNumberFromDiv("rgbSiteletGreenInput"),
		getNumberFromDiv("rgbSiteletBlueInput")
	));
	
	document.getElementById("rgbSiteletCalcLabel").style.backgroundColor = readElement("rgbSiteletHtmlInput");

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
	
