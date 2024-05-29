// Imports
import { useNavigate } from "react-router-dom";

const CancelButton = () => {
    const navigate = useNavigate();

    // Redirects to the main courses page when clicked
    const handleCancel = () => {
        navigate('/');
    }

    return (
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
    )
}

export default CancelButton;