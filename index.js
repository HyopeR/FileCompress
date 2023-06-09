const sharp = require('sharp');

const compress = async (inputFile, quality) => {
  sharp(inputFile)
    .jpeg({ quality: quality })
    .toFile('output.jpeg')
    .then(() => {
      console.log('Image resized successfully!');
    })
    .catch((error) => {
      console.error('Error resizing image:', error);
    });
};

compress('input.jpeg', 70)
