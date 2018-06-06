import Axios from 'axios';
import Express from 'express';
import Settings from '../settings';

const router = Express.Router()

router.get('/connect', (req, res) => {
  const app_id = Settings.instagram.app_id;
  const redirect_url = Settings.instagram.redirect_uri;
  const oauth_url = `https://api.instagram.com/oauth/authorize/?client_id=${app_id}&redirect_uri=${redirect_url}&response_type=code`
  res.json({'redirect_url': oauth_url});
});

router.get('/callback', (req, res) => {
  const access_token_url = `https://api.instagram.com/oauth/access_token`
  const code = req.query.code;
  console.log(code)
  Axios.post(access_token_url, {
    grand_type: `authorization_code`,
    client_id: Settings.instagram.app_id,
    client_secret: Settings.instagram.app_secret,
    redirect_uri: Settings.instagram.redirect_uri,
    code
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log(err.toString())
  });
});

export default router;