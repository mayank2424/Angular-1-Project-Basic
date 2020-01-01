angular.module('taskApp', [])
       .controller('taskController',function(){
           var taskList = this;
           //task storage
           taskList.flag = false;
           taskList.tasksText = '';
           taskList.tasks = [
               {id:1,text:'Task 1', status:'On going', comp:false},
               {id:2,text: 'task 2', status:'On testing', comp:true}
           ];

           //add tasks
          taskList.addTask = function() {
            console.log(taskList.tasksText)
            taskList.tasksText !== '' ? (taskList.tasks.push({id:taskList.tasks.length +1 ,text:taskList.tasksText, status:'Yet to start', comp:false}),taskList.flag = false):taskList.flag = true;
            taskList.tasksText = ''
          };
          
          taskList.remaining = function() {
              var count = 0;
              angular.forEach(taskList.tasks, (task) => {
                  count += task.comp ? 0 : 1;
              });
              return count;
          }
          taskList.delete = function(task) {
              console.log(task);
              taskList.tasks = taskList.tasks.filter(el => el.id != task.id)
            //   taskList.tasks.pop(task.id);
          }
       })

    //    .directive('testDirective',() => {
    //        return {
    //            templateUrl:'directive.html'
    //         //    template: 'Title:Test Directive, Details:Simple Directive'
    //        }
    //    })
       .controller('c2',['$scope', function($scope) {
           $scope.double =  value => value * 2;
       }])

       .controller('c3', ['$scope', function($scope) {
           $scope.value = 0;
           $scope.error = false;

           $scope.inc = function() {
               $scope.value++;
           }
           $scope.dec = function() {{
               $scope.value--;
           }}
           $scope.reset = function() {
               $scope.value = 0;
           }
       }])

       .controller('c4',['$scope', 'notify', function($scope, notify) {
           $scope.call = function(msg) {
               notify(msg)
           }
       }]).
       factory('notify', ['$window', function(win) {
           var msgs = [];
           return function(msg) {
               msgs.push(msg);
               if(msgs.length === 3) {
                   win.alert(msgs.join('\n'));
                   msgs=[];
               }
           }
       }])

       .controller('c5', ['$scope','$rootScope', function($scope, $rootScope) {
           $scope.name = 'World';
           $rootScope.title = 'Title Root'
           $rootScope.names = ['1','2','3']
       }])

       .controller('c6', ['$scope', function($scope) {
           $scope.names = ['name1', 'name2', 'name3'];
       }])

       .controller('c7', ['$scope', function($scope){
           $scope.count= 0;
           $scope.$on('Mevent', function() {
               $scope.count++;
           }) 
       }])


       .controller('filt', ['filterFilter', function (filterFilter){
           this.name='hello';
           this.arr = [
               'a',
               'aa',
               'b',
               'c',
               'bad',
               'dab',
               'deb'
           ]
           this.filteredArray = filterFilter(this.arr, 'a');
       }])

       
      
       
       .controller('c11', ['$scope', function($scope) {
           $scope.master = {}


           $scope.save = function(user) {
               console.log(user)
               $scope.master = angular.copy(user);
           }

           $scope.reset = function() {
               $scope.user = angular.copy($scope.master)
           }

           $scope.reset();
        
       }])

       .controller('c12', ['$scope', function($scope) {
           $scope.master = {};

           $scope.save = function(user) {
               $scope.master = angular.copy(user);
           }

           $scope.reset = function(form) {
              if(form) {
                  form.$setPristine();
                  form.$setUntouched();
              }
              $scope.user = angular.copy($scope.master);
           }

           $scope.reset();
       }])

       .directive('integer', () => {
           var intExp = /^-?\d+$/
           return {
               require:'ngModel',
               link:function(scope, elm ,attrs, ctrl) {
                   ctrl.$validators.integer = function(modelValue, viewValue) {
                       if(ctrl.$isEmpty(modelValue)) {
                           return true;
                       }

                       if(intExp.test(viewValue)) {
                           console.log(viewValue)
                           return true;
                       }

                       return false;
                   }
               }
           }
       })
       .controller('c13', ['$scope', function($scope) {
           $scope.t1 = {name:'test1', address:'xyz'}
           $scope.t2 = {name:'test2', address:'abc'}
       }])
       .directive('myCustomer',function() {
           return  {
               restrict: 'E',
               scope:{
                    customerInfo: '=info'
               },
            //    templateUrl:'./directive.html'
           }
       })
       

       .service('getMessage', function() {
           this.get = function() {
               return 'This is a get message service';
           }
       })

       .controller('serviceController', function($scope, getMessage) {
           $scope.message = getMessage.get();
       })

       .controller('componentController', function componentController() {
           this.hero = {
               name:'Component'
           }
       })

       .component('testComponent', {
        templateUrl:'testComponent.html',
        bindings: {
            hero: '='
        }
    })