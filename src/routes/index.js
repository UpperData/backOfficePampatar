import { lazy } from "react";
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const BlankLayout = lazy(() => import("../layouts/BlankLayout.js"));

export const AuthRoutes = [
  { path: "/authentication", name: "Authentication", component: BlankLayout },
];

export const publicRoutes = [
  { path: "/", name: "Dashboard", component: FullLayout }
];


