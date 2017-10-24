'use strict';
const fs = require('fs');
const got = require('got');
const imageType = require('image-type');
const readChunk = require('read-chunk');

const defaults = require('./config.defaults.json');
const random = require('./lib/random')

module.exports = async(subreddit, options) => {
    // get the defaults and user options.
    options = Object.assign({}, defaults, options);

    // prepare the reddit endpoint.
    const endpoint = `https://reddit.com/r/${subreddit}/${options.sort}.json?t=${options.from}&limit=${options.limit}`;

    // get and filter the reddit posts.
    const response = await got(endpoint);
    const posts = JSON.parse(response.body).data.children
        .filter(post => post.kind.toLowerCase() === 't3' &&
            post.data &&
            post.data.score >= options.score &&
            (options.over18 || !post.data.over_18) &&
            post.data.preview.images[0].source.width >= options.scale.width &&
            post.data.preview.images[0].source.height >= options.scale.height);

    // if no posts are available, throw an error.
    if (posts && posts.length === 0)
        throw new ReferenceError('No images available after filter.');

    // keep the important image metadata.
    const images = posts.map(post => ({
        title: post.data.title,
        url: post.data.preview.images[0].source.url,
    }));

    // pick a random image.
    const image = random(images);
    const imagePath = `${options.dir}/${image.title}`;

    // download the image.
    await new Promise(resolve =>
        got.stream(image.url)
        .pipe(fs.createWriteStream(imagePath))
        .on('close', resolve)
    );

    // determine the image type.
    const buffer = readChunk.sync(imagePath, 0, 12);
    const type = imageType(buffer);
    const err = await new Promise((resolve, reject) =>
        fs.rename(imagePath, `${imagePath}.${type.ext}`, err => err ? reject(err) : resolve())
    );

    if (err)
        throw new Error(err);
};