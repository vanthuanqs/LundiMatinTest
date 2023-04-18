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

app.controller('ClientController', function ($scope) {
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

    $scope.clients = [
        {"id": "C-00003"},
        {"id": "C-00004"}
    ];
});

app.controller('ViewClientController', function ($scope, $routeParams) {
    console.log($routeParams);
    $scope.client = {};
    $http.get(`/api/proxy.php/${$routeParams.id}`).then(function (response) {
        $scope.client = response.data;
    });
});

app.controller('EditClientController', function ($scope, $routeParams) {
    console.log($routeParams);
    $scope.client = {
        "id": "C-00003",
        "nom": "Matliu 3 v7",
        "date_creation": "2015-12-11 08:40:44",
        "email": "1ahmed.biaou@example.com",
        "tel": "12345",
        "adresse": "11519 avenue villeneuve d'angouleme",
        "code_postal": "34070",
        "ville": "Bézier"
    };
});