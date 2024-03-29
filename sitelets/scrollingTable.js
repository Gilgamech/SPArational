//Copyright 2013-2023 Gilgamech Technologies
//scrollingTable.js v0.13.1
//Author: Stephen Gillie
//Created on: 3/26/2022
//Last updated: 3/26/2023
//Version history:
//0.13: Rename array variables to array.
//0.13.1: Parameterize allowAbove and allowBelow.
//0.13.2: Convert if above/below different checks from if to while.
//0.13.3: Bugfix to top row check.

//To Add: 
//Prevent scroll above top row.
//Prevent scroll below bottom row.
//Improve scrolling speed.
//Add infinite loop option.


function addTableRow(parentTableId,array,beforeRow=0) {
    const newNode = document.createElement("tr");
    newNode.id = getBadPW();
    const list = returnTablePart(parentTableId,'TBODY');
    if (beforeRow == "end") {
        beforeRow = list.children.length;
    }
    list.insertBefore(newNode, list.children[beforeRow]);
    for (let n=0; n < array.length; n++) {
        addElement(newNode.id,array[n],"","td")
    }
}

function scrollTable(tableName,array,indexColumn,allowAbove = 2,allowBelow = 2,deBugVar="off") {
//getElement(wrapperName).onscroll= function () {scrollTable(tableName)}
    if (deBugVar=="debug") {console.log("scrollChart")};
    let tableChildren = returnTablePart(tableName,'TBODY').children
    let numberAbove = 0;
    let numberBelow = 0;

    for (let n=0; n < tableChildren.length; n++) {
        let elementLocation = locateElement(tableChildren[n].id)[0] *1
        if (elementLocation > 0) {
            numberAbove++
        } else if (elementLocation == 0) {
            //In
        } else if (elementLocation < 0) {
            numberBelow++
        } else {
            console.log("Error - element "+tableChildren[n].id+" location is "+elementLocation)
        }//end if elementLocation
    }; //for let n
	if (deBugVar=="debug") {console.log("numberAbove: "+numberAbove+" numberBelow: "+numberBelow)};
	
    for (let n=0; n < tableChildren.length; n++) {
        let elementLocation = locateElement(tableChildren[n].id)[0] *1
        if (deBugVar=="debug") {console.log("elementLocation: "+elementLocation)};
        
        do {
            //Delete any more than 2 above the window
            let rowToChange = tableChildren[0];
            deleteElement(rowToChange.id);//Delete top row
            numberAbove--;
            if (deBugVar=="debug") {console.log("Removing "+rowToChange.children[indexColumn].innerText+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
        } while (numberAbove > allowAbove)

		if (array[mdIndexOf(array,tableChildren[0].children[indexColumn].innerText)[0]-1][indexColumn] != returnTablePart('historyTable','THEAD').children[0].children[indexColumn].innerText) {
		//Load one only if the column data doesn't match the header data aka don't load the top row.
			do {
			//Load another if only 1 above the window
				let rowToChange = array[mdIndexOf(array,tableChildren[0].children[indexColumn].innerText)[0]-1]; //line above top
				addTableRow(tableName,rowToChange)//Add to top
				numberAbove++
				if (deBugVar=="debug") {console.log("Adding "+rowToChange+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
			} while (numberAbove < allowAbove)
		} else {
			if (deBugVar=="debug") {console.log("Reached top row.")};
		} 

        do {
            let rowToChange = tableChildren[tableChildren.length-1];
            //Delete any more than 2 below the window
            deleteElement(rowToChange.id);//Delete bottom row
            numberBelow--
            if (deBugVar=="debug") {console.log("Removing "+rowToChange.children[indexColumn].innerText+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
        } while (numberBelow > allowBelow)

		do {
            //Load another if only 1 below the window
            let rowToChange = array[mdIndexOf(array,tableChildren[tableChildren.length-1].children[indexColumn].innerText)[0]+1]; //line below bottom
            addTableRow(tableName,rowToChange,"end") //Add to bottom
            numberBelow++
            if (deBugVar=="debug") {console.log("Adding "+rowToChange+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
        } while (numberBelow < allowBelow)
		
    }; //for let n
}//end scrollChart

function buildScrollingTable(parentElement,tableName,array,offset,style,classList="",styleList="") {
    if (!tableName) {
        tableName = getBadPW();
    }; 
    wrapperName = getElement(parentElement).parentElement.id;
    mdArrayToTable(addElement(parentElement,"",style),tableName,array.slice(0,getElement(wrapperName).offsetHeight/offset),classList,styleList);
    getElement(wrapperName).onscroll= function () {scrollTable(tableName,array,3,4,2,"debug")}
	getElement(tableName).style = "width: 100%;"
}

