# Element tools

## addElement

### Adds an HTML Element to the DOM.

Example: addElement('content','Hello, World!'); - this adds an element with the text 'Hello, World!' to the DOM body inside the first element with id='content'.

Returns: ID (string) of new element. Declare as a variable and use as the $elementParent of following elements. Or feel free to safely ignore. This makes it possible to nest addElement within itself - `addElement(addElement('content','','borderRadiusCssClass','div','background: #000;),'Hello, World!','','h1','color: #FFF;')` - doing this once nicely encapsulates an element with a wrapper div without needing a variable, but more than once is an antipattern to be avoided.

addElement($elementParent, innerText, $elementClass, $elementType, $elementStyle, $href, $onChange, $onClick, $contentEditable, $attributeType, $attributeAction, $elementId)

- $elementParent (string) - ID of the parent element for this section. Usually a whole-page wrapper div.
- innerText (string) - Text to be displayed on the element. Auto-selects innerText, value, or other attribute.
- $elementClass (string) - CSS classes that apply to the element, and are declared either in a separate CSS file, in style tags, or in a style element object in the SPA file.
- $elementType (string) - HTML element type, such as div, a(nchor), span, h1, h3, h3, p(aragraph), et cetera. Full HTML5 Semantic Tag support, use any tag type you want.
- $elementStyle (string) - CSS styles that are declared directly in the element.
- $href (string) - URI that the browser should load when clicked. Almost always used with anchor elements.
- $onChange (string) - Javascript to perform when the element value changes. Used with input, textarea, and contenteditable elements.
- $onClick (string) - Just like $onChange, the Javascript to perform when the element is clicked. Often used to dynamically rebuild a page with Sparational.js, and in this case it's best paired with the style='cursor: pointer;' to give the illusion of a normal link.
- $contentEditable (switch) - Makes the element editable. Added in an earlier version for a project that required a lot of content-editable sections. May be depreciated in a future full version.
- $attributeType (string) - Allows specifying an arbitrary attribute, such as placeholder on inputs and textareas.
- $attributeAction (string) - Allows specifying a value for the attribute specified in the previous bullet point, such as the placeholder text.
- $elementId (string) - ID of the element. Useful for parenting other elements under this one, interacting with other scripts and CSS, and linking directly to a location on a page. This will show up in the console on every page load as a log of elements added, (any user might see it) so name for posterity.

## writeElement

### Has the element display the data. Adds the data to the DOM, in the element's innerText in most situations, value in others, and src sparingly.

Example: writeElement(elementId,'Hello, World!');

Returns: null

writeElement($elementId, data)

- $elementId (string) - ID of the element to display the data.
- data (string) - Text to display.

## readElement

### Returns data being displayed by an element. Reads in the same way as writeElement writes - innerText for most, value in others, src sparingly. Pairs nicely with writeElement. Example:  onclick = 'writeElement('someDiv', someOtherFunction( readElement('someDiv')));'. In this example, the element 'someDiv' was read from, this was fed though some other function, and the returned value was written back to 'someDiv'. The other function could modify or transform the data in 'someDiv', or maybe just format it.

Example: var name = readElement('userNameInput')

Returns: (string) the data displayed in the element.

readElement($elementId)

- $elementId (string) - The element to read from.

## getNumberFromDiv

### Performs readElement and ensures that the return product is numeric. Not meant for use with text.

Example: var age = getNumberFromDiv('userAgeInput')

Returns: (integer) the data displayed in the element.

getNumberFromDiv($numericDiv)

- $numericDiv (string) - ID of element to read from. Can be any element type, not just div.

## deleteElement

### Deletes the specified element and all children. Useful for removing sections or whole pages, before replacing with another.

Example: deleteElement('content')

Returns: null

deleteElement($elementId)

- $elementId (string) - ID of element to deleted.

## rebuildElement

