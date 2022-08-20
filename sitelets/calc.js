//Author: Stephen Gillie
//Created: 8/17/2022
//Updated: 8/17/2022
//Notes: 
//v1.0 - release

//Get started: Add all 3 of the following lines to your index.html. The Sudoku Solver should show up at the bottom of the page.
//<script src="https://www.Sparational.com/Sparational.js"></script>
//<script src='https://www.Sparational.com/sitelets/calc.js'></script>
//<script>buildCalculatorSitelet('body');</script>

function buildCalculatorSitelet($elementId) {
	var calcInput = getBadPW()
	addElement($elementId,"","","input","","","","","","onkeypress","detectEnter(event,function(){writeElement('"+calcInput+"',eval(readElement('"+calcInput+"')))})",calcInput)
	var n = 1;
	var calcTopRow = addElement($elementId);
	addElement(calcTopRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcTopRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcTopRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcTopRow,"+","","button","","","","appendElement('"+calcInput+"','+')")
	var calcMidRow = addElement($elementId);
	addElement(calcMidRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcMidRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcMidRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcMidRow,"-","","button","","","","appendElement('"+calcInput+"','-')")
	var calcBotRow = addElement($elementId);
	addElement(calcBotRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcBotRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")");n++
	addElement(calcBotRow,n,"","button","","","","appendElement('"+calcInput+"',"+n+")")
	addElement(calcBotRow,"*","","button","","","","appendElement('"+calcInput+"','*')")
	var calcZeroRow = addElement($elementId);
	addElement(calcZeroRow,"0","","button","","","","appendElement('"+calcInput+"',0)");n++
	addElement(calcZeroRow,".","","button","","","","appendElement('"+calcInput+"','.')")
	addElement(calcZeroRow,"=","","button","","","","writeElement('"+calcInput+"',eval(readElement('"+calcInput+"')))")
	addElement(calcZeroRow,"/","","button","","","","appendElement('"+calcInput+"','/')")
}
