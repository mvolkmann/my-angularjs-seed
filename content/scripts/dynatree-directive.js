(function () {
  'use strict';
  /*global angular: false */

  var app = angular.module('MySeed');

  /**
   * This is an AngularJS directive that wraps a subset
   * of the functionality of the jQuery Dynatree widget.
   * See https://code.google.com/p/dynatree.
   * It depends on jQuery UI core which depends on jQuery.
   *
   * Example:
   *   <div dynatree initial-nodes="in" child-nodes="cn" activate="a">
   *   </div>
   *   where "in" and "cn" are names of functions on the current scope
   *   that return promises that resolve to arrays of nodes.
   *   The "cn" function takes a parent node argument.
   *   "a" is a function on the current scope that
   *   will be invoked when a tree node is selected.
   */
  app.directive('dynatree', function () {
    function massageNode(node) {
      // Nodes are assumed to be parent nodes
      // unless they contain the "leaf" property.
      if (!node.leaf) node.isFolder = node.isLazy = true;
    }

    function link(scope, element, attrs) {
      function onLazyRead(node) {
        scope.childNodes(node.data).then(function (nodes) {
          nodes.forEach(massageNode);
          node.addChild(nodes);
          // Tell Dynatree we are finished adding children to this lazy node.
          node.setLazyNodeStatus(DTNodeStatus_Ok);
        });
      }

      scope.initialNodes().then(function (nodes) {
        nodes.forEach(massageNode);

        element.dynatree({
          children: nodes,
          onActivate: scope.activate,
          onLazyRead: onLazyRead
        });
      });
    }

    return {
      restrict: 'AE',
      link: link,
      scope: {
        activate: '=',
        childNodes: '=',
        initialNodes: '='
      }
    };
  });
})();
