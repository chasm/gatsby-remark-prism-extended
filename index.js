'use strict';

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

var _ramda = require('ramda');

var _parseCodeLinks2 = require('./parse-code-links');

var _parseCodeLinks3 = _interopRequireDefault(_parseCodeLinks2);

var _parseLineNumberRange2 = require('./parse-line-number-range');

var _parseLineNumberRange3 = _interopRequireDefault(_parseLineNumberRange2);

var _highlightCode = require('./highlight-code');

var _highlightCode2 = _interopRequireDefault(_highlightCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (arg) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      addTrail = _ref.addTrail,
      _ref$classPrefix = _ref.classPrefix,
      classPrefix = _ref$classPrefix === undefined ? 'language-' : _ref$classPrefix,
      _ref$pathPrefix = _ref.pathPrefix,
      pathPrefix = _ref$pathPrefix === undefined ? '' : _ref$pathPrefix,
      showLineNumbers = _ref.showLineNumbers;

  var markdownAST = arg.markdownAST;


  console.log('arg', arg);

  (0, _unistUtilVisit2.default)(markdownAST, 'code', function (node) {
    var _parseCodeLinks = (0, _parseCodeLinks3.default)(node.lang, pathPrefix),
        unlinked = _parseCodeLinks.language,
        links = _parseCodeLinks.links;

    var _parseLineNumberRange = (0, _parseLineNumberRange3.default)(unlinked),
        unranged = _parseLineNumberRange.language,
        spotlighted = _parseLineNumberRange.spotlighted;

    var language = unranged ? (0, _ramda.toLower)(unranged) : 'none';
    var className = '' + classPrefix + language;
    var output = (0, _highlightCode2.default)(language, node.value, spotlighted, links, showLineNumbers);

    node.type = 'html';
    node.value = '<div class="gatsby-highlight">\n    <pre class="' + className + '"><code>' + output + '</code></pre>\n    </div>\n    ';
  });
};