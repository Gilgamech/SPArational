//Copyright 2013-2023 Gilgamech Technologies
//scrollingTable.js v0.12
//Author: Stephen Gillie
//Created on: 3/26/2022
//Last updated: 3/26/2023
//Version history:
//0.10.1: Revert scrollTable to a sitelet.
//0.11: Rename historyData parameter of scrollTable function to arrayVar.
//0.12: Parameterize indexColumn.

function addTableRow(parentTableId,dataArray,beforeRow=0) {
    const newNode = document.createElement("tr");
    newNode.id = getBadPW();
    const list = returnTablePart(parentTableId,'TBODY');
    if (beforeRow == "end") {
        beforeRow = list.children.length;
    }
    list.insertBefore(newNode, list.children[beforeRow]);
    for (let n=0; n < dataArray.length; n++) {
        addElement(newNode.id,dataArray[n],"","td")
    }
}

function scrollTable(tableName,arrayVar,indexColumn,deBugVar="off") {
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
	
    for (let n=0; n < tableChildren.length; n++) {
        let elementLocation = locateElement(tableChildren[n].id)[0] *1
        if (deBugVar=="debug") {console.log("elementLocation: "+elementLocation+" numberAbove: "+numberAbove+" numberBelow: "+numberBelow)};
        
        if (numberAbove > 2) {
            //Delete any more than 2 above the window
            let rowToChange = tableChildren[0];
            deleteElement(rowToChange.id);//Delete top row
            numberAbove--;
            if (deBugVar=="debug") {console.log("Removing "+rowToChange.children[indexColumn].innerText+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
        } else if (numberAbove < 2) {
            //Load another if only 1 above the window
            addTableRow(tableName,rowToChange)//Add to top
            numberAbove++
            if (deBugVar=="debug") {console.log("Adding "+rowToChange+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
			let rowToChange = arrayVar[mdIndexOf(arrayVar,tableChildren[0].children[indexColumn].innerText)[0]-1]; //line above top
        } else {
            //This is expected, do nothing.
        } 
        if (numberBelow > 2) {
            let rowToChange = tableChildren[tableChildren.length-1];
            //Delete any more than 2 below the window
            deleteElement(rowToChange.id);//Delete bottom row
            numberBelow--
            if (deBugVar=="debug") {console.log("Removing "+rowToChange.children[indexColumn].innerText+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
        } else if (numberBelow < 2) {
            //Load another if only 1 below the window
            let rowToChange = arrayVar[mdIndexOf(arrayVar,tableChildren[tableChildren.length-1].children[indexColumn].innerText)[0]+1]; //line below bottom
            addTableRow(tableName,rowToChange,"end") //Add to bottom
            numberBelow++
            if (deBugVar=="debug") {console.log("Adding "+rowToChange+" - New numberAbove: "+numberAbove+" New numberBelow: "+numberBelow)};
        } else {
            //This is expected, do nothing.
        } 
    }; //for let n
}//end scrollChart

function buildScrollingTable(parentElement,tableName,arrayData,offset,style) {
    if (!tableName) {
        tableName = getBadPW();
    }; 
    wrapperName = getElement(parentElement).parentElement.id;
    mdArrayToTable(addElement(parentElement,"",style),tableName,arrayData.slice(0,getElement(wrapperName).offsetHeight/offset));
    getElement(wrapperName).onscroll= function () {scrollTable(tableName,arrayData,3,"debug")}
}
