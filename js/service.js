/**
 * Created by Admin on 23-Jun-15.
 */
angular.module("myApp").service("myAppService",function($firebaseArray,$timeout){
    var vm =this;
    vm.number = null;
    vm.user = null;
    vm.loginId = null;
    vm.loginName = '';
    var firebaseApp = new Firebase('https://login-authentication.firebaseio.com/user');
    var contacts=$firebaseArray(firebaseApp);
    this.saveContact=function(task){
        contacts.$add(task)
    };
    this.allContacts=function(){
        return contacts;
    };
    /*this.edit=function(task){
        contacts.$save(task)
    }*/
}).factory('Chats', function($firebaseArray,myAppService) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var ref = new Firebase ('https://login-authentication.firebaseio.com/user');
    var chats = $firebaseArray(ref);
    return {
        all: function() {
            return chats;
        },
        push: function(id,arr) {
            for (var i = 0; i < myAppService.allContacts().length; i++) {
                    if (parseInt(id) === myAppService.allContacts()[i]) {
                        myAppService.allContacts()[i].chat.push(arr);
                        myAppService.allContacts().$save(i);
                       continue;
                    }
                    if (myAppService.loginName === myAppService.allContacts()[i].name) {
                        myAppService.allContacts()[i].chat.push(arr);
                        myAppService.allContacts().$save(i);
                    }
                }

        },
        check: function() {
            for (var i = 0; i < myAppService.allContacts().length; i++) {
                if (myAppService.loginName === myAppService.allContacts()[i].name) {
                    myAppService.loginId = myAppService.allContacts()[i].$id;
                    myAppService.allContacts().$save(i);
                    break;
                }
        }},
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].$id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        checkId: function() {
            var matchFound = false;
            for (var i = 0; i < myAppService.allContacts().length; i++) {
                for (var j = 0; j < myAppService.allContacts()[i].chat.length; j++) {
                    if (myAppService.loginId !== myAppService.allContacts()[i].chat[j].name) {
                        matchFound = true;
                        myAppService.allContacts()[i].chat.push({name: myAppService.loginId,message : ['text']});
                        myAppService.allContacts().$save(i);
                        break;
                    }
                }}
            if(matchFound === false) {
                alert('Some Error');
            }
        },
        checkLogin: function() {
            var matchFound = false;
            for (var k = 0; k < myAppService.allContacts().length; k++) {
                for (var z = 0; z < myAppService.allContacts()[k].chat.length; z++) {
                    if (myAppService.id !== myAppService.allContacts()[k].chat[z].name) {
                        matchFound = true;
                        myAppService.allContacts()[k].chat.push({name: myAppService.id,message : ['text']});
                        myAppService.allContacts().$save(k);
                        break;
                    }
                }}
            if(matchFound === false) {
                alert('Some Error');
            }
        }
    };
});