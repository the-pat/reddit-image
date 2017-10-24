# reddit-image

> Grabs a random image from reddit

## Install

```
npm install --save reddit-image
```

## Usage

```js
const ri = require('reddit-image');

console.log(await ri.get('EarthPorn'));
```

## API

### .get(subreddit, [options])

Returns a promise for the path of the recently downloaded wallpaper.

#### subreddit

Type: `string`

The subreddit to download the image from.

#### options

Type: `object`

##### dir

Type: `string`

Default: ??

##### sort

Type: `string`

Values: `hot` `new` `top` `controversial`

Default: `hot`

##### scale

Type: `object`

###### width

Type: `int`

Default: 1920

###### height

Type: `int`

Default: 1080

##### from

Type: `string`

Values: `hour` `day` `week` `month` `year` `all`

Default: `all`

##### score

Type: `int`

Default: `100`

##### over18

Type: `bool`

Default: `false`

## Related

- [reddit-node-wallpaper](https://github.com/the-pat/reddit-node-wallpaper)
- [wallpaper](https://github.com/sindresorhus/wallpaper)

## License

MIT © [Patrick Tone](https://patrick.one)