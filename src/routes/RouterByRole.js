import { lazy } from "react";

//import AuthRoutes from "./AuthRoutes";

const Home = lazy(() => import("../views/dashboards/Home"));
const Profile = lazy(() => import("../views/user/Profile"));


//administrador
const ProcessRequest        = lazy(()     => import("../views/administrador/postulaciones/procesar/ProcessRequest"));
const SelectRequest        = lazy(()     => import("../views/administrador/postulaciones/SelectRequest"));

const CreateContract        = lazy(()     => import("../views/administrador/contratos/CreateContrat"));
const FindContract          = lazy(()     => import("../views/administrador/contratos/FindContract"));
const FindContractByShop    = lazy(()     => import("../views/administrador/contratos/FindContractByShop"));
const RepairContract        = lazy(()     => import("../views/administrador/contratos/RepairContract"));

const MisTiendas    = lazy(()     => import("../views/administrador/tiendas/MisTiendas"));
const MiTienda      = lazy(()     => import("../views/administrador/tiendas/MiTienda"));

const Consultar         = lazy(()     => import("../views/administrador/publicaciones/Consultar"));
const ConsultarTienda   = lazy(()     => import("../views/administrador/publicaciones/ConsultarTienda"));
const Procesar          = lazy(()     => import("../views/administrador/publicaciones/Procesar"));
const Actualizar        = lazy(()     => import("../views/administrador/publicaciones/Actualizar"));

const CurrentTaxes  = lazy(()     => import("../views/administrador/impuestos/CurrentTaxes"));
const ShowTax       = lazy(()     => import("../views/administrador/impuestos/ShowTax"));
const UpdateTax     = lazy(()     => import("../views/administrador/impuestos/UpdateTax"));

//vendedor

const BidsSellerAd    = lazy(()     => import("../views/vendedor/publicaciones/BidsSellerAd"));
const List            = lazy(()     => import("../views/vendedor/publicaciones/List"));
const UpdateBid       = lazy(()     => import("../views/vendedor/publicaciones/UpdateBid"));

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
const UpdateService = lazy(() => import("../views/vendedor/inventario/UpdateService"));
const ServicesStock = lazy(() => import("../views/vendedor/inventario/ServicesStock"));

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
    path: "/SERvICES/stOck/curreNT/",
    name: "Stock de servicios",
    component: ServicesStock,
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
    name: "Actualizar almacen",
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
    name: "Actualizar servicios",
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
    name: "Actualizar producto",
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
    name: "Nuevo lote",
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
    path: "/iNVENTORY/UpDAte/seRVICes",
    name: "Actualizar servicio",
    component: UpdateService,
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
  //Administrador______________________________________________________________________

  //postulaciones
  {
    path: "/processRequest",
    name: "Procesar postulacion",
    component: ProcessRequest,
    onlyRoute:true
  },
  {
    path: "/selectRequest",
    name: "Consultar postulaciones",
    component: SelectRequest,
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
  {
    path: "/conTract/repairRecoRd",
    name: "Reparar contrato",
    component: RepairContract,
    onlyRoute:true
  },
  //publicaciones
  {
    path: "/bidsSellerAdd",
    name: "Crear publicacion",
    component: BidsSellerAd,
    onlyRoute:true
  },
  {
    path: "/bidsSellerList",
    name: "Ver publicaciones",
    component: List,
    onlyRoute:true
  },
  {
    path: "/bidsSellerUpdate",
    name: "Actualizar publicacion",
    component: UpdateBid,
    onlyRoute:true
  },
  {
    path: "/bidsSellerUpdate/:id",
    name: "Actualizar publicacion",
    component: UpdateBid,
    onlyRoute:true
  },
  {
    path: "/admIn/pUBLICATIONS/proCEsss",
    name: "Procesar publicaciones",
    component: Procesar,
    onlyRoute:true
  },
  {
    path: "/admIn/pUBLICATIONS/ListAll",
    name: "Consultar publicaciones",
    component: Consultar,
    onlyRoute:true
  },
  {
    path: "/admIn/pUBLICATIONS/ListAll/Shop/:id",
    name: "Consultar publicaciones",
    component: ConsultarTienda,
    onlyRoute:true
  },
  {
    path: "/ADmin/publicatioNS/PROCESSUpdate",
    name: "Actualizar publicaciones",
    component: Actualizar,
    onlyRoute:true
  },
  //impuestos
  {
    path: "/tax/LIST/admin",
    name: "Impuestos actuales",
    component: CurrentTaxes,
    onlyRoute:true
  },
  {
    path: "/tax/show/:id",
    name: "Ver impuesto",
    component: ShowTax,
    onlyRoute:true
  },
  {
    path: "/Update/tAxVale/adMIN/one",
    name: "Actualizar impuesto",
    component: UpdateTax,
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
