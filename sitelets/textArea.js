//Text area
//Author: Stephen Gillie
//Created: 8/20/2022 
//Updated: 8/20/2022
//Notes: 
//v1.0: Release with functional JSON linter.

//Get started: Add all 3 of the following lines to your index.html. The textarea should show up at the bottom of the page. The newTextAreaName is optional, allowing you to access the textarea contents from your own functions.
//<script src="https://www.Sparational.com/Sparational.js"></script>
//<script src='https://www.Sparational.com/sitelets/textArea.js'></script>
//<script>buildTextAreaSitelet('body');</script>

function buildTextAreaSitelet($parentElement,newTextAreaName) {
//rebuildElement($parentElement);
	var siteletWrapper = addElement($parentElement)
	//var textAreaWrapper = addElement(siteletWrapper)
	if (newTextAreaName == null) {newTextAreaName = getBadPW()}
	//addElement(textAreaWrapper,"1\n2\n3\n4\n5\n6\n7\n8\n9\n10","","","width:10px, height: 75vh;")
	addElement(siteletWrapper,'{"test":"pass"}',"","textarea","width: 90vw; height: 75vh;","","","","","","",newTextAreaName)
	addElement(siteletWrapper,"JSONLint","","button","","","","jsonLint('"+newTextAreaName+"','"+addElement(siteletWrapper)+"')")
}

function jsonLint(divName,errDiv) {
//Strings are wrapped in "" or ''
//Objects are wrapped in {}
//Arrays are wrapped in []
	
	try {
		var newItem = "";
		var replaceItem = JSON.stringify(JSON.parse(readElement(divName)))
			.replaceAll('"},{"','"},\n{"')
			.replaceAll('}}','}\n}')
			.replaceAll(']}',']\n}')
			.replaceAll('}]','}\n]')
			.replaceAll('{{','{\n{')
			.replaceAll('[{','[\n{')
			.replaceAll('{[','{\n[')
			.replaceAll('","','",\n"')
			.replaceAll('{"','{\n"')
			.replaceAll('"}','"\n}')
			.replaceAll('"},','"\n},\n')
			.replaceAll('},"','\n},\n"')
			.replaceAll('"],["','"],\n["')
			.replaceAll('","','",\n"')
			.replaceAll('["','[\n"')
			.replaceAll('"]','"\n]')
			.replaceAll('"],','"\n],\n')
			.replaceAll('],"','\n],\n"')
			.replaceAll('":"','": "')
			.replaceAll('\n\n','\n');
		var tabLevel = 0;
		for (let item of replaceItem.split("\n")) {
			if (item == "}" || item == "}," || item == "]," || item == "]"){tabLevel--};
			for (var tab = 0; tab < tabLevel; tab++) {
				newItem += "\t";
			}
			if (item.substring(item.length-1,item.length) == "{" || item.substring(item.length-1,item.length) == "["){tabLevel++};
			newItem += item+"\n";
		}
		writeElement(divName,newItem);
		writeElement(errDiv,"")
	} catch($err) {
		writeElement(errDiv,$err)
		$errLoc = $err.message.split(" in JSON at position ")[1];
		//appendElement(errDiv,$err+" - Text: "+findJsonErr($errLoc))
		//colorifyWords(errDiv,readElement(errDiv)[$errLoc],"red");
	};

}

function javaScriptLint(divName) {
	try {
		writeElement(divName,(readElement(divName)).replace(/"},{"/g,'"},\n{"').replace(/","/g,'",\n"').replace(/{"/g,'{\n"').replace(/"}/g,'"\n}').replace(/;/g,';\n'));
		writeElement("errDiv","")
	} catch($err) {
		$errLoc = $err.message.split("in JSON at position ")[1];
		colorifyDiv("errDiv",readElement("jmlTextArea")[$errLoc],"red");
		appendElement("errDiv",$err+" - Text: "+findJsonErr($errLoc))
	};
}

function findJsonErr($errLoc){
	var $outStr="";
	var $s = readElement(errDiv);
	for ($u=$errLoc-25;$u<($errLoc*1+25);$u++){
		$outStr +=$s.charAt($u)
	};
	return $outStr
};

