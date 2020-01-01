angular.module('taskApp', [])
       .component('testComponent', {
           templateUrl:'testComponent.html',
           bindings: {
               hero: '='
           }
       })