import {lazy } from "react"

const Login2                  = lazy(() => (import('../views/authentication/Login2')));
const Table                  = lazy(() => (import('../views/practice/table')));
const Showitem                  = lazy(() => (import('../views/practice/showitem')));
//const TokenExpired          = lazy(() => (import('../views/token/TokenExpired')));

var AuthRoutes = [
    { path: '/authentication/Login',        name: 'Login',      icon: 'mdi mdi-account-key',    component: Login2 },
    { path: '/offline/mis-tiendas',         name: 'Mis tiendas',   icon: 'mdi mdi-account-key',    component: Table },
    { path: '/offline/mis-tiendas/:id',     name: 'Mis tiendas',   icon: 'mdi mdi-account-key',    component: Showitem },
    { path: '/',                        pathTo: '/authentication/Login',   redirect: true }
];

export default AuthRoutes; 