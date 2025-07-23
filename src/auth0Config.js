
// This configuration file is used to set up the Auth0 authentication for the application.
// It includes the domain, client ID, and authorization parameters such as redirect URI and scope.
export const auth0Config = {
  domain: 'dev-0vflmbn0mnfcjbzm.us.auth0.com', // Okta domain
  clientId: 'YVdEnfn23zuYcvYw6FuMR7z325TtW4Z7', // Okta client ID
  authorizationParams: {
    redirect_uri: window.location.origin + '/login/callback',
    scope: 'openid profile email'
  }
};
