import { lazy } from "react";
//import AuthRoutes from "./AuthRoutes";

const Home = lazy(() => import("../views/dashboards/Home"));
const Profile = lazy(() => import("../views/sample-pages/Profile"));

const ProcessRequest = lazy(() => import("../views/administrador/postulaciones/procesar/ProcessRequest"));
const CreateContract = lazy(() => import("../views/administrador/contratos/CreateContrat"));

const ViewWarehouseSeller = lazy(() => import("../views/vendedor/mis-almacenes/ViewWarehouseSeller"));
const AddWarehouseSeller = lazy(() => import("../views/vendedor/mis-almacenes/AddWarehouseSeller"));
const EditWarehouseSeller = lazy(() => import("../views/vendedor/mis-almacenes/EditWarehouseSeller"));

const ViewServices = lazy(() => import("../views/vendedor/mis-servicios/ViewServices"));
const AddService = lazy(() => import("../views/vendedor/mis-servicios/AddService"));
const EditService = lazy(() => import("../views/vendedor/mis-servicios/EditService"));

const ViewProducts = lazy(() => import("../views/vendedor/mis-productos/ViewProduct"));
const AddProduct = lazy(() => import("../views/vendedor/mis-productos/AddProduct"));
const EditProduct = lazy(() => import("../views/vendedor/mis-productos/EditProduct"));


const UpdateSeller = lazy(() => import("../views/vendedor/configuraciones/UpdateSeller"));

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
  //Vendedor
  //almacenes
  {
    path: "/viewWarehouseSeller",
    name: "Ver almacenes",
    component: ViewWarehouseSeller,
    onlyRoute:true
  },
  {
    path: "/addWarehouseSeller",
    name: "Añadir almacen",
    component: AddWarehouseSeller,
    onlyRoute:true
  },
  {
    path: "/editWahrehouseSeller",
    name: "Editar almacen",
    component: EditWarehouseSeller,
    onlyRoute:true
  },
  //servicios
  {
    path: "/viewServices",
    name: "Ver servicios",
    component: ViewServices,
    onlyRoute:true
  },
  {
    path: "/addService",
    name: "Añadir servicios",
    component: AddService,
    onlyRoute:true
  },
  {
    path: "/editService",
    name: "Editar servicios",
    component: EditService,
    onlyRoute:true
  },
  //productos
  {
    path: "/viewProducts",
    name: "Ver productos",
    component: ViewProducts,
    onlyRoute:true
  },
  {
    path: "/addProduct",
    name: "Añadir producto",
    component: AddProduct,
    onlyRoute:true
  },
  {
    path: "/editProducts",
    name: "Editar producto",
    component: EditProduct,
    onlyRoute:true
  },
  //configuraciones
  {
    path: "/updateSeller",
    name: "Actualizar cuenta",
    component: UpdateSeller,
    onlyRoute:true
  },
  //Administrador
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
