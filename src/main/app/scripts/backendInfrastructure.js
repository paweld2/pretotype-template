define(
    [
        'utils/mocksLoader',
        'backend/usersSpecification',
        'backend/authorizationSpecification'
    ],
    function(mocksLoader) {
        var mockSpecifications = Array.prototype.slice.call(arguments, 1);
        return mocksLoader.loadMockBackend(mockSpecifications);
    });
