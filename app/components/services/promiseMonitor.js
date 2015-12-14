'use strict';

angular.module('kaleoProject').service('promiseMonitor', [ 
	function() {

		return function(){
			var promise;

			return {
				monitor: function(p){
					promise = p;
				},
				isPending: function(){
					return promise.$$state.status === 0;
				}
			};
		};
	}
]);