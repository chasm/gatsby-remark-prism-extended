const Prism = require('prismjs')
import { addIndex, contains, reduce, split } from 'ramda'

import loadPrismLanguage from './load-prism-language'

const reduceWithIndex = addIndex(reduce)

const highlightSyntax = (language, code) => {
  if (!Prism.languages[language]) {
    try {
      loadPrismLanguage(language)
    } catch (e) {
      return code
    }
  }

  return Prism.highlight(code, Prism.languages[language])
}

const processLine = (line, spotlight, { url, title } = {}, number) => {
  const titleAttr = title ? ` title="${title}"` : ''

  if (number && spotlight && url) {
    return `<a href="${url}"${titleAttr} class="gatsby-highlight-code-line gatsby-linked-code-line gatsby-numbered-code-line">${line}\n</a>`
  } else if (number && spotlight) {
    return `<span class="gatsby-highlight-code-line gatsby-numbered-code-line">${line}\n</span>`
  } else if (number && url) {
    return `<a href="${url}"${titleAttr} class="gatsby-numbered-code-line gatsby-linked-code-line">${line}\n</a>`
  } else if (spotlight && url) {
    return `<a href="${url}"${titleAttr} class="gatsby-highlight-code-line gatsby-linked-code-line">${line}\n</a>`
  } else if (number) {
    return `<span class="gatsby-numbered-code-line">${line}\n</span>`
  } else if (spotlight) {
    return `<span class="gatsby-highlight-code-line">${line}\n</span>`
  } else if (url) {
    return `<a href="${url}"${titleAttr} class="gatsby-linked-code-line">${line}\n</a>`
  } else {
    return `${line}\n`
  }
}

export default function (
  language,
  code,
  spotlighted = [],
  links = [],
  numbered
) {
  const highlightedCode = highlightSyntax(language, code)

  return reduceWithIndex(
    (acc, line, idx) => {
      const spotlight = contains(idx + 1, spotlighted)
      const link = links[idx + 1]

      return `${acc}${processLine(line, spotlight, link, numbered)}`
    },
    ``,
    split('\n', highlightedCode)
  )
}
