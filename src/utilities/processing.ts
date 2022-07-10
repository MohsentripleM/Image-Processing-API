import sharp from 'sharp';
import path from 'path';
import { createResultDire, getImagesDire, imgExistanceCheck } from '.';

// This fauction is used to resize the images
const imgOperation = async (
  inputPath: string,
  outputPath: string,
  height: number,
  width: number
): Promise<void> => {
  if (width && height) {
    await sharp(inputPath).resize({ width, height }).toFile(outputPath);
  } else if (height) {
    const image = sharp(inputPath);
    const metaData = await image.metadata();
    await image
      .resize({
        width: metaData.width,
        height: height
      })
      .toFile(outputPath);
  } else if (width) {
    const image = sharp(inputPath);
    const metaData = await image.metadata();
    await image
      .resize({
        height: metaData.height,
        width
      })
      .toFile(outputPath);
  }
  console.log('The Image has been resized successfuly');
};

export const processImage = async (
  filename: string,
  width: number | undefined,
  height: number | undefined
): Promise<string | undefined> => {
  const imagesDire = getImagesDire(__dirname);
  const originalImagePath: string = path.join(
    imagesDire,
    'full',
    filename + '.jpg'
  );
  if (!(width || height)) {
    console.log('returning the original image');
    return originalImagePath;
  } else {
    createResultDire(imagesDire);
    if (height && width) {
      const resultedImageName = `${filename} with height of ${height} & width of ${width}.jpg`;
      const resultPath: string = path.join(
        imagesDire,
        'Result',
        resultedImageName
      );
      if (!imgExistanceCheck(resultPath)) {
        await imgOperation(originalImagePath, resultPath, height, width);
      }
      return resultPath;
    } else if (height) {
      const resultedImageName = `${filename} with height of ${height}.jpg`;
      const resultPath: string = path.join(
        imagesDire,
        'Result',
        resultedImageName
      );
      if (!imgExistanceCheck(resultPath)) {
        await imgOperation(
          originalImagePath,
          resultPath,
          height as number,
          width as number
        );
      }
      return resultPath;
    } else {
      const resultedImageName = `${filename} with width of ${width}.jpg`;
      const resultPath = path.join(imagesDire, 'Result', resultedImageName);
      if (!imgExistanceCheck(resultPath)) {
        await imgOperation(
          originalImagePath,
          resultPath,
          height as number,
          width as number
        );
      }
      return resultPath;
    }
  }
};
