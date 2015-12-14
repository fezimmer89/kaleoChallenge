'use strict';

angular.module('kaleoProject').directive('customPagination', [
    function() {

        return {
            templateUrl: 'app/partials/pagination.html',
            restrict: 'A',
            scope: {
                callback: '&customPagination',
                pageMeta: '=manager',
                promiseMonitor: '=monitor'
            },
            link: function(scope, element, attrs) {

                scope.options = [24, 48, 96];

                function updatePageList() {
                    if (scope.pageMeta.total_pages > 1) {
                        scope.pages = [];

                        var pageMin = scope.pageMeta.page - 3;
                        var pageMax = scope.pageMeta.page + 3;

                        for (var i = pageMin; i <= pageMax; i++) {
                            if (i < 1) {
                                if (pageMax < scope.pageMeta.total_pages)
                                    pageMax++;
                            } else if (i > scope.pageMeta.total_pages) {
                                var activeIndex = 0;
                                if (scope.pages[activeIndex] == '...')
                                    activeIndex = 1;

                                if (scope.pages[activeIndex] > 1)
                                    scope.pages.splice(activeIndex, 0, scope.pages[activeIndex] - 1);
                            } else {
                                if ((i == pageMin && pageMin > 1) || (i == pageMax && pageMax < scope.pageMeta.total_pages))
                                    scope.pages.push('...');
                                else
                                    scope.pages.push(i);
                            }
                        }
                    }
                }

                scope.getPage = function(page) {
                    if (page != '...') {
                        scope.pageMeta.page = page;

                        scope.callback({
                            pageNum: page
                        });
                    }
                };

                scope.$watch('pageMeta', function(newVal) {
                    if (newVal)
                        updatePageList();
                }, true);
            }
        };
    }
]);
