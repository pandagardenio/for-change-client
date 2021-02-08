export enum AppRoutes {
    HOME = '/',
    DISCOVER = '/discover',
    DISCOVER_RESULTS = '/discover/:placeCategorySlug',
    PLACES = '/places',
    PLACE = '/places/:placeSlug',
    PLACES_PHYSICAL = '/places/physical',
    PLACES_ONLINE = '/places/online',
    SEARCH_INDEX = '/search',
    SEARCH_RESULTS = '/search/:bounds/places'
}

export const getAppRoute = (route: AppRoutes, replaces: Record<string, string>) =>
    Object.keys(replaces).reduce((
        replacedRoute: string, replaceKey: string
    ) => replacedRoute.replace(`:${replaceKey}`, replaces[replaceKey]), route);