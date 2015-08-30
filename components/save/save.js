/**
 * Created by Admin on 24-Jun-15.
 */
angular.module("myApp.save",[]).controller("SaveController",function($location,myAppService){
    this.page='User Page';
    this.go=function(task){
        this.contact = {
           chat : [{name :'text',message :['text']}] ,name : this.contact.name , email : this.contact.email, age : this.contact.age, password : this.contact.password,login : false
        };
        myAppService.saveContact(this.contact);
        $location.path(task);
        console.log(myAppService.allContacts())
    };
    this.reset=function(){
        this.contact.name=''
    }
});