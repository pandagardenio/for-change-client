const WPAPI = require('wpapi');

const categories = require('./categories.json');
const places = require('./places.json');

const wp = new WPAPI({
    endpoint: process.env.FOR_CHANGE_DATA_WORDPRESS_BASE_URL,
    username: process.env.FOR_CHANGE_DATA_WORDPRESS_USERNAME,
    password: process.env.FOR_CHANGE_DATA_WORDPRESS_PASSWORD,
    auth: true
});

const getCategoryId = categorySlug => categories.filter(category => category.slug === categorySlug)[0].id;

const parseContent = place => {
    return `<!-- wp:for-change/place ${JSON.stringify(transformPlaceToPostPlace(place))}  /-->`
}

const transformPlaceToPostPlace = place => {
    const postPlace = {
        name: place.name,
        description: place.description,
        linkedin: place.linkedin,
        facebook: place.facebook,
        instagram: place.instagram,
        vimeo: place.vimeo
    };

    if (place.online && place.online === 'YES') {
        postPlace.isOnline = true;
    } else {
        postPlace.isOnline = false;
    }

    if (place.physical && place.physical === 'YES') {
        postPlace.isPhysical = true;
    } else {
        postPlace.isPhysical = false;
    }

    if (place.verified && place.verified === 'YES') {
        postPlace.isVerified = true;
    } else {
        postPlace.isVerified = false;
    }

    if (place.online) {
        postPlace.siteUrl = place.url;
    }

    if (place.ecommerce_url && place.ecommerce_url !== '-') {
        postPlace.ecommerceUrl = place.ecommerceUrl
    }

    if (place.physical === 'YES' && place.lat && place.lng) {
        postPlace.physicalShops = [{
            address: '',
            name: place.name,
            latitude: place.lat,
            longitude: place.lng
        }];
    }

    return postPlace;
};

const transformPlaceToPost = place => ({
    title: place.name,
    categories: [getCategoryId(place.type)],
    content: parseContent(place),
    status: 'publish'
});

const createPost = place => {
    return wp.posts().create(transformPlaceToPost(place)).then(({ id }) => {
        // "response" will hold all properties of your newly-created post,
        // including the unique `id` the post was assigned on creation
        console.log(`Created post id:${id}`);
    }).catch(error => {
        console.log(error);
    });
};

places.shift();

const interval = 400;
places.forEach(function (place, index) {
    setTimeout(function () {
        createPost(place);
    }, index * interval);
});
