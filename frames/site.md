::: #jumbotron jumbotron text-center
:::

::: #menu 
:::

::: #cRow
:::

::: #copyright copyright
:::

/title.md::jumbotron

/menu.md::menu

::: script#
let pathname = decodeURIComponent(window.location.pathname);if (pathname == "/") {pathname = "/index.html"};convertWebElement('cRow','/www'+pathname.replace('html','md'))
:::

/footer.md::copyright
