export enum PlaceCategorySlug {
    ACCOMMODATION = 'accommodation',
    CAFE = 'cafe',
    CLOTHING = 'clothing',
    COMMUNITY = 'community',
    COSMETICS = 'cosmetics',
    EVENT = 'event',
    FARMING = 'farming',
    GROCERIES = 'groceries',
    HOUSING = 'housing',
    PROJECTS = 'projects',
    SHOPPING = 'shopping',
    URBAN_GARDEN = 'urban_garden',
    WINE_CELLAR = 'wine_cellar'
}

export type PlaceCategory = {
    id: number;
    slug: PlaceCategorySlug;
    count: number;
    parent: number;
}
