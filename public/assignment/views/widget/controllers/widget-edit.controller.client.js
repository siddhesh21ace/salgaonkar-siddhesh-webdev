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

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetID);
        }

        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
        }

        function deleteWidget () {
            WidgetService.deleteWidget(vm.widgetID);
            $location.url("/user/"+vm.userID+"/website/"+vm.websiteID+"/page/"+vm.pageID+"/widget");
        };

        function updateWidget (updatedWidget) {
            var widget = WidgetService.updateWidget(vm.widgetID, updatedWidget);
            if(widget == null) {
                vm.error = "Unable to update widget";
            } else {
                vm.message = "Widget successfully updated";
            }
            console.log(widget);
        };
    }
})();