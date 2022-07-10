import express from 'express';
import images from './routes';
const app = express();
const port = 3000;
app.use('/images', images);

app.get('/', function (_req, res: express.Response): void {
  res.status(200).send('root route');
});
app.listen(port, () => console.log('listening to port 3000'));
export default app;
