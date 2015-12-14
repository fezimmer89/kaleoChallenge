'use strict';

describe('kaleoProject module', function() {

    var scope, $q, state, $timeout;

    beforeEach(module('kaleoProject'));
    beforeEach(module('stateMock'));
    beforeEach(module("app/partials/pagination.html"));

    function scopeFactory(scope, $compile) {
        //mocked functions
        scope.search = function(pageNum) {
            return $timeout();
        };

        scope.promiseMonitor = {
            isPending: function() {
                return false;
            },
            monitor: function() {}
        };

        scope.pageMeta = {
            page: 1,
            total_pages: 10
        };

        var element = angular.element("<div data-custom-pagination='search(pageNum)' data-manager='pageMeta' data-monitor='promiseMonitor'></div>");
        var template = $compile(element)(scope);
        scope.$digest();
        return element.isolateScope();
    }

    beforeEach(inject(function(_$q_, _$state_, _$timeout_, _$compile_, $rootScope) {
        $q = _$q_;
        state = _$state_;
        $timeout = _$timeout_;

        scope = scopeFactory($rootScope, _$compile_);
    }));

    describe('custom-pagination directive: after init', function() {
        it('should have correct items in page list', function() {
            expect(scope.pages.length).toEqual(7);
        });

        it('page list should start with 1', function() {
            expect(scope.pages[0]).toEqual(1);
        });

        it('should be on 1st page', function() {
            expect(scope.pageMeta.page).toEqual(1);
        });

        it('should have default page size', function() {
            expect(scope.pageMeta.total_pages).toEqual(10);
        });
    });

    describe('custom-pagination directive: after getting page 5', function() {

        it('should have correct items in page list', inject(function() {
            scope.getPage(5);
            scope.$digest();
            expect(scope.pages.length).toEqual(7);
        }));

        it('page list should start with 2', inject(function() {
            scope.getPage(5);
            scope.$digest();
            expect(scope.pages[0]).toEqual('...');
            expect(scope.pages[1]).toEqual(3);
        }));

        it('should be on 5th page', inject(function() {
            scope.getPage(5);
            scope.$digest();
            expect(scope.pageMeta.page).toEqual(5);
        }));

        it('should have default page size', inject(function() {
            scope.getPage(5);
            scope.$digest();
            expect(scope.pageMeta.total_pages).toEqual(10);
        }));

    });

    describe('custom-pagination directive: after getting last page', function() {

        it('should have correct items in page list', inject(function() {
            scope.getPage(10);
            scope.$digest();
            expect(scope.pages.length).toEqual(7);
        }));

        it('page list should start with 2', inject(function() {
            scope.getPage(10);
            scope.$digest();
            expect(scope.pages[0]).toEqual('...');
            expect(scope.pages[1]).toEqual(5);
            expect(scope.pages[6]).toEqual(10);
        }));

        it('should be on 5th page', inject(function() {
            scope.getPage(10);
            scope.$digest();
            expect(scope.pageMeta.page).toEqual(10);
        }));

        it('should have default page size', inject(function() {
            scope.getPage(10);
            scope.$digest();
            expect(scope.pageMeta.total_pages).toEqual(10);
        }));

    });

    describe('custom-pagination directive: ater smaller page count', function() {

        it('should have correct items in page list', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.$digest();
            expect(scope.pages.length).toEqual(4);
        }));

        it('page list should start with 2', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.$digest();
            expect(scope.pages[0]).toEqual(1);
            expect(scope.pages[1]).toEqual(2);
            expect(scope.pages[3]).toEqual(4);
        }));

        it('should be on 5th page', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.$digest();
            expect(scope.pageMeta.page).toEqual(1);
        }));

        it('should have default page size', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.$digest();
            expect(scope.pageMeta.total_pages).toEqual(4);
        }));

    });

    describe('custom-pagination directive: ater smaller page count going to last page', function() {

        it('should have correct items in page list', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.getPage(4);
            scope.$digest();
            expect(scope.pages.length).toEqual(4);
        }));

        it('page list should start with 2', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.getPage(4);
            scope.$digest();
            expect(scope.pages[0]).toEqual(1);
            expect(scope.pages[1]).toEqual(2);
            expect(scope.pages[3]).toEqual(4);
        }));

        it('should be on 5th page', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.getPage(4);
            scope.$digest();
            expect(scope.pageMeta.page).toEqual(4);
        }));

        it('should have default page size', inject(function() {
            scope.pageMeta.total_pages = 4;
            scope.getPage(4);
            scope.$digest();
            expect(scope.pageMeta.total_pages).toEqual(4);
        }));

    });
});
