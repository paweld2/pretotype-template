define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        'text!capView/cookie/cookiesPolicy.html'
    ],
    function(rootLayout, authorization, policy_te) {
        var accessLevels = authorization.securityModel.accessLevels;
        var cookieState = {
            name: 'cookies',
            url: "/cookies",
            template: policy_te,
            data: {
                access: accessLevels.public
            }
        };
        return {
            capViews: [
                cookieState
            ],
            dependencies: [authorization.name]
        };
    });
