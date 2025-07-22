import React, { useState } from 'react';

const LoginForm = ({ login }) => {
    const [error, setError] = useState('');

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const username = e.target.username.value;
                    const password = e.target.password.value;
                    if (!login(username, password)) {
                        setError('Invalid credentials');
                    } else {
                        setError('');
                    }

                }}
                >
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center space-x-3">
                        <input name="username" placeholder="Username" />
                        <input name="password" type="password" placeholder="Password" />
                        <button
                        type="submit"
                        className="p-1 w-24 text-white bg-blue-500 hover:bg-blue-400 rounded-lg"
                        >
                        Login
                        </button>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default LoginForm;