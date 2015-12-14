'use strict';

describe('kaleoProject module', function() {
    beforeEach(module('kaleoProject'));

    describe('app-version directive', function() {
        it('should print current version', function() {
            inject(function($compile, $rootScope) {
                var element = $compile('<span app-version></span>')($rootScope);
                expect(element.text()).toEqual('0.1');
            });
        });
    });
});
