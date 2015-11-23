app.service('CRUD_OperServiceabs', function ($http) {

    //Create new record  
    this.post = function (Absent) {
        var request = $http({
            method: "post",
            url: "/api/Absent",
            data: Absent
        });
        return request;
    }

    //Get Single Records  
    this.get = function (Id) {
        return $http.get("/api/Absent/" + Id);
    }

    //Get All Absentees  
    this.GetAbsents = function () {
        return $http.get("/api/Absent");
    }

    //Update the Record  
    this.put = function (Id, Absent) {
        var request = $http({
            method: "put",
            url: "/api/Absent/" + Id,
            data: Absent
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
