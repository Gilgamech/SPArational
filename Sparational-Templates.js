function buildGridPage(sites) {
	if (name == "") {
		for (let site of sites) {
			var outerHref = addElement("wrapper","","","a","",site.name);
			addElement(outerHref,site.name,('grid grid-item '+site.Type));
		}
	}
}

function buildInfoPage(currentSite) {
	addElement("wrapper","","grid-item "+currentSite.Type+"Page","","","","","","","","","innerWrapper");
	addElement("innerWrapper",name,"","h1","text-align: center");
	if (currentSite.useCase) {
		addElement("innerWrapper",currentSite.useCase,"","h3","text-align: center");
	}; //end if currentSite
	for (let key of getKeys(currentSite)) {
		if (currentSite[key] != "" && key != "name" && key != "useCase" && key != "video") {
			var outerPara = addElement("innerWrapper","","","p");
			var keyName = addElement(outerPara,key+": ","","strong");

			if (typeof currentSite[key] == "object") {
				if (key.substr(0,7) == "(table)") {
					writeElement(keyName,readElement(outerPara).replace("(table)",""));
					mdArrayToTable(outerPara,"",currentSite[key]);
				} else {
				var innerUL = addElement(outerPara,"","","ul");
				for (let note of currentSite[key]) {
					addElement(innerUL,note,"","li");
				}; //end if currentSite key
				}
			} else if (typeof currentSite[key] == "string") {
				if (currentSite[key].substr(0,4) == "http") {
					addElement(outerPara,key,"","a","",currentSite[key]);
				} else {
					addElement(outerPara,currentSite[key],"","span");
				}; //end if currentSite key
			} else {
			}; //end if key

		}; //end if currentSite
	}; //end for let key
	if (currentSite.video) {
		document.getElementById("innerWrapper").innerHTML += currentSite.video;
	}; //end if currentSite
}


