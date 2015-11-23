app.service('CRUD_OperServiceloan', function ($http) {

    //Create new record  
    this.post = function (Loan) {
        var request = $http({
            method: "post",
            url: "/api/Loans",
            data: Loan
        });
        return request;
    }

    //Get Single Records  
    this.GetLoan = function (Id) {
        return $http.get("/api/Loans/" + Id);
    }

    //Get All Student  
    this.GetLoans = function () {
        return $http.get("/api/Loans");
    }

    //Update the Record  
    this.put = function (Id, Loan) {
        var request = $http({
            method: "put",
            url: "/api/Loans/" + Id,
            data: Loan
        });
        return request;
    }

    //Delete the Record  
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: "/api/Loans/" + Id
        });
        return request;
    }
});
