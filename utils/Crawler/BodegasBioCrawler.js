const Crawler = require('./Crawler');

class BodegasBioCrawler extends Crawler {
    get fileName() {
        return 'bodegas_bio';
    }

    async parsePlace ($) {
        return {
            name: $('.wrapper h1').text(),
            description: $('.wrapper .store-excerpt>p').first().text(),
            type: 'wine_cellar',
            online: 'YES',
            ecommerce: '-',
            url: $('.wrapper .store-excerpt>p').last().find('a').attr('href'),
            physical: 'NO',
            lat: '-',
            lng: '-'
        }
    }
}

module.exports = BodegasBioCrawler;