app.controller('CRUD_OperControllerpromo', function ($scope, CRUD_OperServicepromo,$timeout) {
    $scope.OperType = 1;
    //1 Mean New Entry  

    GetAllPromotions();
    //To Get All Records  
    function GetAllPromotions() {
        var promiseGet = CRUD_OperServicepromo.GetPromotions();
        $scope.orderByField = '-promodatenow';
        promiseGet.success(function (data) {
            $scope.Promotion = data;      
            $scope.filteredItems = $scope.Promotion.length;
            $scope.totalItems = $scope.Promotion.length;  // Total No. Of item in list.
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

        $scope.promoto = "";
        $scope.promofrom = "";
        $scope.promotodate = "";
        $scope.promodatenow = "";

    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Promotion = {
            Id: $scope.Id,
            promonameid: $scope.promonameid,
            promoto: $scope.promoto,
            promofrom: $scope.promofrom,
            promotodate: $scope.promotodate,
            promodatenow: $scope.promodatenow
        };
        if ($scope.OperType === 1) {
            var promisePost = CRUD_OperServicepromo.post(Promotion);
            promisePost.then(function (pl) {
                $scope.Id = pl.data.Id;
                GetAllPromotions();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Promotion.Id = $scope.Id;

            var promisePut = CRUD_OperServicepromo.put($scope.Id, Promotion);
            promisePut.then(function (pl) {
                $scope.Message = "Student Updated Successfuly";
                GetAllPromotions();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //To Delete Record  
    $scope.delete = function (Promotion) {
        var promiseDelete = CRUD_OperServicepromo.delete(Promotion.Id);
        promiseDelete.then(function (pl) {
            $scope.Message = "Station Deleted Successfuly";
            GetAllPromotions();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //To Get Student Detail on the Base of Student ID  
    $scope.get = function (Promotion) {
        var promiseGetSingle = CRUD_OperServicepromo.GetPromotion(Promotion.Id);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.Id = res.Id;
            $scope.promonameid = res.promonameid;
            $scope.promoto = res.promoto;
            $scope.promofrom = res.promofrom;
            $scope.promotodate = res.promotodate;
            $scope.promodatenow = res.promodatenow;
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
      
        $scope.promoto = "";
        $scope.promofrom = "";
        $scope.promotodate = "";
        $scope.promodatenow = "";
    }

});