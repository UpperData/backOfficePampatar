import {lazy } from "react"

const Login2                = lazy(() => (import('../views/authentication/Login2')));
//const TokenExpired          = lazy(() => (import('../views/token/TokenExpired')));

var AuthRoutes = [
    { path: '/authentication/Login',  name: 'Login', icon: 'mdi mdi-account-key', component: Login2 },
    //{ path: '/session/token-expired', name: 'Token expirado', icon: 'mdi mdi-account-key', component: TokenExpired },
];

export default AuthRoutes; 