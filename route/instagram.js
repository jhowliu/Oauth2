import Express from 'express';
import Settings from '../settings';
import QueryString from 'querystring';

import { access } from 'fs';
import { makeRequest, makeFormData } from '../lib/httpUtils';
import { settings } from 'cluster';

const router = Express.Router()

router.get('/connect', (req, res) => {
  const app_id = Settings.instagram.app_id;
  const params = QueryString.stringify({
    client_id: app_id,
    response_type: `code`,
    redirect_uri: Settings.instagram.redirect_uri
  })
  const oauth_url = `https://api.instagram.com/oauth/authorize/?${params}`

  res.json({'redirect_url': oauth_url});
});

router.get('/callback', (req, res) => {
  const access_token_url = `https://api.instagram.com/oauth/access_token`
  const code = req.query.code;

  const formData = makeFormData({
    code, 
    'grant_type': `authorization_code`,
    'client_id': Settings.instagram.app_id,
    'client_secret': Settings.instagram.app_secret,
    'redirect_uri': Settings.instagram.redirect_uri
  });

  makeRequest(access_token_url, `POST`, {
    body: formData
  })
  .then(response => response.json())
  .then(json => {
    res.json({
      success: true,
      message: json
    })
  })
  .catch(err => {
    res.json({
      success: false,
      errors: err.toString()
    })
  });
});

export default router;