# Oauth2
Facebook Login with Node.js in server-side


You need to add redirect_url(http://localhost:8999) to your platform first.  
    
    In Settings -> Basic tab

    1. Add `localhost` to field of App Domain.
    2. Click `+Add Platform` and choose `Website`.
    3. Add `http://localhost:8999` to field of Site URL.
    4. Save Changes
    
Instagram authentication with Node.js in server-side
    
    1. Add `http://localhost:8999/v1/instagram/callback` to `Valid redirect URIs`.
    
    Note: Request the access_token (Need POST with form-data)
