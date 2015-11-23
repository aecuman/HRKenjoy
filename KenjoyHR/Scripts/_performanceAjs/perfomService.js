app.service('CRUD_OperServiceperfom', function ($http) {

    //Create new record  
    this.post = function (Performance) {
        var request = $http({
            method: "post",
            url: "/api/Performances",
            data: Performance
        });
        return request;
    }

    //Get Single Records  
    this.GetPerformance = function (Id) {
        return $http.get("/api/Performances/" + Id);
    }

    //Get All Student  
    this.GetPerformances = function () {
        return $http.get("/api/Performances");
    }

    //Update the Record  
    this.put = function (Id, Performance) {
        var request = $http({
            method: "put",
            url: "/api/Performances/" + Id,
            data: Performance
        });
        return request;
    }

    //Delete the Record  
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/Performances/" + Id
        });
        return request;
    }
});
