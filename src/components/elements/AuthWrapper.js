import React from "react";

export const AuthWrapper = ({children}) => {

    return (
        <div>
            <div>Login</div>
            {children}
        </div>
    )
}

export { AuthWrapper as default }