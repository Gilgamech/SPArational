## Build a page using a prebuilt engine:

- Currently there are 2 engines available: [InfoGrid Page](https://www.Sparational.com/engines/infoGridPage.js), and CJE2 is covered below.
- Commented above the engine are the data types used by the function If given the correct data types, the page will display. As a troubleshooting aid, element IDs are logged to console as they are written to the browser's Document variable.

## Add a sitelet to your site:

- Like a microservice for your website.
- There are 3 sitelets currently available, a [basic calculator](https://www.Sparational.com/sitelets/calc.js), a [Sudoku solver](https://www.Sparational.com/sitelets/sudokuSolver.js), and the [RGB Calculator](https://www.Sparational.com/sitelets/rgb.js) which gives a new perspective on HTML colors:


/sitelets/rgb.js /sitelets/calc.js

::: #usingSiteletListRgb
:::

::: script#
buildRgbSitelet('usingSiteletListRgb');
:::


- To use it, add the script to your page with this script link:  \<script src='https://www.Sparational.com/Sparational.js'\>\</script\>.
- Then just run `buildRgbSitelet('body')` and the RGB calculator will show up within the div specified. Can be other element types (span, p, et cetera) but may not work within textareas, inputs, buttons, et cetera.

## Build a page using CJE2:

- CJE2 (Convert Json to html Element 2) takes an element ID and a SPA file. HTML is described in a SPA file as JSON. The only mandatory parameter is elementParent, which specifies where the element will live. Each object has the following parameters:
- elementParent, innerText, elementClass, elementType, elementStyle, href, onChange, onClick, contentEditable, attributeType, attributeAction, elementId.
- Instead of specifying parameters within and between HTML tags, declare them in JSON. Use the 'id' property to give your element an ID that can be used elsewhere, or leave it blank for a randomized ID. Specifying this ID as another element's elementParent will cause that other element to be nested within this element, and SPA files generally describe HTML pages and sections as an element with an ID followed by the elements nested within it.
- Just as with Engines, element IDs are logged to console for troubleshooting.


## Build a page engine using Javascript:

- Use addElement to make pages, readElement to pull data from divs and other elements, normal JS to transform,  functions including writeElement and mdArrayToTable to display, and webRequest to make remote API and other data calls.
- These functions can easily be incorporated directly into the onclick or onchange properties of a button, link, or other element. And they can also be easily used alongside normal JS as synchronous functional commands.

## Next Steps

- To try this with your own page, add [Sparational.js](https://www.Sparational.com/Sparational.js) to your page as a script link: \<script src='https://www.Sparational.com/Sparational.js'\>\</script\>. Then find any Div, Input, Textarea, or other element with an ID, and replace the first variable with that ID when running this command: writeElement('replaceWithID','Hello, World!');
