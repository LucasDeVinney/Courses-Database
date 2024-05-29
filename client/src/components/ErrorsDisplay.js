const ErrorsDisplay = ({ errors }) => {
    let errorsDisplay = null;

    if (errors.length) {
        let errorsDisplay = (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <div>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
    return errorsDisplay;
}

export default ErrorsDisplay;