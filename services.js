//get books
bookApp.factory('BookHttp', function ($http) {
    return {
        get: function (mybaseurl, search) {
            return $http({
                method: 'get',
                url: mybaseurl,
                data: {
                    callback: 'JSON_CALLBACK',
                    key: 'AIzaSyD0cByD-a5J-ZwlB4YBhvbWDSaXbTYMjC8'
                },
                params: {
                    q: search,
                    maxResults: 40
                },
                method: 'JSONP'
            });
        }
    }
});

//one item
bookApp.factory('BookHttpOneItem', function ($http) {
    return {
        get: function (mybaseurl) {
            return $http({
                method: 'get',
                url: mybaseurl,
                data: {
                    callback: 'JSON_CALLBACK',
                    key: 'AIzaSyD0cByD-a5J-ZwlB4YBhvbWDSaXbTYMjC8'
                },
                params: {
                    maxResults: 1
                },
                method: 'JSONP'
            });
        }
    }
});

