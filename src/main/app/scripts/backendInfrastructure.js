define(
    [
        'utils/mocksLoader',
        'backend/authorizationSpecification',
        'backend/crudSpecification'
    ],
    function(mocksLoader) {
        var mockSpecifications = Array.prototype.slice.call(arguments, 1);
        return mocksLoader.loadMockBackend(mockSpecifications);
    });
