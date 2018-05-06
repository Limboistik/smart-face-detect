import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <a onClick={() => onRouteChange('signout')} className="f5 link dim black underline pa3 pointer">Sign Out</a>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <a onClick={() => onRouteChange('signin')} className="f5 link dim black underline pa3 pointer">Sign In</a>
                <a onClick={() => onRouteChange('register')} className="f5 link dim black underline pa3 pointer">Register</a>
            </nav>
        )
    }
}

export default Navigation;