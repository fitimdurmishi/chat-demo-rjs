// import { createContext, useState, useContext } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem('user');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   const login = (username, password) => {
//     // Replace with real authentication logic
//     if (username === 'demo' && password === 'demo') {
//         const userData = { username, plan: 'Pro Plan', fullname: 'Demo User' };
//         setUser(userData);
//         localStorage.setItem('user', JSON.stringify(userData));
//         return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }