define(['module','underscore','has'],function (module,_,has) {
        var config =  module.config();
        if(config['hasConfig']) {
          _.chain(config['hasConfig']).keys().each( function(key,index,all){
            console.log("config param " + key + "=" + config['hasConfig'][key]);
            has.add(key,function(){return config['hasConfig'][key];},true);
          }).value();
        }
        return config;
    });