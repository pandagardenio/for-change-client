const fs = require('fs');
const path = require('path');

const axios = require('axios');
const cheerio = require('cheerio');
const { Parser } = require('json2csv');

const json2csvParser = new Parser();

class Crawler {
    constructor(
        urls
    ) {
        this.urls = urls;
    }

    async init () {
        const data = await Promise.all(this.urls.map(async url => {
            const place = await this.parsePlaceUrl(url);
            console.log(place);
            return place;
        }));

        this.writeData(json2csvParser.parse(data));
    }

    async parsePlace (_$) {
        throw new Error('Not Implemented');
    }

    async parsePlaceUrl (url) {
        const { data } = await axios.get(url);
        return this.parsePlace(cheerio.load(data));
    }

    writeData (data) {
        fs.writeFileSync(path.resolve(__dirname, `${this.fileName}.csv`), data, 'utf-8');
    }
}

module.exports = Crawler;