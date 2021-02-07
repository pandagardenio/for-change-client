const fs = require('fs');
const path = require('path');

const axios = require('axios');

const baseUrl = 'http://for-change.pandagarden.es/wp-json/wp/v2/categories';
const categoriesPath = path.resolve(__dirname, '../public/categories.json');

function writeFile (path, content) {
    fs.writeFileSync(path, content, 'utf-8');
}

function hasNextPage (currentPage, { headers }) {
    return currentPage < parseInt(headers['x-wp-totalpages'], 10);
}

function parseCategories (categoriesData) {
    return categoriesData.map(parseCategory);
}

function parseCategory (categoryData) {
    return {
        id: categoryData.id,
        count: categoryData.count,
        slug: categoryData.slug,
        parent: categoryData.parent
    };
}

async function processPage (page) {
    const response = await axios.get(baseUrl, {
        params: {
            page
        }
    });
    const categories = parseCategories(response.data);
    if (hasNextPage(page, response)) {
        const nextPageCategories = await processPage(page + 1);
        return categories.concat(nextPageCategories);
    }
    return categories;
}

async function processContent () {
    return processPage(1)
        .then(categories => categories.filter(category => !!category))
        .then(categories => {
            writeFile(categoriesPath, JSON.stringify(categories));
            console.log(`${categories.length} categories written`);
            return categories;
        });
}

module.exports = {
    processContent
};