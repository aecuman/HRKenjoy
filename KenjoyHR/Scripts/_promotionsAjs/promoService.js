app.service('CRUD_OperServicepromo', function ($http) {

    //Create new record  
    this.post = function (Promotion) {
        var request = $http({
            method: "post",
            url: "/api/Promotions",
            data: Promotion
        });
        return request;
    }

    //Get Single Records  
    this.GetPromotion = function (Id) {
        return $http.get("/api/Promotions/" + Id);
    }

    //Get All Student  
    this.GetPromotions = function () {
        return $http.get("/api/Promotions");
    }

    //Update the Record  
    this.put = function (Id, Promotion) {
        var request = $http({
            method: "put",
            url: "/api/Promotions/" + Id,
            data: Promotion
        });
        return request;
    }

    //Delete the Record  
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/Promotions/" + Id
        });
        return request;
    }
});
