/**
 * Book list controller
 */
bookApp.controller('BookListCtrl', function ($scope, $sce, BookHttp) {
    //secure books api url
    var mybaseurl = $sce.trustAsResourceUrl("https://www.googleapis.com/books/v1/volumes");

    //when the user click on the search button this function will be called
    $scope.doSearch = function () {
        BookHttp.get(mybaseurl, $scope.searchTerm).then(function success(response) {
            $scope.bookResults = response.data.items;
            $scope.orderProp = 'volumeInfo.title';
            console.log(response.data.items);
        }, function error(response) {
            // called asynchronously if an error occurs
        });
    }

});

/**
 * Book details controller
 */
bookApp.controller('BookDetailsCtrl', function ($scope, $sce, BookHttpOneItem) {
    //$scope.$on('$routeChangeSuccess', function () {
    $scope.init = function() {
        var id = window.location.hash.substr(1);
        mybaseurl = $sce.trustAsResourceUrl("https://www.googleapis.com/books/v1/volumes/" + id);

        BookHttpOneItem.get(mybaseurl).then(function success(response) {
            $scope.bookOneItem = response.data;
        }, function error(response) {
            // called asynchronously if an error occurs
        });
    };
});

/**
 * Cart controller
 */
bookApp.controller('cartCtrl', function ($scope) {

    /**
     * Add to cart
     * @param item
     */
    $scope.setCart = function (item) {
        console.log(item);
        //we have something in cart
        var cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            cart = [];
        }
        //if we already have an item
        var index = cart.findIndex(function (cartItem) {
            return cartItem.id === item.id;
        });

        //update the quantity
        if (index !== -1) {
            cart[index].qty += 1;
        } else {
            cart.push({
                id: item.id,
                name: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks.smallThumbnail,
                price: item.saleInfo.listPrice.amount +' '+ item.saleInfo.listPrice.currencyCode,
                qty: 1
            });
        };
        localStorage.setItem('cart', JSON.stringify(cart));

    };

    /**
     * remove all items from cart
     */
    $scope.removeAllFromCart = function(){
        localStorage.removeItem('cart');
        $('.modal-body').fadeOut(500, function(){
            $('#pop').modal('hide');
            $(this).fadeIn(500);
        });
    }

        $scope.$watch(function () {
            if(localStorage.cart != undefined) {
                return JSON.parse(localStorage.cart).length;
            }
        }, function (newVal, oldVal) {
            if (oldVal !== newVal && newVal === undefined) {
                console.log('It is undefined, probably localStorage is empty.');
            }
        });
});

//modal and get cart items
bookApp.controller('myModalCtrl', function ($scope) {
    $scope.modalHide = function(elem){
            $(elem).modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
    }

    $scope.showModal = function (elem) {
        $scope.cartItems = JSON.parse(localStorage.getItem('cart'));
        $(elem).modal("show");
    }

    $scope.itemInCart = function(){
        if(localStorage.cart){
            var qty = 0;
            $.each(JSON.parse(localStorage.getItem('cart')), function (k, v) {
                qty += parseInt(v.qty);
            });
            return qty;
        } else{
            return 0;
        }
    }

    if(localStorage.cart){
    $scope.$watch(function () {
        var qty = 0;
        $.each(JSON.parse(localStorage.getItem('cart')), function (k, v) {
            qty += parseInt(v.qty);
        });
        return qty;
    },function(newVal,oldVal){
        if(oldVal!==newVal && newVal === undefined){
            console.log('It is undefined');
        }
    });
    }
});
