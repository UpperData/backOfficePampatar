import { lazy } from "react";
import AuthRoutes from "./AuthRoutes";

//Lazy loading and code splitting
//apps
const Chat = lazy(() => import("../views/chat/Chat"));
const Contacts = lazy(() => import("../views/contacts/Contacts"));
const Email = lazy(() => import("../views/email/Email"));
const Notes = lazy(() => import("../views/notes/Notes"));
const Todo = lazy(() => import("../views/todo/Todo"));
//dashboards
const Analytical = lazy(() => import("../views/dashboards/Analytical"));
const Demographical = lazy(() => import("../views/dashboards/Demographical"));
const Modern = lazy(() => import("../views/dashboards/Modern"));
//Ui-components Dropdown
const Alerts = lazy(() => import("../views/ui-components/Alert"));
const Badges = lazy(() => import("../views/ui-components/Badge"));
const Spinners = lazy(() => import("../views/ui-components/Spinner"));
const Toasts = lazy(() => import("../views/ui-components/Toasts"));
const Breadcrumbs = lazy(() => import("../views/ui-components/Breadcrumb"));
const Buttons = lazy(() => import("../views/ui-components/Button"));
const Dropdowns = lazy(() => import("../views/ui-components/Dropdown"));
const BtnGroups = lazy(() => import("../views/ui-components/BtnGroup"));
const Cards = lazy(() => import("../views/ui-components/Cards"));
const CollapseComponent = lazy(() => import("../views/ui-components/Collapse"));
const CarouselComponent = lazy(() => import("../views/ui-components/Carousel"));
const JumbotronComponent = lazy(() =>
  import("../views/ui-components/Jumbotron")
);
const LayoutComponent = lazy(() => import("../views/ui-components/Layout"));
const ListComponent = lazy(() => import("../views/ui-components/ListGroup"));
const MediaComponent = lazy(() => import("../views/ui-components/Media"));
const ModalComponent = lazy(() => import("../views/ui-components/Modal"));
const NavbarComponent = lazy(() => import("../views/ui-components/Navbar"));
const NavsComponent = lazy(() => import("../views/ui-components/Navs"));
const PaginationComponent = lazy(() =>
  import("../views/ui-components/Pagination")
);
const PopoverComponent = lazy(() => import("../views/ui-components/Popover"));
const ProgressComponent = lazy(() => import("../views/ui-components/Progress"));
const TableComponent = lazy(() => import("../views/ui-components/Table"));
const TabsComponent = lazy(() => import("../views/ui-components/Tabs"));
const TooltipComponent = lazy(() => import("../views/ui-components/Tooltip"));
//Sample Pages Dropdown
const Starterkit = lazy(() => import("../views/sample-pages/StarterKit"));
const Profile = lazy(() => import("../views/sample-pages/Profile"));
const Searchresult = lazy(() => import("../views/sample-pages/SearchResult"));
const Gallery = lazy(() => import("../views/sample-pages/Gallery"));
const HelperClass = lazy(() => import("../views/sample-pages/HelperClass"));
const Widgets = lazy(() => import("../views/widget/Widget"));
const Calendar = lazy(() => import("../views/calendar/Calendar"));

