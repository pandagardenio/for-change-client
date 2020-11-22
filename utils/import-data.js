const fs = require('fs');
const path = require('path');

const csvtojson = require('csvtojson');

const yesNoToBoolean = value => (value && value.toUpperCase()) === 'YES' ? true : false;

csvtojson({
        colParser:{
            lat: 'number',
            lng: 'number',
            online: yesNoToBoolean,
            physical: yesNoToBoolean,
        }
    })
    .fromFile(path.resolve(__dirname, './data.csv'))
    .then(jsonData => {
        return jsonData.map(place => {
            if (place.physical) {
                place.location = {
                    lat: place.lat,
                    lng: place.lng
                };
            }

            delete place.lat;
            delete place.lng;

            if (!place.online) {
                delete place.url;
            }
            return place;
        });
    })
    .then(jsonData => {
        fs.writeFile(path.resolve(__dirname, '../public/places.json'), JSON.stringify(jsonData), error => {
            if (error) {
                return console.error(error);
            }
            console.log('Places written.');
        });
    });