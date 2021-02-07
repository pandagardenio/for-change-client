
module.exports = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/npm',
            {
                npmPublish: false,
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['*.md', 'package.json'],
            },
        ],
        '@semantic-release/github',
    ],
    // eslint-disable-next-line no-template-curly-in-string
    tagFormat: '${version}',
};