import { Props } from 'next/script';
import React, { ComponentType, useEffect } from 'react'

function TokenAuth<P extends Props>(
    WrappedComponent: ComponentType<P>
): ComponentType<P> {
    return function WithoutTokenRedirectWrapper(props: P) {
        useEffect(() => {
            const token = localStorage.getItem('token');            

            if (!token) {
                window.location.href = "/login";
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
}

export default TokenAuth