//Chart Pages Dropdown
const Chartjs = lazy(() => import("../views/charts/ChartJs"));
const Chartc3 = lazy(() => import("../views/charts/C3Chart"));
const Apexcharts = lazy(() => import("../views/charts/ApexCharts"));
//Icon Pages Dropdown
const Materialicon = lazy(() => import("../views/icons/Material"));
const FontAwesome = lazy(() => import("../views/icons/FontAwesome"));
const Themify = lazy(() => import("../views/icons/Themify"));
const Weather = lazy(() => import("../views/icons/Weather"));
const Simpleline = lazy(() => import("../views/icons/SimpleLine"));
const FlagIcon = lazy(() => import("../views/icons/Flag"));
//Form Layout Pages Dropdown
const Basicform = lazy(() => import("../views/form-layouts/Basic"));
const FormInputs = lazy(() => import("../views/form-layouts/FormInputs"));
const FormGroups = lazy(() => import("../views/form-layouts/FormGroups"));
const FormGrids = lazy(() => import("../views/form-layouts/FormGrids"));
//Form-pickers Pages Dropdown
const Datepicker = lazy(() => import("../views/form-pickers/DateTimePicker"));
const Tagselect = lazy(() => import("../views/form-pickers/TagSelect"));
//Form Validation Page
const FormValidate = lazy(() =>
  import("../views/form-validation/FormValidation")
);
//Form Wizard Page
const FormSteps = lazy(() => import("../views/steps/Steps"));
//Table Pages Dropdown
const Basictable = lazy(() => import("../views/tables/TableBasic"));
const CustomReactTable = lazy(() => import("../views/tables/CustomReactTable"));
const Datatable = lazy(() => import("../views/tables/ReactBootstrapTable"));

const Vectormap = lazy(() => import("../views/maps/VectorMap"));
const auths = [].concat(AuthRoutes);

