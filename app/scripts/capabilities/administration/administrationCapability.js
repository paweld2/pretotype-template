/* Administration capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        'mixin/promiseTrackerMixin',
        'mixin/simpleCrudMixin',
        'capabilities/crud/crudCapability'
    ],
    function (angular, _, logger, promiseTrackerMixin, simpleCrudMixin, crudCapability) {
        'use strict';


        var moduleName = 'administrationCapabilityModule';
        var module = angular.module(moduleName, [ promiseTrackerMixin.name, simpleCrudMixin.name, crudCapability.name]);
        var studentCrudCtrl = 'studentCrudCtrl';
        var testCrudCtrl = 'testCrudCtrl';

        module.controller(testCrudCtrl,
            ['$scope', '$state', promiseTrackerMixin.asyncTrackingScope, crudCapability.crudService,
                function ($scope, $state, asyncTrackingScope, crudService) {

                    $scope.metaModel = crudService.getMetaModel();

                    $scope.studentCrudApi = crudService.getCrudApiForModel("student");
                    $scope.loadData = crudService.loadModelList({
                        modelId: "student",
                        filter: {
                            x: 1
                        }
                    });

                }
            ]);

        module.controller(studentCrudCtrl,
            ['$scope', '$state', promiseTrackerMixin.asyncTrackingScope, simpleCrudMixin.simpleCrud,
                function ($scope, $state, asyncTrackingScope, simpleCrud) {
                    asyncTrackingScope.asyncScope($scope);
                    simpleCrud.crudMixin($scope);
                    $scope.data = {
                    };
                }]);

        return {
            m: module,
            name: moduleName,
            testCrud: testCrudCtrl,
            studentsEditionController: studentCrudCtrl
        };
    });
