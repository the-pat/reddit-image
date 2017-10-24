'use strict';
const got = require('got');

got('https://reddit.com/r/wallpapers/hot.json?t=all&limit=1').then(response => {
    var posts = JSON.parse(response.body).data.children;
    var images = posts.filter(post => !post.data.over_18 && post.kind === 't3');

    console.log(images.length, images);
});