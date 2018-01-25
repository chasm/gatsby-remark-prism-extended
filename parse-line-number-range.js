'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _parseNumericRange = require('parse-numeric-range');

var _parseNumericRange2 = _interopRequireDefault(_parseNumericRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitLength = (0, _ramda.pipe)((0, _ramda.split)('{'), _ramda.length);

module.exports = function (language) {
  if (!language) {
    return '';
  }

  var _split = (0, _ramda.split)('{', language),
      _split2 = _slicedToArray(_split, 2),
      lang = _split2[0],
      rangeStr = _split2[1];

  if (rangeStr) {
    return {
      language: (0, _ramda.trim)(lang),
      spotlighted: (0, _ramda.filter)(function (n) {
        return n > 0;
      }, _parseNumericRange2.default.parse((0, _ramda.slice)(0, -1, rangeStr)))
    };
  }

  return { language: language };
};