define(['angular', 'underscore'], function(angular, _) {
    'use strict';
    var moduleName = 'simpleCrudMixin';
    var module = angular.module(moduleName, []);

    var simpleCrudScopeMixin = "simpleCrudScopeMixin";


    function pagerMixin(scopeRef) {

        var currPage = 1;
        var maxPageNr = 10;


        scopeRef.pagerData = function() {
            var nrOfCells = 6;
            var startPage = currPage - nrOfCells;
            if (startPage < 0) {
                startPage = 0;
            }
            var leftOn = currPage !== 0;
            var rightOn = startPage + nrOfCells < maxPageNr;
            _.chain().range(startPage, startPage + nrOfCells).map(function(pageNr) {
                return {
                    page: pageNr,
                    sel: currPage === pageNr,
                    pagerType: 'p'
                };
            }).value();
        };

    }

    var testBackendApi = {

    };

    module.factory(simpleCrudScopeMixin, [function() {
        var crudMixinBuilder = function($scope) {
            $scope.crudData = {
                columnNames: [{
                    name: "#",
                    sort: "up"
                }, {
                    name: "X",
                    sort: "down"
                }, {
                    name: "Y",
                    sort: ""
                }, {
                    name: "Z",
                    sort: ""
                }],
                dataSourceInfo: {
                    nrOfItems: 100,
                    pageSize: 20,
                    offset: 20,
                    selPage: 1
                },
                pagerData: [{
                    pagerType: '<'
                }, {
                    page: 1,
                    sel: true,
                    pagerType: 'p'
                }, {
                    page: 2,
                    pagerType: 'p'
                }, {
                    page: 3,
                    pagerType: 'p'
                }, {
                    page: 4,
                    pagerType: 'p'
                }, {
                    pagerType: 's'
                }, {
                    page: 20,
                    pagerType: 'p'
                }, {
                    pagerType: '>'
                }],
                displayTableData: [
                    [1, "a", "b", "c"],
                    [2, "a2", "b2", "c2"],
                    [3, "a2", "b2", "c2"],
                    [4, "a2", "b2", "c2"],
                    [5, "a2", "b2", "c2"]
                ],
                selectedRow: [1, 2]
            };
            $scope.crudlogic = {
                goToPage: function(pageRef) {
                    console.log(pageRef);
                },
                goToPreviousPage: function() {

                },
                goToNextPage: function() {

                },
                directSelect: function(row, $event) {
                    console.log(row);
                    console.log($event);
                },
                selectRow: function(row, $event) {
                    var toAdd = [row[0]];

                    function rowMatcher(sel) {
                        return sel === row[0];
                    }

                    if ($event.ctrlKey) {
                        var selected = _.find($scope.crudData.selectedRow, rowMatcher);
                        if (selected) {
                            $scope.crudData.selectedRow = _.reject($scope.crudData.selectedRow, rowMatcher);
                        } else {
                            $scope.crudData.selectedRow = _.union($scope.crudData.selectedRow, toAdd);
                        }
                    } else {
                        $scope.crudData.selectedRow = toAdd;
                    }
                    var singleSelection = $scope.crudData.selectedRow.length === 1;
                    var haveSelection = $scope.crudData.selectedRow.length > 0;
                    $scope.crudStatus.actions.editDisabled = !singleSelection;
                    $scope.crudStatus.actions.deleteDisabled = !haveSelection;


                },
                sortColumn: function(colName) {
                    _.chain($scope.crudData.columnNames).each(function(col) {
                        if (col.name === colName) {
                            col.sort = col.sort === "down" ? "up" : "down";
                        } else {
                            col.sort = "";
                        }
                    });
                },
                switchView: {
                    list: function() {
                        $scope.crudStatus.viewStatus = "list";
                    },
                    edit: function() {
                        $scope.crudStatus.viewStatus = "edit";
                    },
                    delete: function() {
                        $scope.crudStatus.viewStatus = "delete";
                    },
                    view: function() {
                        $scope.crudStatus.viewStatus = "view";
                    }
                }
            };
            $scope.crudStatus = {
                viewStatus: "list",
                actions: {
                    addNewDisabled: false,
                    editDisabled: true,
                    deleteDisabled: true
                }
            };
        };
        return {
            crudMixin: crudMixinBuilder
        };
    }]);


    return {
        m: module,
        simpleCrud: simpleCrudScopeMixin,
        name: moduleName
    };
});
