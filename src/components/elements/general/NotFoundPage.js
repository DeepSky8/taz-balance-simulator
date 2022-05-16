import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Return to Welcome Page</Link>
    </div>
)

export { NotFoundPage as default }