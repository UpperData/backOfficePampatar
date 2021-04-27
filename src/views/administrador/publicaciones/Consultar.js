import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Card,CardBody,CardTitle,Table,Row,Col, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,CustomInput,Button, Modal, ModalHeader, ModalBody, ModalFooter, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ShopWithContractsSelect from '../../../components/selects/ShopsWithContractsSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"

function Consultar() {

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
        axios.get("/setting/seller/shop/all").then((res) => {
            console.log(res.data);
            setdata(res.data.data.rsShopAll);
            setshoplist(res.data.data.rsShopAll);
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

    //FILTER SHOPS

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

            <Breadcrumb listClassName="px-0">
                <BreadcrumbItem><a href="##">Publicaciones</a></BreadcrumbItem>
                <BreadcrumbItem active>Consultar publicaciones</BreadcrumbItem>
            </Breadcrumb>

            <h1 className="h4 mb-3 font-weight-bold">
                Consultar publicaciónes
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
                                                placeholder="Filtrar tienda por nombre" 
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
                                            <Link to={`/admIn/pUBLICATIONS/ListAll/Shop/${item.id}`} className="card w-100 shadow h-100">
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
                                            </Link>
                                        </div>
                                    )
                                }))}
                            </div>
                        </div>
                    }
                </div>
            :
                ""
            }
        </div>
    )
}

export default Consultar
