'use strict';

angular.module('kaleoProject').controller('searchCtrl', ['$scope', '$http', 'promiseMonitor', '$window', '$timeout',
    function($scope, $http, PromiseMonitor, $window, $timeout) {

        $scope.promiseMonitor = new PromiseMonitor();
        $scope.pageMeta = {
            per_page: 24,
            page: 1
        };

        function fetchData(meta) {
            return $http({
                method: 'GET',
                url: ('https://demo1.kaleosoftware.com/v4/search.json?sitemap_token=123456789&sitemap=sales&term=' +
                    ($scope.term || '') +
                    ($scope.selectedTags && $scope.selectedTags.length > 0 ? '&' + _.map($scope.selectedTags, function(tag) {
                        return 'tags[]=' + tag;
                    }).join('&') : '') +
                    '&per_page=' + (meta.per_page || '') + '&page=' + (meta.page || ''))
            });
        }

        $scope.search = function(pageNum) {
            if (pageNum)
                $scope.pageMeta.page = pageNum;
            else
                $scope.pageMeta.page = 1; //default

            var deferred =
                fetchData($scope.pageMeta)
                .then(function(results) {
                    $scope.results = results.data.collection;
                    $scope.pageMeta = results.data.meta;
                });

            $scope.promiseMonitor.monitor(deferred);
            return deferred;
        };

        // initialize
        $scope.search()
            .then(function() {
                $scope.tagOptions = _.map(Object.keys($scope.pageMeta.facets.table.tags), function(item) {
                    return {
                        text: item,
                        value: item
                    };
                });

                $scope.selectedTags = [];
            });

        $scope.config = {
            onChange: $scope.search,
            closeAfterSelect: true
        };

        $scope.addTag = function($event, tag) {
            if (!_.contains($scope.tagOptions, tag))
                $scope.tagOptions.push({
                    text: tag,
                    value: tag
                });

            if (!_.contains($scope.selectedTags, tag))
                $scope.selectedTags.push(tag);

            // prevent other defaults from firing (links)
            $event.preventDefault();

            // selectize requires timeout to trigger 2-way model binding
            $timeout(function() {
                $scope.search();
            });
        };
    }
]);
