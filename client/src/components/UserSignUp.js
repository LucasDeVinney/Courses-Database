// Improts
import { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";
import CancelButton from "./CancelButton";

const UserSignUp = () => {
    // Hooks
    const navigate = useNavigate();
    const { actions } = useContext(UserContext);
    const [errors, setErrors] = useState([]);

    // Data collection constants
    const firstName= useRef(null);
    const lastName= useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    // Submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        };

        // Tries to create new user
        try {
            const response = await api('/users', 'POST', newUser, null);
            if (response.status === 201) {
                await actions.signIn(newUser);
                navigate('/');
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors([data.errors]);
            }
        } catch (error) {
            console.log('Error: ', error.message);
        }
    };

    return (
        <div className="form--centered">
            <ErrorsDisplay errors={errors} />
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input 
                    id="firstName"
                    name="firstName"
                    type="text"
                    ref={firstName}
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    id="lastName"
                    name="lastName"
                    type="text"
                    ref={lastName}
                />
                <label htmlFor="emailAddress">Email Address</label>
                <input 
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    ref={emailAddress}
                />
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    ref={password}
                />
                <button className="button" type="submit">Sign Up</button>
                <CancelButton />
            </form>
            <p>Already have a user account? Click here to
                <Link to="/signin"> sign in</Link>!
            </p>
        </div>
    )
}

export default UserSignUp;