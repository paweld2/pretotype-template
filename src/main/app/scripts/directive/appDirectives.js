define(
    ['angular',
        'directive/forms/niArrayEdition',
        'directive/forms/niFocusOn',
        'directive/forms/niSubmit',
        'directive/forms/niField',
        'directive/forms/niPasswordMatch',
        'directive/partials/appPartialDirectives',
        'directive/cookies/cookiesEUDirective',
        'directive/holderJs',
        'directive/marked'
    ],
    function(angular) {
        'use strict';
        var moduleName = 'appDirectiveModule';

        var directivesModules = Array.prototype.slice.call(arguments, 1);

        var dependenciesArray = _.chain(directivesModules).map(function(dirM) {
            return dirM.name || [];
        }).flatten(true).uniq().value();
        var module = angular.module(moduleName, dependenciesArray);


        return {
            m: module,
            name: moduleName
        };
    });
