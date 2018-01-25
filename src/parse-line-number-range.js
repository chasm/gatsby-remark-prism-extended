import { filter, length, pipe, slice, split, trim } from 'ramda'
import rangeParser from 'parse-numeric-range'

const splitLength = pipe(split('{'), length)

module.exports = language => {
  if (!language) {
    return ''
  }

  const [lang, rangeStr] = split('{', language)

  if (rangeStr) {
    return {
      language: trim(lang),
      spotlighted: filter(
        n => n > 0,
        rangeParser.parse(slice(0, -1, rangeStr))
      )
    }
  }

  return { language }
}
