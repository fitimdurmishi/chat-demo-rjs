import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import { auth0Config } from './config/auth0Config';
import Home from './components/Home';
import Profile from './components/Profile';
import LoginCallback from './components/auth/LoginCallback';
import LogoutPage from './components/auth/LogoutPage';

function App() {
  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;