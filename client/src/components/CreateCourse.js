import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

import UserContext from "../context/UserContext";

import ErrorsDisplay from './ErrorsDisplay';

import CancelButton from "./CancelButton";

const CreateCourse = () => {
    const [errors, setErrors] = useState([]);
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    
}

export default CreateCourse;