### Rebuilds the specified element, copying most details to a new element and deleting the old, effectively stripping it of all children. Useful for removing a whole page just before building another in its place.

Example: rebuildElement('content')

Returns: null

rebuildElement($elementId)

- $elementId (string) - ID of element to rebuild.

## appendElement

### Appends data to an element. 

Example: appendElement('userDetails',user.phoneNo)

Returns: null

appendElement($elementId, data)

- $elementId (string) - ID of element to append.
- data (string) - Text to append.

## toggleElement

### Toggles the visibility of an element. May be depreciated in a future full version.

Example: toggleElement('menuDropDown')

Returns: null

toggleElement($elementId)

- $elementId (string) - ID of element whose visibility gets toggled.

## hideElement

### Makes an element not visible. May be depreciated in a future full version.

Example: hideElement('menuDropDown')

Returns: null

hideElement($elementId)

- $elementId (string) - ID of element to hide. 

## showElement

### Makes an element visible. May be depreciated in a future full version.

Example: showElement('menuDropDown')

Returns: null

showElement($elementId)

- $elementId (string) - ID of element to show. 

## identifyElements

### Logs the element ID and mouse location when you click Useful for finding the ID of the element you're working with, for in-browser development.

Example: identifyElements('menuDropDown')

Returns: null

identifyElements($elementId)

- $elementId (string) - ID of parent element whose children will be identified. 

## cje2 (Full rewrite for v3)

### Convert JSON to Element 2 - uses addElement to add a list of HTML Elements to the DOM. Used with SPA pages.

Example: cje2({'id': 'elementParent', 'elementParent': 'elementToolsArea'})

Returns: null

cje2(parentElement,$elements)

- parentElement (string) - The ID of the parent element for this section to hang from. Usually a whole-page wrapper div. CJE2 replaces all instances of the first page's first element's elementParent with specified parentElement, so use the same elementParent for elements that should hang off the parent element - the placeholder 'parentElement' is recommended.
- $elements (list of key-object pairs) - page of elements. Usually from a SPA file's contents.

## convertMarkdownToSpa(Coming Soon)

### Converts Markdown pages to SPA format. Write your website in YAML, like a serverless Hugo.

Example: convertMarkdownToSpa(markdownFile)

Returns: (object) Completed SPA file.

convertMarkdownToSpa($inputString)

- $inputString (string) - The Markdown file data converted to SPA format.

## convertJupyterToSpa(Coming Soon)

### Converts Jupyter pages to SPA format. Display sections of your Jupyter notebooks as a website, like a serverless Ipywidgets.

Example: convertJupyterToSpa(jupyterFile)

Returns: (object) Completed SPA file.

convertJupyterToSpa($inputString)

- $inputString (string) - The Jupyter file data converted to SPA format.

## convertYamlToSpa(Coming Soon)

### Converts Yaml pages to SPA format. Write your website in YAML, like a reactive yst.

Example: convertYamlToSpa(yamlFile)

Returns: (object) Completed SPA file.

convertYamlToSpa($inputString)

- $inputString (string) - The Yaml file data converted to SPA format.

## rwjs (Full rewrite for v3)

### ReWrite JSon - Performs SPA file variable replacement. Can replace individual values and also whole elements (for a unified header, footer, and navigation across all pages.)

Example: page contains {'styles': { 'purpleBG': 'background: #532F8C;'}} and in any element 'elementStyle':'$_.styles.purpleBG' will be replaced with the background color style.

Returns: null

rwjs($JSON)

- $JSON (complex object) - Full SPA file contents. Variable locations are relative to the SPA file.

# Text tools

## colorifyWords

### Adds a span with the specified class, for every instance of a word in the HTML element. Made to highlight a word so it stands out.

Example: colorifyWords('content', 'red', 'redText')

Returns: null

colorifyWords(divid, replaceWord, replaceClass)

