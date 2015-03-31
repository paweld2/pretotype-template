/* Administration capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        'mixin/promiseTrackerMixin'
    ],
    function(angular, _, logger, promiseTrackerMixin) {
        'use strict';

        var moduleName = 'administrationCapabilityModule';
        var module = angular.module(moduleName, [promiseTrackerMixin.name]);
        var studentCrudCtrl = 'StudentCrudController';
        var testCrudCtrl = 'TestCrudController';

        module.controller(testCrudCtrl, ['$scope', '$state', promiseTrackerMixin.asyncTrackingScope,
            function($scope, $state, asyncTrackingScope) {

            }
        ]);

        module.controller(studentCrudCtrl, ['$scope', '$state', promiseTrackerMixin.asyncTrackingScope,
            function($scope, $state, asyncTrackingScope) {
                asyncTrackingScope.asyncScope($scope);
                $scope.data = {};
            }
        ]);

        return {
            m: module,
            name: moduleName,
            testCrud: testCrudCtrl,
            studentsEditionController: studentCrudCtrl
        };
    });
