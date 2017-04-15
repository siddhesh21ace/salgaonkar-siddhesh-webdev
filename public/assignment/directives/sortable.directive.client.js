(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($routeParams) {
        function linkFunc(scope, element, attributes) {
            var initial = -1;
            var final = 1;

            element.sortable({
                axis: 'y',
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                        final = $(ui.item).index();
                    scope.sortableController.sort(initial, final, $routeParams['pid']);
                },
                handle: ".handle",
                containment: "parent"
            });
        }

        return {
            scope: {},
            link: linkFunc,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }

    function sortableController(WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(initial, final, pageID) {
            WidgetService.sortWidgets(initial, final, pageID);
        }
    }
})();
