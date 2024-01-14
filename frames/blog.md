::: #titleParent titleContainer
:::

::: nav#navContainer
:::

::: #content textBubbleBG 
:::

::: #copyright copyright 
:::

/title.md::titleParent

/menu.md::navContainer

::: script#
let pathname = decodeURIComponent(window.location.pathname);if (pathname == "/") {pathname = "/index.html"};convertWebElement('content','/www'+pathname.replace('html','md'))
:::

/copyright.md::copyright
