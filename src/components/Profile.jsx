// import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0(); // Get authenticated user

  if (isLoading) return <div className="flex items-center justify-center h-screen text-gray-500 bg-gray-200 dark:bg-gray-900">Loading profile...</div>;
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // TODO: display user profile information, in more user-friendly way
  return (
    <>
      <div className="flex justify-center h-screen text-gray-500 bg-gray-200 dark:bg-gray-900">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  );
}

export default Profile;