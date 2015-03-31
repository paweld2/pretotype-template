define(
    [
        'utils/routingLoader',
        'capView/capViewRootLayout',
        'capView/users/capViewUsers',
        'capView/students/capViewStudents',
        'capView/appointment/capViewAppointment',
        'capView/auth/capViewAuth',
        'capView/administration/capViewAdministration',
        'capView/cookie/capViewCookies'
    ],
    function(routingLoader) {
        var capViewList = Array.prototype.slice.call(arguments, 1);
        return routingLoader.capabilitiesViewLoader(capViewList);
    });
