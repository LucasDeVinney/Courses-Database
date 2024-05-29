import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="bounds">
        <div className="actions--bar">
            <Link to="/" className="button button-secondary">
                Return to List
            </Link>
        </div>
        <h1>404</h1>
        <p>Sorry! The page you were looking for was not found!</p>
    </div>
);

export default NotFound;