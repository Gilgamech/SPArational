# Make faster faster

- Standard Markdown can't be simpler to create and edit. 
- Why pay for back-end compute when front-end compute is free?
- Reduce development and loading time by moving everything into the browser.
- Rehydrate sections, load additional content, and even lazy-load scripts or content elements.
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
  - As of Sparational 4, has these requirements:
    - `'jmlVersion': '30OCT2023'` or higher.
    - Main page elements at `$_.pages.main.elements`
    - Other pages optional.
    - Variable rewrite may not be supported.

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
