import { useAuth0 } from '@auth0/auth0-react';
import LoginForm from './auth/LoginForm';
import HomeAuthenticated from './HomeAuthenticated';

export default function Home() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) 
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 bg-gray-200 dark:bg-gray-900">
        Loading...
      </div>
    );

  return (
    <div>
      {isAuthenticated ? <HomeAuthenticated /> : <LoginForm />}
    </div>
  );
}
