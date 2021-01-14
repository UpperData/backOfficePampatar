import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    UncontrolledTooltip,
    Badge
} from 'reactstrap';
import InlineSpinner from '../../spinner/InlineSpinner';

function SelectRequest() {
    let url = '/setting/SHoPrequests/admin/';

    const [loading, setloading] = useState(true)
    const [search,  setsearch]  = useState(true);
    const [data, setdata]       = useState(null);
    const [list, setlist]       = useState(null);

    const [filterByDate,    setFilterByDate]    = useState(null);
    const [filterByStatus,  setfilterByStatus]  = useState(null);
    const [filterBySearch,  setFilterBySearch]  = useState('');
    const [searchByText,    setsearchByText]    = useState(false);

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

    const changeInputSearch = (value) => {
        setFilterBySearch(value);
        setsearchByText(true);

        setTimeout(() => {
            //setsearchByText(false);
            filterBy('search', value);
            //filterBy('text', value);
        }, 500);
    }

    const searchShop = (text) => {
        let newlist = data.rows.filter(item => item.Account.email.toLowerCase().includes(text.toLowerCase()));
        setlist(newlist);
        setsearchByText(false);

        //console.log(newlist);
        /*
            filterBy('sort', filterByStatus, 'status');
        */
    }

    const filterBy = (type = '', value = '', key = null) => {
        switch (type) {
            case 'search':
                if(value.trim() !== '' && value.trim().length > 0){
                    searchShop(value.trim());
                }else{
                    setsearchByText(false);
                    setlist(data.rows);
                }
                break;

            default:
                console.log('seteando list al estado original');
                let unsort = data.rows.sort((a,b) => a['id'] < b['id'] ? 1 : -1);
                console.log(unsort);
                setlist(unsort);
                break;
        }
    }

    const getData = () => {
        axios.get(url)
        .then((res) => {
            console.log(res.data);

            setdata(res.data);
            setlist(res.data.rows);
            setloading(false);
            
        }).catch((err) => {
            console.error(err);
        })
    }

    const cleanFilters = () => {

        setlist(data.rows);

        setFilterBySearch('');
        setFilterByDate(null);
        setfilterByStatus(null);
        setsearchByText(false);

        filterBy('clear');
    }

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                getData();
            }
        }
    }, []);

    if(!loading){
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Consulta Postulaciones</h1>
                <div className="filters bg-light py-3 mb-3 px-3">
                    <form action="">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-auto">
                                <div className="filter-by">
                                    <button type="button" 
                                    //onClick={() => sortTable('status')} 
                                    className="btn-unstyled font-weight-bold">
                                        Estatus <i 
                                        className={`ml-3 filter-indicator fa fa-${getFilterClass(filterByStatus)}`}
                                        ></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="filter-by">
                                    <button type="button" 
                                    //onClick={() => sortTable('status')} 
                                    className="btn-unstyled font-weight-bold">
                                        Fecha <i 
                                        className={`ml-3 filter-indicator fa fa-${getFilterClass(filterByDate)}`}
                                        ></i>
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
                                        placeholder="Filtrar por nombre del solicitante" 
                                        aria-label="filter" 
                                        aria-describedby="filter-by-name"
                                    />
                                </div>
                            </div>
                            <div className="col-auto">
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
                <Row>
                    <Col md="12">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>
                                    Lista de postulaciones
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre de la tienda</th>
                                            <th>Numero de empleados</th>
                                            <th>Canales de venta</th>
                                            <th>Fecha de creación</th>
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
                                                        <span href="#" id={`tooltip-brand-${item.id}`}>
                                                            {item.marca}
                                                        </span>
                                                        <UncontrolledTooltip placement="top" target={`tooltip-brand-${item.id}`}>
                                                            {item.Account.email}
                                                        </UncontrolledTooltip>
                                                    </td>
                                                    <td>{item.employees}</td>
                                                    <td>
                                                        {item.salesChannels.length > 0 && item.salesChannels.map((subitem, subkey) => {
                                                            return (
                                                                <Badge key={subkey} color="primary" className="mx-1">
                                                                    {subitem.name}
                                                                </Badge>
                                                            )
                                                        })}
                                                    </td>
                                                    <td>
                                                        {item.createdAt.split('T')[0]}
                                                    </td>
                                                </tr>
                                            )
                                        }))}
                                    </tbody>
                                </Table>
                                {(data.length === 0) &&
                                    <p className="text-center">
                                        Sin solicitudes pendientes por aprobar
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
                <h1 className="h4 mb-3 font-weight-bold">Consulta Postulaciones</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default SelectRequest
