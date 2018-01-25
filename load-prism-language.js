'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadPrismLanguage;

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

var _prismLanguageDependencies = require('./prism-language-dependencies');

var _prismLanguageDependencies2 = _interopRequireDefault(_prismLanguageDependencies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadPrismLanguage(language) {
  if (_prismjs2.default.languages[language]) {
    // Don't load already loaded language
    return;
  }

  var languageData = _prismLanguageDependencies2.default[language];

  if (!languageData) {
    throw new Error('Prism doesn\'t support language \'' + language + '\'.');
  }

  if (languageData.option === 'default') {
    // Default language has already been loaded by Prism
    return;
  }

  if (languageData.require) {
    // Load the required language first
    if (Array.isArray(languageData.require)) {
      languageData.require.forEach(loadPrismLanguage);
    } else {
      loadPrismLanguage(languageData.require);
    }
  }

  require('prismjs/components/prism-' + language + '.js');
}