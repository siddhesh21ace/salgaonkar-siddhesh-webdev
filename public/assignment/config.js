/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(configuration)
        .run(setPageTitle);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                title : 'Login'
            })
            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                title : 'Register'
            })
            .when("/user/:uid",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                title : 'Profile'
            })
            .when("/user/:uid/website",{
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: "WebsiteListController",
                title : 'Website List'
            })
            .when("/user/:uid/website/new",{
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: "NewWebsiteController",
                title : 'New Website'
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: "EditWebsiteController",
                title : 'Edit Website'
            })

            .when("/user/:uid/website/:wid/page",{
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: "PageListController",
                title : 'Page List'
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: "NewPageController",
                title : 'New Page'
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: "EditPageController",
                title : 'Edit Page'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                title : 'Widget List'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: "NewWidgetController",
                title : 'New Widget'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'views/widget/templates/widget-edit.view.client.html'
                ,controller: "EditWidgetController",
                title : 'Edit Widget'
            })
            .when("/", {
                redirectTo: "/login"
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    function setPageTitle($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
        });
    }

})();