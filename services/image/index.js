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
  await sharp([path, inputFile].join('/'))
    .jpeg({ quality: quality })
    .toFile([path, 'output.jpeg'].join('/'))
};

compress('input.jpeg', 60)
