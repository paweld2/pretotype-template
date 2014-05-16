define(
    ['angular',
        'directive/niArrayEdition',
        'directive/niFocusOn',
        'directive/partials/appPartialDirectives',
        'directive/cookies/cookiesEUDirective',
        'directive/niSubmit',
        'directive/niField',
        'directive/niPasswordMatch',
        'directive/holderJs',
        'directive/marked',
        'directive/proto/protoDirectives',
        'directive/crud/pagination'
    ],
    function (angular) {
        'use strict';
        var moduleName = 'appDirectiveModule';

        var directivesModules = Array.prototype.slice.call(arguments, 1);

        var dependenciesArray = _.chain(directivesModules).map(function (dirM) {
            return dirM.name || [];
        }).flatten(true).uniq().value();
        var module = angular.module(moduleName, dependenciesArray);


        return {
            m: module,
            name: moduleName
        };
    });
