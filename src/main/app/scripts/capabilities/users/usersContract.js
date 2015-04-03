define([],
    function() {
        var modelApiContract = {
            id: 'usersApi',
            base: '/backend/users/',
            methods: {
                userList: 'userList.json'
            }
        };
        return modelApiContract;
    });
