define(['module', 'underscore', 'has', 'utils/Logger'], function (module, _, has) {
    var config = module.config();
    if (config.hasConfig) {
        _.chain(config.hasConfig).keys().each(function (key, index, all) {
            has.add(key, function () {
                return config.hasConfig[key];
            }, true);
        }).value();
    }
    return config;
});