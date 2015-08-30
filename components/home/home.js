/**
 * Created by Admin on 24-Jun-15.
 */
angular.module("myApp.home",[]).controller("HomeController",function($location){
    this.page='Home';
    this.go=function(tsk){
        $location.path(tsk)
    }
});
