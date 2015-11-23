app.controller('CRUD_OperControllerperfom', function ($scope, CRUD_OperServiceperfom, $timeout) {
    $scope.OperType = 1;
    //1 Mean New Entry  

    GetAllPerformances();
    //To Get All Records  
    function GetAllPerformances() {
        var promiseGet = CRUD_OperServiceperfom.GetPerformances();
        $scope.orderByField = '-loandatenow';
        promiseGet.success(function (data) { 
        $scope.Performance = data;
         
            $scope.filteredItems = $scope.Performance.length;
            $scope.totalItems = $scope.Performance.length;  // Total No. Of item in list.
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
    
        $scope.grading = "";
        $scope.Remarks = "";
        $scope.Pdatenow = "";

    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Performance = {
            Id: $scope.Id,
            nameid: $scope.nameid,
            grading: $scope.grading,
            Remarks: $scope.Remarks,
            Pdatenow: $scope.Pdatenow
        };
        if ($scope.OperType === 1) {
            var promisePost = CRUD_OperServiceperfom.post(Performance);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                GetAllPerformances();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Performance.Id = $scope.Id;

            var promisePut = CRUD_OperServiceperfom.put($scope.Id, Performance);
            promisePut.then(function (pl) {
                $scope.Message = "Student Updated Successfuly";
                GetAllPerformances();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //To Delete Record  
    $scope.delete = function (Performance) {
        var promiseDelete = CRUD_OperServiceperfom.delete(Performance.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Station Deleted Successfuly";
            GetAllPerformances();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //To Get Student Detail on the Base of Student ID  
    $scope.get = function (Performance) {
        var promiseGetSingle = CRUD_OperServiceperfom.GetPerformance(Performance.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.nameid = res.nameid;
            $scope.grading = res.grading;
            $scope.Remarks = res.Remarks;
            $scope.Pdatenow = res.Pdatenow;
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
       
        $scope.grading = "";
        $scope.Remarks = "";
        $scope.Pdatenow = "";
    }

});