/**
 * Created by Admin on 24-Jun-15.
 */
 angular.module("myApp.edit",[]).controller("EditController",function(myAppService,$location,$firebaseArray,$timeout) {
     var vm =this;
     var ref = new Firebase("https://login-authentication.firebaseio.com/");
     var reff = new Firebase("https://login-authentication.firebaseio.com/user");
     vm.LogName = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.displayName:myAppService.user.google.displayName;
     vm.LogOutName = function (path) {
         var  matchFound = false;
         for (var i = 0; i < myAppService.allContacts().length; i++) {
             if (myAppService.user.uid === myAppService.allContacts()[i].uid) {
                 matchFound = true;
                 myAppService.allContacts().$remove(i ,1);
                 var ref = new Firebase("https://login-authentication.firebaseio.com/login");
                 ref.unauth();
                 $timeout(function () {
                     myAppService.chatUserUid  = null;
                     myAppService.chatUserName = null;
                     myAppService.chatSelectName = null;
                     myAppService.user = null;
                     myAppService.selectId = null;
                 },500);
                 $location.path(path);
                 break;
             }
         }
         if(matchFound === false) {
             alert('Some Error')
         }
     };
     vm.arrayInfo = $firebaseArray(reff);
     vm.selfUser = myAppService.user;
     vm.arrayUser = null;
     vm.seletedUserName = 'Chat Box';
     vm.seletedUserUid = '';
     vm.userName = '';
     var num1 = 0, num2 = 0, number = 0;
     vm.arrayFun = function (s) {
         vm.arrayUser = [];
         num1 = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.cachedUserProfile.id:myAppService.user.google.cachedUserProfile.id;
         num2 = (s.auth.provider  === 'facebook') ? s.facebook.cachedUserProfile.id:s.google.cachedUserProfile.id;
         vm.seletedUserName  = (s.auth.provider  === 'facebook') ? s.facebook.displayName:s.google.displayName;
         number = parseInt(num1)+parseInt(num2);
         vm.userName = num2;
         vm.seletedUserUid = s.uid;
         var ref = new Firebase("https://login-authentication.firebaseio.com/message/" +number);
         vm.arrayUser = $firebaseArray(ref);
     };
     this.sendMessage = function(message){
         if(vm.message &&  vm.userName){
             num1 = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.cachedUserProfile.id:myAppService.user.google.cachedUserProfile.id;
             number = parseInt(num1)+parseInt(vm.userName);
             var ref = new Firebase("https://login-authentication.firebaseio.com/message/" +number);
             ref.push({name : vm.LogName ,message :message});
             vm.message= '';
         }
     };
this.updateContact=function(path){
    myAppService.number = null;
        $location.path(path);
    }
    }).directive('scrollbottom', scrollbottom);
function scrollbottom() {
    return {
        restrict: 'A',
        priority: 1,
        scope: {},
        link: function(scope, element, attrs){

            scope.$watch( function(){
                return element[0].scrollHeight;
            }, function(){
                scrollToBottom();
            });

            function scrollToBottom() {
                element[0].scrollTop = element[0].scrollHeight;
            }
        }
    }
}
/*
this.update= function (path) {

    this.get.$save(this.person)
    this.get[$routeParams.id].name=this.name;
    this.get[$routeParams.id].age=this.age;
    this.get[$routeParams.id].email=this.email;
    this.get[$routeParams.id].pass=this.pass
    $location.path(path)
}*/
