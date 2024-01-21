# Make faster faster

- Make easy-to-cache and fast-to-load websites that can be updated more quickly.
- Sparational version 4 is so easy to use that instead of using it, you make faster websites faster.
  - Start with a site frame or write your own.
  - Add a Markdown sitelet to your site.
  - Or go crazy and build a full-blown back-end server to host and feed the API? 
  - Maybe just start with a sitelet and go from there.
- Compose beautiful websites entirely from Markdown and CSS. You'll never need to write HTML or Javascript again.

## Two big innovations:

1. Support triple-colon-tag wrapped divs as a block type. This is not supported by all Markdown processors, but is gaining support. 
  - Support giving the div an ID by prepending a hash, just like in CSS.
  - Extend by adding HTML5 Semantic Tag pass-through. Text prepended to the hash becomes the tag type. 
    - Extend further by supporting JavaScript one-liners in a bracket after the closing colon-tag. 

This makes it easy to create a `button` with an ID of `inputField`, CSS class `class1`, displays `1`, and increments every click:

```
::: button#buttonField class1
1
:::{writeElement('buttonField',getNumberFromDiv('buttonField')+1)}
```

The above creates: 

::: button#buttonField class1
1
:::{writeElement('buttonField',getNumberFromDiv('buttonField')+1)}

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

## Add a sitelet to your site:

- Like a microservice for your website.
- Markdown sitelets are easy - just load and render:

    ::: #usingSiteletListRgb
    :::
    
    /sites/rgb.jml::usingSiteletListRgb

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


## Add CSS to a page:

- Add CSS on the fly with a `style` tag. This creates the holiday colors on my December blog posts:

```
::: style#
body { background-color: #700; } .textBubbleBG { border: 1px solid #32CD32;}
:::
```

- Add normal CSS classes to other elements and style them, without having to modify your CSS file. Great for one-off style situations. 
- More CSS options: 
  1. Page-level: These usually apply a page, using page-wide element types and classes as identifiers. These are usually declared in a CSS file.
  1. Frame-level: These usually apply to a section, using frame element IDs and relative references as identifiers. These are declared in a CSS file. 
  1. Section-level: These usually apply to a section, using element IDs as identifiers. These are usually declared in a `style` tag near the top of the section page.
  - Feel free to call external CSS and Javascript files to extend your site beyond the basics, or define & call your own classes, styles, and functions. 
    - Or use a mix of inline and external site styles and functions. 
    - Sparational 4 lets you build your site however you want.

## Next Steps

- To try this with your own page, add [Sparational.js](https://www.Sparational.com/Sparational.js) to your page as a script link. Then find any Div, Input, Textarea, or other element with an ID, and replace the first variable with that ID when running this command: `writeElement('replaceWithID','Hello, World!');`
