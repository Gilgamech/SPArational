# Make faster faster

- Why pay for back-end compute when front-end compute is free?
- Reduce development and loading time by moving everything into the browser.
- Rehydrate pages, load additional content, and even lazy-load scripts or content elements.
- Using standard Markdown and occasional Javascript enables entirely hostless design while making websites easier to make.
- Serverless design accelerates through CDN very well.
- Synchronous and functional library streamlines and encourages using DOM elements for data storage.
- Use of JSON enables variable replacement, which is similar to how pages are built in many server-side frameworks.
- Use of DOM for data storage, and caching functionality of webRequest, obviate any in-memory or server-side data structures that could become out of sync, along with most waiting for network.
- Not waiting for server or network means faster, funner pages.

## Beyond Serverless and into Hostless

- No Serverless Needed. Can run from local storage, S3, IPFS, IIS, Apache, container, CDN, or any number of other sources.
- Sites are built entirely within the browser. Just point it at a Markdown file and Sparational 4 does the rest.
- Lightweight pages use less memory and bandwidth than other frameworks.
- Most sites can operate entirely without network, after initial page load. 
  - Framework-level caching allows 0 second TTFB on subsequent loads, and on most page content when moving between pages on the same site.

## High Flexibility

- Standard Markdown can't be simpler to create and edit. 
- Previous Sparational controls (including readElement and getNumberFromDiv) are still available, to create beautiful, robust, and responsive pages. Just wrap your code in a `script` tag:

```
::: script#
codeGoesHere();
:::
```

- More CSS options: 
  1. Page-level: These usually apply a page, using page-wide element types and classes as identifiers. These are usually declared in a CSS file.
  1. Frame-level: These usually apply to a section, using frame element IDs and relative references as identifiers. These are declared in a CSS file. 
  1. Section-level: These usually apply to a section, using element IDs as identifiers. These are usually declared in a `style` tag near the top of the section page.

- Feel free to call external CSS and Javascript files to extend your site beyond the basics, or define & call your own classes, styles, and functions. 
  - Or use a mix of inline and external site styles and functions. 
  - Sparational 4 lets you build your site however you want.

## Sparational History

- 2010: Frustrations at overloaded network towers while waiting in line for PAX in Seattle led to the desire for a way of loading websites that used less network.
- 2013: Discovery of the `document.createElement` JavaScript command while researching other website development.
- 2016: Rediscovery of the `document.createElement` JavaScript command while reviewing research notes from 2013. 
  - Creation of Sparational 1. This version took only JML SPA files as input. 
- 2018: Sparational 2 was a functional rebuild of Sparational 1.
- 2021: Relaunch of GT main site and blog on cloud-hosted IIS.
  - Migrate site hosting from IIS to Container to S3 flat files. Change network from direct to CDN. 
- 2022: Sparational 3 adds table, blog, input, list, and other tools. 
- 2024: Sparational 4 adds Markdown support.

## Next Steps

- Head on over to the [How-To Page](/www/index.html) to get started.
