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
convertWebElement('content','/www'+decodeURIComponent(window.location.pathname).replace('html','md'))
:::

/sites/footer.md::copyright
