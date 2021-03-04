import React from 'react'
import NotificationManager from 'react-notifications/lib/NotificationManager'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({component: Component, ...rest }) {
    const redirected = () => {
        NotificationManager.error('Please,Sign in');
    }
    return (
        <Route
            {...rest}
            render={
                props => localStorage.getItem('idToken') ?
                <Component {...props} />: <Redirect to="/"/>
                
            }

        />
    )
}
