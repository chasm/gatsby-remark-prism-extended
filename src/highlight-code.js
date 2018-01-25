const Prism = require(`prismjs`)
const R = require('ramda')

const loadPrismLanguage = require(`./load-prism-language`)

const reduceWithIndex = R.addIndex(R.reduce)

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

const processLine = (line, spotlighted, { path, title } = {}, numbered) => {
  const titleAttr = title ? ` title="${title}"` : ''

  if (numbered && spotlighted && path) {
    return `<a href="${path}"${titleAttr} class="gatsby-highlight-code-line gatsby-linked-code-line gatsby-numbered-code-line">${line}\n</a>`
  } else if (numbered && spotlighted) {
    return `<span class="gatsby-highlight-code-line gatsby-numbered-code-line">${line}\n</span>`
  } else if (numbered && path) {
    return `<a href="${path}"${titleAttr} class="gatsby-numbered-code-line gatsby-linked-code-line">${line}\n</a>`
  } else if (spotlighted && path) {
    return `<a href="${path}"${titleAttr} class="gatsby-highlight-code-line gatsby-linked-code-line">${line}\n</a>`
  } else if (numbered) {
    return `<span class="gatsby-numbered-code-line">${line}\n</span>`
  } else if (spotlighted) {
    return `<span class="gatsby-highlight-code-line">${line}\n</span>`
  } else if (path) {
    return `<a href="${path}"${titleAttr} class="gatsby-linked-code-line">${line}\n</a>`
  } else {
    return `${line}\n`
  }
}

module.exports = (
  language,
  code,
  linesToSpotlight = [],
  links = [],
  numbered
) => {
  const highlightedCode = highlightSyntax(language, code)

  return reduceWithIndex(
    (acc, line, idx) => {
      const spotlighted = R.contains(idx + 1, linesToSpotlight)
      const linked = links[idx + 1]

      return `${acc}${processLine(line, spotlighted, linked, numbered)}`
    },
    ``,
    R.split('\n', highlightedCode)
  )
}
