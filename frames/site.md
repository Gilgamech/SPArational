::: #jumbotron jumbotron text-center
:::
color: #fff; background: #532F8C

::: #cBanner grid-container grid-nav text-center
:::

::: #cRow grid-container grid-info
:::

::: #copyright copyright
:::

/title.md::jumbotron

/menu.md::cBanner

::: script#
convertWebElement('cRow','/www'+decodeURIComponent(window.location.pathname).replace('html','md'))
:::

/footer.md::copyright
