var app = angular.module("LundiMatinTest", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "layouts/list.html"
        })
        .when("/view/:id", {
            templateUrl: "layouts/view.html"
        })
        .when("/edit/:id", {
            templateUrl: "layouts/edit.html"
        });
});

app.controller('ClientController', function ($scope, $http) {
    $scope.fields = {
        "id": "ID",
        "nom": "Name",
        "date_creation": "Date created",
        "email": "Email",
        "tel": "Phone",
        "adresse": "Address",
        "code_postal": "Postal code",
        "ville": "City"
    };

    $scope.editableFields = [
        'nom', 'email', 'tel',
        'adresse', 'code_postal', 'ville'
    ];

    $scope.load = function () {
        $scope.clients = [];
        $http.get(`/api/proxy.php`).then(function (response) {
            $scope.clients = response.data.datas;
        });
    }

    $scope.load();
});

app.controller('ViewClientController', function ($scope, $http, $routeParams) {
    $scope.client = {};
    $http.get(`/api/proxy.php?id=${$routeParams.id}`).then(function (response) {
        $scope.client = response.data.datas;
    });
});

app.controller('EditClientController', function ($scope, $http, $routeParams, $location) {
    $scope.client = {};
    $http.get(`/api/proxy.php?id=${$routeParams.id}`).then(function (response) {
        $scope.client = response.data.datas;
    });

    $scope.update = function () {
        $http.put(`/api/proxy.php?id=${$routeParams.id}`, $scope.client).then(function () {
            $scope.load();
            $location.path('/');
        });
    }
});