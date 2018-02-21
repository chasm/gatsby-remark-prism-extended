'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (language, pathPrefix, trail) {
  if (!language) {
    return '';
  }

  if ((0, _ramda.test)(linkTest, language)) {
    var matches = (0, _ramda.match)(linkTest, language);

    return {
      language: (0, _ramda.trim)((0, _ramda.replace)(linkTest, '', language)),
      links: (0, _ramda.reduce)(function (acc, link) {
        var _match = (0, _ramda.match)(linkExtractor, link),
            _match2 = _slicedToArray(_match, 5),
            num = _match2[1],
            path = _match2[2],
            title = _match2[4];

        var line = parseInt(num, 10);
        var isRemote = (0, _ramda.test)(httpTest, path);
        var baseUrl = isRemote ? path : '' + pathPrefix + path;
        var url = !isRemote && trail ? baseUrl + '?trail=' + trail : baseUrl;

        return _extends({}, acc, _defineProperty({}, line, {
          url: url,
          title: title
        }));
      }, {}, matches)
    };
  }

  return { language: (0, _ramda.trim)(language) };
};

var _ramda = require('ramda');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var linkTest = /[ ]*\{\{[^}]+\}\}[ ]*/g;
var linkExtractor = /^[ ]*\{\{([^|]+)\|([^|]+)(\|([^|]+))?\}\}[ ]*$/;
var httpTest = /^https?:\/\//;