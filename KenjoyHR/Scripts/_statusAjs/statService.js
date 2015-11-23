app.service('CRUD_OperService', function ($http) {

    //Create new record  
    this.post = function (Status) {
        var request = $http({
            method: "post",
            url: "/api/Status",
            data: Status
        });
        return request;
    }

    //Get Single Records  
    this.get = function (Id) {
        return $http.get("/api/Status/" + Id);
    }

    //Get All Student  
    this.GetStatus = function () {
        return $http.get("/api/Status");
    }

    //Update the Record  
    this.put = function (Id, Status) {
        var request = $http({
            method: "put",
            url: "/api/Status/" + Id,
            data: Status
        });
        return request;
    }

    //Delete the Record  
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/Status/" + Id
        });
        return request;
    }
});
