define(
    [
        'scripts/capabilities/auth/authorizationCapability',
        'text!./loginTe.html',
        'text!./accessDeniedTe.html'
    ],
    function(authorization, login_te, access_denied_te) {
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

        var accessDeniedState = {
            name: 'accessDenied',
            url: "/accessDenied",
            template: access_denied_te,
            controller: authorization.loginController
        };
        return {
            capViews: [
                loginState, accessDeniedState
            ],
            dependencies: [authorization.name]
        };
    });
