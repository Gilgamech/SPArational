::: #title jumbotron text-center
:::

::: #menu 
:::

::: #content
:::

::: #copyright
:::

/title.md::title

/menu.md::menu

::: script#
let pathname = decodeURIComponent(window.location.pathname);if (pathname == "/") {pathname = "/index.html"};convertWebElement('content','/www'+pathname.replace('html','md'))
:::

/copyright.md::copyright
