import React, {useState, useEffect} from 'react'
import axios from "axios"
import InlineSpinner from '../../spinner/InlineSpinner';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {useSelector} from 'react-redux'
import BidTypesSelect from '../../../components/selects/TypeBidSelect';

function List() {
    
    const backoffice                            = useSelector(state => state.backoffice);
    const bidTypes                              = backoffice.bidTypes;
    const [loading, setloading]                 = useState(true);
    const [search, setsearch]                   = useState(true);
    const [data, setdata]                       = useState([]);
    const [list, setlist]                       = useState([]);

    const [bidSelected, setbidSelected]         = useState(null);

    const [filterBySearch, setFilterBySearch]   = useState("");
    const [filterByType,    setfilterByType]    = useState(null);
    const [searchByText,    setsearchByText]    = useState(false);

    const [count, setcount]                     = useState(0);

    let url = "/seLLer/pUBLIctIons/get/ALl";

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);

                axios.get(url).then((res) => {
                    console.log(res.data);
                    setdata(res.data);
                    setlist(res.data);
                    setloading(false);
                }).catch((err) => {
                    console.error(err);
                    setloading(false);
                });
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

    if(!loading){
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    Listar publicaciones
                </h1>
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
                                            let type = bidTypes.find(type => Number(type.id ) === Number(item.skuTypeId));
                                            //let img = item.photos[0];
                                            //let imgformat = img.toString().split(",");
                                            //console.log(imgformat);

                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        {item.id}
                                                    </td>
                                                    <td>
                                                        
                                                    </td>
                                                    <td>
                                                        {item.title}
                                                    </td>
                                                    <td>
                                                        {type.name}
                                                    </td>
                                                    <td>
                                                        {item.status[0].name}
                                                    </td>
                                                    <td>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle tag="a" className="link" style={{cursor: "pointer"}}>
                                                                <i className="fa fa-ellipsis-v"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                <DropdownItem>
                                                                    <i className="fa fa-eye mr-2"></i> Ver
                                                                </DropdownItem>
                                                                <DropdownItem>
                                                                    <i className="fa fa-edit mr-2"></i> Editar
                                                                </DropdownItem>
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
                <h1 className="h4 mb-3 font-weight-bold">
                    Listar publicaciones
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default List
