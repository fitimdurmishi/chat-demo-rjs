import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function LoginCallback() {
  const { isLoading, isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Let Auth0 handle the callback automatically, just redirect when done
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/');
      } else if (error) {
        console.error('Authentication error:', error);
        navigate('/');
      }
    }
  }, [isLoading, isAuthenticated, error, navigate]);

  if (error) {
    return (
      <div>
        <h2>Authentication Error</h2>
        <p>Error: {error.message}</p>
        <p>Redirecting to home...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Completing login...</h2>
        <p>Please wait while we finish logging you in.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Login successful!</h2>
      <p>Redirecting...</p>
    </div>
  );
}

export default LoginCallback;
