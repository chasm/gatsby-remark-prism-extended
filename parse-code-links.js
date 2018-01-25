var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const R = require('ramda');

const linkTest = /[ ]*\{\{[^}]+\}\}[ ]*/g;
const linkExtractor = /^[ ]*\{\{([^|]+)\|([^|]+)(\|([^|]+))?\}\}[ ]*$/;

module.exports = language => {
  if (!language) {
    return ``;
  }

  if (R.test(linkTest, language)) {
    const matches = R.match(linkTest, language);
    const links = R.reduce((acc, link) => {
      const [, num, path,, title] = R.match(linkExtractor, link);
      const line = parseInt(num, 10);

      return _extends({}, acc, {
        [line]: {
          path,
          title
        }
      });
    }, {}, matches);

    return {
      language: R.trim(R.replace(linkTest, '', language)),
      links
    };
  }

  return { language: R.trim(language) };
};