- divid (string) - ID of the HTML element. Works with any element, not just divs.
- replaceWord (string) - String to replace.
- replaceClass (string) - CSS class to apply to the colorifyWords span. Use normal CSS to specify a color for that class.

## colorifyMultipleWords

### Applies colorifyWords to an array of words across an array of elements.

Example: colorifyMultipleWords(['content','output'], [blue,sky], 'blueText')

Returns: null

colorifyMultipleWords(divList, wordList, replaceClass)

- divList (array) - Array of HTML element IDs. Works with any element, not just divs.
- wordList (array) - Array of strings to make colorful.
- replaceClass (string) - CSS class to apply to the colorifyMultipleWords spans. Use normal CSS to specify a color for that class.

## addPopupToWord

### Wraps the replaceWord in a span, and adds the popupText to an inner span. Requires CSS class 'popup' to be configured (details soon).

Example: addPopupToWord('content', 'Additional Info', 'Details can be found on mouseover.', 'color: #000')

Returns: null

addPopupToWord(divid, replaceWord, popupText, outputClasses)

- divid (string) - ID of the element within which you're working.
- replaceWord (string) - String to wrap with outer span.
- popupText (string) - String to be hidden until mouseover.
- outputClasses (string) - CSS classes to be added to the outer span

## addLinkToWord

### Wraps strings in an a(nchor) tag.

Example: addLinkToWord(divid, replaceWord, URI)

Returns: null

addLinkToWord('content', 'website', 'https://www.gilgamech.com/')

- divid (string) - ID of element to work within.
- replaceWord (string) - String that should become a link.
- URI (string) - Href of link.

# Supporting tools

## webRequest

### Performs an HTTP request - wrapper for xhRequest, to remove boilerplate and auto-detect options such as content type. Has internal caching feature that provides a response from a Javascript variable instead of performing an xhRequest.

Example: webRequest('get', 'https://www.gilgamech.com/', function(data,status){externalVariable = data;console.log('status: '+status)} '', '', 60)

Returns: null

webRequest($verb, $URI, $callback, $JSON, $file, $cached)

- $verb (string) - HTTP verb to perform (Get, Post, Put, Head, Options, Delete.)
- $URI (string) - The HTTP Resource to target.
- $callback (function) - Returns HTTP response data and status code in separate variables. The status can be safely ignored.
- $JSON (switch) - Parse the response data as a JSON object before returning to the callback. Allows you to omit a JSON parsing step i.e. 'responseData = JSON.parse(responseData)'.
- $file (string) - Data to be sent in the body of the request. Often used with Put and sometimes Post requests.
- $cached (integer) - Integer seconds to cache this domain. Subsequent requests with $cached set will increase the cache duration, possibly causing the URI to remain cached indefinitely in some situations. Invalidate the cache by reloading the page.

## getBadPW

### Would make a better password than 'Password' but worse than a NIST standard. Used by addElement to create random IDs for HTML elements when not specified.

Example: var divId = getBadPW();

Returns: '0.' followed by (string) 16 character pseudo-random string of non-cryptographic integrity.

getBadPW()

## getKeys

### Returns the keys of an object. Useful for iterating through the keys, such as the pages in a SPA file: 'for (let key of getKeys(sites.pages)'.

Example: for (let key of getKeys(sites.pages))

Returns: (array) List of keys, such as: ['howTo','info','functionIndex']

getKeys(obj)

- obj (list of key-et cetera pairs) - Any object with keys.

## onlyUnique

### Checks if a value is unique. Unsure where or how this is used.

Example: (unsure how this third-party function is used.)

Returns: (unsure)

onlyUnique(value, index, self)

- value
- index
- self

## numToTextNotation

### Converts an integer with many zeroes into the short scale text equivalent.

Example: 'numToTextNotation(100000000,2)'

Returns: (string) Number in textual format, such as '100 million'.

numToTextNotation($inputObject, round)

