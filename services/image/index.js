const sharp = require('sharp');

const path = __dirname;

/**
 * @param inputFile
 * @param quality
 * @returns {Promise<void>}
 *
 * The range of the Bitrate scale is 0-100. (Default 100)
 * 100  -> best quality
 * 50 -> middle quality
 * 0 -> worse quality
 */
const compress = async (inputFile, quality) => {
  sharp(inputFile)
    .jpeg({ quality: quality })
    .toFile([path, 'output.jpeg'].join('/'))
    .then(() => {
      console.log('Image resized successfully!');
    })
    .catch((error) => {
      console.error('Error resizing image:', error);
    });
};

compress([path, 'input.jpeg'].join('/'), 60)
