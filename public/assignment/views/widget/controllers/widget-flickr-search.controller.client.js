/**
 * Created by Siddhesh on 3/22/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('FlickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.wgid = $routeParams['wgid'];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (response) {
                    var widget = response.data;
                    widget.url = url;
                    WidgetService
                        .updateWidget(vm.wgid, widget)
                        .then(function (response) {
                            var updatedWidget = response.data;
                            if (updatedWidget) {
                                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                            }
                        }, function (error) {
                            vm.updateerror = "Error updating the widget! \n" + error;
                        });
                }, function (error) {
                    vm.updateerror = "Widget not found! \n" + error;
                });
        }

    }
})();