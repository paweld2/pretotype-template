define(['appConfig', 'has', 'angular'], function (config, has, angular) {
        var logger = {
            log: function (message) {
                if (has('consoleDebug')) {
                    console.log(message);
                }
            },
            wrapMock: function (handler) {
                return function (method, url, data) {
                    logger.log('BACKEND MOCK [' + method + '] to [' + url + '] data [' + angular.toJson(data) + ']');
                    var response = handler(method, url, data);
                    logger.log('RESPONSE MOCK : status[' + response[0] + '] response[' + angular.toJson(response[1]) + ']');
                    return response;
                };
            }
        };
        if( has('consoleDebug') ) {
            logger.log("Configuration:" + JSON.stringify(config));
        }
        return logger;
    }
);