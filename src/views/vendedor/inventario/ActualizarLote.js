import React, {useState} from 'react'
//import AddProductSeller from './AddProductSeller'

import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';
import ProductSelect from '../../../components/selects/ProductSelect';
import WarehouseSelect from '../../../components/selects/WarehouseSelect';
import LotStatusSelect from '../../../components/selects/LotStatusSelect';

function ActualizarLote() {

    const loading = false;
    const [searchLote,      setsearchLote]      = useState(false);
    const [searchLotes,     setsearchLotes]     = useState(false);

    const [search,          setsearch]          = useState(true);
    const [errormessage,    seterrormessage]    = useState('');
    const [successmessage,  setsuccessmessage]  = useState('');

    const [product,         setproduct]         = useState(null);
    const [lote,            setlote]            = useState(null);
    const [lotes,           setlotes]           = useState(null);

    const [sending,         setsending]         = useState(false);
    //const [price,           setprice]         = useState(null);
    const [statusId,        setstatusId]        = useState(null);
    const [quantity,        setquantity]        = useState('');
    const [warehouse,       setwarehouse]       = useState('');
    const [note,            setnote]            = useState('');

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    let urlGetUpdate = '/seller/inventory/lot/sku/list/all/';

    const changeProduct = (data) => {
        console.log(data);
        setsearchLotes(true);
        setproduct(data);

        axios(urlGetUpdate+data.value)
        .then((res) => {
            console.log(res.data);
            setlotes(res.data.items);
            setsearchLotes(false);
        }).catch((err) => {
            console.error(err);
            setsearchLotes(false);
        });
    }

    const getDetail = (loteId) => {
        let urlDetail = '/seller/inventory/lot/sku/'+loteId;
        setsearchLote(true);

        if(search){
            setsearch(false);
        }
        axios.get(urlDetail).then((res) => {
            console.log(res.data);
            setlote(res.data);

            setquantity(res.data.quantity);
            //setprice(Number(res.data.price));
            setnote(res.data.note);
            setstatusId({value: res.data.Status.id});
            setwarehouse({label: res.data.Warehouse.name, value: res.data.Warehouse.id});

            setsearchLote(false);
        }).catch((err) => {
            console.error(err);
            setsearchLote(false);
        });
    }

    const gotolist = () => {
        setsearchLote(false);
        setlote(null);
    }

    const updateLote = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setsending(true);
        setsuccessmessage('');
        seterrormessage('');

        let data = {
            inventoryId:lote.id,
            quantity:quantity,
            warehouseId:warehouse.value,
            StatusId: statusId.value ,
            note	
        }

        let urlEdit = '/seller/inventory/lot/edit/';

        axios({
            method: 'put',
            url: urlEdit,
            data
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                setsuccessmessage(res.data.data.message);
                setModal(false);
                window.scrollTo({top: 250, behavior: 'smooth'});

                /*
                    setsearchLote(false);
                    setsearchLotes(false);
                    setsearch(true);
                    seterrormessage('');
                    setproduct(null);
                    setlote(null);
                    setlotes(null);
                */

            }else{
                seterrormessage(res.data.data.message);
                setModal(false);
                window.scrollTo({top: 250, behavior: 'smooth'});
            }
            setsending(false);
        }).catch((err) => {
            console.error(err);
            setsending(false);
        });
    }

    if(!loading){
        return (
            <div className="actualizar-lote">
                <h1 className="h4 mb-3 font-weight-bold">
                    Actualizar lote
                </h1>
                {(errormessage !== '') &&
                    <div className="alert alert-danger">
                        {errormessage}
                    </div>
                }
                {(successmessage !== '') &&
                    <div className="alert alert-success">
                        {successmessage}
                    </div>
                }
                <div>
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        <i className="mdi mdi-border-all mr-2"></i>Seleccione un producto
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <ProductSelect value={product} onChange={changeProduct} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {(searchLotes) &&
                        <InlineSpinner />
                    }

                    {(product !== null && lotes !== null && Array.isArray(lotes) && lote === null && !searchLote) &&
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        <i className="mdi mdi-border-all mr-2"></i>Lotes del producto: {product.label}
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Creado el día
                                                </th>
                                                <th>
                                                    Nota
                                                </th>
                                                <th>
                                                    Stock
                                                </th>
                                                <th>
                                                    Acción
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(lotes.length > 0 && lotes.map((item, key) => {

                                                let day = item.createdAt.split('T');

                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                            {day[0]}
                                                        </td>
                                                        <td>
                                                            {item.note}
                                                        </td>
                                                        <td>
                                                            {item.quantity}
                                                        </td>
                                                        <td>
                                                            <button onClick={() => getDetail(item.id)} className="btn btn-sm btn-warning font-weight-bold px-4 shadow">
                                                                Editar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    }

                    {(searchLote) &&
                        <InlineSpinner />
                    }
                    {(product !== null && lotes !== null && Array.isArray(lotes) && lote !== null && !searchLote) &&
                        <form onSubmit={(e) => updateLote(e)} action="">
                            <Row>
                                <Col md="12">
                                    <div className="my-2 d-none text-right">
                                        <button onClick={() => setlote(null)} className="btn btn-info font-weight-bold">Volver a selección de lote</button>
                                    </div>
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                <i className="mdi mdi-border-all mr-2"></i>Datos del lote - <button onClick={() => gotolist()} className="btn btn-sm btn-info">Volver a la lista de lotes</button>
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                            <Row>
                                                <Col md="12">
                                                    <div className="form-group">
                                                        <label htmlFor="">Almacen</label>
                                                        <WarehouseSelect value={warehouse} onChange={setwarehouse} />
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Estatus</label>
                                                        <LotStatusSelect value={statusId} onChange={setstatusId} />
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Cantidad</label>
                                                        <input 
                                                            type="number" 
                                                            value={quantity}
                                                            onChange={(e) => setquantity(e.target.value)}
                                                            min="0"
                                                            placeholder="Cantidad"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="12">
                                                    <div className="form-group">
                                                        <label htmlFor="">Nota</label>
                                                        <textarea className="form-control" value={note} onChange={(e) => setnote(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="12">
                                    <div className="py-2 text-right">
                                        <button disabled={sending} onClick={() => toggle()} type="button" className="btn btn-warning px-4 font-weight-bold">
                                            {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : 'Actualizar lote'}
                                        </button>
                                    </div>
                                </Col>
                        </Row>
                        </form>
                    }
                </div>
                
                {(product !== null) &&
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>
                            <span className="font-weight-bold">¿Actualizar lote?</span>
                        </ModalHeader>
                        <ModalBody>
                            <p>¿Desea actualizar este lote de <strong>{product.label}</strong>?</p>
                            <p><strong>Nota:</strong> esta acción no se puede deshacer</p>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" disabled={sending} onClick={(e) => updateLote(e)}>
                            {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : 'Confirmar'}
                        </Button>{' '}
                        <Button color="light" onClick={toggle}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                }
            </div>
        )
    }else{
        return (
            <div className="actualizar-lote">
                <h1 className="h4 mb-3 font-weight-bold">
                    Actualizar lote
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default ActualizarLote
