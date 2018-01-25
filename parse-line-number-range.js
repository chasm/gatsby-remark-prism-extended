const R = require('ramda');
const rangeParser = require(`parse-numeric-range`);

const splitLength = R.pipe(R.split(`{`), R.length);

module.exports = language => {
  if (!language) {
    return ``;
  }

  const [lang, rangeStr] = R.split(`{`, language);

  if (rangeStr) {
    const range = R.slice(0, -1, rangeStr);

    return {
      language: R.trim(lang),
      linesToSpotlight: R.filter(n => n > 0, rangeParser.parse(range))
    };
  }

  return { language };
};