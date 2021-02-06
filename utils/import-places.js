const fs = require('fs');
const path = require('path');

const axios = require('axios');

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

function parsePlaces (placesData) {
    return placesData.map(parsePlace);
}

function parseShops (shops = []) {
    return shops.map(({ latitude, longitude, ...rest }) => ({
        ...rest,
        lat: latitude,
        lng: longitude
    }));
}

function parsePlace (placeData) {
    const place = getPlace(placeData);
    const { physicalShops, ...rest} = place;
    return {
        ...rest,
        categories: placeData.categories,
        shops: parseShops(physicalShops),
        slug: placeData.slug,
        id: placeData.id
    };
}

async function processPage (page) {
    const response = await axios.get(baseUrl, {
        params: {
            page
        }
    });
    const places = parsePlaces(response.data);
    if (hasNextPage(page, response)) {
        const nextPagePlaces = await processPage(page + 1);
        return places.concat(nextPagePlaces);
    }
    return places;
}

function processContent () {
    return processPage(1);
}

processContent()
    .then(places => places.filter(place => place))
    .then(places => {
        writeFile(placesPath, JSON.stringify(places));
        console.log(`${places.length} place written`);
    });