import sharp from "sharp";

export const generateThumb = async (filename: string) => {
  sharp(`${__dirname}/../public/images/${filename}`)
    .resize({
      width: 200,
      height: 200,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy,
    })
    .sharpen()
    .toFile(`${__dirname}/../public/thumbnails/${filename}`)
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      throw err;
    });
};
