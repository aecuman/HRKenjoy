app.service('CRUD_OperServicecaution', function ($http) {

    //Create new record  
    this.post = function (Caution) {
        var request = $http({
            method: "post",
            url: "/api/Cautions",
            data: Caution
        });
        return request;
    }

    //Get Single Records  
    this.get = function (Id) {
        return $http.get("/api/Cautions/" + Id);
    }

    //Get All Student  
    this.GetCautions = function () {
        return $http.get("/api/Cautions");
    }

    //Update the Record  
    this.put = function (Id, Caution) {
        var request = $http({
            method: "put",
            url: "/api/Cautions/" + Id,
            data: Caution
        });
        return request;
    }

    //Delete the Record  
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/Cautions/" + Id
        });
        return request;
    }
});
