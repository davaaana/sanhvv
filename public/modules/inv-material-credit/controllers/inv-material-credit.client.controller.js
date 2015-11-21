'use strict';

// Articles controller
angular.module('invMaterialCredit').controller('InvMaterialCreditController', ['$scope', '$stateParams', '$location', 'Authentication', 'InvMaterialCreditSrv','$http',
  function ($scope, $stateParams, $location, Authentication, InvMaterialCreditSrv,$http) {
    $scope.authentication = Authentication;

    $scope.date = new Date();
    $scope.invMaterialsCreate = [];
    $scope.types = [];
    $http.get('api/materials').success(function (res) {
        $scope.materialTypes = res;
      for(var i in $scope.materialTypes){
        $scope.types.push($scope.materialTypes[i]);
      }
    });

    $scope.createEdit = function (material) {
      $scope.types.push(material.materialType);
      $scope.type = material.materialType;
      $scope.unit = material.unit;
      $scope.qty = material.qty;
    };

    $scope.getMaterialName = function (id) {
      for(var i in $scope.materialTypes){
        if($scope.materialTypes[i]._id == id)
          return $scope.materialTypes[i].name;
      }
    }

      $http.get('api/unit').success(function (res) {
        $scope.units = res;
      });

    $http.get('api/product').success(function (res) {
      $scope.products = res;
    });
    $scope.createRemove = function (index,material) {
      $scope.types.push(material.materialType);
      $scope.invMaterialsCreate.splice(index, 1);
    };

    $scope.create = function () {
      // Create new Article object
      var materialType = new InvMaterialCreditSrv({
        date: this.date,
        measure: this.invMaterialsCreate,
        qty:this.pqty,
        unit:this.punit,
        product:this.product

      });

      // Redirect after save
      materialType.$save(function (response) {
        $location.path('rmd/' + response._id);

        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.invMaterialAdd = function (type, unit, qty) {
      //try{
      //  type = JSON.parse(type)
      //}catch(e){};

      if(type && unit && qty && qty > 0){
        var marge = false;
        var index = 0;
        var valid = true;
        console.log(type);
        for(var i in $scope.materialTypes){
          if($scope.materialTypes[i]._id == type._id){
            if($scope.materialTypes[i].qty < (qty * unit.qty)){
              valid = false;
              if($scope.materialTypes[i].qty == 0){
                alert('Үлдэгдэл '+$scope.materialTypes[i].qty+' байгаа тул та '+$scope.materialTypes[i].name+' материал дээр орлого хийнэ үү')
              }else{
                alert('Үлдэгдэл хүрэлцэхгүй байна боломжин хэмжээ ('+$scope.materialTypes[i].qty+')-Кг')
              }

            }
          }
        }
        if(valid == true){
          for(var i in $scope.invMaterialsCreate){
            if($scope.invMaterialsCreate[i].materialType == type){
              marge = true;
              index = i;
            }
          }
          if(marge == false){
            $scope.invMaterialsCreate.push({materialType:type,unit:unit,qty:qty});
          }else{
            $scope.invMaterialsCreate[index] = angular.extend({}, $scope.invMaterialsCreate[index], {materialType:type,unit:unit,qty:qty})
          }

          for (var i in $scope.types) {
            if ($scope.types[i]._id === type._id) {
              $scope.types.splice(i, 1);
            }
          }
        }
      }
    }

    // Remove existing Article
    $scope.remove = function (rawMaterialDebit) {
      if (rawMaterialDebit) {
        rawMaterialDebit.$remove();

        for (var i in $scope.rawMaterialDebits) {
          if ($scope.rawMaterialDebits[i] === rawMaterialDebit) {
            $scope.rawMaterialDebits.splice(i, 1);
          }
        }
      } else {
        $scope.rawMaterialDebit.$remove(function () {
          $location.path('rmd');
        });
      }
    };

    // Update existing Article
    $scope.update = function () {
      var rawMaterialDebit = $scope.rawMaterialDebit;

      rawMaterialDebit.$update(function () {
        $location.path('rmd/' + rawMaterialDebit._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.rawMaterialDebits = InvMaterialCreditSrv.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.rawMaterialDebit = InvMaterialCreditSrv.get({
        id: $stateParams.id
      });
    };
  }
]);
