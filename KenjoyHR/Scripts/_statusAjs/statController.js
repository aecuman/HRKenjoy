app.controller('CRUD_OperController', function ($scope, CRUD_OperService,$timeout) {
    $scope.OperType = 1;
    //1 Mean New Entry  

    GetAllRecords();
    //To Get All Records  
    function GetAllRecords() {
        var promiseGet = CRUD_OperService.GetStatus();
        $scope.orderByField = '-statenow';
        promiseGet.success(function (data) {
          
            $scope.Status = data;
            $scope.filteredItems = $scope.Status.length;
            $scope.totalItems = $scope.Status.length;  // Total No. Of item in list.
            $scope.PerPageItems = 5;  // Intially Set 5 Items to display on page.
            $scope.currentPage = 1;   // set the Intial currnet page
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
      
        $scope.stat = "";
        $scope.statenow = "";
       
    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Status = {
            Id:$scope.Id,
            statnameid: $scope.statnameid,
            stat: $scope.stat,
            statenow: $scope.statenow
        };
        if ($scope.OperType === 1) {
            var promisePost = CRUD_OperService.post(Status);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                GetAllRecords();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Status.Id = $scope.Id;
           
            var promisePut = CRUD_OperService.put($scope.Id, Status);
            promisePut.then(function (pl) {
                $scope.Message = "Student Updated Successfuly";
                GetAllRecords();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //To Delete Record  
    $scope.delete = function (Status) {
        var promiseDelete = CRUD_OperService.delete(Status.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Station Deleted Successfuly";
            GetAllRecords();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //To Get Student Detail on the Base of Student ID  
    $scope.get = function (Status) {
        var promiseGetSingle = CRUD_OperService.get(Status.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.statnameid = res.statnameid;
            $scope.stat = res.stat;
            $scope.statenow = res.statenow;       
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
        $scope.stat = "";
        $scope.statenow = "";
    }

});