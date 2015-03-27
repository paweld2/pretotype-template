/**
 *
 * Repack to requirejs module + update to use angular 1.3 version + logging state constructions
 *
 * A helper module for AngularUI Router, which allows you to define your states as an object tree.
 * @author Mark Lagendijk <mark@lagendijk.info>
 * @license MIT
 */
define(['angular', 'angular-ui-router', 'utils/Logger'], function (angular, router, logger) {

    var moduleName = 'ui.router.stateHelper';
    var module = angular.module(moduleName, ['ui.router']);
    var stateHelperName = 'stateHelper';
    module.provider(stateHelperName, ['$stateProvider', function ($stateProvider) {
        var self = this;

        /**
         * Recursively sets the states using $stateProvider.state.
         * Child states are defined via a `children` property.
         *
         * 1. Recursively calls itself for all descendant states, by traversing the `children` properties.
         * 2. Converts all the state names to dot notation, of the form `grandfather.father.state`.
         * 3. Sets `parent` property of the descendant states.
         *
         * @param {Object} state - A regular ui.router state object.
         * @param {Array} [state.children] - An optional array of child states.
         * @param {Boolean} keepOriginalNames - An optional flag that prevents conversion of names to dot notation if true.
         */
        this.setNestedState = function (state, keepOriginalNames) {
            if (!keepOriginalNames) {
                fixStateName(state);
            }
            var stateHeader = "Registering state ";
            if( state.abstract) {
                stateHeader = "Registering abstract state ";
            }
            logger.log(stateHeader + state.name + " on url " + state.url);
            $stateProvider.state(state);

            if (state.children && state.children.length) {
                state.children.forEach(function (childState) {
                    childState.parent = state;
                    self.setNestedState(childState, keepOriginalNames);
                });
            }
        };

        self.$get = angular.noop;

        /**
         * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
         * @param state
         */
        function fixStateName(state) {
            if (state.parent) {
                state.name = state.parent.name + '.' + state.name;
            }
        }
    }]);
    return {
        m: module,
        name: moduleName,
        helperProvider: stateHelperName + 'Provider'
    };
});