const { writeFile } = require('fs/promises');
const { createFFmpeg, fetchFile } = require('@ffmpeg.wasm/main');

const path = __dirname;
const ffmpeg = createFFmpeg({ log: true });

/**
 * @param inputFile
 * @param quality
 * @returns {Promise<void>}
 *
 * The range of the Bitrate scale is 0-9. (Default 4)
 * 0  -> best quality
 * 4 -> middle quality
 * 9 -> worse quality
 */
const compress = async (inputFile, quality) => {
  await ffmpeg.load();
  await ffmpeg.FS('writeFile', inputFile, await fetchFile([path, inputFile].join('/')));
  await ffmpeg.run(
    '-i',
    inputFile,
    '-codec:a',
    'libmp3lame',
    '-qscale:a',
    `${quality}`,
    'output.mp3'
  );
  const outputBuffer = ffmpeg.FS('readFile', 'output.mp3');
  await writeFile([path, 'output.mp3'].join('/'), outputBuffer);
  ffmpeg.exit();
};

compress('input.mp3', 6);

// optinal other options
// await ffmpeg.run(
//   '-i',
//   'input.mp3',
//   '-ab',
//   `${quality}k`,
//   '-vbr',
//   'on',
//   '-compression_level',
//   '10',
//   '-application',
//   'voip',
//   '-ar',
//   '22050',
//   'output.mp3'
// )
