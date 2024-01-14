::: #title
:::

::: #menu
:::

::: #content
:::

::: #copyright
:::

/sections/title.md::title

/sections/menu.md::menu

::: script#
convertWebElement('content','/www'+decodeURIComponent(window.location.pathname).replace('html','md'))
:::

/sections/copyright.md::copyright
