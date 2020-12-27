const fs = require('fs');
const path = require('path');

const base64 = require('base-64');
const { google } = require('googleapis');

const credentialsPath = path.resolve(__dirname, './credentials.json');
const placesPath = path.resolve(__dirname, '../public/places.json');

function writeFile (path, content) {
    fs.writeFileSync(path, content, 'utf-8');
}

function removeCredentials () {
    fs.unlinkSync(credentialsPath);
}

function parseValue (key, value) {
    switch(key) {
        case 'lat':
        case 'lng': 
            return parseFloat(value);
        case 'online':
        case 'physical':
            return (value && value.toUpperCase()) === 'YES' ? true : false;
        default:
            return value;
    }
}

writeFile(credentialsPath, base64.decode(process.env.FOR_CHANGE_GOOGLE_SERVICE_ACCOUNT));

const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
    spreadsheetId: process.env.FOR_CHANGE_GOOGLE_SHEETS_DATASOURCE,
    range: 'Places!A1:P',
}, (err, res) => {
    if (err) {
        removeCredentials()
        return console.log('The API returned an error: ' + err);
    }
    const rows = res.data.values;
    const headers = rows.shift();
    const data = rows.map((row, rowIndex) => {
        try {
            const place = row.reduce((rowData, cellValue, index) => {
                const key = headers[index];
                rowData[key] = parseValue(key, cellValue);
                return rowData;
            }, {});
    
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
        } catch(error) {
            console.log(error);
            console.log(`Skipping row with index: ${rowIndex}`);
            return null;
        }
    }).filter(place => place);

    writeFile(placesPath, JSON.stringify(data));

    removeCredentials();
});