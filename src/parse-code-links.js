const R = require('ramda')

const linkTest = /[ ]*\{\{[^}]+\}\}[ ]*/g
const linkExtractor = /^[ ]*\{\{([^|]+)\|([^|]+)(\|([^|]+))?\}\}[ ]*$/

module.exports = language => {
  if (!language) {
    return ``
  }

  if (R.test(linkTest, language)) {
    const matches = R.match(linkTest, language)
    const links = R.reduce(
      (acc, link) => {
        const [, num, path, , title] = R.match(linkExtractor, link)
        const line = parseInt(num, 10)

        return {
          ...acc,
          [line]: {
            path,
            title
          }
        }
      },
      {},
      matches
    )

    return {
      language: R.trim(R.replace(linkTest, '', language)),
      links
    }
  }

  return { language: R.trim(language) }
}
