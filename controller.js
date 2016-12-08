

var survivalequip = angular.module('survivalequip', ['firebase']);

survivalequip.controller('adminCtrl', function ($firebaseObject, $firebaseArray, $scope, $http, $rootScope, $timeout) {
  var config = 
  {
    apiKey: "AIzaSyDhAHrdhpIahI-bL4XB5dGHicp2djp15Rg",
    authDomain: "tendajitours-8d352.firebaseapp.com",
    databaseURL: "https://tendajitours-8d352.firebaseio.com",
    storageBucket: "tendajitours-8d352.appspot.com",
    messagingSenderId: "1002745063002"
  };
  firebase.initializeApp(config);



var ref = firebase.database().ref('ProductCategories');

$rootScope.choices = $firebaseArray(ref);


    $scope.send = function (frm1) {
        Materialize.toast('Uploading...', 2000)
        var myFile = $('#file').prop('files');
        var myFile = myFile[0];
        var filename = myFile.name;
        var storageRef = firebase.storage().ref('products/'+ frm1.category +'/'+ frm1.name +'/' + filename);

        var task = storageRef.put(myFile)
            .then(function (res) {
                var url = res.downloadURL
                var productFrm = firebase.database().ref('products/')
                productFrm.push({
                    name: frm1.name,
                    description: frm1.description,
                    image: url,
                    category : frm1.category
                })
                    .then(function (res) {
                        console.log(res)
                        Materialize.toast('Upload Successfull', 4000)
                        $rootScope.frm = null;
                    })
                    .catch(function (err) {
                        console.log(err)
                        Materialize.toast('Upload UnSuccessfull', 4000)
                    })
            })
            .catch(function (err) {

            });


    }


    $scope.addCategory = function (frm) {
        Materialize.toast('Saving new data...', 2000)
        $http({
            method: "POST",
            url: 'https://tendajitours-8d352.firebaseio.com/ProductCategories.json',
            data: frm,
        })
            .then(function (res) {
                console.log(res);
                $rootScope.frm = null;
                Materialize.toast('Data added Successfull', 2000)
            })
            .catch(function (err) {
                console.log(err);
                Materialize.toast('Error adding data to database', 2000)
            })
    }
})