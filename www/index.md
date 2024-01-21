# Make faster faster

- Make easy-to-cache and fast-to-load websites that can be updated more quickly.
- Sparational version 4 is so easy to use that instead of using it, you make faster websites faster.
  - Start with a site frame or write your own.
  - Add a Markdown sitelet to your site.
  - Or go crazy and build a full-blown back-end server to host and feed the API? 
  - Maybe just start with a sitelet and go from there.
- Compose beautiful websites entirely from Markdown and CSS. You'll never need to write HTML or Javascript again.

## Two big innovations:

1. Support triple-colon divs as a block type. This is not supported by all Markdown processors, but is gaining support. 
  - Support giving the div an ID by prepending a hash, just like in CSS.
  - Extend by adding HTML5 Semantic Tag pass-through. Text prepended to the hash becomes the tag type. 
    - Extend further by supporting 

This makes it easy to create a `button` with an ID of `inputField`, CSS class `class1`, displays `1`, and increments every click:

```
::: button#buttonField class1
1
:::{writeElement('buttonField',getNumberFromDiv('buttonField')+1)}
```

2. Support direct HTML parsing. (Drop your load in the road!)
  - Basic Markdown has HTML parsing through bracket-and-parenthesis tags, and converts these to anchor tags.
  - Advanced Markdown parsing detects URLs in the text and converts these also into anchor tags. This is also not supported by all Markdown processors, but is gaining support. 
  - Extend by not just linking to the item, but by loading and rendering it, if it's a displayable file type.
    - Extend further by adding colon-delineated features: reload contents every x seconds, and nest under parent element. 
	- Format of `url:reloadEvery:parentElement`. 
  
This makes it easy to load images. Also supports converting CSV to Table, importing JavaScript files through `script` tags, and parsing Markdown into HTML inside the page. 

### Combined, these enable the Page Frame system: 

HTML stub should be like 12 lines: Doctype, open HTML, open Head, maybe a couple of meta elements, Sparational call, close Head, open Body, open frame, close frame, frame call, close Body, close HTML. 

- This lets the browser know what's going on as well as load the rest of the system.
- PageFrames to do the heavy lifting between bootstrap and data. 

### Page network structure: 

- HTML stub
  - [Sparational.js](https://www.Sparational.com/Sparational.js)
  - Site CSS file.
  - Other CSS and JS as desired.
  - frame.md (Page Frame)
    - title.md (Page title)
	- menu.md (Page menu)
	- copyright.md (Page copyright and footer.)
	- Any content file (usually under ./www/Page.html)
	  - Images, CSVs, and 'grandchild' Markdown sitelets.

## Build a page using a prebuilt frame:

- Currently there is one page frame available - the base frame:

    ::: #title
    :::
    
    ::: #menu
    :::
    
    ::: #content
    :::
    
    ::: #copyright
    :::
    
    ./title.md::title
    
    ./menu.md::menu
    
    ::: script#
    let pathname = decodeURIComponent(window.location.pathname); if (pathname == '/') {pathname = '/index.html'}; convertWebElement('content','/www'+pathname.replace('html','md'))
    :::
    
    ./copyright.md::copyright

The default HTML bootstrap page uses this frame. Using local references allows it to call these files from whichever site is hosting the HTML bootstrap. Replacing based on `pathname` means the single HTML bootstrap page is meant to serve the entire site, using HTML error redirection to serve it instead of error pages. All Markdown content files live under `./www`, while the Frame-level Markdown files live on the root. Menu.md has to be populated by the user, but should be easy to script. 

## Build a page with your own frame:

Just copy the above page frame and save on your web host as something like `frame.md`. Then just update your HTML bootstrap to point at it instead of the base frame. Feel free to update URI locations, element types, element IDs, and add element classes as desired. 

### YAML and JSON page frames and full SPA files.

'SPA' is pronounced like William Shatner saying 'Spock'. (Not really - pronounce however you like, including 'GIF'.)

- Full SPA pages in JSON are from Sparational 1. These:
  - Had the filename `.spa`, but have been changed to `.jml` at the start of Sparational 4 alpha stage development.
  - Can be identified by the `jmlVersion` variable in the root of the data.
  - Use a version of JML (JSON Markdown Language) to represent HTML instead of XML. 
  - Fully describe a site, including CSS classes and styles, numerous website pages, and additional elements and data as needed.
  - Key feature is variable replacement system, allowing a reference to any other part of the data file through `$_.path.to.data`. 
  - Enable full SPA operation, allowing switching between pages without reloading or using browser navigation. (This mode doesn't work well with current browsers, search engines, or user habits.)
  - Depreciated as hard to use. These are still supported but not recommended - instead, consider writing an API that uses this interface. This is how Sparational 4 Markdown support works. 

- JSON page frames are from Sparational 4 beta. These:
  - Use a version of JML (JSON Markdown Language) to represent HTML instead of XML. 
  - Describe only the outline of a site, and instruct the browser to load other elements from other locations.
  - Enable page-based SPA operation, where site elements are technically reloaded on every call, but their static nature allows heavy caching at every level.
  - Depreciated for general use as hard to use. These are still available for more complex page frames.

- Full SPA pages in YAML are coming soon for Sparational 4. These:
  - Use YAML to represent HTML. 
  - Will have an identifier variable like `YAML-Hypertext`. 
  - Fully describe a site, including CSS classes and styles, numerous website pages, and additional elements and data as needed.
  - Variable replacement system might be added - this design decision is pending.

- YAML page frames are coming soon for Sparational 4. These:
  - Use YAML to represent HTML. 
  - Describe only the outline of a site, and instruct the browser to load other elements from other locations.
  - Enable page-based SPA operation, where site elements are technically reloaded on every call, but their static nature allows heavy caching at every level.

## Add a sitelet to your site:

- Like a microservice for your website.
- Markdown sitelets are easy - just load and render:

```
::: #usingSiteletListRgb
:::

./sites/rgb.jml::usingSiteletListRgb
```

::: #usingSiteletListRgb
:::

/sites/rgb.jml::usingSiteletListRgb

## Add Javascript to a page:

Got some extra code you want to add to a page, but not quite enough to justify linking to another file? Just wrap your code in a `script` tag:

```
::: script#
codeGoesHere();
:::
```

Use Sparational tools including readElement to pull data from divs and other elements, and functions including writeElement to display.

## Next Steps

- To try this with your own page, add [Sparational.js](https://www.Sparational.com/Sparational.js) to your page as a script link. Then find any Div, Input, Textarea, or other element with an ID, and replace the first variable with that ID when running this command: `writeElement('replaceWithID','Hello, World!');`
