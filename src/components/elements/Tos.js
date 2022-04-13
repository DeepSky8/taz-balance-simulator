import React from "react";
import { Link } from "react-router-dom";
import { history } from "../../routers/AppRouter";

const Tos = () => (
    <div>
        <p>
            This webapp may only be used to play a digital version of The Adventure Zone: Bureau of Balance board game remotely for free.
        </p>
        <Link>
            Back to Sign In
        </Link>
    </div>

)

export { Tos as default }