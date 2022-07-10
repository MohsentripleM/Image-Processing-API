import express from 'express';
import fs from 'fs';
import { getImagesDire } from '../utilities';
import { processImage } from '../utilities/processing';

const images = express.Router();

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const { filename, width, height } = req.query;
    // const originalImagePath: string = `${getImageDire(__dirname)}/full/${filename}.jpg`;
    if (filename) {
      const imagesDirectory: string[] = fs.readdirSync(
        getImagesDire(__dirname) + '/full'
      );
      if (!imagesDirectory.includes(`${filename}.jpg`)) {
        res
          .status(404)
          .send(
            `filename is invalid only use ${imagesDirectory
              .map((i) => i.replace('.jpg', ''))
              .join(', ')}`
          );
        console.log('filename is invalid');
      } else {
        //if the sent numbers for height and width is negative the negative sign will be ignored
        //if the sent value equal zero it will be ignored
        //if the sent value is not number will return bad request
        const widthValue: number = width
          ? Math.abs(parseInt(width as string))
          : 0;
        const heightValue: number = height
          ? Math.abs(parseInt(height as string))
          : 0;
        if (isNaN(widthValue && heightValue)) {
          res
            .status(400)
            .send(
              ' Invalid Height/Width value...!! Height and width values should be a number!!'
            );
        } else {
          const readyImagePath = await processImage(
            filename as string,
            widthValue as number,
            heightValue as number
          );
          res.sendFile(readyImagePath as string);
        }
      }
    } else {
      res.status(400).send('The queries must include filename!!');
    }
  }
);

export default images;
