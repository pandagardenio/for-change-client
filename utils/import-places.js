const fs = require('fs');
const path = require('path');

const axios = require('axios');

const { processContent: processPlaceCategories } = require('./import-categories');

const baseUrl = 'http://for-change.pandagarden.es/wp-json/wp/v2/posts';
const placesPath = path.resolve(__dirname, '../public/places.json');

function writeFile (path, content) {
    fs.writeFileSync(path, content, 'utf-8');
}

function getPlace (placeData) {
    const placeBlock = placeData.blocks.filter(block => block.blockName === 'for-change/place')[0];
    return placeBlock ? placeBlock.attrs : null;
}

function hasNextPage (currentPage, { headers }) {
    return currentPage < parseInt(headers['x-wp-totalpages'], 10);
}

function parsePlaces (placesData, categories) {
    return placesData.map(placeData => parsePlace(placeData, categories));
}

function parseShops (shops = []) {
    return shops.map(({ latitude, longitude, ...rest }) => ({
        ...rest,
        lat: latitude,
        lng: longitude
    }));
}

function parsePlace (placeData, categories) {
    const place = getPlace(placeData);
    const { physicalShops, ...rest} = place;
    delete rest.category;
    return {
        ...rest,
        categories: placeData.categories.map(categoryId => getCategorySlug(categories, categoryId)),
        shops: parseShops(physicalShops),
        slug: placeData.slug,
        id: placeData.id
    };
}

function getCategorySlug (categories, categoryId) {
    return categories.filter(category => category.id === categoryId)[0].slug;
}

async function processPage (page, categories) {
    const response = await axios.get(baseUrl, {
        params: {
            page
        }
    });
    const places = parsePlaces(response.data, categories);
    if (hasNextPage(page, response)) {
        const nextPagePlaces = await processPage(page + 1, categories);
        return places.concat(nextPagePlaces);
    }
    return places;
}

function processContent (categories) {
    return processPage(1, categories);
}

processPlaceCategories()
    .then(categories => processContent(categories))
    .then(places => places.filter(place => place))
    .then(places => {
        writeFile(placesPath, JSON.stringify(places));
        console.log(`${places.length} place written`);
    });