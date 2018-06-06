import Express from 'express';
import Facebook from './route/facebook';
import Instagram from './route/instagram';

const app = Express();
const port = process.env.PORT || 8999;

app.use('/v1/facebook', Facebook);
app.use('/v1/instagram', Instagram);

app.get('/', (req, res) => {
  res.sendStatus(200)
});

app.listen(port, () => {
  console.log(`The server is listen at ${port}`);
})
