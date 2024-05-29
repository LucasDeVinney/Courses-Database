// Imports
import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '../utils/apiHelper';

// Initialize context
const UserContext = createContext(null);

export const UserProvider = (props) => {
    // Create cookie
    const cookie = Cookies.get("authenticatedUser");

    // Create state with cookie
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    // Sign in action
    const signIn = async (credentials) => {
        // Gets user by credentials and sets authenticated user to the user
        try {
            const response = await api('/users', 'GET', null, credentials);
            if (response.status === 200) {
                const user = await response.json();
                user.user.password = credentials.password;
                setAuthUser(user);
                Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1});
                return user;
            } else if (response.status === 401) {
                return null;
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log('Error: ', error.message)
        }
    };

    // Sign out action
    const signOut = () => {
        // Clears auth user
        setAuthUser(null);
        Cookies.remove("authenticatedUser");
    };

    return (
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut
            }
        }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;