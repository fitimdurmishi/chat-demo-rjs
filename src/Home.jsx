import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  const handleLogout = () => {
    // Simple logout without returnTo parameter
    logout();
  };

  return (
    <div>
      <h1>Home Page</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in!</p>
          <p>Welcome, {user?.name || user?.email}!</p>
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </>
      )}
    </div>
  );
}
