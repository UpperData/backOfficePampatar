import { lazy } from "react";

//import AuthRoutes from "./AuthRoutes";

const Home = lazy(() => import("../views/dashboards/Home"));
const Profile = lazy(() => import("../views/user/Profile"));


//administrador
const ProcessRequest        = lazy(()     => import("../views/administrador/postulaciones/procesar/ProcessRequest"));

const CreateContract        = lazy(()     => import("../views/administrador/contratos/CreateContrat"));
const FindContract          = lazy(()     => import("../views/administrador/contratos/FindContract"));
const FindContractByShop    = lazy(()     => import("../views/administrador/contratos/FindContractByShop"));

const MisTiendas    = lazy(()     => import("../views/administrador/tiendas/MisTiendas"));
const MiTienda      = lazy(()     => import("../views/administrador/tiendas/MiTienda"));

//vendedor

const BidsSellerAd    = lazy(()     => import("../views/vendedor/publicaciones/BidsSellerAd"));

const ViewWarehouseSeller = lazy(() => import("../views/vendedor/mis-almacenes/ViewWarehouseSeller"));
const AddWarehouseSeller = lazy(() => import("../views/vendedor/mis-almacenes/AddWarehouseSeller"));
const EditWarehouseSeller = lazy(() => import("../views/vendedor/mis-almacenes/EditWarehouseSeller"));

const ViewServices = lazy(() => import("../views/vendedor/mis-servicios/ViewServices"));
const AddService = lazy(() => import("../views/vendedor/mis-servicios/AddService"));
const EditService = lazy(() => import("../views/vendedor/mis-servicios/EditService"));

const ViewProducts = lazy(() => import("../views/vendedor/mis-productos/ViewProduct"));
const AddProduct = lazy(() => import("../views/vendedor/mis-productos/AddProduct"));
const EditProduct = lazy(() => import("../views/vendedor/mis-productos/EditProduct"));

const StockMonitorSeller = lazy(() => import("../views/vendedor/inventario/StockMonitorSeller"));
const AddProductSeller = lazy(() => import("../views/vendedor/inventario/AddProductSeller"));
const InventoryService = lazy(() => import("../views/vendedor/inventario/InventoryService"));
const ActualizarLote = lazy(() => import("../views/vendedor/inventario/ActualizarLote"));
const PriceUpdate = lazy(() => import("../views/vendedor/inventario/PriceUpdate"));

const UpdateSeller = lazy(() => import("../views/vendedor/configuraciones/UpdateSeller"));
const AttachmentLogo = lazy(() => import("../views/vendedor/configuraciones/AttachmentLogo"));

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
  {
    path: "/attachmentLogo",
    name: "Añadir logo",
    component: AttachmentLogo,
    onlyRoute:true
  },
   //inventario
  {
    path: "/addProductSeller",
    name: "Incorporar lote",
    component: AddProductSeller,
    onlyRoute:true
  },
  {
    path: "/service/inventory",
    name: "Inventariar servicio",
    component: InventoryService,
    onlyRoute:true
  },
  {
    path: "/Inventory/product/lote/out",
    name: "Actualizar lote",
    component: ActualizarLote,
    onlyRoute:true
  },
  {
    path: "/stockMonitorSeller",
    name: "Monitor de stock",
    component: StockMonitorSeller,
    onlyRoute:true
  },
  {
    path: "/seller/InvEntory/priCe/uPdate",
    name: "Actualizar precios",
    component: PriceUpdate,
    onlyRoute:true
  },
  //Administrador

  //postulaciones
  {
    path: "/processRequest",
    name: "Procesar postulacion",
    component: ProcessRequest,
    onlyRoute:true
  },
  //contratos
  {
    path: "/createContrat",
    name: "Crear contratos",
    component: CreateContract,
    onlyRoute:true
  },
  {
    path: "/findContract",
    name: "Buscar contratos",
    component: FindContract,
    onlyRoute:true
  },
  {
    path: "/findContract/shop/:id",
    name: "Buscar contratos por tienda",
    component: FindContractByShop,
    onlyRoute:true
  },
  //publicaciones
  {
    path: "/bidsSellerAdd",
    name: "Crear publicacion",
    component: BidsSellerAd,
    onlyRoute:true
  },
  //tiendas
  {
    path: "/admin/shop/all",
    name: "Mis Tiendas",
    component: MisTiendas,
    onlyRoute:true
  },
  {
    path: "/admin/shop/:id",
    name: "Mis Tiendas",
    component: MiTienda,
    onlyRoute:true
  },
  //redirect
  {
    path: "/",
    pathTo: "/dashboard/",
    name: "Dashboard",
    redirect: true,
  }
];
export default ThemeRoutesByRole;
