const fs = require('fs');
const path = require('path');

const base64 = require('base-64');
const { google } = require('googleapis');

const credentialsPath = path.resolve(__dirname, './credentials.json');
const translationsPath = path.resolve(__dirname, '../src/utils/i18n/translations');

function writeFile (path, content) {
    fs.writeFileSync(path, content, 'utf-8');
}

function removeCredentials () {
    fs.unlinkSync(credentialsPath);
}

writeFile(credentialsPath, base64.decode(process.env.FOR_CHANGE_GOOGLE_SERVICE_ACCOUNT));

const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
    spreadsheetId: process.env.FOR_CHANGE_GOOGLE_SHEETS_TRANSLATIONS,
    range: 'Translations!A1:D',
}, (err, res) => {
    if (err) {
        removeCredentials()
        return console.log('The API returned an error: ' + err);
    }
    const rows = res.data.values;
    const headers = rows.shift();
    const languages = headers.slice(1);
    const data = rows.reduce((translations, row) => {
        const translationKey = row.shift();
        row.forEach((translation, index) => {
            const language = languages[index];
            translations[language] = {
                ...translations[language],
                [translationKey]: translation
            };
        });
        return translations;
    }, {});

    Object.keys(data).forEach(language => {
        writeFile(path.resolve(translationsPath, `${language}.json`), JSON.stringify(data[language]));
    });

    removeCredentials();
});