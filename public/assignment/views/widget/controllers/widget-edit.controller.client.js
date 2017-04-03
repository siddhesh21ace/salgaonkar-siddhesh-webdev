/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", editWidgetController);

    function editWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        vm.widgetID = $routeParams['wgid'];
        vm.url = "/api/upload?uid=" + vm.userID + "&wid=" + vm.websiteID +
            "&pid=" + vm.pageID;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;

        function init() {
            WidgetService.findWidgetById(vm.widgetID)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }

        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
        }

        function deleteWidget() {
            var answer = confirm("Are you sure?");
            if (answer) {
                WidgetService.deleteWidget(vm.widgetID)
                    .success(function () {
                        $location.url("/user/" + vm.userID + "/website/" +
                            vm.websiteID + "/page/" + vm.pageID + "/widget");
                    })
                    .error(function () {
                        vm.error = 'Unable to delete widget';
                    });
            }
        }

        function updateWidget(updatedWidget) {
            if(updatedWidget && !updatedWidget.name) {
                vm.missingName = true;
                return;
            }
            WidgetService.updateWidget(vm.widgetID, updatedWidget)
                .success(function () {
                    vm.message = "Widget successfully updated";
                    $location.url("/user/" + vm.userID + "/website/" +
                        vm.websiteID + "/page/" + vm.pageID + "/widget");
                })
                .error(function () {
                    vm.error = "Unable to update widget";
                });
        }
    }
})();