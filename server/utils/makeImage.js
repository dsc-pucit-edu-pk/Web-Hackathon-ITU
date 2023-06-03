import nodeHtmlToImage from 'node-html-to-image';
import path from 'path';
import template from './template.js';
import imgbbUploader from 'imgbb-uploader';
require('dotenv').config();

async function makeImage(data) {
    await nodeHtmlToImage({
        output: 'image.jpg',
        type: 'jpeg',
        height: 1500,
        width: 1500,
        quality: 100,
        html: template(data)
      })
    .then(() => console.log('The image was created successfully!'))

    const API_KEY = process.env.IMGBB_API_KEY;
    const imagePath = path.join(__dirname, 'image.jpg');

    const url = await imgbbUploader(API_KEY, imagePath)
    .then((response) => {
        return response.url;
    })
    .catch((error) => console.error(error));

    return url;
}

module.exports = makeImage;