- $inputObject (integer) - Integer to change format.
- round (integer) - Number of digits to round output. Higher precision (8-9) sometimes works better than low precision (1-2), so try increasing the number if the output looks incorrect.

## textToNumNotation

### Converts a short scale textual number into the integer equivalent.

Example: 'textToNumNotation('100 million')'

Returns: (integer) Number in numerical format, such as '100000000'

textToNumNotation($inputObject)

- $inputObject (string) - String to change format.

## detectEnter

### Detects if the selected key has been pressed. Useful for triggering another operation, such as loading a page for a search box, or submitting an email in a subscription field.

Example: detectEnter(event, function(){appendElement('chatBox',readElement('chatInput'))})

Returns: null

detectEnter($keypress, $callback)

- $keypress (keypress event) - The keydown event, with a keyCode property.
- $callback (function) - Callback operations to perform when enter is pressed. Has no data variable.

## getRoundedNumber

### Round a number to the specified number of digits. Returns a number.

Example: getRoundedNumber(3.14159, 2)

Returns: (integer or floating point) rounded number, such as 3.14.

getRoundedNumber(number, digits)

- number (integer or floating point) - Floating point or integer to round. Might also work with a string containing only a number.
- digits (integer) - Integer number of digits to round to.

# Table building tools

## mdArrayToTable

### Converts an array of arrays into an HTML Table. This format closely resembles CSV while still being valid JSON.

Example:mdArrayToTable('blogPost21', '', [['Name','Score'],['Alice',5],['Bob',5]]) 

Returns:  null

mdArrayToTable(parentDivID, newTableID, array)

- parentDivID (string) - ID of element under which where the table should display.
- newTableID (string) - ID of new table. Uses badPW randomized ID if blank.
- array (array[]) - Data to display as table.

## columnMath

### Performs the specified math operation against all members of two tables, or one table and a constant, outputting to either table or any other table.

Example: columnMath(MoleTable, 2, MoleTable, 1, 0, MoleTable, 3, 'divide', 4, 'true'); 

Returns: null

columnMath(TableAid, inputACol, TableBid, inputBCol, rowBAdj, TableOutid, outputCol, mathOperation, roundDigits, formatMaxOutput, newOutColumnName)

- TableAid (string) - ID of Table A, the first input table.
- inputACol (integer) - Column of Table A to use as first input.
- TableBid (string) - (optional) ID of Table B, the second input table. Leave blank to specify a constant value in the next field.
- inputBCol (integer) - Column of Table B to use as second input. If TableBid is left blank, then the value here will be transformed against all cells in inputACol.
- rowBAdj (integer) - How many rows to adjust the Table B input down. Used when Table B is longer than Table A and the desired data is not at the top of Table B.
- TableOutid (integer) - ID of output table. Can be Table A or Table B, or any other table.
- outputCol (string) - Column of Table Out to use as output. If the column contains other data, it will be overwritten.
- mathOperation (string) - Add, subtract, multiply, divide, or percent (divide also by 100). Any other input here will be ignored and the process will have no output.
- roundDigits (integer) - Number of digits to round output - lower resolution (1,2) might cause errors, to fix try a higher resolution (8,9).
- formatMaxOutput (switch) - Apply formatMax to the column.
- newOutColumnName (string) - Name to be displayed in the Table Header row. If left blank, a name is derived from the column name(s) and mathematical operation.

## addTable

### Adds an HTML table.

Example: addTable('blogPost21', 'table', [['Name','Score'],['Alice',5],['Bob',5]], 'color: #000')

Returns: null

- parentDivID (string) - ID of element under which where the table will display.
- newTableID (string) - ID of new table. Uses badPW randomized ID if blank.
- columnData (array[]) - Data to display as table.
- divClass (string) - CSS classes to apply to the table.

## addColumn

### Adds a column of data to an existing table.

Example: addColumn('table', ['Score',8,5,3,1])

Returns: null

