import { match, reduce, replace, test, trim } from 'ramda'

const linkTest = /[ ]*\{\{[^}]+\}\}[ ]*/g
const linkExtractor = /^[ ]*\{\{([^|]+)\|([^|]+)(\|([^|]+))?\}\}[ ]*$/
const httpTest = /^https?:\/\//

export default function (language, pathPrefix, trail) {
  if (!language) {
    return ``
  }

  if (test(linkTest, language)) {
    const matches = match(linkTest, language)

    return {
      language: trim(replace(linkTest, '', language)),
      links: reduce(
        (acc, link) => {
          const [, num, path, , title] = match(linkExtractor, link)
          const line = parseInt(num, 10)
          const isRemote = test(httpTest, path)
          const baseUrl = isRemote ? path : `${pathPrefix}${path}`
          const url = !isRemote && trail ? `${baseUrl}?trail=${trail}` : baseUrl

          return {
            ...acc,
            [line]: {
              url,
              title
            }
          }
        },
        {},
        matches
      )
    }
  }

  return { language: trim(language) }
}
