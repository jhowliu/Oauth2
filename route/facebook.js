import Axios from 'axios';
import Express from 'express';
import Settings from '../settings';

const router = Express.Router()

router.get('/connect', (req, res) => {
  const app_id = Settings.facebook.app_id;
  const redirect_uri = Settings.facebook.redirect_uri;
  const oauth_url = `https://www.facebook.com/v3.0/dialog/oauth?client_id=${app_id}&redirect_uri=${redirect_uri}&scope=manage_pages`

  res.json({ redirect_uri : oauth_url });
});

router.get('/callback', (req, res) => {
  const access_token_url = `https://graph.facebook.com/v3.0/oauth/access_token`

  Axios
  .get(access_token_url, {
    params: {
      client_id: Settings.facebook.app_id,
      client_secret: Settings.facebook.app_secret,
      code: req.query.code,
      redirect_uri: Settings.facebook.redirect_uri
    }
  })
  .then(response => response.data)
  .then(data => {
    const access_token = data.access_token;
    const inception_token_url = `https://graph.facebook.com/debug_token`;
    Axios.get(inception_token_url, {
      params: {
        input_token: access_token,
        access_token: Settings.app_token
      }
    })
    .then(response => response.data)
    .then(data => res.json(data));
  })
  .catch(err => {
    res.json({ success: false, error: `${err.response.data}` });
  })
});

export default router;