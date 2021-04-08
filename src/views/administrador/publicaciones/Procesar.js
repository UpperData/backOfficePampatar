import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Card,CardBody,CardTitle,Table,Row,Col, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,CustomInput,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ShopWithContractsSelect from '../../../components/selects/ShopsWithContractsSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"

function Procesar() {

    const backoffice                            = useSelector(state => state.backoffice);
    const bidTypes                              = backoffice.bidTypes;

    const [loading, setloading]                 = useState(true);
    const [search, setsearch]                   = useState(true);
    const [searchBids, setsearchBids]           = useState(false);

    const [successmessage, setsuccessmessage]   = useState("");
    const [errormessage, seterrormessage]       = useState('');
    const [changing, setchanging]               = useState(false);

    const [shop,    setshop]                    = useState(null);
    const [shoplist, setshoplist]               = useState(null);
    const [list,    setlist]                    = useState(null);
    const [data,    setdata]                    = useState(null);

    const [shopSelected, setshopSelected]       = useState(null);

    const [searchdatabid, setsearchdatabid]     = useState(false);
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
        axios.get("/sEtTiNg/biD/IN/evaLUAtion").then((res) => {
            console.log(res.data);
            setdata(res.data);
            setshoplist(res.data);
            setloading(false);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                getData();
            }
        }
    });

    const filterShops = (text = setFilterBySearchShop) => {
        let newlist = shoplist;

        if(text !== ""){
            newlist = shoplist.filter(item => item.name.toLowerCase().includes(text.trim().toLowerCase()));
        }

        setdata(newlist);
        setcount(count + 5);
    }

    const changeInputSearchShop = (value) => {
        setFilterBySearchShop(value);

        setTimeout(() => {
            filterShops(value);
        }, 0);
    }

    const cleanFiltersShop = () => {
        setdata(shoplist);
        setFilterBySearchShop('');

        setcount(count + 5);
    }

    //----------------------------------------------------------

    const filterBids = (text = filterBySearch) => {
        let newlist = shopSelected.Bids;

        if(text !== ""){
            newlist = shopSelected.Bids.filter(item => item.title.toLowerCase().includes(text.trim().toLowerCase()));
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
        setlist(shopSelected.Bids);
        setFilterBySearch('');
    }

    const selectShop = (shop) => {
        console.log(shop);
        setlist(shop.Bids);
        setshopSelected(shop);
    }

    const showDataBid = (id) => {
        setsearchdatabid(true);
        setbidSelected(id);
        setModal(true);
        let urlBid = `/sEtTiNg/BiD/GET/OnE/${shopSelected.id}/${id}`;
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

        if(type === "accept"){
            urlaction = `/SETTiNG/BiD/UpBid/APPROve`;
        }else if(type === "reject"){
            urlaction = `/SetTiNG/BiD/UPBid/rJeCT`;
        }

        setsuccessmessage('');
        seterrormessage('');
        setchanging(true);
        
        axios({
            url: urlaction,
            method: "PUT",
            data: {
                id: bidSelected
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                setsuccessmessage(res.data.data.Message);
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
            <h1 className="h4 mb-3 font-weight-bold">
                Procesar publicaciónes
            </h1>
            
            {(searchBids || loading) &&
                <InlineSpinner />
            }

            {(shopSelected === null) 
            ?
                <div>
                    <p>
                        Seleccione una tienda haciendo click en su carta correspondiente.
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
                                    <div className="col-lg-3">
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

                    {(Array.isArray(data) && data.length === 0 && !loading) &&
                        <div>
                            <h3 className="h5 text-center font-weight-bold">
                                No existen tiendas que coincidan con los parametros de la busqueda.
                            </h3>
                        </div>
                    }

                    {(Array.isArray(data) && data.length > 0 && !loading) &&
                        <div>
                            <div className="row row-eq-height">
                                {(data.map((item, key) => {
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
                                            <button onClick={() => selectShop(item)} className="card w-100 shadow h-100">
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
            :
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
                                                Titulo
                                            </th>
                                            <th>
                                                Acción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(list.length > 0 && list.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        {item.id}
                                                    </td>
                                                    <td>
                                                        {item.title}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => showDataBid(item.id)} className="btn btn-info">
                                                            Ver publicación
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }))}
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

                            {(!searchdatabid && databid !== null && successmessage === "") &&
                                <div className="data-bid">
                                    <Nav tabs className="nav-fill">
                                        <NavItem>
                                            <NavLink
                                                className={activeTab === '1' ? "active font-weight-bold" : ""}
                                                onClick={() =>  toggleTab('1')}
                                            >
                                                Informacion comercial
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={activeTab === '2' ? "active font-weight-bold" : ""}
                                                onClick={() =>  toggleTab('2')}
                                            >
                                                Detalles
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
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
                                                        
                                                        console.log(type);
                                                        console.log(imagen);

                                                        return (
                                                            <div className="col-lg-6 mb-3">
                                                                <img 
                                                                    className="img-fluid"
                                                                    //style='display:block; width:100px;height:100px;'                
                                                                    src={`data:image/${type};base64,${imagen}`}
                                                                />
                                                            </div>
                                                        )
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
                            <Button disabled={changing} color="info" onClick={(e) => changeStatusBid(e, "accept")}>
                                {changing ? <span><i className="fa fa-spinner fa-spin"></i></span> : 'Aceptar'}
                            </Button>
                            <Button disabled={changing} color="info" onClick={(e) => changeStatusBid(e, "reject")}>
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

export default Procesar
