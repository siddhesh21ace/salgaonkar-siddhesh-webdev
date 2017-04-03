/**
 * Created by Siddhesh on 2/13/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(configuration)
        .run(setPageTitle);

    function configuration($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider
            .when("/login", {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                title: 'Login'
            })
            .when("/register", {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                title: 'Register'
            })
            .when("/user", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: "ProfileController",
                title: 'Profile',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                title: 'Profile',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website", {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: "WebsiteListController",
                title: 'Website List',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/new", {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: "NewWebsiteController",
                title: 'New Website',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: "EditWebsiteController",
                title: 'Edit Website',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: "PageListController",
                title: 'Page List',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: "NewPageController",
                title: 'New Page',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: "EditPageController",
                title: 'Edit Page',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                title: 'Widget List',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: "NewWidgetController",
                title: 'New Widget'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: "EditWidgetController",
                title: 'Edit Widget',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickrsearch", {
                templateUrl: 'views/widget/templates/widget-flickr-search.view.client.html',
                controller: "FlickrImageSearchController",
                title: 'Search Flickr',
                resolve: {
                    isLoggedIn: isLoggedIn,
                }
            })
            .when("/", {
                redirectTo: "/login"
            })
            .otherwise({
                redirectTo: "/"
            });

        function isLoggedIn($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .isLoggedIn()
                .success(
                    function (user) {
                        if (user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }
    }

    function setPageTitle($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current) {
            $rootScope.title = current.$$route.title;
        });
    }

})();