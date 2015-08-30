/**
 * Created by FAQ on 7/29/2015.
 */
 angular.module("myApp.login",[]).controller("LoginController",function($location,myAppService,$timeout,$firebaseArray){
    this.page='User Page';
     var ref = new Firebase("https://login-authentication.firebaseio.com/user");
     var reff = new Firebase("https://login-authentication.firebaseio.com/record");
     var recordArray = $firebaseArray(reff);
     var loginArray = $firebaseArray(ref);
     this.loginWithFacebook = function (path) {
         ref.authWithOAuthPopup("facebook", function(error, authData) {
             if (error) {
                 console.log("Login Failed!", error);
             } else {
                 console.log("Authenticated successfully with payload:", authData.uid);
                 $timeout(function () {
                     myAppService.user=authData;
                     var matchFound = false;
                     for(var i = 0 ; i < myAppService.allContacts().length;i++){
                         if(myAppService.user.uid === myAppService.allContacts()[i].uid){
                             matchFound = true;
                             console.log('true');
                             myAppService.getTrue = true;
                             $location.path(path);
                             break;
                         }

                     } if(matchFound === false) {
                         ref.push(myAppService.user);
                         myAppService.getTrue = true;
                         $location.path(path);
                     }
                     for(var j = 0 ; j < recordArray.length;j++){
                         if(myAppService.user.uid === recordArray[j].uid){
                             matchFound = true;
                             myAppService.getTrue = true;
                             console.log('true');
                             break;
                         }

                     } if(matchFound === false) {
                         reff.push(myAppService.user);
                         myAppService.getTrue = true;
                         myAppService.chatUserUid = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.displayName:myAppService.user.google.displayName;
                         myAppService.chatUserName = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.displayName:myAppService.user.google.displayName;
                     }
                 } ,500);
             }})};
     this.loginWithGoogle = function (path) {
         ref.authWithOAuthPopup("google", function(error, authData) {
             if (error) {
                 console.log("Login Failed!", error);
             } else {
                 console.log("Authenticated successfully with payload:", authData.uid);
                 $timeout(function () {
                     myAppService.user=authData;
                     var matchFound = false;
                     for(var i = 0 ; i < myAppService.allContacts().length;i++){
                         if(myAppService.user.uid === myAppService.allContacts()[i].uid){
                             matchFound = true;
                             console.log('true');
                             myAppService.getTrue = true;
                             $location.path(path);
                             break;
                         }

                     } if(matchFound === false) {
                         myAppService.saveContact(myAppService.user);
                         myAppService.getTrue = true;
                         $location.path(path);
                     }
                     for(var j = 0 ; j < recordArray.length;j++){
                         if(myAppService.user.uid === recordArray[j].uid){
                             matchFound = true;
                             console.log('true');
                             myAppService.getTrue = true;
                             break;
                         }

                     } if(matchFound === false) {
                         reff.push(myAppService.user);
                         myAppService.getTrue = true;
                         myAppService.chatUserUid = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.displayName:myAppService.user.google.displayName;
                         myAppService.chatUserName = (myAppService.user.auth.provider  === 'facebook') ? myAppService.user.facebook.displayName:myAppService.user.google.displayName;
                     }
                 } ,500);
                 }})};
    this.go=function(task){
        var matchFound = false;
        for(var i = 0 ; i < myAppService.allContacts().length;i++){
            if(this.contact.email.toLowerCase() === myAppService.allContacts()[i].email.toLowerCase() &&this.contact.password.toLowerCase() === myAppService.allContacts()[i].password.toLowerCase()){
                matchFound = true;
                myAppService.loginName = myAppService.allContacts()[i].name;
                myAppService.allContacts()[i].login = true;
                myAppService.allContacts().$save(i);
                $location.path(task);
                break;
            }


    } if(matchFound === false) {
            alert('Some Error');
        }

    };
    this.reset=function(){
        this.contact.name=''
    }
});