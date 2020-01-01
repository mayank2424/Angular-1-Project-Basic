angular.module('serverApp', [])
       .controller('serverController', function($scope,httpService) {
           $scope.Err = '';
           $scope.loading = false;
           $scope.dataFetched = false;
           $scope.clicked = true;
           $scope.getDataId = 1;
          $scope.getData = function() {
              console.log("Called");
             
               $scope.loading = true;
               httpService.getTodos($scope.getDataId)
               .then(function(response){
                   $scope.loading = false;
                   $scope.dataFetched = true;
                   $scope.Data = response;
               }) 
               .catch(function(err) {
                   console.log(err);
                   $scope.isErr = true;
                   $scope.Err = err
               })
          }

          $scope.updateData = function(inputData) {
              console.log("Update API Called");
              $scope.loading = true;
              let data = {
                  id:$scope.getDataId,
                  userId:1,
                  title:inputData.title,
                  body:inputData.body
              }
              httpService.postService(data)
              .then(function(res) {
                $scope.loading = false;
                $scope.dataFetched = true;
                $scope.Data = res;
              })
              .catch(function(err) {
                  console.log(err);
              })
          }
       })
       .service('httpService',function($http) {
           return {
               getTodos:function(id) {
                   return $http.get(`http://localhost:5000/post/${id}`)
                    .then((res) => {
                        console.log('Get Result', res);
                        return res.data;
                    })
               },
               postService:function(data) {
                   return $http.post(`http://localhost:5000/post/${data.id}`,
                    {
                        data:{
                         id:data.id,
                         title:data.title,
                         text:data.body,
                        },
                        headers:{
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                   .then(res => res.data)
                   .catch(err => err)
               }
           }
       })