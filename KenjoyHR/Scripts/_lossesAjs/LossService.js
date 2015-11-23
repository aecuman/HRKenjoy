app.service('CRUD_OperServiceloss', function ($http) {

    //Create new record  
    this.post = function (Loss) {
        var request = $http({
            method: "post",
            url: "/api/Losses",
            data: Loss
        });
        return request;
    }

    //Get Single Records  
    this.GetLoss = function (Id) {
        return $http.get("/api/Losses/" + Id);
    }

    //Get All Student  
    this.GetLosses = function () {
        return $http.get("/api/Losses");
    }

    //Update the Record  
    this.put = function (Id, Loss) {
        var request = $http({
            method: "put",
            url: "/api/Losses/" + Id,
            data: Loss
        });
        return request;
    }

    //Delete the Record  
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/Losses/" + Id
        });
        return request;
    }
});
