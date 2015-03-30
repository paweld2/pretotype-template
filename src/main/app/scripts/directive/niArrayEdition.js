define([
        'underscore',
        'angular',
        "text!directive/template/dir/field/arrayField.html"
    ],
    function(_, angular, templateHTML) {
        'use strict';
        var moduleName = 'arrayEditionDirectiveModule';
        var module = angular.module(moduleName, []);

        var createFieldName = function(modelID) {
            return "field_" + modelID;
        };

        NiArrayFieldController.$inject = ['$scope', '$attrs'];

        function NiArrayFieldController($scope, $attrs) {
            // $name for the formController bind
            $scope.$modelId = $attrs.ngModel.replace(/\./g, '_').toLowerCase() + '_' + $scope.$id;
            var ctrl = this;
            ctrl.$name = $scope.$modelId;
            ctrl.$valid = true;
            ctrl.$invalid = false;
            ctrl.$dirty = false;
            ctrl.$error = {
                min: false
            };

            // validation of min 1 value, it should be extracted to directive
            $scope.$watch(function() {
                return $scope.arrayToEdit;
            }, function(values) {
                if (ctrl.$form) {
                    var curr = values || [];
                    if (curr.length === 0) {
                        ctrl.$valid = false;
                        ctrl.$invalid = true;
                        ctrl.$error.min = true;
                    } else {
                        ctrl.$valid = true;
                        ctrl.$invalid = false;
                        ctrl.$error.min = false;
                    }
                    ctrl.$form.$setValidity('min', ctrl.$valid, ctrl);
                }
            }, true);

            var fieldName = createFieldName($scope.$modelId);
            $scope[fieldName] = '';
            $scope.edit = function(value) {
                $scope[fieldName] = value;
                $scope.$broadcast('focusOn', $scope.arrayEditionGeneratedID);
                $scope.remove(value);
            };
            $scope.remove = function(value) {
                ctrl.$dirty = true;
                var curr = $scope.arrayToEdit || [];
                $scope.arrayToEdit = _.without(curr, value);
            };

            $scope.add = function() {
                ctrl.$dirty = true;
                var newValue = $scope[fieldName];
                newValue = newValue.trim();
                if (newValue.length > 0) {
                    var curr = $scope.arrayToEdit || [];
                    $scope.arrayToEdit = _.chain(curr).union([newValue]).sortBy(_.identity).unique().value();
                    $scope[fieldName] = '';
                }
            };
            $scope.onEnterHandler = function($event) {
                if ($event.keyCode === 13) {
                    $event.preventDefault();
                    $scope.add();
                }
            };
        }

        var findArrayEditInput = function(templateElement) {
            return _.chain(templateElement.find('input'))
                .map(angular.element)
                .find(function(inputElem) {
                    return inputElem.attr('ng-keypress');
                }).value();
        };

        module.directive('niArrayField', ['$compile', '$interpolate', function($compile, $interpolate) {
            return {
                restrict: 'E',
                scope: {
                    arrayToEdit: '=ngModel',
                    title: '@',
                    help: '@',
                    placeholder: '@'
                },
                controller: NiArrayFieldController,
                priority: 100, // We need this directive to happen before ng-model
                terminal: true, // We are going to deal with this element
                require: ['niArrayField', '^form'], // If we are in a form then we can access the ngModelController
                compile: function compile(element, attrs) {
                    var validationMessages = [];
                    angular.forEach(element.find('validator'), function(validatorElement) {
                        validatorElement = angular.element(validatorElement);
                        validationMessages.push({
                            key: validatorElement.attr('key'),
                            getMessage: $interpolate(validatorElement.text())
                        });
                    });
                    // Find the content that will go into the new label
                    var labelContent = '';
                    if (element.attr('label')) {
                        labelContent = element.attr('label');
                        element[0].removeAttribute('label');
                    }
                    if (element.find('label')[0]) {
                        labelContent = element.find('label').html();
                    }
                    if (!labelContent) {
                        throw new Error('No label provided');
                    }

                    // prepare the template with label changed
                    var getTemplateElement = function() {
                        var newElement = angular.element(templateHTML);
                        // Copy important attributes to the input element
                        // the original ng-model is bind to arrayToEdit in the isolated scope,
                        var inputElement = findArrayEditInput(newElement);
                        // Copy placeholder attribute
                        inputElement.attr('placeholder', element.attr('placeholder'));
                        // add a custom data-* attribute to the original ng-model for tests selectos
                        inputElement.attr('data-array-edit', element.attr('ng-model'));
                        // Update the label's contents
                        var labelElement = newElement.find('label');
                        labelElement.html(labelContent);
                        return newElement;
                    };
                    return {
                        pre: function preLink(scope, iElement, iAttrs, ctrls) {
                            var arrayCtrl = ctrls[0],
                                formCtrl = ctrls[1];
                        },
                        post: function postLink(scope, iElement, iAttrs, ctrls) {
                            var arrayCtrl = ctrls[0],
                                formCtrl = ctrls[1];
                            var newElement = getTemplateElement();
                            // Wire up the input (id and name) and its label (for)
                            // (We need to set the input element's name here before we compile.
                            // If we leave it to interpolation, the formController doesn't pick it up)

                            // select the input that contains ng-keypress in the template, the other is for display of values
                            var inputElement = findArrayEditInput(newElement);

                            inputElement.attr('id', scope.$modelId);
                            inputElement.attr('ng-model', createFieldName(scope.$modelId));
                            newElement.find('label').attr('for', scope.$modelId);

                            scope.$validationMessages = {};
                            angular.forEach(validationMessages, function(validationMessage) {
                                // We need to watch in case it has interpolated values that need processing
                                scope.$watch(validationMessage.getMessage, function(message) {
                                    scope.$validationMessages[validationMessage.key] = message;
                                });
                            });

                            // We must compile our new element in the postLink function rather than in the compile function
                            // (i.e. after any parent form element has been linked)
                            // then the FormController is already setup
                            $compile(newElement)(scope, function(clone) {
                                // Place our new element after the original element
                                iElement.after(clone);
                                // Remove our original element
                                iElement.remove();
                            });
                            // now add the array controller to the form
                            formCtrl.$addControl(arrayCtrl);
                            arrayCtrl.$form = formCtrl;
                            scope.$on('$destroy', function() {
                                formCtrl.$removeControl(arrayCtrl);
                            });

                            // We are bind to the form, so connect the reference pointer
                            // (i.e. formController[scope.name])
                            scope.$form = formCtrl;
                            scope.$field = formCtrl[scope.$modelId];
                        }
                    };
                }
            };
        }]);

        return {
            m: module,
            name: moduleName
        };
    });
