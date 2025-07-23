import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const { logout, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged out, redirect to home
    if (!isLoading && !isAuthenticated) {
      navigate('/');
      return;
    }

    // If authenticated, perform logout without returnTo
    if (!isLoading && isAuthenticated) {
      logout();
    }
  }, [logout, isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Logging out...</h2>
      <p>Please wait while we log you out.</p>
    </div>
  );
}

export default LogoutPage;