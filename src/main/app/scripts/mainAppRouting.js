define(
    [
        'utils/routingLoader',
        'capView/capViewRootLayout',
        'capView/test1/capViewTest1',
        'capView/test2/capViewTest2'
    ],
    function(routingLoader) {
        var capViewList = Array.prototype.slice.call(arguments, 1);
        return routingLoader.capabilitiesViewLoader(capViewList);
    });
