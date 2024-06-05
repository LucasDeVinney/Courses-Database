// Imports
import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";
import CancelButton from "./CancelButton";

const UpdateCourse = () => {
    // Hooks
    const [course, setCourse] = useState([]);
    const [errors, setErrors] = useState([]);
    const { authUser } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    // Defining variables for course data
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    // Tries getting the specified course data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api(`/courses/${id}`, 'GET', null, null);
                if (response.status === 200) {
                    const data = await response.json();
                    if (authUser.user.emailAddress !== data.user.emailAddress) {
                        setErrors(['Unable to update. You are not authorized to update this course.']);
                    } else {
                        setCourse(data);
                    }
                } else if (response.status === 404) {
                    navigate('/notfound');
                }
            } catch (error) {
                console.log('Error: ', error.message);
            }
        };
        fetchData();
    }, [id, navigate, authUser.user.emailAddress]);

    // Submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedCourse = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.user.id
        };
        const credentials = {
            emailAddress: authUser.user.emailAddress,
            password: authUser.user.password
        };

        // Tries updating the course with authentication
        try {
            const response = await api(`/courses/${id}`, 'PUT', updatedCourse, credentials);
            if (response.status === 204) {
                navigate(`/courses/${id}`);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else if (response.status === 401) {
                const data = await response.json();
                setErrors(data.message);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log('Error: ', error.message);
        };
    };

    return (
        <>
            <div className="wrap">
            <ErrorsDisplay errors={errors} />
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input 
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            ref={title}
                            defaultValue={course.title}
                        />
                        <p>
                            By {course.user && `${course.user.firstName} ${course.user.lastName}`}
                        </p>
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea 
                            id="courseDescription"
                            name="courseDescription"
                            ref={description}
                            defaultValue={course.description}
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
                            defaultValue={course.estimatedTime}
                        />
                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea 
                            id="materialsNeeded"
                            name="materialsNeeded"
                            ref={materialsNeeded}
                            style={{ resize: 'none' }}
                            defaultValue={course.materialsNeeded}
                        />
                    </div>
                </div>
                <button className="button" type="submit">Update Course</button>
                <CancelButton />
            </form>
            </div>
        </>

    )
}

export default UpdateCourse;