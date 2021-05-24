import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Card,CardBody,CardTitle,Table,Row,Col, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,CustomInput,Button, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ShopWithContractsSelect from '../../../components/selects/ShopsWithContractsSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import {useSelector} from 'react-redux'
import {Link, withRouter} from "react-router-dom"
import { getBase64Img, isBase64 } from '../../../utils/helpers';

function ConsultarTienda(props) {

    let id = props.match.params.id;

    const backoffice                            = useSelector(state => state.backoffice);
    const bidTypes                              = backoffice.bidTypes;

    const [loading, setloading]                 = useState(true);
    const [search, setsearch]                   = useState(true);
    const [searchBids, setsearchBids]           = useState(false);

    const [searchImages, setsearchImages]       = useState(false);
    const [imglist, setimglist]                 = useState([]);

    const [successmessage, setsuccessmessage]   = useState("");
    const [errormessage, seterrormessage]       = useState('');
    const [changing, setchanging]               = useState(false);

    const [shop,    setshop]                    = useState(null);
    const [shoplist, setshoplist]               = useState(null);
    const [list,    setlist]                    = useState(null);
    const [data,    setdata]                    = useState(null);

    const [shopSelected, setshopSelected]       = useState(null);

    const [searchdatabid, setsearchdatabid]     = useState(id);
    const [databid, setdatabid]                 = useState(null);
    const [bidSelected, setbidSelected]         = useState(null);
    const [photos, setphotos]                   = useState(null);

    const [filterBySearchShop, setFilterBySearchShop]   = useState("");

    const [filterBySearch, setFilterBySearch]   = useState("");
    const [filterByType,    setfilterByType]    = useState(null);
    const [searchByText,    setsearchByText]    = useState(false);
    const [count, setcount]                     = useState(0);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const session = useSelector(state => state.session);
    let shopId = session.userData.shop.id;

    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const getData = () => {
        let urlGetImg   = `/SettInG/IMG/geT/bYID/`;

        axios.get(`/setting/seller/shop/general/profile/${id}`)
        .then((res) => {
            //console.log(res.data);
            setshop(res.data.data.rsAccount[0]);

            axios.get(`/SeTtiNG/BiD/get/BySHOp/${id}`).then((res) => {
                console.log(res.data);

                let bidList         = res.data;

                setdata(bidList);
                setlist(bidList);

                setsearchImages(true);
                setimglist([]);
                
                let newPhotosList   = [];
                let countItems      = bidList.length;
                let countPhotos     = 0;

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
                                    setloading(false);
                                }
                            }).catch((err) => {
                                console.error(err);
                            })
                        }
                    }
                }else{
                    setsearchImages(false);
                    setloading(false);
                }
            }).catch((err) => {
                console.error(err);
            });
        })
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                getData();
            }
        }
    });

    //----------------------------------------------------------

    const filterBids = (text = filterBySearch) => {
        let newlist = data;

        if(text !== ""){
            newlist = data.filter(item => item.title.toLowerCase().includes(text.trim().toLowerCase()));
        }

        setlist(newlist);
        setcount(count + 5);
    }

    const changeInputSearch = (value) => {
        setFilterBySearch(value);

        setTimeout(() => {
            filterBids(value);
        }, 0);
    }

    const cleanFilters = () => {
        setFilterBySearch('');
        setlist(data);
    }

    const showDataBid = (id) => {
        setsearchdatabid(true);
        setbidSelected(id);
        setModal(true);
        setsuccessmessage("");
        seterrormessage("");

        let urlBid = `/sEtTiNg/BiD/GET/OnE/${props.match.params.id}/${id}`;
        let urlPhotos = `/bID/GET/IMge/byBID/${id}`;

        axios.get(urlBid)
        .then((res) => {

            console.log(res.data);
            //setsearchdatabid(false);
            setdatabid(res.data);

            axios.get(urlPhotos)
            .then((res) => {
                console.log(res.data);
                setsearchdatabid(false);
                setphotos(res.data);
            }).catch((err) => {
                console.error(err);
                setsearchdatabid(false);
            });

        }).catch((err) => {
            console.error(err);
            setsearchdatabid(false);
        });
    }

    const changeStatusBid = (e, type) => {
        let urlaction = ``;

        if(type === "active"){
            urlaction = `/sEtTiNG/bID/ActiVaTE/${bidSelected}/${databid.shopId}`;
        }else if(type === "inactive"){
            urlaction = `/SEtTInG/biD/REVOKE/${bidSelected}/${databid.shopId}`;
        }

        setsuccessmessage('');
        seterrormessage('');
        setchanging(true);
        
        axios({
            url: urlaction,
            method: "GET",
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                setsuccessmessage(res.data.data.message);
                setTimeout(() => {
                    setshopSelected(null);
                    setdatabid(null);
                    setModal(false);
                    setchanging(false);
                }, 2000);
            }else{
                seterrormessage(res.data.data.message);
                setchanging(false);
            }
            
        }).catch((err) => {
            console.error(err);
            setchanging(false);
        });
    }

    return (
        <div>
            <Breadcrumb listClassName="px-0">
                <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                <BreadcrumbItem>
                    <Link to="/admIn/pUBLICATIONS/ListAll">Consultar publicaciones</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Ver tienda</BreadcrumbItem>
            </Breadcrumb>

            <h1 className="h4 mb-3 font-weight-bold">
                Consultar publicaciónes
            </h1>
            
            {(searchBids || loading) &&
                <InlineSpinner />
            }

            {!loading && !data !== null &&
            <div>
                <Card>
                    <CardBody className="border-bottom">
                        <CardTitle className="mb-0 font-weight-bold">
                            <Link to="/admIn/pUBLICATIONS/ListAll" className="btn btn-sm mr-3">
                                <i className="fa fa-angle-left"></i>
                            </Link>Tienda seleccionada
                        </CardTitle>
                    </CardBody>
                    <CardBody>
                        <h2 className="font-weight-bold text-info">
                            <i className="mdi mdi-store-outline mr-3"></i>{shop.name}
                        </h2>
                    </CardBody>
                </Card>
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
                        Publicaciones
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
                                    {(list.length > 0 && list.map((item, key) => {

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
                                                    <button onClick={() => showDataBid(item.id)} className="btn btn-info">
                                                        Ver publicación
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }))}

                                    {(list.length === 0) &&
                                        <tr className="text-center">
                                            <td colSpan="20" className="text-center">
                                                Sin publicaciones encontradas
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            </div>
            }

            <Modal size="lg" isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <strong>
                        Ver publicación
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

                            {(databid !== null && !searchdatabid && successmessage === "") &&
                                <div className="alert alert-info">
                                    <strong>Estado de la publicación:</strong>
                                    {databid.StatusId === 3 ? " Inabilitada por el administrador" : ""} 
                                    {databid.StatusId === 2 ? " Inactiva" : ""} 
                                    {databid.StatusId === 1 ? " Activa" : ""} 
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
                                                <h6 className="mb-1 font-weight-bold">Titulo:</h6>
                                                <h4 className="font-weight-bold h3 mb-1">
                                                    {databid.title} 
                                                    <span className="badge badge-primary small mx-2">
                                                        {databid.skuType.name}
                                                    </span>
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
                                                    <div className="col-lg-6">
                                                        <h6 className="font-weight-bold">Disponibilidad:</h6>
                                                        <p>
                                                            {databid.disponibility.name}
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <h6 className="font-weight-bold">Etiquetas:</h6>
                                                        <p>
                                                            {Array.isArray(databid.tags) && databid.tags.length > 0 && databid.tags.map((item, key) => {
                                                                return (
                                                                    <span className="badge badge-info mr-2" key={key}>
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
                                                                            <span className="badge badge-info mr-2" key={key}>
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
                                                                            <span className="badge badge-info mr-2" key={key}>
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
                                                                            <span className="badge badge-info mr-2" key={key}>
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
                                                                            <span className="badge badge-info mr-2" key={key}>
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
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <div className="py-4">
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
                                                            {databid.Brand.name}
                                                        </h2>
                                                        <hr/>
                                                    </div>
                                                    {(databid.skuTypeId !== 3) &&
                                                        <>
                                                            <div className="col-lg-6 mb-2">
                                                                <h6><strong>Producto personalizable:</strong> {databid.customizable ? "Si": "No"}</h6>
                                                            </div>
                                                            {(databid.customizable) &&
                                                                <div className="col-lg-6 mb-2">
                                                                    <h6><strong>Tipo de personalización:</strong> {databid.customize}</h6>
                                                                </div>
                                                            }
                                                        </>
                                                    }
                                                    {(databid.skuTypeId !== 3 && databid.include !== "" && databid.include !== null) &&
                                                        <div className="col-lg-6 mb-2">
                                                            <h6><strong>El producto incluye:</strong></h6>
                                                            <p>
                                                                {databid.include}
                                                            </p>
                                                        </div>
                                                    }
                                                    <div className="col-lg-6 mb-2">
                                                        <h6><strong>Acepta devoluciones:</strong> {databid.devolution ? "Si": "No"}</h6>
                                                    </div>
                                                    <div className="col-lg-6 mb-2">
                                                        <h6><strong>Garantia:</strong> {databid.garanty} dias</h6>
                                                    </div>
                                                    {(databid.skuTypeId !== 3) &&
                                                        <div className="col-lg-6 mb-2">
                                                            <h6><strong>Tiempo de elaboracion:</strong> {databid.time} dias</h6>
                                                        </div>
                                                    }
                                                    {(databid.weight) &&
                                                        <div className="col-lg-6 mb-2">
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
                                                                                    {Array.isArray(databid.materials) && databid.materials.length > 0 && databid.materials.map((item, key) => {
                                                                                        return (
                                                                                            <span key={key} className="mb-2 mx-2 badge badge-info font-weight-bold">
                                                                                                {item.name} - {item.qty}
                                                                                            </span>
                                                                                        );
                                                                                    })}
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                } 
                                                            </div>
                                                            <div className="col-lg-12">
                                                                {(databid.dimension !== null) &&
                                                                    <div>
                                                                        {Array.isArray(databid.dimension) &&
                                                                            <div className="mb-2">
                                                                                <h6 className="mb-0 mb-3 font-weight-bold">
                                                                                    Dimensiones:
                                                                                </h6>
                                                                                <div className="row">
                                                                                    <div className="col-lg-auto">
                                                                                        <h6>
                                                                                            <strong>Ancho:</strong> {databid.dimension[0].width} cm
                                                                                        </h6>
                                                                                    </div>
                                                                                    <div className="col-lg-auto">
                                                                                        <h6>
                                                                                            <strong>Alto:</strong> {databid.dimension[0].height} cm
                                                                                        </h6>
                                                                                    </div>
                                                                                    <div className="col-lg-auto">
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
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <div className="py-4">
                                                <h3 className="font-weight-bold mb-3">
                                                    Imagenes de la publicacion
                                                </h3>
                                                <div className="row">
                                                    {Array.isArray(photos) && photos.length > 1 && photos.map((item, key) => {
                                                        let dataimg = getBase64Img(item.img);
                                                        //console.log(item.img.data);
                                                        //console.log(dataimg);

                                                        if(isBase64(dataimg.url)){
                                                            return (
                                                                <div key={key} className="col-lg-6 mb-4">
                                                                    <img 
                                                                        className="img-fluid"
                                                                        //style='display:block; width:100px;height:100px;'                
                                                                        src={`data:image/${dataimg.type};base64,${dataimg.url}`}
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
                                        </TabPane>
                                    </TabContent>
                                </div>
                            }
                        </div>
                </ModalBody>
                <ModalFooter>
                    {(!searchdatabid && databid !== null && successmessage === "") &&
                        <>
                            {databid.StatusId}

                            {(databid.StatusId === 2 || databid.StatusId === 3) &&
                                <Button disabled={changing} color="info" onClick={(e) => changeStatusBid(e, "active")}>
                                    {changing ? <span><i className="fa fa-spinner fa-spin"></i></span> : 'Activar'}
                                </Button>
                            }

                            {(databid.StatusId === 1) &&
                                <Button disabled={changing} color="info" onClick={(e) => changeStatusBid(e, "inactive")}>
                                    {changing ? <span><i className="fa fa-spinner fa-spin"></i></span> : 'Desactivar'}
                                </Button>
                            }
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

export default withRouter(ConsultarTienda)
