import React, {useState, useEffect} from 'react'
import axios from "axios"
import InlineSpinner from '../../spinner/InlineSpinner';
import {TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, CardTitle, Row, Table, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem} from "reactstrap"
import {useSelector} from "react-redux"
import { getBase64Img } from '../../../utils/helpers';

function Actualizar() {

    const [loading, setloading]                 = useState(true);
    const [search, setsearch]                   = useState(true);
    const [changing, setchanging]               = useState(false);
    const [searchImages, setsearchImages]       = useState(false);

    const [shoplist, setshoplist]               = useState(null);
    const [list, setlist]                       = useState(null);
    const [imglist, setimglist]                 = useState([]);

    const [successmessage, setsuccessmessage]   = useState("");
    const [errormessage, seterrormessage]       = useState('');

    const [filterBySearchShop, setFilterBySearchShop]   = useState("");
    const [filterBySearch, setFilterBySearch]           = useState("");
    const [count, setcount]                             = useState(0);

    const [shopSelected, setshopSelected]               = useState(null);
    const [bidList, setbidList]                         = useState(null);

    const [photos, setphotos]                           = useState(null);
    const [photosUpdate, setphotosUpdate]               = useState(null);

    const [bidSelected, setbidSelected]         = useState(null);
    const [databid, setdatabid]                 = useState(null);
    const [databidupdate, setdatabidupdate]     = useState(null);

    //======================================================================

    const [searchdatabid, setsearchdatabid]     = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const session = useSelector(state => state.session);
    let shopId = session.userData.shop.id;

    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const getData = () => {
        let url = "/SEtTInG/SELLER/resQUEST/UPdAtE/list";

        axios.get(url).then((res) => {
            console.log(res.data);
            setshoplist(res.data);
            setlist(res.data);
            setloading(false);
        }).catch((err) => {
            console.error(err);
            setloading(false);
        });
    }

    //FILTER SHOP =============================================================

    const filterShops = (text = setFilterBySearchShop) => {
        let newlist = shoplist;

        if(text !== ""){
            newlist = shoplist.filter(item => item.name.toLowerCase().includes(text.trim().toLowerCase()));
        }

        setlist(newlist);
        setcount(count + 5);
    }

    const changeInputSearchShop = (value) => {
        setFilterBySearchShop(value);

        setTimeout(() => {
            filterShops(value);
        }, 0);
    }

    const cleanFiltersShop = () => {
        setlist(shoplist);
        setFilterBySearchShop('');

        setcount(count + 5);
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                getData();
            }
        }
    }, []);

    const selectShop = (shop) => {
        console.log(shop);
        setbidList(shop.Bids);
        setshopSelected(shop);
    }

    //----------------------------------------------------------

    const filterBids = (text = filterBySearch) => {
        let newlist = shopSelected.Bids;

        if(text !== ""){
            newlist = shopSelected.Bids.filter(item => item.title.toLowerCase().includes(text.trim().toLowerCase()));
        }

        setbidList(newlist);
        setcount(count + 5);
    }

    const changeInputSearch = (value) => {
        setFilterBySearch(value);

        setTimeout(() => {
            filterBids(value);
        }, 0);
    }

    const cleanFilters = () => {
        setbidList(shopSelected.Bids);
        setFilterBySearch('');
    }

    const showDataBid = (item) => {
        seterrormessage("");

        setsearchdatabid(true);
        setbidSelected(item.id);
        setdatabid(item);
        setdatabidupdate(item.bidUpdateRequests[0].change);
        setModal(true);

        let urlBidPhotos = `/bID/GET/IMge/byBID/${item.id}`;

        axios.get(urlBidPhotos)
        .then((res) => {
            console.log(res.data);
            setphotos(res.data);
            setsearchdatabid(false);
        }).catch((err) => {
            console.error(err);
            setsearchdatabid(false);
        });
    }

    const updateRequest = (e, type) => {
        e.preventDefault();

        let urlaction = ``;

        seterrormessage("");
        setsuccessmessage("");
        setchanging(true);

        console.log(bidSelected);

        if(type === "aprobar"){
            urlaction = `/sETTiNG/BID/ApProvate/upDATE/${Number(shopSelected.id)}/${(bidSelected)}`;
        }else if(type === "rechazar"){
            urlaction = `/settinG/biD/REJECT/UpDATe/${Number(shopSelected.id)}/${(bidSelected)}`;
        }

        axios.get(urlaction).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                setsuccessmessage(res.data.data.message);

                setTimeout(() => {
                    setModal(false);
                    setbidSelected(null);
                    setshopSelected(null);
                    setTimeout(() => {
                        setchanging(false);
                        setloading(true);
                        getData();
                    }, 200);
                }, 1500);
            }else{
                seterrormessage(res.data.data.message);
                setchanging(false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    //console.log(databidupdate);

    function isBase64(str) {
        if (str ==='' || str.trim() ===''){ return false; }
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }

    const changeShop = (shop) => {
        let urlGetImg   = `/SettInG/IMG/geT/bYID/`;

        setsearchImages(true);
        setimglist([]);
        selectShop(shop);

        let bidList = shop.Bids;
        let newPhotosList = [];

        let countItems  = bidList.length;
        let countPhotos = 0;
        
        if(Array.isArray(bidList) && bidList.length > 0){
            for (let i = 0; i < bidList.length; i++) {
                const item = bidList[i];

                let getPrincipalImgId = null;

                if(Array.isArray(item.photos) && item.photos.length > 0){
                    getPrincipalImgId = item.photos.find(photo => Number(photo.type) === 1);
                }

                if(getPrincipalImgId !== null){
                    console.log(getPrincipalImgId);
                    newPhotosList.push({id: getPrincipalImgId.id, data: null});
                }
            }

            if(Array.isArray(newPhotosList) && newPhotosList.length > 0){
                for (let j = 0; j < newPhotosList.length; j++) {
                    const thisphoto = newPhotosList[j];
    
                    axios.get(urlGetImg+thisphoto.id).then((res) => {
                        //console.log(res.data);
                        newPhotosList[j].data = res.data.data;
                        countPhotos++;
    
                        if(countPhotos === countItems){
                            setimglist(newPhotosList);
                            setsearchImages(false);
                            console.log("imagenes cargadas");
                        }
                    }).catch((err) => {
                        console.error(err);
                    })
                }
            }
        }else{
            setsearchImages(false);
        }

        console.log(shop.Bids);
    }

    return (
        <div>
            <Breadcrumb listClassName="px-0">
                <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                <BreadcrumbItem active>Actualizar publicaciones</BreadcrumbItem>
            </Breadcrumb>
            <h1 className="h4 mb-3 font-weight-bold">
                Actualizar publicaciónes
            </h1>

            {(search || loading) &&
                <InlineSpinner />
            }

            {(shopSelected === null) 
            ?
                <div>
                    {(list !== null) &&
                        <div>
                            <p>
                                Seleccione una tienda haciendo click en su carta correspondiente para visualizar todas las solicitudes de actualizacion.
                            </p>

                            {(!loading) &&
                                <div className="filters bg-light py-3 mb-3 px-3">
                                    <form action="">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-lg-6">
                                                <div className="input">
                                                    <input 
                                                        value={filterBySearchShop}
                                                        onChange={(e) => changeInputSearchShop(e.target.value)}
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Filtrar tienda por titulo" 
                                                        aria-label="filter" 
                                                        aria-describedby="filter-shop-by-name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 text-right">
                                                <button 
                                                    type="button" 
                                                    onClick={() => cleanFiltersShop()} 
                                                    className="btn btn-primary"
                                                >
                                                    limpiar filtros
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            }

                            {(Array.isArray(list) && list.length === 0 && !loading) &&
                                <div className="card">
                                    <div className="card-body py-4">
                                        <h3 className="h5 text-center font-weight-bold mb-0">
                                            No existen tiendas que coincidan con los parametros de la busqueda.
                                        </h3>
                                    </div>
                                </div>
                            }

                            {(Array.isArray(list) && list.length > 0 && !loading) &&
                                <div>
                                    <div className="row row-eq-height">
                                        {(list.map((item, key) => {
                                            let logoshop = '';
                                            console.log(item);

                                            if(item.logo !== null){
                                                logoshop = item.logo.data.reduce(
                                                    function (data, byte) {
                                                        return data + String.fromCharCode(byte);
                                                    },
                                                    ''
                                                );
                                            }
                                            
                                            return (
                                                <div key={key} className="col-lg-4 mb-4">
                                                    <button 
                                                    onClick={() => changeShop(item)} 
                                                    className="card w-100 shadow h-100">
                                                        <div className="card-body h-100 py-3">
                                                            <div className="row h-100 justify-content-center align-items-center">
                                                                {(item.logo !== null) &&
                                                                    <div className="col-md-6">
                                                                        <img
                                                                            src={`data:image/png;base64,${logoshop}`}
                                                                            alt="user"
                                                                            className="rounded-circle"
                                                                            height="100"
                                                                        />
                                                                    </div>
                                                                }
                                                                <div className="col-md-auto">
                                                                    <h2 className="text-center text-secondary">
                                                                        <strong>
                                                                            {item.name}
                                                                        </strong>
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            )
                                        }))}
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            :
                <div>
                    <div>
                        <Card>
                            <CardBody className="border-bottom">
                                <CardTitle className="mb-0 font-weight-bold">
                                    <button onClick={() => setshopSelected(null)} className="btn btn-sm mr-3">
                                        <i className="fa fa-angle-left"></i>
                                    </button>Tienda seleccionada
                                </CardTitle>
                            </CardBody>
                            <CardBody>
                                <h2 className="font-weight-bold text-info">
                                    <i className="mdi mdi-store-outline mr-3"></i>{shopSelected.name}
                                </h2>
                            </CardBody>
                        </Card>
                        {(!searchImages)
                            ?
                            <Card>
                                <div className="filters bg-light py-3 mb-3 px-3">
                                    <form action="">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-lg-6">
                                                <div className="input">
                                                    <input 
                                                        value={filterBySearch}
                                                        onChange={(e) => changeInputSearch(e.target.value)}
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="Filtrar por titulo" 
                                                        aria-label="filter" 
                                                        aria-describedby="filter-by-name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 text-right">
                                                <button 
                                                    type="button" 
                                                    onClick={() => cleanFilters()} 
                                                    className="btn btn-primary"
                                                >
                                                    limpiar filtros
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div> 
                                <CardBody className="border-bottom">
                                    <CardTitle className="mb-0 font-weight-bold">
                                        <i className="fa fa-list mr-2"></i>
                                        Publicaciones por actualizar
                                    </CardTitle>
                                </CardBody>
                                <CardBody className="pb-5">
                                    <Row>
                                        <Col xs="12">
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            #
                                                        </th>
                                                        <th>
                                                            Imagen principal
                                                        </th>
                                                        <th>
                                                            Titulo
                                                        </th>
                                                        <th className="text-right">
                                                            Acción
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(bidList.length > 0 && bidList.map((item, key) => {
                                                        let photoId = null;

                                                        if(Array.isArray(item.photos) && item.photos.length > 0){
                                                            photoId = item.photos.find(photo => Number(photo.type) === 1);
                                                        }
                                                        let img = "";
                                                        //console.log(photoId);
                                                        if(photoId !== null){
                                                            img = imglist.find(photo => Number(photo.id) === Number(photoId.id));
                                                        }

                                                        let dataimg = getBase64Img(img.data);
                                                        
                                                        return (
                                                            <tr key={key}>
                                                                <td style={{verticalAlign: "middle"}}>
                                                                    {item.id}
                                                                </td>
                                                                <td style={{verticalAlign: "middle"}}>
                                                                    {(img !== null && img !== undefined) &&
                                                                        <img 
                                                                            className="img-fluid shadow"
                                                                            style={{width: "100px", borderRadius: "5px"}}                
                                                                            src={`data:image/${dataimg.type};base64,${dataimg.url}`}
                                                                        />
                                                                    }
                                                                </td>
                                                                <td style={{verticalAlign: "middle"}}>
                                                                    {item.title}
                                                                </td>
                                                                <td className="text-right" style={{verticalAlign: "middle"}}>
                                                                    <button 
                                                                        onClick={() => showDataBid(item)} 
                                                                        className="btn btn-info"
                                                                    >
                                                                        Ver publicación
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }))}

                                                    {(bidList.length === 0) &&
                                                        <tr>
                                                            <td className="text-center" colSpan="20">
                                                                Sin solicitudes que coincidan con los parametros de la busqueda.
                                                            </td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            :
                            <InlineSpinner />
                        }
                    </div>
                </div>
            }

            <Modal size="lg" isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <strong>
                        Solicitud de actualización
                    </strong>
                </ModalHeader>
                <ModalBody>
                    <div>
                        {(errormessage !== "") &&
                            <div className="alert alert-danger">
                                {errormessage}
                            </div>
                        }

                        {(successmessage !== "") &&
                            <div className="alert alert-success">
                                {successmessage}
                            </div>
                        }

                        {(searchdatabid) &&
                            <div className="py-5 text-center mb-4">
                                <InlineSpinner />
                            </div>
                        }
                        
                        {(!searchdatabid && databid !== null && successmessage === "") &&
                                <div className="data-bid">
                                    <Nav tabs className="nav-fill">
                                        <NavItem>
                                            <NavLink
                                                style={{cursor: "pointer"}}
                                                className={activeTab === '1' ? "active font-weight-bold" : ""}
                                                onClick={() =>  toggleTab('1')}
                                            >
                                                Informacion comercial
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{cursor: "pointer"}}
                                                className={activeTab === '2' ? "active font-weight-bold" : ""}
                                                onClick={() =>  toggleTab('2')}
                                            >
                                                Detalles
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{cursor: "pointer"}}
                                                className={activeTab === '3' ? "active font-weight-bold" : ""}
                                                onClick={() =>  toggleTab('3')}
                                            >
                                                Media
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <div className="py-4">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <h6 className="text-info font-weight-bold">
                                                            Data antes
                                                        </h6>
                                                        <hr/>
                                                        <h6 className="mb-1 font-weight-bold">Titulo:</h6>
                                                        <h4 className="font-weight-bold h3 mb-1">
                                                            {databid.title} 
                                                        </h4>
                                                        <p className="text-muted small mb-0">
                                                            "{databid.smallDesc}"
                                                        </p>
                                                        <hr/>
                                                        <h6 className="font-weight-bold">Descripcion:</h6>
                                                        <p>
                                                            {databid.longDesc}
                                                        </p>
                                                        <div className="row">
                                                        <div className="col-lg-12 d-none">
                                                            <h6 className="font-weight-bold">Disponibilidad:</h6>
                                                            <p>
                                                                {
                                                                    databid.disponibility.name
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <h6 className="font-weight-bold">Etiquetas:</h6>
                                                            <p>
                                                                {Array.isArray(databid.tags) && databid.tags.length > 0 && databid.tags.map((item, key) => {
                                                                    return (
                                                                        <span className="badge badge-primary mr-2" key={key}>
                                                                            {item}
                                                                        </span>
                                                                    )
                                                                })}
                                                            </p>
                                                        </div>
                                                        {(databid.skuTypeId !== 3) &&
                                                            <>
                                                                <div className="col-lg-12">
                                                                    <h6 className="font-weight-bold">Subcategorias:</h6>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">Nivel 1:</span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat1) && databid.category.cat1s.subCat.subCat1.length > 0 && databid.category.cat1s.subCat.subCat1.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat1) && databid.category.cat1s.subCat.subCat1.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">
                                                                            Nivel 2:
                                                                        </span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat2) && databid.category.cat1s.subCat.subCat2.length > 0 && databid.category.cat1s.subCat.subCat2.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat2) && databid.category.cat1s.subCat.subCat2.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">Nivel 3:</span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat3) && databid.category.cat1s.subCat.subCat3.length > 0 && databid.category.cat1s.subCat.subCat3.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat3) && databid.category.cat1s.subCat.subCat3.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">Nivel 4:</span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat4) && databid.category.cat1s.subCat.subCat4.length > 0 && databid.category.cat1s.subCat.subCat4.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databid.category.cat1s.subCat.subCat4) && databid.category.cat1s.subCat.subCat4.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                            </div>
                                                            </>
                                                        }
                                                    </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="text-info font-weight-bold">
                                                            Data despues
                                                        </h6>
                                                        <hr/>
                                                        <h6 className="mb-1 font-weight-bold">Titulo:</h6>
                                                        <h4 className="font-weight-bold h3 mb-1">
                                                            {databidupdate.title} 
                                                        </h4>
                                                        <p className="text-muted small mb-0">
                                                            "{databidupdate.smallDesc}"
                                                        </p>
                                                        <hr/>
                                                        <h6 className="font-weight-bold">Descripcion:</h6>
                                                        <p>
                                                            {databidupdate.longDesc}
                                                        </p>
                                                        <div className="row">
                                                        <div className="col-lg-12 d-none">
                                                            <h6 className="font-weight-bold">Disponibilidad:</h6>
                                                            <p>
                                                                {
                                                                    //databid.disponibility.name
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <h6 className="font-weight-bold">Etiquetas:</h6>
                                                            <p>
                                                                {Array.isArray(databidupdate.tags) && databidupdate.tags.length > 0 && databidupdate.tags.map((item, key) => {
                                                                    return (
                                                                        <span className="badge badge-primary mr-2" key={key}>
                                                                            {item}
                                                                        </span>
                                                                    )
                                                                })}
                                                            </p>
                                                        </div>
                                                        {(databidupdate.skuTypeId !== 3 && databidupdate.category.hasOwnProperty("subCat1")) &&
                                                            <>
                                                                <div className="col-lg-12">
                                                                    <h6 className="font-weight-bold">Subcategorias:</h6>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">Nivel 1:</span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databidupdate.category.subCat1) && databidupdate.category.subCat1.length > 0 && databidupdate.category.subCat1.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databidupdate.category.subCat1) && databidupdate.category.subCat1.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">
                                                                            Nivel 2:
                                                                        </span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databidupdate.category.subCat2) && databidupdate.category.subCat2.length > 0 && databidupdate.category.subCat2.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databidupdate.category.subCat2) && databidupdate.category.subCat2.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">Nivel 3:</span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databidupdate.category.subCat3) && databidupdate.category.subCat3.length > 0 && databidupdate.category.subCat3.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databidupdate.category.subCat3) && databidupdate.category.subCat3.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="text">
                                                                        <span className="mr-2 font-weight-bold">Nivel 4:</span>
                                                                    </span>
                                                                    <p className="mb-3">
                                                                        {Array.isArray(databidupdate.category.subCat4) && databidupdate.category.subCat4.length > 0 && databidupdate.category.subCat4.map((item, key) => {
                                                                            return (
                                                                                <span className="badge badge-primary mr-2" key={key}>
                                                                                    {item.name}
                                                                                </span>
                                                                            )
                                                                        })}

                                                                        {Array.isArray(databidupdate.category.subCat4) && databidupdate.category.subCat4.length === 0 &&
                                                                            <span>
                                                                                No aplica
                                                                            </span>
                                                                        }
                                                                    </p>
                                                            </div>
                                                            </>
                                                        }
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <div className="py-4">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <h6 className="text-info font-weight-bold">
                                                            Data antes
                                                        </h6>
                                                        <hr/>
                                                        {(databid.price) &&
                                                            <div className="alert alert-success">
                                                                <h3 className="font-weight-bold mb-0">
                                                                    Precio: CLP ${databid.price.price}
                                                                </h3>
                                                            </div>
                                                        }
                                                        {(databid.stock && databid.stock !== null) &&
                                                            <div className="alert alert-info">
                                                                <h3 className="font-weight-bold mb-0">
                                                                    Stock: {databid.stock.data.total}
                                                                </h3>
                                                            </div>
                                                        }
                                                        <div className="row">
                                                                <div className="col-lg-12 mb-2">
                                                                    <h6 className="font-weight-bold mb-1">
                                                                        <strong>Marca:</strong>
                                                                    </h6>
                                                                    <h2 className="font-weight-bold text-primary mb-2">
                                                                        {
                                                                            databid.Brand.name
                                                                        }
                                                                    </h2>
                                                                    <hr/>
                                                                </div> 
                                                                {(databid.skuTypeId !== 3) &&
                                                                    <>
                                                                        <div className="col-lg-12 mb-2">
                                                                            <h6><strong>¿Es personalizable?</strong> {databid.customizable ? "Si": "No"}</h6>
                                                                        </div>
                                                                        {(databid.customizable) &&
                                                                            <div className="col-lg-12 mb-2">
                                                                                <h6><strong>Personalización:</strong> {databid.customize}</h6>
                                                                            </div>
                                                                        }
                                                                    </>
                                                                }
                                                                {(databid.skuTypeId !== 3 && databid.include !== "" && databid.include !== null) &&
                                                                    <div className="col-lg-12 mb-2">
                                                                        <h6><strong>El producto incluye:</strong></h6>
                                                                        <p>
                                                                            {databid.include}
                                                                        </p>
                                                                    </div>
                                                                }
                                                                <div className="col-lg-12 mb-2">
                                                                    <h6><strong>Acepta devoluciones:</strong> {databid.devolution ? "Si": "No"}</h6>
                                                                </div>
                                                                <div className="col-lg-12 mb-2">
                                                                    <h6><strong>Garantia:</strong> {databid.garanty} dias</h6>
                                                                </div>

                                                                {(databid.skuTypeId !== 3) &&
                                                                    <div className="col-lg-12 mb-2">
                                                                        <h6><strong>Tiempo de elaboracion:</strong> {databid.time} dias</h6>
                                                                    </div>
                                                                }

                                                                {(databid.weight !== null && databid.skuTypeId !== 3) &&
                                                                    <div className="col-lg-12 mb-2">
                                                                        <h6>
                                                                            <strong>Peso:</strong> {databid.weight}
                                                                        </h6>
                                                                    </div>
                                                                }

                                                                {(databid.skuTypeId !== 3) &&
                                                                    <>
                                                                        <div className="col-lg-12">
                                                                            {(databid.materials !== null) &&
                                                                                    <div>
                                                                                        <div className="mb-2">
                                                                                            <h6 className="mb-0 font-weight-bold">
                                                                                                Materiales
                                                                                            </h6>
                                                                                            <p>
                                                                                                {Array.isArray(databid.materials) && databid.materials.length > 0 && databid.materials.map((item, key) => {
                                                                                                    return (
                                                                                                        <span key={key} className="mb-2 mr-2 mt-2 badge badge-primary font-weight-bold">
                                                                                                            {item.name} - {item.qty}
                                                                                                        </span>
                                                                                                    );
                                                                                                })}
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                            } 
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            {(databid.dimension !== null) &&
                                                                                <div>
                                                                                    {Array.isArray(databid.dimension) &&
                                                                                        <div className="mb-2">
                                                                                            <hr/>
                                                                                            <h6 className="mb-0 mb-3 font-weight-bold">
                                                                                                Dimensiones:
                                                                                            </h6>
                                                                                            <div className="row">
                                                                                                <div className="col-lg-12">
                                                                                                    <h6>
                                                                                                        <strong>Ancho:</strong> {databid.dimension[0].width} cm
                                                                                                    </h6>
                                                                                                </div>
                                                                                                <div className="col-lg-12">
                                                                                                    <h6>
                                                                                                        <strong>Alto:</strong> {databid.dimension[0].height} cm
                                                                                                    </h6>
                                                                                                </div>
                                                                                                <div className="col-lg-12">
                                                                                                    <h6>
                                                                                                        <strong>Profundidad:</strong> {databid.dimension[0].width} cm
                                                                                                    </h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            } 
                                                                        </div>
                                                                    </>
                                                                }
                                                        </div>
                                                        
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <h6 className="text-info font-weight-bold">
                                                                Data despues
                                                            </h6>
                                                            <hr/>
                                                            {(databidupdate.price) &&
                                                                <div className="alert alert-success">
                                                                    <h3 className="font-weight-bold mb-0">
                                                                        Precio: CLP ${databid.price.price}
                                                                    </h3>
                                                                </div>
                                                            }
                                                            {(databid.stock && databid.stock !== null) &&
                                                                <div className="alert alert-info">
                                                                    <h3 className="font-weight-bold mb-0">
                                                                        Stock: {databid.stock.data.total}
                                                                    </h3>
                                                                </div>
                                                            }
                                                            <div className="row">
                                                                    <div className="col-lg-12 mb-2">
                                                                        <h6 className="font-weight-bold mb-1">
                                                                            <strong>Marca:</strong>
                                                                        </h6>
                                                                        <h2 className="font-weight-bold text-primary mb-2">
                                                                            {
                                                                                //databid.Brand.name
                                                                            }
                                                                        </h2>
                                                                        <hr/>
                                                                    </div> 
                                                                    {(databid.skuTypeId !== 3) &&
                                                                        <>
                                                                            <div className="col-lg-12 mb-2">
                                                                                <h6><strong>¿Es personalizable?</strong> {databidupdate.customizable ? "Si": "No"}</h6>
                                                                            </div>
                                                                            {(databidupdate.customizable) &&
                                                                                <div className="col-lg-12 mb-2">
                                                                                    <h6><strong>Personalización:</strong> {databidupdate.customize}</h6>
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    }
                                                                    {(databid.skuTypeId !== 3 && databid.include !== "" && databidupdate.include !== null) &&
                                                                        <div className="col-lg-12 mb-2">
                                                                            <h6><strong>El producto incluye:</strong></h6>
                                                                            <p>
                                                                                {databidupdate.include}
                                                                            </p>
                                                                        </div>
                                                                    }
                                                                    <div className="col-lg-12 mb-2">
                                                                        <h6><strong>Acepta devoluciones:</strong> {databidupdate.devolution ? "Si": "No"}</h6>
                                                                    </div>
                                                                    <div className="col-lg-12 mb-2">
                                                                        <h6><strong>Garantia:</strong> {databidupdate.garanty} dias</h6>
                                                                    </div>

                                                                    {(databid.skuTypeId !== 3) &&
                                                                        <div className="col-lg-12 mb-2">
                                                                            <h6><strong>Tiempo de elaboracion:</strong> {databidupdate.time} dias</h6>
                                                                        </div>
                                                                    }

                                                                    {(databidupdate.weight !== null && databid.skuTypeId !== 3) &&
                                                                        <div className="col-lg-12 mb-2">
                                                                            <h6>
                                                                                <strong>Peso:</strong> {databidupdate.weight}
                                                                            </h6>
                                                                        </div>
                                                                    }
                                                                    
                                                                    {(databid.skuTypeId !== 3) &&
                                                                        <>
                                                                            <div className="col-lg-12">
                                                                                {(databidupdate.materials !== null) &&
                                                                                        <div>
                                                                                            <div className="mb-2">
                                                                                                <h6 className="mb-0 font-weight-bold">
                                                                                                    Materiales
                                                                                                </h6>
                                                                                                <p>
                                                                                                    {Array.isArray(databidupdate.materials) && databidupdate.materials.length > 0 && databidupdate.materials.map((item, key) => {
                                                                                                        return (
                                                                                                            <span key={key} className="mb-2 mt-2 mr-2 badge badge-primary font-weight-bold">
                                                                                                                {item.name} - {item.qty}
                                                                                                            </span>
                                                                                                        );
                                                                                                    })}
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                } 
                                                                            </div>
                                                                            <div className="col-lg-12">
                                                                                {(databid.dimension !== null) &&
                                                                                    <div>
                                                                                        {Array.isArray(databid.dimension) &&
                                                                                            <div className="mb-2">
                                                                                                <hr/>
                                                                                                <h6 className="mb-0 mb-3 font-weight-bold">
                                                                                                    Dimensiones:
                                                                                                </h6>
                                                                                                <div className="row">
                                                                                                    <div className="col-lg-12">
                                                                                                        <h6>
                                                                                                            <strong>Ancho:</strong> {databid.dimension[0].width} cm
                                                                                                        </h6>
                                                                                                    </div>
                                                                                                    <div className="col-lg-12">
                                                                                                        <h6>
                                                                                                            <strong>Alto:</strong> {databid.dimension[0].height} cm
                                                                                                        </h6>
                                                                                                    </div>
                                                                                                    <div className="col-lg-12">
                                                                                                        <h6>
                                                                                                            <strong>Profundidad:</strong> {databid.dimension[0].width} cm
                                                                                                        </h6>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        }
                                                                                    </div>
                                                                                } 
                                                                            </div>
                                                                        </>
                                                                    }
                                                        </div>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPane>
                                            <TabPane tabId="3">
                                                <div className="py-4">
                                                    <div className="row">
                                                        
                                                        <div className="col-lg-6">
                                                                <h6 className="text-info font-weight-bold">
                                                                    Data antes
                                                                </h6>
                                                                <hr/>
                                                                <h3 className="font-weight-bold mb-3">
                                                                    Imagenes de la publicacion
                                                                </h3>
                                                                <div className="row">
                                                                {Array.isArray(photos) && photos.length > 1 && photos.map((item, key) => {
                                                                    let imagen = "";
                                                                    let type = "";
                                                                    
                                                                    if(Array.isArray(item.img.data)){
                                                                        imagen = item.img.data.reduce(
                                                                            function (data, byte) {
                                                                                return data + String.fromCharCode(byte);
                                                                            },
                                                                            ''
                                                                        );
                                                                        
                                                                        let separator = imagen.split(",");
                                                                        type    = separator[0];
                                                                        imagen  = separator[separator.length - 1];
                                                                    }
                                                                    
                                                                    //console.log(type);
                                                                    //console.log(imagen);

                                                                    if(isBase64(imagen)){
                                                                        return (
                                                                            <div key={key} className="col-lg-6 mb-3">
                                                                                <img 
                                                                                    className="img-fluid"
                                                                                    //style='display:block; width:100px;height:100px;'                
                                                                                    src={`data:image/${type};base64,${imagen}`}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return (
                                                                            <div key={key} className="col-lg-6 mb-3">
                                                                                <div className="d-flex shadow-sm align-items-center bg-light justify-content-center p-3">
                                                                                    <h6 className="font-weight-bold text-center">
                                                                                        <i className="fa fa-2x fa-file-image mr-3 mb-3 d-block w-100"></i>
                                                                                        <small className="font-weight-bold pt-5">
                                                                                            No es posible visualizar esta imagen
                                                                                        </small>
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="col-lg-6">
                                                                <h6 className="text-info font-weight-bold">
                                                                    Data despues
                                                                </h6>
                                                                <hr/>
                                                                <h3 className="font-weight-bold mb-3">
                                                                    Imagenes de la publicacion
                                                                </h3>
                                                                <div className="row">
                                                                {Array.isArray(databidupdate.photos) && databidupdate.photos.length > 1 && databidupdate.photos.map((item, key) => {
                                                                    let imagen = "";
                                                                    let type = "";

                                                                    imagen = item.data;

                                                                    let separator = imagen.split(",");
                                                                    type    = separator[0];
                                                                    imagen  = separator[separator.length - 1];
                                                                    
                                                                    //console.log(item);
                                                                    //console.log(type);
                                                                    //console.log(imagen);

                                                                    if(isBase64(imagen)){
                                                                        return (
                                                                            <div key={key} className="col-lg-6 mb-3">
                                                                                <img 
                                                                                    className="img-fluid"
                                                                                    //style='display:block; width:100px;height:100px;'                
                                                                                    src={`data:image/${type};base64,${imagen}`}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return (
                                                                            <div key={key} className="col-lg-6 mb-3">
                                                                                <div className="d-flex shadow-sm align-items-center bg-light justify-content-center p-3">
                                                                                    <h6 className="font-weight-bold text-center">
                                                                                        <i className="fa fa-2x fa-file-image mr-3 mb-3 d-block w-100"></i>
                                                                                        <small className="font-weight-bold pt-5">
                                                                                            No es posible visualizar esta imagen
                                                                                        </small>
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                            }
                    </div>
                </ModalBody>
                <ModalFooter>
                    {(!searchdatabid && databid !== null && successmessage === "") &&
                        <>
                            <Button disabled={changing} color="info" onClick={(e) => updateRequest(e, "aprobar")}>
                                {changing ? <span><i className="fa fa-spinner fa-spin"></i></span> : 'Aprobar'}
                            </Button>
                            <Button disabled={changing} color="info" onClick={(e) => updateRequest(e, "rechazar")}>
                                {changing ? <span><i className="fa fa-spinner fa-spin"></i></span> : 'Rechazar'}
                            </Button>
                        </>
                    }
                    <Button color="primary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Actualizar