var ThemeRoutes = [
  {
    navlabel: true,
    name: "Personal",
    icon: "",
  },
  {
    collapse: true,
    path: "/dashboards",
    name: "Dashboards",
    state: "dashboardpages",
    icon: "home",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
      {
        path: "/dashboards/analytical",
        name: "Analytical",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Analytical,
      },
      {
        path: "/dashboards/demographical",
        name: "Demographical",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Demographical,
      },
      {
        path: "/dashboards/modern",
        name: "Modern",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Modern,
      },
    ],
  },
  {
    collapse: true,
    path: "/ui-components",
    name: "Ui Elements",
    state: "uicomponents",
    icon: "aperture",
    badges: "side-badge badge badge-danger",
    badgeno: "20",
    child: [
      {
        path: "/ui-components/alert",
        name: "Alerts",
        
        icon: "mdi mdi-comment-processing-outline",
        component: Alerts,
      },
      {
        path: "/ui-components/badge",
        name: "Badges",

        icon: "mdi mdi-arrange-send-backward",
        component: Badges,
      },
      {
        path: "/ui-components/breadcrumb",
        name: "Breadcrumbs",

        icon: "mdi mdi-equal",
        component: Breadcrumbs,
      },
      {
        path: "/ui-components/button",
        name: "Buttons",

        icon: "mdi mdi-toggle-switch",
        component: Buttons,
      },
      {
        path: "/ui-components/dropdown",
        name: "Button Dropdown",

        icon: "mdi mdi-cards-variant",
        component: Dropdowns,
      },
      {
        path: "/ui-components/btn-group",
        name: "Button Group",

        icon: "mdi mdi-checkbox-multiple-blank",
        component: BtnGroups,
      },
      {
        path: "/ui-components/card",
        name: "Cards",

        icon: "mdi mdi-credit-card-multiple",
        component: Cards,
      },
      {
        path: "/ui-components/collapse",
        name: "Collapse",

        icon: "mdi mdi-elevator",
        component: CollapseComponent,
      },
      {
        path: "/ui-components/carousel",
        name: "Carousel",

        icon: "mdi mdi-view-carousel",
        component: CarouselComponent,
      },
      {
        path: "/ui-components/jumbotron",
        name: "Jumbotron",

        icon: "mdi mdi-hamburger",
        component: JumbotronComponent,
      },
      {
        path: "/ui-components/layout",
        name: "Layout",

        icon: "mdi mdi-apps",
        component: LayoutComponent,
      },
      {
        path: "/ui-components/listgroup",
        name: "List Group",

        icon: "mdi mdi-format-list-bulleted",
        component: ListComponent,
      },
      {
        path: "/ui-components/media",
        name: "Media",

        icon: "mdi mdi-folder-multiple-image",
        component: MediaComponent,
      },
      {
        path: "/ui-components/modal",
        name: "Modal",

        icon: "mdi mdi mdi-tablet",
        component: ModalComponent,
      },
      {
        path: "/ui-components/navbar",
        name: "Navbar",

        icon: "mdi mdi-page-layout-header",
        component: NavbarComponent,
      },
      {
        path: "/ui-components/navs",
        name: "Navs",

        icon: "mdi mdi-panorama-wide-angle",
        component: NavsComponent,
      },
      {
        path: "/ui-components/pagination",
        name: "Pagination",

        icon: "mdi mdi-priority-high",
        component: PaginationComponent,
      },
      {
        path: "/ui-components/popover",
        name: "Popover",

        icon: "mdi mdi-pencil-circle",
        component: PopoverComponent,
      },
      {
        path: "/ui-components/progress",
        name: "Progress",

        icon: "mdi mdi-poll",
        component: ProgressComponent,
      },
      {
        path: "/ui-components/table",
        name: "Tables",

        icon: "mdi mdi-border-none",
        component: TableComponent,
      },
      {
        path: "/ui-components/tabs",
        name: "Tabs",

        icon: "mdi mdi-tab-unselected",
        component: TabsComponent,
      },
      {
        path: "/ui-components/tooltip",
        name: "Tooltips",

        icon: "mdi mdi-image-filter-vintage",
        component: TooltipComponent,
      },
      {
        path: "/ui-components/spinner",
        name: "Spinner",

        icon: "mdi mdi-image-filter-vintage",
        component: Spinners,
      },
      {
        path: "/ui-components/toasts",
        name: "Toasts",

        icon: "mdi mdi-image-filter-vintage",
        component: Toasts,
      },
    ],
  },
  {
    navlabel: true,
    name: "APPS",
    icon: "",
  },
  {
    path: "/chat",
    name: "Chat",
    icon: "message-square",
    component: Chat,
  },
  {
    path: "/contacts",
    name: "Contacts",
    icon: "phone",
    component: Contacts,
  },
  {
    path: "/email",
    name: "Email",
    icon: "inbox",
    component: Email,
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "calendar",
    component: Calendar,
  },
  {
    path: "/notes",
    name: "Notes",
    icon: "tag",
    component: Notes,
  },
  {
    path: "/todos",
    name: "Todo",
    icon: "edit",
    component: Todo,
  },
  {
    path: "/authentication",
    name: "Authentication",
    state: "openAuthentication",
    icon: "alert-triangle",
    badges: "side-badge badge badge-success",
    badgeno: "7",
    child: auths,
    collapse: true,
  },
  {
    navlabel: true,
    name: "Forms",
    icon: "",
  },
  {
    collapse: true,
    path: "/form-layouts",
    name: "Form Layouts",
    state: "formlayoutPages",
    icon: "layers",
    child: [
      {
        path: "/form-layouts/form-inputs",
        name: "Form Inputs",

        icon: "mdi mdi-priority-low",
        component: FormInputs,
      },
      {
        path: "/form-layouts/form-groups",
        name: "Form Groups",

        icon: "mdi mdi-rounded-corner",
        component: FormGroups,
      },
      {
        path: "/form-layouts/form-grids",
        name: "Form Grids",

        icon: "mdi mdi-select-all",
        component: FormGrids,
      },
      {
        path: "/form-layouts/basic",
        name: "Form Basic",

        icon: "mdi mdi-book",
        component: Basicform,
      },
    ],
  },
  {
    collapse: true,
    path: "/form-pickers",
    name: "Form Pickers",
    state: "formpickerPages",
    icon: "droplet",
    child: [
      {
        path: "/form-pickers/datetimepicker",
        name: "Date Pickers",

        icon: "mdi mdi-calendar-clock",
        component: Datepicker,
      },
      {
        path: "/form-pickers/tag-select",
        name: "Tags & Select",

        icon: "mdi mdi-tag-multiple",
        component: Tagselect,
      },
    ],
  },
  {
    path: "/form-validation",
    name: "Form Validation",
    icon: "check-square",
    component: FormValidate,
  },
  {
    path: "/form-steps",
    name: "Form Steps",
    icon: "credit-card",
    component: FormSteps,
  },
  {
    navlabel: true,
    name: "Tables",
    icon: "",
  },
  {
    path: "/tables/tablebasic",
    name: "Basic Table",
    icon: "codepen",
    component: Basictable,
  },
  {
    path: "/tables/reacttable",
    name: "React Table",
    icon: "disc",
    component: CustomReactTable,
  },
  {
    path: "/tables/datatable",
    name: "Bootstrap DataTable",
    icon: "hard-drive",
    component: Datatable,
  },
  {
    navlabel: true,
    name: "Charts",
    icon: "",
  },
  {
    path: "/charts/chartjs",
    name: "Chartjs",
    icon: "pie-chart",
    component: Chartjs,
  },
  {
    path: "/charts/c3chart",
    name: "C3 Chart",
    icon: "slack",
    component: Chartc3,
  },
  {
    path: "/charts/apex-chart",
    name: "Apex Chart",
    icon: "loader",
    component: Apexcharts,
  },
  {
    navlabel: true,
    name: "Extra",
    icon: "",
  },
  {
    collapse: true,
    path: "/sample-pages",
    name: "Sample Pages",
    state: "samplepages",
    icon: "book-open",
    badges: "side-badge badge badge-success",
    badgeno: "5",
    child: [
      {
        path: "/sample-pages/starter-kit",
        name: "Starter Kit",

        icon: "mdi mdi-crop-free",
        component: Starterkit,
      },
      {
        path: "/sample-pages/profile",
        name: "Profile",

        icon: "mdi mdi-account-network",
        component: Profile,
      },
      {
        path: "/sample-pages/search-result",
        name: "Search Result",

        icon: "mdi mdi-search-web",
        component: Searchresult,
      },
      {
        path: "/sample-pages/gallery",
        name: "Gallery",

        icon: "mdi mdi-camera-iris",
        component: Gallery,
      },
      {
        collapse: true,
        name: "Extra Pages",
        cstate: "extrapages",
        icon: "mdi mdi-file",
        subchild: [
          {
            path: "/sample-pages/extra-pages/helperclass",
            name: "Helper Classes",

            icon: "mdi mdi-star",
            component: HelperClass,
          },
        ],
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    icon: "grid",
    component: Widgets,
  },
  {
    collapse: true,
    path: "/icons",
    name: "Icons",
    state: "iconsPages",
    icon: "smile",
    child: [
      {
        path: "/icons/material",
        name: "Material Icons",

        icon: "mdi mdi-emoticon",
        component: Materialicon,
      },
      {
        path: "/icons/fontawesome",
        name: "Font Awesome Icons",

        icon: "mdi mdi-emoticon-cool",
        component: FontAwesome,
      },
      {
        path: "/icons/themify",
        name: "Themify Icons",

        icon: "mdi mdi-chart-bubble",
        component: Themify,
      },
      {
        path: "/icons/weather",
        name: "Weather Icons",

        icon: "mdi mdi-weather-cloudy",
        component: Weather,
      },
      {
        path: "/icons/simpleline",
        name: "Simple Line Icons",

        icon: "mdi mdi mdi-image-broken-variant",
        component: Simpleline,
      },
      {
        path: "/icons/flag",
        name: "Flag Icons",

        icon: "mdi mdi-flag-triangle",
        component: FlagIcon,
      },
    ],
  },
  {
    path: "/vectormap",
    name: "Vector Map",
    icon: "map-pin",
    component: Vectormap,
  },
  {
    path: "/",
    pathTo: "/dashboards/analytical",
    name: "Dashboard",
    redirect: true,
  },
];
export default ThemeRoutes;
