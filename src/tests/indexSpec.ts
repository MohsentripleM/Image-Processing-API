import fs from 'fs';
import path from 'path';
import supertest from 'supertest';
import app from '..';
import { getImagesDire } from '../utilities';
import { processImage } from '../utilities/processing';

const realFileName = 'santamonica';
const wrongFileName = 'John';
const validWidth = 2000;
const negativeWidth = -500;
const invalidWidth = 'uedf';
const validHeight = 2000;
const negativeHeight = -500;
const invalidHeight = 'dskde';
const resutFlderPth = path.join(getImagesDire(), 'Result');

const project = supertest(app);

describe('Testing the whole project performance', () => {
  beforeAll(() => {
    if (fs.existsSync(resutFlderPth)) {
      fs.rmSync(resutFlderPth, { recursive: true, force: true });
      console.log('Result Folder has been removed');
    }
  });

  describe('Testing end points', () => {
    it('test root route', async () => {
      const response = await project.get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('root route');
    });

    it('test request with real file name', async () => {
      const response = await project.get('/images?filename=' + realFileName);
      expect(response.status).toBe(200);
    });

    it('test request with real file name and valid width and height', async () => {
      const response = await project.get(
        `/images?filename=${realFileName}&&width=${validWidth}&&height=${validHeight}`
      );
      expect(response.status).toBe(200);
      expect(
        fs.existsSync(
          path.join(
            resutFlderPth,
            `${realFileName} with height of ${validHeight} & width of ${validWidth}.jpg`
          )
        )
      ).toBeFalsy;
    });

    it('test request with real file name and negative width and height', async () => {
      const response = await project.get(
        `/images?filename=${realFileName}&&width=${negativeWidth}&&height=${negativeHeight}`
      );
      expect(response.status).toBe(200);
    });
  });

  describe('Testing functions', () => {
    it('Testing getImagesDire', () => {
      const response = getImagesDire();
      expect(response).toContain('images');
    });

    it('Testing processImage with valid parameters', async () => {
      const image = await processImage(realFileName, validWidth, validHeight);
      expect(image).toEqual(
        path.join(
          getImagesDire(),
          'Result',
          `${realFileName} with height of ${validHeight} & width of ${validWidth}.jpg`
        )
      );
    });
    it('Testing processImage with negative width and height ', async () => {
      const image = await processImage(
        realFileName,
        // the negative numbers are converted to positive before sending then to processImage function
        Math.abs(negativeWidth),
        Math.abs(negativeHeight)
      );
      expect(image).toEqual(
        path.join(
          getImagesDire(),
          'Result',
          `${realFileName} with height of ${Math.abs(
            negativeHeight
          )} & width of ${Math.abs(negativeWidth)}.jpg`
        )
      );
    });
  });

  describe('Testing errors', () => {
    it('test request with real file name with invalid height or width value', async () => {
      const response = await project.get(
        `/images?filename=${realFileName}&height=${invalidHeight}&width=${invalidWidth}`
      );
      expect(response.status).toBe(400);
      expect(response.text).toBe(
        ' Invalid Height/Width value...!! Height and width values should be a number!!'
      );
    });

    it('test request without file name', async () => {
      const response = await project.get('/images');
      expect(response.status).toBe(400);
      expect(response.text).toBe('The queries must include filename!!');
    });
    it('test request with wrong file name', async () => {
      const response = await project.get('/images?filename=' + wrongFileName);
      expect(response.status).toBe(404);
      expect(response.text).toBe(
        'filename is invalid only use encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica'
      );
    });
  });
});
