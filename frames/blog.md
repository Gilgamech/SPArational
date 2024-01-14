::: #titleParent titleContainer
:::

::: nav#navContainer
:::

::: #content textBubbleBG 
:::

::: #copyright copyright 
:::

/sites/title.md::titleParent

/sites/menu.md::navContainer

::: script#
let pathname = decodeURIComponent(window.location.pathname);if (pathname == "/") {pathname = "/index.html"};convertWebElement('content','/www'+pathname.replace('html','md'))
:::

/sites/footer.md::copyright
