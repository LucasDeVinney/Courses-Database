// Improts
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";
import ErrorsDisplay from './ErrorsDisplay';
import CancelButton from "./CancelButton";

const CreateCourse = () => {
    // Hooks
    const [errors, setErrors] = useState([]);
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    // Submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCourse = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.user.id
        };
        const credentials = {
            username: authUser.user.emailAddress,
            password: authUser.user.password
        };

        // Tries to post course with proper authentication and data
        try {
            if (authUser) {
                const response = await api('/courses', 'POST', newCourse, credentials);
                if (response.status === 201) {
                    navigate('/');
                } else if (response.status === 400) {
                    const data = await response.json();
                    setErrors(data.errors);
                } else {
                    throw new Error();
                }
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <div className="wrap">
            <ErrorsDisplay errors={errors.map(error => error.msg)} />
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="title">Course Title</label>
                        <input 
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            ref={title}
                        />
                        <p>By {authUser.user.firstName} {authUser.user.lastName}</p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea 
                            id="courseDescription"
                            name="courseDescription"
                            ref={description}
                            style={{ resive: 'none' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input 
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            ref={estimatedTime}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                            id="materialsNeeded"
                            name="materialsNeeded"
                            ref={materialsNeeded}
                            style={{ resize: 'none' }}
                        />
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <CancelButton />
            </form>
        </div>
    )
}

export default CreateCourse;