addColumn(tableid, columnData, headLess)

- tableid (string) - ID of table where the new column will display.
- columnData (array[]) - Data to display as table.
- headLess (switch) - Skip adding the Table Header row.

## deleteColumn

### Deletes the rightmost column from a table. (Unsure of behavior with RTL languages.)

Example: deleteColumn('table')

Returns: null

deleteColumn(tableid)

- tableid (string) - ID of table to delete.

# Table supporting tools

## sortAlphaTable

### Sorts a table based on one column of alphabetic data.

Example: sortAlphaTable(2, 'table')

Returns: null

sortAlphaTable(currentColumn, tableid)

- currentColumn (integer) - Column number which will be sorted.
- tableid (string) - ID of table where the new column will display.

## sortNumTable

### Sorts a table based on one column of numeric data.

Example: sortNumTable(2, 'table')

Returns: null

sortNumTable(currentColumn, tableid)

- currentColumn (integer) - Column number which will be sorted.
- tableid (string) - ID of table where the new column will display.

## rotateArray

### Rotates an array, moving the first item to become the last, second becomes first, each moving forward a spot.

Example: rotateArray([8,5,3], 1)

Returns: (array) Rotated array, such as: [5,3,8]

rotateArray(inArray, num)

- inArray (array) - Array to rotate
- num (integer) - Number of places to rotate array.

## groupArray

### Groups data based on itemName property.

Example: groupArray([{'itemName':'alpha','Type':'apple'}{'itemName':'beta','Type':'apple'}{'itemName':'alpha','Type':'orange'}])

Returns:  Array of items with itemName, and a Types array holding one of each distinct Type. Such as [{'itemName':'alpha','Types':['apple','orange']}{'itemName':'beta','Types':['apple']}]

groupArray(arrayToGroup)

- arrayToGroup (array) - Data to group. Each array member must have itemName and Type properties for the function to operate properly.

## returnAllValues

### Returns the column values as an array.

Example: returnAllValues(2, 'table')

Returns:  (array) Column values, such as: [8, 2].

returnAllValues(col, tableid)

- col (integer) - Column number which will be retrieved.
- tableid (string) - ID of table to retrieve data from.

## getMaxOfArray

### Returns the largest integer in an array. Used in formatMax in tandem with returnAllValues.

Example: getMaxOfArray([5,3])

Returns:  (integer) Largest integer in array, such as: 5

getMaxOfArray(array)

- array (array) - Data.

## getMinOfArray

### Returns the smallest integer in an array.

getMinOfArray(array)

Example: getMinOfArray([5,3])

Returns:  (integer) Smallest integer in array, such as: 3.

- array (array) - Data.

## formatMax

### Applies CSS styles to all cells in the column, showing the max, and how the rest compare to it.

Example: formatMax(2, 'table')

Returns:  null

formatMax(targetColumn, tableid)

- col (integer) - Column number which will be retrieved.
- tableid (string) - ID of table to retrieve data from.

## addRowHandlers

### Adds createClickHandler as the onclick foreach cell in a column. Unsure where this is used, might be depreciated in a future full version.

Example: (unsure how this third-party function is used.)

Returns: null

addRowHandlers(col, tableid)

- col (integer) - Column number which will be retrieved.
- tableid (string) - ID of table to retrieve data from.

## returnTablePart

### Returns the specified table part - table head or table body.

Example: var tableHead = returnTablePart(tableid,'THEAD');

Returns: (object) the HTML table part requested.

returnTablePart(tableid, tablePart)

- tableid (string) - ID of table to retrieve data from.
- tablePart (string) - Table part to return. Must be exactly 'THEAD' or 'TBODY'.

## createClickHandler

### Returns a function which performs formatMax on the table column.

Example: (unsure how this third-party function is used.)

Returns: null

createClickHandler(col, table)

- col (integer) - Column number which will be formatted.
- tableid (string) - ID of table to format.
