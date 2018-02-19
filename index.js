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

module.exports = function (_ref) {
  var markdownAST = _ref.markdownAST,
      relativeDirectory = _ref.relativeDirectory;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      addTrail = _ref2.addTrail,
      _ref2$classPrefix = _ref2.classPrefix,
      classPrefix = _ref2$classPrefix === undefined ? 'language-' : _ref2$classPrefix,
      _ref2$pathPrefix = _ref2.pathPrefix,
      pathPrefix = _ref2$pathPrefix === undefined ? '' : _ref2$pathPrefix,
      showLineNumbers = _ref2.showLineNumbers;

  var trail = addTrail ? '/' + relativeDirectory + '/' : undefined;

  (0, _unistUtilVisit2.default)(markdownAST, 'code', function (node) {
    var _parseCodeLinks = (0, _parseCodeLinks3.default)(node.lang, pathPrefix, trail),
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