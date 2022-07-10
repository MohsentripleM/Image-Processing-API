import fs from 'fs';
import path from 'path';

export const getImagesDire = (dire: string = __dirname): string => {
  let imgDire = '';
  const contents: string[] = fs.readdirSync(dire);
  if (contents.includes('images')) {
    imgDire = path.join(dire, 'images');
  } else {
    imgDire = getImagesDire(path.join(dire, '..'));
  }
  return imgDire;
};

export const createResultDire = (imagesDire: string): void => {
  const resultFolder = path.join(imagesDire, 'Result');
  if (!fs.existsSync(resultFolder)) {
    fs.mkdirSync(resultFolder);
    console.log('Resulted images folder created');
  }
};

export const imgExistanceCheck = (imgPath: string): boolean =>
  fs.existsSync(imgPath);
