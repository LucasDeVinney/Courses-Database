import { useNavigate } from "react-router-dom";

const CancelButton = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/');
    }

    return (
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
    )
}

export default CancelButton