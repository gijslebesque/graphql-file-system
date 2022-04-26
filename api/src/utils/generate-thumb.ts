import sharp from "sharp";

export const generateThumb = async (filename: string) => {
  sharp(`${__dirname}/../public/images/${filename}`)
    .resize(200, 200)
    .rotate()
    .sharpen()
    .toFile(`${__dirname}/../public/thumbnails/${filename}`)
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      throw err;
    });
};
