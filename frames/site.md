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
convertWebElement('cRow','/www'+decodeURIComponent(window.location.pathname).replace('html','md'))
:::

/footer.md::copyright
