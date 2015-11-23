app.controller('CRUD_OperControllerloan', function ($scope, CRUD_OperServiceloan,$timeout) {
    $scope.OperType = 1;
    //1 Mean New Entry  

    GetAllLoans();
    //To Get All Records  
    function GetAllLoans() {
        var promiseGet = CRUD_OperServiceloan.GetLoans();
        $scope.orderByField = '-loandatenow';
        promiseGet.success(function (data) {
            $scope.Loan = data;
            $scope.filteredItems = $scope.Loan.length;
            $scope.totalItems = $scope.Loan.length;  // Total No. Of item in list.
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
     
        $scope.loanamount = "";
        $scope.loanperiod = "";
        $scope.loanreaason = "";
        $scope.loanremarks = "";
        $scope.loandatenow = "";

    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Loan = {
            Id: $scope.Id,
            loadnameid: $scope.loadnameid,
            loanamount: $scope.loanamount,
            loanperiod: $scope.loanperiod,
            loanreaason: $scope.loanreaason,
            loanremarks: $scope.loanremarks,
            loandatenow: $scope.loandatenow
        };
        if ($scope.OperType === 1) {
            var promisePost = CRUD_OperServiceloan.post(Loan);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                GetAllLoans();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Loan.Id = $scope.Id;

            var promisePut = CRUD_OperServiceloan.put($scope.Id, Loan);
            promisePut.then(function (pl) {
                $scope.Message = "Student Updated Successfuly";
                GetAllLoans();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //To Delete Record  
    $scope.delete = function (Loan) {
        var promiseDelete = CRUD_OperServiceloan.delete(Loan.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Station Deleted Successfuly";
            GetAllLoans();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //To Get Student Detail on the Base of Student ID  
    $scope.get = function (Loan) {
        var promiseGetSingle = CRUD_OperServiceloan.GetLoan(Loan.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.loadnameid = res.loadnameid;
            $scope.loanamount = res.loanamount;
            $scope.loanperiod = res.loanperiod;
            $scope.loanreaason = res.loanreaason;
            $scope.loanremarks = res.loanremarks;
            $scope.loandatenow = res.loandatenow;
           
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
     
        $scope.loanamount = "";
        $scope.loanperiod = "";
        $scope.loanreaason = "";
        $scope.loanremarks = "";
        $scope.loandatenow = "";
    }

});