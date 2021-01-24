import React, {useState, useEffect} from 'react'
import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';
//import moment from 'moment'
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link} from 'react-router-dom'

function FindContract() {
    const [loading, setloading]                 = useState(true);
    const [search,  setSearch]                  = useState(true);
    //const [sending, setsending]               = useState(false);
    const [data,    setData]                    = useState([]);

    const [filterBySearch, setFilterBySearch]   = useState('');
    const [filterByStatus, setfilterByStatus]   = useState(null);
    //const [count, setcount]   = useState(0);

    const [searchByText,    setsearchByText]    = useState(false);
    const [list,            setlist]            = useState([]);

    let url = '/setting/seller/shop/all';

    //const [seeItem, setSeeItem]             = useState(null);
    //const [errormessage, seterrormessage]   = useState('');
    //const [successmessage, setsuccessmessage]   = useState('');

    const searchShop = (text) => {
        console.log(text);
        let filterbytext = list.filter(item => {
            //console.log(item.name);
            return item.name.trim().toLocaleLowerCase().includes(text.toLocaleLowerCase());
        });
        console.log(filterbytext);
        setlist(filterbytext);
    }

    const filterBy = (type = '', value = '', key = null) => {
        switch (type) {
            case 'search':
                if(value.trim() !== '' && value.trim().length > 0){
                    searchShop(value.trim());
                }else{
                    setsearchByText(false);
                    setlist(data);
                }
            break;

            case 'sort':
                console.log('sort by:'+ key);
                let filterbysort = [];

                if(value === 'desc'){

                    if(key === 'status'){
                        console.log('filter by status');
                        filterbysort = list.sort((a,b) => a.Status.name > b.Status.name ? 1 : -1);
                    }else{
                        filterbysort = list.sort((a,b) => a[key] > b[key] ? 1 : -1);
                    }
                    console.log(filterbysort);
                    setlist(filterbysort);
                }else if (value === 'asc'){
                    if(key === 'status'){
                        console.log('filter by status');
                        filterbysort = list.sort((a,b) => a.Status.name < b.Status.name ? 1 : -1);
                    }else{
                        filterbysort = list.sort((a,b) => a[key] < b[key] ? 1 : -1);
                    }
                    console.log(filterbysort);
                    setlist(filterbysort);
                }
            break;

            default:
                console.log('seteando list al estado original');
                let unsort = data.sort((a,b) => a['id'] < b['id']  ? 1 : -1);
                console.log(unsort);
                setlist(unsort);
            break;
        }
    }

    const cleanFilters = () => {
        setlist(data);
        setFilterBySearch('');
        setfilterByStatus(null);
        setsearchByText(false);
        //setcount(0);

        filterBy('clear');
    }

    const sortTable = (key) => {
        if(key === 'status'){
            if(filterByStatus === null){
                setfilterByStatus('desc');
                filterBy('sort', 'desc', key);
            }else if(filterByStatus === 'asc'){
                setfilterByStatus('desc');
                filterBy('sort', 'desc', key);
            }else if(filterByStatus === 'desc'){
                setfilterByStatus('asc');
                filterBy('sort', 'asc', key);
            }
        }
    }

    const changeInputSearch = (value) => {
        setFilterBySearch(value);
        setsearchByText(true);

        setTimeout(() => {
            filterBy('search', value);
        }, 500);
    }

    const getData = () => {
        axios.get(url)
        .then((res) => {
            console.log(res.data);
            setData(res.data.data.rsShopAll);
            setlist(res.data.data.rsShopAll);
            setloading(false);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        if(loading){
            if(search){
                setSearch(false);
                getData();
            }
        }
    }, []);

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
                <h1 className="h4 mb-3 font-weight-bold">Consulta de contratos</h1>
                <div className="filters bg-light py-3 mb-3 px-3">
                    <form action="">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-2">
                                <div className="filter-by">
                                    <button type="button" 
                                    onClick={() => sortTable('status')} 
                                    className="btn-unstyled font-weight-bold"
                                    >
                                        Estatus <i className={`ml-3 filter-indicator fa fa-${getFilterClass(filterByStatus)}`}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="input">
                                    <input 
                                        value={filterBySearch}
                                        onChange={(e) => changeInputSearch(e.target.value)}
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Filtrar por nombre" 
                                        aria-label="filter" 
                                        aria-describedby="filter-by-name"
                                    />
                                </div>
                            </div>
                            <div className="col-auto">
                                <button type="button" 
                                onClick={() => cleanFilters()} 
                                className="btn btn-primary">
                                    limpiar filtros
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <Row>
                    <Col md="12">
                        <Card>
                            <div className="p-3">
                                <CardTitle><i className="mdi mdi-border-all mr-2"></i>Listado de tiendas con contratos activos en pampatar</CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre de la tienda</th>
                                            <th>Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(list.length > 0 && list.map((item, key) => {
                                            //let date = item.createdAt.split(' ');
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        {item.id}
                                                    </td>
                                                    <td>
                                                        <strong>{item.name}</strong>
                                                    </td>
                                                    <td>
                                                        {item.Status.name}
                                                    </td>
                                                    <td className="text-right">
                                                        <Link to={'/findContract/shop/'+item.id} className="btn btn-primary btn-sm">
                                                            ver contratos
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        }))}
                                    </tbody>
                                </Table>
                                {(list.length === 0) &&
                                    <p colSpan="5">
                                        Sin resultados encontrados
                                    </p>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Consulta de contratos</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default FindContract
