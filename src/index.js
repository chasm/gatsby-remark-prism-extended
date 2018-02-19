import visit from 'unist-util-visit'
import { toLower } from 'ramda'

import parseCodeLinks from './parse-code-links'
import parseLineNumberRange from './parse-line-number-range'
import highlightCode from './highlight-code'

module.exports = function (
  arg,
  { addTrail, classPrefix = 'language-', pathPrefix = '', showLineNumbers } = {}
) {
  const { markdownAST } = arg

  console.log('arg', arg)

  visit(markdownAST, 'code', node => {
    const { language: unlinked, links } = parseCodeLinks(node.lang, pathPrefix)
    const { language: unranged, spotlighted } = parseLineNumberRange(unlinked)
    const language = unranged ? toLower(unranged) : 'none'
    const className = `${classPrefix}${language}`
    const output = highlightCode(
      language,
      node.value,
      spotlighted,
      links,
      showLineNumbers
    )

    node.type = 'html'
    node.value = `<div class="gatsby-highlight">
    <pre class="${className}"><code>${output}</code></pre>
    </div>
    `
  })
}
