/**
 * Created by Admin on 23-Jun-15.
 */
angular.module("myApp").controller("myAppController",function($router,$location){
    this.location = $location;
    $router.config([
        {path : "/", redirectTo :'/login'},
        {path : "/login", component : 'login'},
        {path : "/view", component : 'edit'}
    ])
});