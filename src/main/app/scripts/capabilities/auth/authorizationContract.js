define([],
    function() {
        var modelApiContract = {
            id: 'authApi',
            base: '/backend/auth/',
            methods: {
                userInfo: 'userInfo.json',
                login: 'login.json',
                logout: 'logout.json'
            }
        };

        return modelApiContract;
    });
