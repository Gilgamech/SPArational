# Features
- Single download is possible for most applications
- No need for separate HTML, CSS, and JS files
- Faster applications
- Focus on high performance
- Works with 3rd party CSS and JS files
- HTML to JSON converter available
- Compatible with Express.js and other application servers.
- Docs & Community
- Website and Documentation - Github page is in the works.
- IRC/Slack/Discord channel is in the works.
- Security Issues
- If you discover a security vulnerability in Sparational.js, please email me.

# Quick Start
- The quickest way to get started with Sparational.js is to utilize the HTML converter in the S3 page at the main site.

# Philosophy
- The goal of Sparational.js is to produce highly flexible HTML pages with full CSS support, using only Javascript and JSON. Originally this was to facilitate faster, lightweight Single Page Applications, and has expanded to rapid prototyping of demonstration sites.

- Faster - Because the entire site is represented within a single JSON file, which can be delivered by the Node application, or called from a separate site (like S3). These can be more easily delivered in a single payload without multiple calls to multiple servers. Define multiple pages within your Single Page Application, and users can move between these pages with no network nor server calls needed.

- Rapid prototyping - Because sites are represented entirely as JSON, they can more easily live inline with Javascript code, allowing demonstration sites to be modified for different projects with just a few variable changes.

- Feel free to call external CSS and Javascript files to extend your site beyond the basics, or define & call styles and functions within the JSON data that generates the site. Or use a mix of inline and external site styles and functions.

# FAQ
- What is Sparational.js?
  - Sparational.js is a Javascript engine to convert JSON to HTML. You can manually create a JSON file of HTML elements, use the site builder, or use the site converter to turn an HTML page into JSON.
  - A small website frame is sent, with just enough HTML to define the HTML document.head and document.body, favicon, and mobile viewport. Testing showed these items wouldn't operate correctly if declared by the Sparational.js engine.
- Page sections and wrappers. And errDiv.
  - Head Wrapper is a DIV for elements normally found in the Head of a webpage, such as external or inline Javascript and CSS files.
  - Nav Wrapper is for page tabs, links, and other information you want to display in the navigation bar.
  - Body Wrapper is for the main content of a page or tab.
  - Footer Wrapper is for footer elements at the bottom of each page, like ads, copyright, etc.
  - errDiv is a default Div for error display. This is normally located in the Footer Wrapper.
  - What is the DOM and how do you work with it?
- DOM is the Document Object Model. That means "document" is a variable (aka an object) in the browser that contains the entire webpage.
  - Usually, web browsers parse HTML and write this to the "document" variable.
  - Sparational.js bypasses this and writes JSON to the "document" variable.
- HTML is nested code?
  - Yes! Every item on a webpage is nested under the "document" variable - more specifically, the Head items are nested under document.head and the body (visible parts) are nested under document.body.
- How do you use Sparational.js?
  - With great skill! Add the imported variable sparational.sparationalCode to the website frame between the tags of a script element.
- There are basically 3 ways to use:
  - Template - choose one of the template pages in Sparational-Templates.js. OfferingOverview is built from 2 templates, allowing it to be built in less than 100 lines of JS and HTML (and 300 of CSS).
  - Robust single page application - Use CJE2 to interpret JSON elements in a separate SPA file, and convert into a whole page. You can host this on S3, CDN, or any other hosting solution, to greatly reduce load on your server. Instead of building pages server-side and sending to the browser, Sparational.js offloads this work to the browser's processor. This Sparational.js page operates in this way. 
  - Programmatic  - Use element and table tools to programmatically build parts of your website. Except for webRequest, all tools are synchronous and functional, allowing use in place of a variable in many situations. Why have a separate data variable when you can store your data in a div and read it later? This is best used for parts of pages, when most of the page is declared in HTML, allowing you to add a dynamic section where desired. Gilgamech Technologies main website is set up in this way.

# Main functions:

## webRequest($verb,$location,$callback,$JSON,$file,$cached)
- Convenient way to read data from other sites, or locations such as S3.
- Function dynamically figures out the correct MIME type to use - usually "text/plain" but "application/json" for GET and PUT.
- Verb can be GET, PUT, or POST. Other verbs are possible.
- Location is the URI being accesed.
- Callback takes a callback function to provide output. Recommended use is (output) => previouslyScopedVariable = output;
- JSON is a switch, enter any value to parse JSON. "JSON" is the recommended value to use here.
- File is the file or data to be sent, when using PUT or POST verbs. Has no effect with GET.
- Cached is reserved for future use, as a switch to store the retrieved data, to allow other functions to continue to work in absense of a network connection.

## writeElement($elementId,$source)
- Writes the Source string to the element with the specified elementId, regardless of element type.
- Overwrites exsiting value.
- Function dynamically figures out the correct attribute to add - usually "innerText" but "src" for images and "value" for text fields, images, and select-one elements.
- innerText is the text between the opening and closing tags of the element.
- Useful to dynamically update the text in a DIV.

## readElement($elementId)
- Reads a string from the specified element.
- Function dynamically figures out the correct attribute to read - usually "innerText" but "value" for text fields, textareas, numbers, and select-one elements.

## appendElement($elementId,$source)
- Like writeElement but doesn't overwrite the existing value.
- toggleElement($divId)
- Toggles element visibility between "hidden" and "visible".

## deleteElement($divID)
- Deletes div.

## addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)
- Primary Sparational.js function to write JSON to the DOM - used heavily by function "cje".
- Returns elementId of the new element, which is useful for random elementIds (see below).
- elementParent is the parent element under which this element will be nested. Required.
- Can be "head", "body", or the elementId of another element on the page. If an elementId not on the page is specified, this element won't show on the page.
- innerText is usually the text between the opening and closing tags of the element. For input fields it's the value, and for images it's the title.
- elementClass takes CSS classes to be applied to the element. Use these when using inline CSS or a separate CSS file.
- elementType is the type of element - default is DIV but literally any element type (including those not in HTML spec) can be used.
- elementStyle takes styles to be applied to the element. Useful for applying a style to a single item, or if you don't want to use CSS but still want a stylized webpage.
- href takes as string a URI and turns the element into a link. Usually "src", but is "href" for A and LINK elements. LINK also adds rel of "stylesheet" and type of "text/css", to correctly load separate CSS files.
- onChange takes a function as string and adds this as the onchange action for the element. Recommend to define the function elsewhere in a page (such as the innerText of a Script type element) and only specify the function name here.
- onClick is the same as onChange but for the onclick action.
- contentEditable sets the contenteditable attribute to True.
- attributeType & attributeAction have to both be specified for any effect. Add any arbitrary attribute type and action. Useful for...
- elementId is the name of this element, for referencing elsewhere in the page, or for nesting. Will receive a random ID from getBadPW if blank.

## cje2($parentElement,$jsonVar)
- Convert JSON to Element 2.
- Elements have to be specified under the "element" subvariable of the jsonVar.
- Primary function for adding elements in JSON to page by calling addElement.
