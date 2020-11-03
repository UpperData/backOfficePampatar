import { lazy } from "react";

//import AuthRoutes from "./AuthRoutes";

const Home = lazy(() => import("../views/dashboards/Home"));
const Profile = lazy(() => import("../views/sample-pages/Profile"));

const ProcessRequest = lazy(() => import("../views/administrador/postulaciones/procesar/ProcessRequest"));
const CreateContract = lazy(() => import("../views/administrador/contratos/CreateContrat"));

//const auths = [].concat(AuthRoutes);

var ThemeRoutesByRole = [
  {
    navlabel: true,
    name: "Mi Tienda",
    icon: "",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "home",
    component: Home,
  },
  {
    path: "/perfil",
    name: "Perfil",
    component: Profile,
    onlyRoute:true
  },
  {
    path: "/processRequest",
    name: "Procesar postulacion",
    component: ProcessRequest,
    onlyRoute:true
  },
  {
    path: "/createContrat",
    name: "Procesar postulacion",
    component: CreateContract,
    onlyRoute:true
  },
  {
    path: "/",
    pathTo: "/dashboard/",
    name: "Dashboard",
    redirect: true,
  }
];
export default ThemeRoutesByRole;
