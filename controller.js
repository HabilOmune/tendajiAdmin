

var survivalequip = angular.module('survivalequip', ['firebase']);

survivalequip.controller('adminCtrl', function ($firebaseObject, $firebaseArray, $scope, $http, $rootScope, $timeout) {
 
 $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
    }
  );
 
$scope.setProduct = function(key){
    $scope.selectedId = key;
    console.log(key);
}

 $scope.delete = function(){

 }
 
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

var ref = firebase.database().ref('products');
$rootScope.products= $firebaseArray(ref);

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




$scope.setProduct = function(value){
$rootScope.productToDelete = value.$id;
}


$scope.deleteProduct = function(){
      Materialize.toast('Removing', 2000);
    var key = $rootScope.productToDelete;

        $http({
        method: 'DELETE',
        url:'https://tendajitours-8d352.firebaseio.com/products/' + key + '.json',        
    })
    .then(function(res){
          Materialize.toast('Deleted Successfully', 2000);
    })
    .catch(function(err){
 Materialize.toast('Delete UnSuccessfull', 2000);
    })

}

$scope.editProduct = function(key,value){
$rootScope.productToEdit = value.$id;
}

$scope.update = function(frm1){
     Materialize.toast('Updating Product', 2000);
  var key = $rootScope.productToEdit;
    $http({
        method: 'PATCH',
        url:'https://tendajitours-8d352.firebaseio.com/products/' + key + '.json',  
        data:{
            category: frm1.category,
            name: frm1.name,
            description: frm1.description
        }
    })
.then(function(res){
     Materialize.toast('Updated Successfully', 2000);
})
.catch(function(err){
 Materialize.toast('Unable To Update Retry Later', 2000);
})

}



    
})