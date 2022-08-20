//Sudoku Solver v2.0
//Author: Stephen Gillie
//Created: 8/19/2022 
//Updated: 8/19/2022
//Notes: 
//v2.0: Rebuild of project from December 2018.
//v2.1: Add remaining digits as placeholders, format these to be much smaller than player-entered digits. Also format input boxes of found answers as light green background.

//Get started: Add all 3 of the following lines to your index.html. The Sudoku Solver should show up at the bottom of the page.
//<script src="https://www.Sparational.com/Sparational.js"></script>
//<script src='https://www.Sparational.com/sitelets/sudokuSolver.js'></script>
//<script>buildSudokuSolverSitelet('body');</script>

var solverArray = [[],[],[],   [],[],[],   [],[],[]];
function buildSudokuSolverSitelet($elementId) {
	//addElement($elementId, "", "", "input", "", "", "", "", "", "", "", sudokuSolverInput)
	var wrapper = addElement($elementId);
	addElement(wrapper,"Enter your Sudoku puzzle below.","","h3");
	addElement(wrapper,".sudokuInput::placeholder{font-size: 1vh}","","style");
	var rowCounter = 0;
	for (var r = 0; r < 3; r++) {
		var rowOuter = addElement(wrapper);
		for (var row = 0; row < 3; row++) {
			var rowInner = addElement(rowOuter);
			var colCounter = 0;
			for (var c = 0; c < 3; c++) {
				var section = addElement(rowInner, "", "", "span", "padding: 10px");
				for (var col = 0; col < 3; col++) {
					addElement(section, "", "sudokuInput", "input", "width: 50px; text-align: center; font-size: 4vh;", "", "runSudokuSolver();", "", "", "", "", "sudoku_"+(rowCounter)+"_"+(colCounter));
					solverArray[rowCounter][colCounter] = [1,2,3,4,5,6,7,8,9]
					colCounter++
				};//end for col
			};//end for c
			rowCounter++
		};//end for row
		addElement(rowOuter, "", "", "br");
	};//end for r
};//end function

function runSudokuSolver(){
	for (row=0;row<9;row++){
		for (col=0;col<9;col++){
			//Read in the data from the input field.
			var val = getNumberFromDiv('sudoku_'+row+'_'+col);
			if (val != 0){
				//This location has a number, so overwrite the array with the number.
				solverArray[row][col] = val;
			}
		//If the location is a number (needs refactor)
		var $num = solverArray[row][col]-1;
		if (typeof $num == "number") {
			//delete the number from all locations in the row.
			for (rowAgain=0;rowAgain<9;rowAgain++){
				try{
					delete solverArray[rowAgain][col][$num];
				} catch {}
			}; //end for rowAgain
			//delete the number from all locations in the column.
			for (colAgain=0;colAgain<9;colAgain++){
				try{
					delete solverArray[row][colAgain][$num];
				} catch {}
			}; //end for colAgain
			//delete the number from all locations in the ennerant (3x3 grid section "-rant", of which there are 9 "enne-". Like quadrant has 4.).
			//Divide the row or column by 3 and ceiling (round up) the result. Add 1 before the math so the 0th one doesn't break it, and subtract it after.
			var ennerantRow = Math.ceil((row+1)/3)-1
			var ennerantCol = Math.ceil((col+1)/3)-1
			for (rowAgain=0;rowAgain<3;rowAgain++){
				for (colAgain=0;colAgain<3;colAgain++){
					try{
						//Row, column, and ennerant will be 0-2, so multiplying the ennerant by 3 makes it either 0, 3, or 6. These added allow access to rows 0-8. 
						checkRow = rowAgain+ennerantRow*3;
						checkCol = colAgain+ennerantCol*3;
						delete solverArray[checkRow][checkCol][$num];
					} catch {}
				}; //end for rowAgain
			}; //end for colAgain
		}; //end if typeof
		
		var keys = getKeys(solverArray[row][col])
		if (keys.length == 1) { 
			//If any array has just 1 member, convert it into a number, which will display later.
			solverArray[row][col] = solverArray[row][col][keys]
			document.getElementById('sudoku_'+row+'_'+col).style.background = "lightgreen";
			console.log("Found one at "+row+","+col)
		}; //end if solverArray
		
		
		var out = solverArray[row][col]
		if (out == null){out = ''}
		if (typeof out == "object"){
		//Add the remaining numbers to the placeholder.
			var keyOut = ""
try {
			for (let value of out) {
				if (value != null) {
					keyOut += value
				}
			}; //end for value
} catch {}
			document.getElementById('sudoku_'+row+'_'+col).placeholder = keyOut;
			out = '';
		}; //end if typeof
		//Write data back to the input field, if it's not blank or an array.
		writeElement('sudoku_'+row+'_'+col,out)
		if (keys.length == 1) { 
			runSudokuSolver();
		}; //end if solverArray
		}; //end for col
	}; //end for row
}; //end function

//Utility functions created during development, might be useful later.
function factorySolverArray(){
	for (row=0;row<9;row++){
		for (col=0;col<9;col++){
			solverArray[row][col] = [1,2,3,4,5,6,7,8,9]
		}; //end for col
	}; //end for row
}; //end function

function loopThroughArray(arrayToLoop,$callback){
	for (row=0;row<9;row++){
		for (col=0;col<9;col++){
			$callback(row,col)
		}; //end for col
	}; //end for row
}; //end function

function readArrayToSolve(arrayToRead){
	loopThroughArray(solverArray,function(){
		var val = getNumberFromDiv('sudoku_'+row+'_'+col);
		if (val != 0){solverArray[row][col] = val}
	})//end loopThroughArray
}; //end function

function writeArrayToSolve(arrayToWrite){
	loopThroughArray(solverArray,function(){
			var val = arrayToWrite[row][col]
			if (val == null){val = ''}
			if (typeof val == "object"){val = ''}
			writeElement('sudoku_'+row+'_'+col,val)
	})//end loopThroughArray
}; //end function 



