/*istanbul ignore next*/"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function ( /*istanbul ignore next*/_ref) {
  /*istanbul ignore next*/var t = _ref.types;

  function isProtoKey(node) {
    return t.isLiteral(t.toComputedKey(node, node.key), { value: "__proto__" });
  }

  function isProtoAssignmentExpression(node) {
    var left = node.left;
    return t.isMemberExpression(left) && t.isLiteral(t.toComputedKey(left, left.property), { value: "__proto__" });
  }

  function buildDefaultsCallExpression(expr, ref, file) {
    return t.expressionStatement(t.callExpression(file.addHelper("defaults"), [ref, expr.right]));
  }

  return {
    visitor: { /*istanbul ignore next*/
      AssignmentExpression: function AssignmentExpression(path, file) {
        if (!isProtoAssignmentExpression(path.node)) return;

        var nodes = [];
        var left = path.node.left.object;
        var temp = path.scope.maybeGenerateMemoised(left);

        if (temp) nodes.push(t.expressionStatement(t.assignmentExpression("=", temp, left)));
        nodes.push(buildDefaultsCallExpression(path.node, temp || left, file));
        if (temp) nodes.push(temp);

        path.replaceWithMultiple(nodes);
      },
      /*istanbul ignore next*/ExpressionStatement: function ExpressionStatement(path, file) {
        var expr = path.node.expression;
        if (!t.isAssignmentExpression(expr, { operator: "=" })) return;

        if (isProtoAssignmentExpression(expr)) {
          path.replaceWith(buildDefaultsCallExpression(expr, expr.left.object, file));
        }
      },
      /*istanbul ignore next*/ObjectExpression: function ObjectExpression(path, file) {
        var proto = /*istanbul ignore next*/void 0;
        /*istanbul ignore next*/var node = path.node;


        for ( /*istanbul ignore next*/var _iterator = node.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
          /*istanbul ignore next*/
          var _ref2;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
          }

          var prop = _ref2;

          if (isProtoKey(prop)) {
            proto = prop.value;
            /*istanbul ignore next*/(0, _pull2.default)(node.properties, prop);
          }
        }

        if (proto) {
          var args = [t.objectExpression([]), proto];
          if (node.properties.length) args.push(node);
          path.replaceWith(t.callExpression(file.addHelper("extends"), args));
        }
      }
    }
  };
};

var /*istanbul ignore next*/_pull = require("lodash/pull");

/*istanbul ignore next*/
var _pull2 = _interopRequireDefault(_pull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint max-len: 0 */

module.exports = exports["default"];