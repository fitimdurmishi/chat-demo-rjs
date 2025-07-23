import { useAuth0 } from '@auth0/auth0-react';

const LoginForm = () => {
    const { isLoading, loginWithRedirect, loginWithPopup } = useAuth0();

    if (isLoading) 
        return (
            <div className="flex items-center justify-center h-screen text-gray-500 bg-gray-200 dark:bg-gray-900">
                Loading...
            </div>
        );

    return (
        <div className="flex items-center justify-center h-screen text-gray-500 bg-gray-200 dark:bg-gray-900">
            <button
                type="submit"
                className="p-1 w-32 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
                onClick={() => loginWithRedirect()}
            >
                Okta Login
            </button>
        </div>
    );
}

export default LoginForm;