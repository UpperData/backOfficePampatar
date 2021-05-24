import React, {useState, useEffect} from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import InlineSpinner from '../../spinner/InlineSpinner';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem,
    Breadcrumb, 
    BreadcrumbItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';
import {useSelector} from 'react-redux'
import BidTypesSelect from '../../../components/selects/TypeBidSelect';
import { getBase64Img, isBase64 } from '../../../utils/helpers';

function List() {

    const session = useSelector(state => state.session);
    let shopId = session.userData.shop.id;
    
    const backoffice                            = useSelector(state => state.backoffice);
    const bidTypes                              = backoffice.bidTypes;
    const [loading, setloading]                 = useState(true);
    const [search, setsearch]                   = useState(true);


    const [data, setdata]                       = useState([]);
    const [list, setlist]                       = useState([]);
    const [imglist, setimglist]                 = useState([]);


    const [successmessagemodalstatus,           setsuccessmessagemodalstatus]   = useState("");
    const [errormessagemodalstatus,         seterrormessagemodalstatus]         = useState("");

    const [bidSelected, setbidSelected]         = useState(null);

    const [filterBySearch, setFilterBySearch]   = useState("");
    const [filterByType,    setfilterByType]    = useState(null);
    const [searchByText,    setsearchByText]    = useState(false);

    const [count, setcount]                     = useState(0);

    const [changing, setchanging]                   = useState(false);
    const [typeChangeStatus, settypeChangeStatus]   = useState("");

    const [successmessage, setsuccessmessage]   = useState("");
    const [errormessage, seterrormessage]       = useState('');
    const [searchdatabid, setsearchdatabid]     = useState(true);
    const [databid, setdatabid]                 = useState(null);
    const [photos, setphotos]                   = useState(null);

    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const [modal, setModal]                         = useState(false);
    const toggle = () => setModal(!modal);

    const [modalView, setModalView]                         = useState(false);
    const toggleView = () => setModalView(!modalView);

    let url         = "/seLLer/pUBLIctIons/get/ALl";
    let urlGetImg   = `/SettInG/IMG/geT/bYID/`;

    const getData = () => {
        axios.get(url).then((res) => {
            console.log(res.data);

            let items = res.data;
            setdata(items);
            setlist(items);

            let countItems  = items.length;
            let countPhotos = 0;

            let newPhotosList = [];
            
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
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
                            setloading(false);
                        }
                    }).catch((err) => {
                        console.error(err);
                    })
                }
            }

            console.log(newPhotosList);
        }).catch((err) => {
            console.error(err);
            setloading(false);
        });
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                getData();
            }
        }
    }, []);

    const searchShop = (text, type = filterByType) => {
        let newlist = data;

        if(text !== ""){
            newlist = data.filter(item => item.title.toLowerCase().includes(text.trim().toLowerCase()));
        }
        
        if(type !== null && typeof type === "object"){
            newlist = newlist.filter(item => Number(item.skuTypeId) === type.value);
        }

        setlist(newlist);
        setcount(count + 5);
    }

    const filterBy = (type = '', value = '', key = null) => {
        switch (type) {
            case 'search':
                if(value.trim() !== ''){
                    searchShop(value.trim());
                }else{
                    searchShop(value.trim());
                }
                break;

            case 'type':
                setfilterByType(value);

                if(value !== null && typeof value === "object"){
                    let newList = [];
                    if(filterBySearch !== ""){
                        setTimeout(() => {
                            searchShop(filterBySearch.trim(), value);
                        }, 10);
                    }else{
                        newList = data.filter(item => Number(item.skuTypeId) === value.value);
                    }
                    setlist(newList);
                }
                break;

            default:
                let newList = data.sort((a,b) => a['id'] > b['id']  ? 1 : -1);
                setlist(newList);
                break;
        }
    }

    const changeInputSearch = (value) => {
        setFilterBySearch(value);
        //setsearchByText(true);

        setTimeout(() => {
            //setsearchByText(false);
            filterBy('search', value);
            //filterBy('text', value);
        }, 20);
    }

    const cleanFilters = () => {
        setlist(data);
        setFilterBySearch('');
        setfilterByType(null);
        //setfilterByStatus(null);
        //setsearchByText(false);
        //setcount(0);

        filterBy('clear');
    }

    const getFilterClass = (data) => {
        switch (data) {
            case 'desc':
                return ('caret-down')

            case 'asc':
                return ('caret-up')

            case null:
                return ('sort')

            default:
                return ('sort')
        }
    }

    const changeStatusItem = (e, bid, type) => {
        console.log();
        console.log();

        setsuccessmessagemodalstatus("");
        seterrormessagemodalstatus("");

        e.preventDefault();
        setbidSelected(bid);
        settypeChangeStatus(type);
        setModal(true);
    }

    const gotoChangeStatus = () => {
        let url = "";

        setchanging(true);
        setsuccessmessagemodalstatus("");
        seterrormessagemodalstatus("");

        if(typeChangeStatus === "active"){
            url = `/selLeR/Bid/ACTIVATE/${bidSelected.id}`;
        }else if(typeChangeStatus === "inactive"){
            url = `/sELLeR/BId/reJECT/${bidSelected.id}`;
        }

        axios.get(url).then((res) => {
            console.log(res.data);
            setchanging(false);
            if(res.data.data.result){
                setsuccessmessagemodalstatus(res.data.data.message);
                getData();

                setTimeout(() => {
                    settypeChangeStatus("");
                    setbidSelected(null);
                    setModal(false);
                }, 1000);
            }else{
                seterrormessagemodalstatus(res.data.data.message);
            }
        }).catch((err) => {
            console.error(err);
            setchanging(false);
        });
    }

    const showDataBid = (id) => {
        setsearchdatabid(true);
        setbidSelected(id);
        setModalView(true);
        setActiveTab("1");
        
        let urlBid = `/sEtTiNg/BiD/GET/OnE/${shopId}/${id}`;
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

    if(!loading){
        return (
            <div>
                <Modal size="lg" isOpen={modalView} toggle={toggleView}>
                    <ModalHeader toggle={toggleView}>
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
                                                    <h3 className="font-weight-bold mb-4">
                                                        Imagenes de la publicacion
                                                    </h3>
                                                    <div className="row">
                                                        {Array.isArray(photos) && photos.length > 1 && photos.map((item, key) => {                                                            
                                                            let dataImg = getBase64Img(item.img);

                                                            if(isBase64(dataImg.url)){
                                                                return (
                                                                    <div key={key} className="col-lg-6 mb-4">
                                                                        <img 
                                                                            className="img-fluid"
                                                                            //style='display:block; width:100px;height:100px;'                
                                                                            src={`data:image/${dataImg.type};base64,${dataImg.url}`}
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

                                                    {(databid.urlVideos !== null && databid.urlVideos !== undefined) &&
                                                        <div>
                                                            <h3 className="font-weight-bold mb-4">
                                                                Video url:
                                                            </h3>
                                                            <a target="__blank" href={databid.urlVideos}>
                                                                {databid.urlVideos}
                                                            </a>
                                                        </div>
                                                    }
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                }
                            </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggleView}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <strong>Cambiar estado</strong>
                    </ModalHeader>
                    <ModalBody>
                        {(successmessagemodalstatus !== "") &&
                            <div className="alert alert-success mb-3 shadow-sm">
                                {successmessagemodalstatus}
                            </div>
                        }
                        {(errormessagemodalstatus !== "") &&
                            <div className="alert alert-danger mb-3 shadow-sm">
                                {errormessagemodalstatus}
                            </div>
                        }
                        {(bidSelected !== null && typeChangeStatus !== null && typeChangeStatus !== "") &&
                            <div>
                                ¿Desea cambiar el estado de la tienda {bidSelected.name} por {typeChangeStatus === "active" ? <strong>Activo</strong> : ""} {typeChangeStatus === "inactive" ? <strong>Inactivo</strong> : ""}?
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" disabled={changing} onClick={() => gotoChangeStatus()}>{(changing) ? <span><i className="fa fa-spin fa-spinner"></i></span> : "Si, cambiar"}</Button>{' '}
                        <Button color="light" disabled={changing} onClick={toggle}>No, cancelar</Button>
                    </ModalFooter>
                </Modal>
                

                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Listar publicaciones</BreadcrumbItem>
                </Breadcrumb>

                <div className="row align-items-center justify-content-between mb-3">
                    <div className="col col-lg-auto">
                        <h1 className="h4 mb-0 font-weight-bold">
                            Listar publicaciones
                        </h1>
                    </div>
                    <div className="col col-lg-auto">
                        <Link to="/bidsSellerAdd" className="btn btn-info">
                            Nueva publicación
                        </Link>
                    </div>
                </div>
                <div className="filters bg-light py-3 mb-3 px-3">
                    <form action="">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-3">
                                <BidTypesSelect value={filterByType} onChange={(value) => filterBy('type', value)} />
                            </div>
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
                            <div className="col-lg-3">
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
                <Card>
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
                                            <th>
                                                Tipo de publicacion
                                            </th>
                                            <th>
                                                Estatus
                                            </th>
                                            <th>
                                                
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(list.length > 0 && list.map((item, key) => {
                                            let type    = bidTypes.find(type => Number(type.id) === Number(item.skuTypeId));
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
                                            //console.log(url);

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
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {type.name}
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {item.Status.name}
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle tag="a" className="link" style={{cursor: "pointer"}}>
                                                                <i className="fa fa-ellipsis-v"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                {item.Status.id === 1 &&
                                                                    <DropdownItem onClick={(e) => changeStatusItem(e, item, "inactive")}>
                                                                       <i className="fa fa-check mr-2"></i>Desactivar
                                                                    </DropdownItem>
                                                                }
                                                                {item.Status.id === 2 &&
                                                                    <DropdownItem onClick={(e) => changeStatusItem(e, item, "active")}>
                                                                        <i className="fa fa-check mr-2"></i>Activar
                                                                    </DropdownItem>
                                                                }
                                                                <DropdownItem onClick={() => showDataBid(item.id)}>
                                                                    <i className="fa fa-eye mr-2"></i>Ver
                                                                </DropdownItem>
                                                                <Link to={`/bidsSellerUpdate/${item.id}`} className="dropdown-item">
                                                                    <i className="fa fa-edit mr-2"></i>Editar
                                                                </Link>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </td>
                                                </tr>
                                            )
                                        }))}

                                        {(list.length === 0 &&
                                            <tr>
                                                <td colSpan="80" className="text-center">
                                                    Sin publicaciones creadas
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }else{
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Listar publicaciones</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    Listar publicaciones
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default List
