'use strict';

var version = '0.1';

angular.module('kaleoProject').directive('appVersion', [ function() {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);
