::: #jumbotron jumbotron text-center
:::

::: #cBanner grid-container grid-nav text-center
:::

::: #cRow
:::

::: #copyright copyright
:::

/title.md::jumbotron

/menu.md::cBanner

::: script#
let pathname = decodeURIComponent(window.location.pathname);if (pathname == "/") {pathname = "/index.html"};convertWebElement('cRow','/www'+pathname.replace('html','md'))
:::

/footer.md::copyright
