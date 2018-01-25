const R = require('ramda')
const visit = require(`unist-util-visit`)

const parseCodeLinks = require('./parse-code-links')
const parseLineNumberRange = require(`./parse-line-number-range`)
const highlightCode = require(`./highlight-code`)

module.exports = (
  { markdownAST },
  { classPrefix = `language-`, directory, showLineNumbers } = {}
) => {
  visit(markdownAST, `code`, node => {
    const { language: delinkedLanguage, links } = parseCodeLinks(node.lang)
    const {
      language: derangedLanguage,
      linesToSpotlight
    } = parseLineNumberRange(delinkedLanguage)
    const language = derangedLanguage ? R.toLower(derangedLanguage) : `none`
    const className = `${classPrefix}${language}`

    node.type = `html`
    node.value = `<div class="gatsby-highlight">
    <pre class="${className}"><code>${highlightCode(language, node.value, linesToSpotlight, links, showLineNumbers)}</code></pre>
    </div>`
  })
}
