## Make faster websites faster

- Why pay for back-end compute when front-end compute is free?
- Reduce development and loading time by moving everything into the browser.
- Rehydrate pages, load additional content, and even lazy-load scripts or content elements.
- Using standard Javascript and JSON enables serverless design while making websites easier to make.
- Serverless design accelerates through CDN very well.
- Synchronous and functional library streamlines and encourages using DOM elements for data storage.
- Use of JSON enables variable replacement, which is similar to how pages are built in many server-side frameworks.
- Use of DOM for data storage, and caching functionality of webRequest, obviate any in-memory or server-side data structures that could become out of sync, along with most waiting for network.
- Not waiting for server or network means faster, funner pages.

## Mobile First

- Can run from local storage, S3, IPFS, IIS, Apache, container, CDN, or any number of other sources.
- Write lightweight page engines which use less memory and bandwidth than server-side frameworks.
- Most sites operate entirely without network, after initial page load.

## Serverless design

- Build sites entirely within the browser. Use addElement, readElement, writeElement, and more to create a page engine which programmatically creates sites from a data source and browser window location. Or choose one of our page engines. This is how [OfferingOverview](https://offeringoverview.s3-website-us-west-2.amazonaws.com/) operates.
- Build a static site entirely in a SPA file, use webRequest to load it, and let CJE2 (Convert JSON to html Elements 2) to convert this into your site - which is how this site operates.
- Have a traditional site that uses Sparational.js only in certain situations. [Gilgamech Technologies](https://www.gilgamech.com/) main site is still using this legacy architecture.
- Make sitelets in the same way as making a page engine described above - but scoped to tools or applications. Our first sitelet, the RGB Calculator, can be found on the front page, with code [here](https://www.Sparational.com/sitelets/rgb.js). It converts HTML hex color codes into red, blue, and green values and back - while updating the input and title box colors with their value.

## High Flexibility

- Add, remove, read, and modify HTML elements with standard Javascript. SPA format is standard JSON, ready to be extended.
- Functions including readElement and getNumberFromDiv can be used directly as parameters in Javascript functions from this and other libraries.
- More CSS options: CSS styles can be specified normally, as classes declared in your own CSS file or a 3rd-party (i.e. Bootstrap), and applied in the elementClass attribute. Or they can be declared directly in the elementStyle field. These pass values directly to the new HTML element's class='' and style='' parameters. A third and fourth option are to use variable replacement to set either the class or the style with a variable. This helps ensure constant styling across the site, even where CSS is being overridden, while centralizing the data, so updating one location will update them all.
- Feel free to call external CSS and Javascript files to extend your site beyond the basics, or define & call styles and functions within the JSON data that generates the site. Or use a mix of inline and external site styles and functions. Sparational.js lets you build your serverless site however you want.

## SPA format

- SPA format is modified JML (JSON Markup Language) designed to work with HTML instead of XML
- In SPA, HTML elements are described by JSON objects, such as the one you're reading: {'elementParent': 'sFFList', 'elementType': 'li', 'innerText': 'In SPA, HTML elements are described by JSON objects, such as the one you're reading:'}}
- SPA format supports a replacement system, using the variable '$_' (dollar sign underscore) to represent the root of the file. So instead of putting the above element in a page's elements array, it can be put as a named object in any arbitrarily-named section, such as an object named 'sFFListItemReading' under a section named 'elements'. Then putting '$_.elements.sFFListReading' into the page's elements array will make the element show up there, once the page has been fully processed and built. Find 'rwjs' in the Function Index for more info about variable replacement.

- Why JSON?
  - Easier to lint than HTML.
  - Easier to find why something is in the wrong place, and easier to fix - if a word is outside the 'punctuation' in JSON, it will show up in lint testing. But in HTML, it might be expected to have one or more words outside of a tag. Like having several words inside an anchor tag, then having some after.
  - Easier to parse as data, store in more and more DBs, and built-in parsing into basically any modern programming language as native objects.
  - Easier to manipulate or transform - enabling the variable replacement system, which isn't possible with traditional serverless flat-file HTML.
  - Easier to write applications to write it for you.
  - JSON is a first class data citizen on today's Internet, while HTML is only a markup language.
- Markdown, YAML, and Jupyter Notebook display support coming soon.
- 'SPA' is pronounced like William Shatner saying 'Spock'. (Not really - pronounce however you like, including 'GIF'.)

## Next Steps

- Head on over to the [How-To Page](/www/index.html) to get started.
