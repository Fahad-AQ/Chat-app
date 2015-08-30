/**
 * Created by Admin on 24-Jun-15.
 */
angular.module("myApp.view",[]).controller("ViewController",function($location,Chats,myAppService,$window,$timeout){
    var vm =this;
    this.showContact=myAppService.allContacts();
    this.userName = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.displayName:myAppService.user.google.displayName;
    this.selfUser = myAppService.user;
    this.LogOutName = myAppService.loginName;
    this.LogOutName = function (path) {
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
    this.getIndex= function(id,path){
        $location.path('/view');
        myAppService.number = null;
        myAppService.selectId = null;
        myAppService.chatSelectName = null;
        myAppService.selectId = id;
        $timeout(function () {
            myAppService.chatSelectName =(myAppService.selectId.auth.provider  === 'facebook') ? myAppService.selectId.facebook.displayName:myAppService.selectId.google.displayName;
            var number1 = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.cachedUserProfile.id:myAppService.user.google.cachedUserProfile.id;
            var number2 = (myAppService.selectId.auth.provider  === 'facebook') ? myAppService.selectId.facebook.cachedUserProfile.id:myAppService.selectId.google.cachedUserProfile.id;
            myAppService.number = parseInt(number1)+parseInt(number2);
            $location.path(path);
        },500);
    };
    this.go = function(path,name) {
        var matchFound = false;
        for (var i = 0; i < myAppService.allContacts().length; i++) {
            if (name === myAppService.allContacts()[i].name.toLowerCase()) {
                matchFound = true;
                myAppService.allContacts()[i].login = false;
                myAppService.allContacts().$save(i);
                $location.path(path);
                break;
            }
        }
        if(matchFound === false) {
            alert('Some Error')
        }
    };
});