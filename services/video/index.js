const { writeFile } = require('fs/promises');
const { createFFmpeg, fetchFile } = require('@ffmpeg.wasm/main');

const path = __dirname;
const ffmpeg = createFFmpeg({ log: true });

/**
 * @param inputFile
 * @param quality
 * @returns {Promise<void>}
 *
 * The range of the CRF scale is 0–51. (Default 23)
 * 0  -> best quality
 * 23 -> middle quality
 * 51 -> worse quality
 */
const compress = async (inputFile, quality = 23) => {
  await ffmpeg.load();
  await ffmpeg.FS('writeFile', 'input.mp4', await fetchFile([path, inputFile].join('/')));
  await ffmpeg.run(
    '-i',
    'input.mp4',
    '-vcodec',
    'libx264',
    '-crf',
    `${quality}`,
    'output.mp4'
  )
  const outputBuffer = ffmpeg.FS('readFile', 'output.mp4');
  await writeFile([path, 'output.mp4'].join('/'), outputBuffer);
  ffmpeg.exit();
};

compress('input.mp4', 23);
