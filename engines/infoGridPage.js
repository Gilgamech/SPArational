//InfoGrid Page Engine
//Author: Stephen Gillie
//Created: 8/08/2022
//Updated: 8/25/2022
//Notes: 
//v1.0 - Release.
//v1.1 - Reunite into one engine.
//v1.2 - Set tables to auto overflow, so they scroll sideways on narrow browsers.
//v1.3 - Move wrapper and innerWrapper elements from static IDs to variable IDs. Clean up closing brace end tags.

//Data-driven page engine allows creating hundreds of website pages from a few standard website files.
//Data file is an array of sets of key-value pairs. 
//Grid Page is a grid of sets from the Data file. If the "name" value is set, that value is used as the name in the grid cell, as the /path that loads the Info Page for that set, and as the h1 header of the Info Page.
//Info Page is one large grid, with the set's "name" value as h1, "useCase" as an info line, any "video" links embedded at bottom of page, and remaining keys splayed out between. Links are masked for easier display, and arrays are converted into lists. Use the (table) flag at the start of a key to turn the value's multidimensional array into an HTML table.
//Automatic routing - The Grid Page displays as the root of the domain, and the Info Page on every path off the root, based on the window location pathname. Just set your webserver, storage host, or CDN to respond with the index.html on every error, and to reply to errors with a 200 OK where possible. 

//Get started: Add all 3 of the following lines to your index.html. The info grid page should show up at the bottom of the page.
//<script src="https://www.Sparational.com/Sparational.js"></script>
//<script src='https://www.Sparational.com/engines/infoGridPage.js'></script>
//<script>buildInfoGridPage('body',siteName,siteData);</script>

function buildInfoGridPage(parentElement,name,sites) {
	addElement(parentElement,"","","br");
	var wrapper = addElement(parentElement,"","grid-container");
	if (name == "") {
		for (let site of sites) {
			var outerHref = addElement(wrapper,"","","a","",site.name);
			addElement(outerHref,site.name,('grid grid-item '+site.Type));
		}; //end for let site
	} else {
		var currentSite;
		for (let site of sites) {
			if (site.name == name) {
				currentSite = site;
			}; //end if site name
		}; //end for let site

		var innerWrapper = addElement(wrapper,"","grid-item "+currentSite.Type+"Page");
		addElement(innerWrapper,currentSite.name,"","h1","text-align: center");
		if (currentSite.useCase) {
			addElement(innerWrapper,currentSite.useCase,"","h3","text-align: center");
		}; //end if currentSite
		for (let key of getKeys(currentSite)) {
			if (currentSite[key] != "" && key != "name" && key != "useCase" && key != "video") {
				var outerPara = addElement(innerWrapper,"","","p","overflow: auto;");
				var keyName = addElement(outerPara,key+": ","","strong");

				if (typeof currentSite[key] == "object") {
					if (key.substr(0,7) == "(table)") {
						writeElement(keyName,readElement(keyName).replace("(table)",""));
						mdArrayToTable(outerPara,"",currentSite[key]);
					} else {
					var innerUL = addElement(outerPara,"","","ul");
						for (let note of currentSite[key]) {
							addElement(innerUL,note,"","li");
						}; //end for let note
					}; //end if key substr
				} else if (typeof currentSite[key] == "string") {
					if (currentSite[key].substr(0,4) == "http") {
						addElement(outerPara,key,"","a","",currentSite[key]);
					} else {
						addElement(outerPara,currentSite[key],"","span");
					}; //end if currentSite key
				}; //end if typeof key

			}; //end if currentSite
		}; //end for let key
		if (currentSite.video) {
			var videoWrapper = addElement(innerWrapper);
			var video = addElement(videoWrapper,"","iframe-container");
			document.getElementById(video).innerHTML += currentSite.video;
		}; //end if currentSite
	};// end if name
}


