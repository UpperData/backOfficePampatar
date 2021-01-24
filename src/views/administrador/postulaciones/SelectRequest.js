import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    UncontrolledTooltip,
    Badge,
    Breadcrumb, 
    BreadcrumbItem, 
} from 'reactstrap';
import InlineSpinner from '../../spinner/InlineSpinner';

function SelectRequest() {
    let url = '/setting/SHoPrequests/admin/';

    const [loading, setloading] = useState(true)
    const [search,  setsearch]  = useState(true);
    const [data, setdata]       = useState(null);
    const [list, setlist]       = useState(null);
    const [store, setstore]     = useState(null);

    const [filterByDate,    setFilterByDate]    = useState(null);
    const [filterByStatus,  setfilterByStatus]  = useState(null);
    const [filterBySearch,  setFilterBySearch]  = useState('');
    const [searchByText,    setsearchByText]    = useState(false);

    const [errormessage, seterrormessage]   = useState('');
    const [successmessage, setsuccessmessage]   = useState('');

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
        let newlist = data.rows.filter((item) => {
            let fullName = item.Account.Person.firstName.toLowerCase()+' '+item.Account.Person.lastName.toLowerCase();
            return fullName.includes(text.toLowerCase());
        });

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

            case 'sort':
                console.log('sort by:'+ key);
                let filterbysort = [];

                if(value === 'desc'){

                    if(key === 'status'){
                        console.log('filter by status');
                        filterbysort = list.sort((a,b) => (a.status[a.status.length - 1].name > b.status[b.status.length - 1].name) ? 1 : -1);
                    }else if(key === 'date'){
                        console.log('filter by date ');
                        
                        filterbysort = list.sort((a,b) => {
                            let date1 = a.createdAt.split('T')[0];
                            let date2 = b.createdAt.split('T')[0];
                            
                            return date1 > date2 ? 1 : -1;
                        });
                        
                    }else{
                        filterbysort = list.sort((a,b) => a[key] > b[key] ? 1 : -1);
                    }

                    //console.log(filterbysort);
                    setlist(filterbysort);

                }else if (value === 'asc'){
                    
                    if(key === 'status'){
                        console.log('filter by status');
                        filterbysort = list.sort((a,b) => a.status[a.status.length - 1].name < b.status[b.status.length - 1].name ? 1 : -1);
                    
                    }else if(key === 'date'){

                        console.log('filter by date ');
                        filterbysort = list.sort((a,b) => {
                            let date1 = a.createdAt.split('T')[0];
                            let date2 = b.createdAt.split('T')[0];
                            
                            return date1 < date2 ? 1 : -1;
                        });
                        
                    }else{
                        filterbysort = list.sort((a,b) => a[key] < b[key] ? 1 : -1);
                    }
                    

                    //console.log(filterbysort);
                    setlist(filterbysort);
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

    const sortTable = (key) => {
        console.log('click');


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

        if(key === 'date'){
            if(filterByDate === null){
                setFilterByDate('desc');
                filterBy('sort', 'desc', key);
            }else if(filterByDate === 'asc'){
                setFilterByDate('desc');
                filterBy('sort', 'desc', key);
            }else if(filterByDate === 'desc'){
                setFilterByDate('asc');
                filterBy('sort', 'asc', key);
            }
        }
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
        if(store === null){
            return (
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Consulta Postulaciones</h1>
                    <div className="filters bg-light py-3 mb-3 px-3">
                        <form action="">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <div className="filter-by">
                                        <button type="button" 
                                        onClick={() => sortTable('status')} 
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
                                        onClick={() => sortTable('date')} 
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
                        {(store === null) &&
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
                                                    <th>Estatus</th>
                                                    <th>Fecha de creación</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(list.length > 0 && list.map((item, key) => {
                                                    let fullName = item.Account.Person.firstName.toLowerCase()+' '+item.Account.Person.lastName.toLowerCase();
                                                    
                                                    return (
                                                        <tr key={key}>
                                                            <td>
                                                                {item.id}
                                                            </td>
                                                            <td>
                                                                <button onClick={() => setstore(item)} className="btn btn-link text-secondary font-weight-bold py-0" id={`tooltip-brand-${item.id}`}>
                                                                    {item.marca}
                                                                </button>
                                                                <UncontrolledTooltip placement="top" target={`tooltip-brand-${item.id}`}>
                                                                    {fullName}
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
                                                                {item.status[item.status.length - 1].name}
                                                            </td>
                                                            <td>
                                                                {item.createdAt.split('T')[0]}
                                                            </td>
                                                        </tr>
                                                    )
                                                }))}
                                            </tbody>
                                        </Table>
                                        {(list.length === 0) &&
                                            <p className="text-center">
                                                Sin solicitudes encontradas
                                            </p>
                                        }
                                    </CardBody>
                                </Card>
                            </Col>
                        }
                    </Row>

                </div>
            )
        }else{
            let item = store;
            let preference = item.Account.preference;
            let affirmations = item.affirmations;

            return (
                <Col mr="12">
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Postulaciones</a></BreadcrumbItem>
                        <BreadcrumbItem><button onClick={() => setstore(null)} className="btn-unstyled text-primary">Consultar postulaciones</button></BreadcrumbItem>
                        <BreadcrumbItem active>Detalles de la postulación</BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="h4 mb-3 font-weight-bold">Detalles de la postulación: {store.marca}</h1>
                    {(errormessage !== '') &&
                        <div className="alert alert-danger">
                            <p className="mb-0">
                                {errormessage}
                            </p>
                        </div>
                    }
                    <Card>
                        <div className="p-3">
                            <CardTitle>
                                <i className="mdi mdi-border-all mr-2"></i>
                                Datos de la postulación
                            </CardTitle>
                        </div>
                        <CardBody className="border-top">
                            <Row>
                                <Col md="5">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle><i className="mdi mdi-account mr-2"></i>Datos del postulante</CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                            <h4><span className="font-weight-bold">Nombre</span>: {item.Account.Person.firstName+' '+item.Account.Person.lastName}</h4>
                                            {/* 
                                                <h6>
                                                    <span>Género: {item.Account.Person.gender}</span>
                                                </h6>
                                                <h6>
                                                    <span>Nacionalidad: {item.Account.Person.Nationality.name}</span>
                                                </h6>
                                            */}
                                            <hr/>
                                            <h6>
                                                <span>Email: {item.Account.email}</span>
                                            </h6>
                                            {/* 
                                            <h6>
                                                {(Array.isArray(preference)) ?
                                                    <Fragment>
                                                        <h6 className="font-weight-bold">Preferencias:</h6>
                                                        {preference.length > 0 && preference.map((subitem, subkey) => {
                                                            return (
                                                                <Badge key={subkey} color="info" className="mx-r">
                                                                    {subitem.name}
                                                                </Badge>
                                                            )
                                                        })}
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                        <h6 className="font-weight-bold">
                                                            Preferencia:
                                                        </h6>
                                                        <Badge color="info" className="mx-r">
                                                            {preference.name}
                                                        </Badge>
                                                    </Fragment>
                                                }
                                            </h6>
                                            */}
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="7">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle><i className="mdi mdi-store mr-2"></i>Datos de la tienda</CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                            <h4><span className="font-weight-bold">Nombre de la tienda</span>: {item.marca}</h4>
                                            <p>
                                                Descripción: {item.descShop}
                                            </p>
                                            <hr/>

                                            {(Array.isArray(item.status)) ?
                                                <Fragment>
                                                    <h6 className="font-weight-bold">Estatus</h6>
                                                    {item.status.length > 0 && item.status.map((item, key) => {
                                                        let date = item.date.split('T');
                                                        if(Array.isArray(date) && date.length > 0){
                                                            return (
                                                                <p key={key} className="mx-1">
                                                                    {item.date.split('T')[0]} - <span className="badge badge-info">{item.name}</span>
                                                                </p>
                                                            )
                                                        }

                                                    })}
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <h6 className="font-weight-bold">
                                                        Afirmación:
                                                    </h6>
                                                    <p>
                                                        {affirmations.name}
                                                    </p>
                                                </Fragment>
                                            }

                                            {(Array.isArray(affirmations)) ?
                                                <Fragment>
                                                    <h6 className="font-weight-bold">Afirmaciones:</h6>
                                                    {affirmations.length > 0 && affirmations.map((subitem, subkey) => {
                                                        return (
                                                            <p key={subkey} className="mx-1">
                                                                {subitem.name}
                                                            </p>
                                                        )
                                                    })}
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <h6 className="font-weight-bold">
                                                        Afirmación:
                                                    </h6>
                                                    <p>
                                                        {affirmations.name}
                                                    </p>
                                                </Fragment>
                                            }

                                            <h6>
                                                ¿Tiene inicio de actividades? - <strong>{item.startActivity ? 'si' : 'no'}</strong>
                                            </h6>
                                            <h6>
                                                ¿Cuenta con tienda física? - <strong>{item.isStore ? 'si' : 'no'}</strong>
                                            </h6>
                                            <hr/>
                                            <h6>
                                                Número de empleados: <strong>{item.employees}</strong>
                                            </h6>
                                            <h6>
                                                Canales de venta: {item.salesChannels.length > 0 && item.salesChannels.map((subitem, subkey) => {
                                                                        return (
                                                                            <Badge key={subkey} color="info" className="mx-1">
                                                                                {subitem.name}
                                                                            </Badge>
                                                                        )
                                                                    })}
                                            </h6>
                                            <hr/>
                                            <h6 className="font-weight-bold">Contacto</h6>
                                            <hr/>
                                                <Fragment>
                                                    <h6 className="font-weight-bold">Teléfonos:</h6>
                                                    {item.phone.length > 0 && item.phone.map((subitem, subkey) => {
                                                        return (
                                                            <p key={subkey} className="mb-0">
                                                                <i className="fa fa-phone mr-2"></i>{subitem.phoneNmber}
                                                            </p>
                                                        )
                                                    })}
                                                </Fragment>
                                            

                                            {/*typeof shop.phone === 'array' &&
                                                <Fragment>
                                                    <h6 className="font-weight-bold">Teléfonos:</h6>
                                                    {shop.phone.length > 0 && shop.phone.map((subitem, subkey) => {
                                                        return (
                                                            <p key={subkey} className="mx-1">
                                                                {subitem.phoneNmber}
                                                            </p>
                                                        )
                                                    })}
                                                </Fragment>
                                            */}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            )
        }
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
