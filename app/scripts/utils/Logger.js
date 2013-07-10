define(['appConfig','has'], function (config, has) {
        var logger = {
            log : function(message){
                if( has('consoleDebug')){
                    console.log(message);
                }
            }
        };
        return logger;
    }
);