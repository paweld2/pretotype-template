define(
    [
        'utils/routingLoader',
        'capView/capViewRootLayout',
        'capView/about/capViewAbout',
        'capView/blog/capViewBlog',
        'capView/contact/capViewContact',
        'capView/mission/capViewMission',
        'capView/portfolio/capViewPortfolio',
        'capView/service/capViewService',
        'capView/team/capViewTeam',
        'capView/work/capViewWork'
    ],
    function(routingLoader) {
        var capViewList = Array.prototype.slice.call(arguments, 1);
        return routingLoader.capabilitiesViewLoader(capViewList);
    });
