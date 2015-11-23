app.controller('CRUD_OperControllerabs', function ($scope, CRUD_OperServiceabs,$timeout) {
    $scope.OperType = 1;
    //1 Mean New Entry  

    GetAllAbsentees();
    //To Get All Records  
    function GetAllAbsentees() {
        var promiseGet = CRUD_OperServiceabs.GetAbsents();
        $scope.orderByField = '-absentnowtime';
        promiseGet.success(function (data) {
            $scope.Absent = data;
            $scope.filteredItems = $scope.Absent.length;
            $scope.totalItems = $scope.Absent.length;  // Total No. Of item in list.
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
      
        $scope.absentreason = "";
        $scope.absentremarks = "";
        $scope.absentnowtime = "";

    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Absent = {
            Id: $scope.Id,
            absentnameid: $scope.absentnameid,
            absentreason: $scope.absentreason,
            absentremarks: $scope.absentremarks,
            absentnowtime: $scope.absentnowtime
        };
        if ($scope.OperType === 1) {
            var promisePost = CRUD_OperServiceabs.post(Absent);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                GetAllAbsentees();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Absent.Id = $scope.Id;

            var promisePut = CRUD_OperServiceabs.put($scope.Id, Absent);
            promisePut.then(function (pl) {
                $scope.Message = "Student Updated Successfuly";
                GetAllAbsentees();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //To Delete Record  
    $scope.delete = function (Absent) {
        var promiseDelete = CRUD_OperServiceabs.delete(Absent.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Station Deleted Successfuly";
            GetAllAbsentees();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //To Get Student Detail on the Base of Student ID  
    $scope.get = function (Absent) {
        var promiseGetSingle = CRUD_OperServiceabs.get(Absent.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.absentnameid = res.absentnameid;
            $scope.absentreason = res.absentreason;
            $scope.absentremarks = res.absentremarks;
            $scope.absentnowtime = res.absentnowtime;
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
       
        $scope.absentreason = "";
        $scope.absentremarks = "";
        $scope.absentnowtime = "";
    }

});