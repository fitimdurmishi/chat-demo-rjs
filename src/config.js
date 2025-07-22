export const auth0Config = {
  domain: 'dev-0vflmbn0mnfcjbzm.us.auth0.com',
  clientId: 'YVdEnfn23zuYcvYw6FuMR7z325TtW4Z7',
  authorizationParams: {
    redirect_uri: window.location.origin + '/login/callback',
    scope: 'openid profile email'
  }
};
