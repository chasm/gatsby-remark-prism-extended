'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (language, code) {
  var spotlighted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var links = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var numbered = arguments[4];

  var highlightedCode = highlightSyntax(language, code);

  return reduceWithIndex(function (acc, line, idx) {
    var spotlight = (0, _ramda.contains)(idx + 1, spotlighted);
    var link = links[idx + 1];

    return '' + acc + processLine(line, spotlight, link, numbered);
  }, '', (0, _ramda.split)('\n', highlightedCode));
};

var _ramda = require('ramda');

var _loadPrismLanguage = require('./load-prism-language');

var _loadPrismLanguage2 = _interopRequireDefault(_loadPrismLanguage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Prism = require('prismjs');


var reduceWithIndex = (0, _ramda.addIndex)(_ramda.reduce);

var highlightSyntax = function highlightSyntax(language, code) {
  if (!Prism.languages[language]) {
    try {
      (0, _loadPrismLanguage2.default)(language);
    } catch (e) {
      return code;
    }
  }

  return Prism.highlight(code, Prism.languages[language]);
};

var processLine = function processLine(line, spotlight) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      url = _ref.url,
      title = _ref.title;

  var number = arguments[3];

  var titleAttr = title ? ' title="' + title + '"' : '';

  if (number && spotlight && url) {
    return '<a href="' + url + '"' + titleAttr + ' class="gatsby-highlight-code-line gatsby-linked-code-line gatsby-numbered-code-line">' + line + '\n</a>';
  } else if (number && spotlight) {
    return '<span class="gatsby-highlight-code-line gatsby-numbered-code-line">' + line + '\n</span>';
  } else if (number && url) {
    return '<a href="' + url + '"' + titleAttr + ' class="gatsby-numbered-code-line gatsby-linked-code-line">' + line + '\n</a>';
  } else if (spotlight && url) {
    return '<a href="' + url + '"' + titleAttr + ' class="gatsby-highlight-code-line gatsby-linked-code-line">' + line + '\n</a>';
  } else if (number) {
    return '<span class="gatsby-numbered-code-line">' + line + '\n</span>';
  } else if (spotlight) {
    return '<span class="gatsby-highlight-code-line">' + line + '\n</span>';
  } else if (url) {
    return '<a href="' + url + '"' + titleAttr + ' class="gatsby-linked-code-line">' + line + '\n</a>';
  } else {
    return line + '\n';
  }
};