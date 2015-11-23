app.controller('CRUD_OperControllerloss', function ($scope, CRUD_OperServiceloss, $timeout) {
    $scope.OperType = 1;
    //1 Mean New Entry  

    GetAllLosses();
    //To Get All Records  
    function GetAllLosses() {
        var promiseGet = CRUD_OperServiceloss.GetLosses();
        $scope.orderByField = '-lossdatenow';
        promiseGet.success(function (data) {
            $scope.Loss = data;
            $scope.filteredItems = $scope.Loss.length;
            $scope.totalItems = $scope.Loss.length;  // Total No. Of item in list.
            $scope.PerPageItems = 5;  // Intially Set 5 Items to display on page.
            $scope.currentPage = 1;
        },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
        $scope.filter = function () {
            $timeout(function () {
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        }
    }

    //To Clear all input controls.  
    function ClearModels() {
        $scope.OperType = 1;
        $scope.Id = "";
     
        $scope.Type = "";       
        $scope.lossremarks = "";
        $scope.lossdatenow = "";

    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Loss = {
            Id:$scope.Id,
            lossnameid:$scope.lossnameid,
            Type:$scope.Type,          
            lossremarks:$scope.lossremarks,
            lossdatenow:$scope.lossdatenow
        };
        if ($scope.OperType === 1) {
            var promisePost = CRUD_OperServiceloss.post(Loss);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                GetAllLosses();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Loss.Id = $scope.Id;
            var promisePut = CRUD_OperServiceloss.put($scope.Id, Loss);
            promisePut.then(function (pl) {
                $scope.Message = "Student Updated Successfuly";
                GetAllLosses();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //To Delete Record  
    $scope.delete = function (Loss) {
        var promiseDelete = CRUD_OperServiceloss.delete(Loss.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Station Deleted Successfuly";
            GetAllLosses();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //To Get Student Detail on the Base of Student ID  
    $scope.get = function (Loss) {
        var promiseGetSingle = CRUD_OperServiceloss.GetLoss(Loss.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.lossnameid = res.lossnameid;
            $scope.Type = res.Type;            
            $scope.lossremarks = res.lossremarks;
            $scope.lossdatenow = res.lossdatenow;

            $scope.OperType = 0;
        },
                  function (errorPl) {
                      console.log('Some Error in Getting Details', errorPl);
                  });
    }

    //To Clear all Inputs controls value.  
    $scope.clear = function () {
        $scope.OperType = 1;
        $scope.Id = "";
       
        $scope.Type = "";
        $scope.lossremarks = "";
        $scope.lossdatenow = "";
    }

});