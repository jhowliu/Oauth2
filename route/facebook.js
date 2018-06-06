import Express from 'express';
import Settings from '../settings';
import Querystring from 'querystring';

import { access } from 'fs';
import { makeRequest } from '../lib/httpUtils';

const router = Express.Router()

router.get('/connect', (req, res) => {
  const app_id = Settings.facebook.app_id;
  const params = Querystring.stringify({
    client_id: app_id,
    scope: `manage_pages`,
    redirect_uri: Settings.facebook.redirect_uri
  });
  const oauth_url = `https://www.facebook.com/v3.0/dialog/oauth?${params}`;

  res.json({ redirect_uri : oauth_url });
});

router.get('/callback', (req, res) => {
  const access_token_url = `https://graph.facebook.com/v3.0/oauth/access_token`;

  makeRequest(access_token_url, `GET`, {
    params: {
      code: req.query.code,
      client_id: Settings.facebook.app_id,
      client_secret: Settings.facebook.app_secret,
      redirect_uri: Settings.facebook.redirect_uri
    }
  })
  .then(response => response.json())
  .then(json => {

    if (json.error) {
      return res.json({
        success: false,
        errors: json.error.message
      })
    }

    const inception_token_url = `https://graph.facebook.com/debug_token`;
    makeRequest(inception_token_url, `GET`, {
      params: {
        input_token: json.access_token,
        access_token: Settings.facebook.app_token
      }
    })
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(err => res.json({
      success: false,
      errors: err.toString()
    }));
  })
  .catch(err => res.json({
    success: false,
    errors: err.toString()
  }));
});

export default router;