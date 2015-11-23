app.controller('CRUD_OperControllercaution', function ($scope, CRUD_OperServicecaution,$timeout) {
    $scope.OperType = 1;
    //1 Mean New Entry  

    GetAllCautions();
    //To Get All Records  
    function GetAllCautions() {
        var promiseGet = CRUD_OperServicecaution.GetCautions();
        $scope.orderByField = '-cautionnowdate';
        promiseGet.success(function (data) {
            $scope.Caution = data;
            $scope.filteredItems = $scope.Caution.length;
            $scope.totalItems = $scope.Caution.length;  // Total No. Of item in list.
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
       
        $scope.cautionremarks = "";
        $scope.cautionnowdate = "";

    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Caution = {
            Id: $scope.Id,
            cautionnameid: $scope.cautionnameid,
            cautionremarks: $scope.cautionremarks,
            cautionnowdate: $scope.cautionnowdate
        };
        if ($scope.OperType === 1) {
            var promisePost = CRUD_OperServicecaution.post(Caution);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                GetAllCautions();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Caution.Id = $scope.Id;

            var promisePut = CRUD_OperServicecaution.put($scope.Id, Caution);
            promisePut.then(function (pl) {
                $scope.Message = "Student Updated Successfuly";
                GetAllCautions();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //To Delete Record  
    $scope.delete = function (Caution) {
        var promiseDelete = CRUD_OperServicecaution.delete(Caution.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Station Deleted Successfuly";
            GetAllCautions();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //To Get Student Detail on the Base of Student ID  
    $scope.get = function (Caution) {
        var promiseGetSingle = CRUD_OperServicecaution.get(Caution.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.cautionnameid = res.cautionnameid;
            $scope.cautionremarks = res.cautionremarks;
            $scope.cautionnowdate = res.cautionnowdate;
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
     
        $scope.cautionremarks = "";
        $scope.cautionnowdate = "";
    }

});