//parentElement - string 
//sites - array of objects, with at least a name parameter on each one.  (i.e. sites[0].name)
function buildGridPage(parentElement,sites) {
	if (name == "") {
		for (let site of sites) {
			var outerHref = addElement(parentElement,"","","a","",site.name);
			addElement(outerHref,site.name,('grid grid-item '+site.Type));
		}
	}
}

