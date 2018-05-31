import Express from 'express';
import Facebook from './route/facebook';

const app = Express();
const port = process.env.PORT || 3000;

app.use('/v1/facebook', Facebook);

app.listen(port, () => {
  console.log(`The server is listen at ${port}`);
})