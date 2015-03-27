define(
    [
        'capabilities/auth/authorizationCapability',
        'text!capView/auth/loginTe.html'
    ],
    function (authorization, login_te) {
        var accessLevels = authorization.securityModel.accessLevels;

        var loginState = {
            name: 'login',
            url: "/login",
            template: login_te,
            controller: authorization.loginController,
            data: {
                access: accessLevels.anon,
                pageStyle: 'login-page'
            }
        };
        return {
            capViews: [
                loginState
            ],
            dependencies: [authorization.name]
        };
    });
