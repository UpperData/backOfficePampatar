import React, {useState} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button
} from 'reactstrap';
import ProductSelect from '../../../components/selects/ProductSelect';
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import { moneyFormatter } from '../../../utils/helpers';
import ServicesStock from './ServicesStock';

function StockMonitorSeller() {

    const [product, setproduct] = useState(null);
    const [service, setservice] = useState(null);
    const [search,  setsearch]  = useState(false);
    const [stock,   setstock]  = useState(null);
    const [dataProduct,   setdataProduct]  = useState(null);

    const [modal, setModal] = useState(false);
    const [datawarehouse, setdatawarehouse]     = useState(null);
    const [searchdatawarehouse, setseachdatawarehouse]     = useState(false);

    const [variationsmodal, setvariationsModal] = useState(false);
    const [variationsList,  setvariationsList]  = useState(null);

    const [type,      settype]      = useState('');

    const changeType = (type) => {
        settype(type);
        setproduct(null);
        setservice(null);
        setsearch(false);
        setstock(null);
        setdataProduct(null);
    }

    const toggle = () => setModal(!modal);
    const variationsmodaltoggle = () => setvariationsModal(!variationsmodal);

    const getStock = (data) => {
        setproduct(data);
        let url         = '/seller/inventory/lot/sku/list/all/'+data.value;
        let urlprice    = '/seller/inventory/stock/sku/'+data.value+'/'+type;

        setsearch(true);

        axios.get(url).then((res) => {
            console.log(res.data);

            let stock = res.data.stock;
            setstock(res.data.items);

            //setstock(res.data.stock);

            axios.get(urlprice).then((res) => {
                stock.price = res.data.endPrice;

                console.log(stock);
                setdataProduct(stock);
                setsearch(false);
                
            }).catch((err) => {
                console.error(err);
                setsearch(false);
            });

        }).catch((err) => {
            console.error(err);
            setsearch(false);
        });

    }

    let statusclass = '';
    let Borderclass = '';
    let statusicon = '';

    if(Array.isArray(stock) && stock.length > 0 && !search){
        if(dataProduct.statusStock.status === 'Insuficiente'){
            statusclass = 'text-primary';
            Borderclass = 'border-primary';
            statusicon = 'fa fa-bell';
        }else if(dataProduct.statusStock.status === 'Alarmante'){
            statusclass = 'text-warning';
            Borderclass = 'border-warning';
            statusicon = 'fa fa-exclamation-triangle';
        }else if(dataProduct.statusStock.status === 'Holgado'){
            statusclass = 'text-success';
            Borderclass = 'border-success';
            statusicon = 'fa fa-check';
        }
    }

    const showVariation = (e, loteId, variations) => {
        e.preventDefault();

        let newvariationslist = {lote: loteId, list: variations};

        setvariationsList(newvariationslist);
        setvariationsModal(true);
    }

    const showwarehouse = (e, id) => {
        e.preventDefault(); 
        setseachdatawarehouse(true);

        let url = '/warehouse/'+id;

        axios.get(url)
        .then((res) => {
            //console.log(res.data);
            setdatawarehouse(res.data.data.values[0]);
            setseachdatawarehouse(false);
        }).catch((err) => {
            console.error(err);
            setseachdatawarehouse(false);
        });

        setModal(true);
    }

    let dir     = '';
    let phone   = '';

    if(datawarehouse !== null){

        let item = datawarehouse;

        phone = ((item.phone !== null) ? item.phone[0].number : null);

        dir = '';

        if(item.address[0].street !== null && item.address[0].street !== undefined){
            dir = dir+''+item.address[0].street+', ';
        }

        if(item.address[0].number !== null && item.address[0].number !== undefined){
            dir = dir+''+item.address[0].number+', ';
        }

        if(item.address[0].local !== null && item.address[0].local !== undefined){
            dir = dir+''+item.address[0].local+', ';
        }

        if(typeof item.address[0].comuna === 'object' && item.address[0].comuna.hasOwnProperty('name')){
            dir = dir+''+item.address[0].comuna.name+' ';
        }

        if(typeof item.address[0].province === 'object' && item.address[0].province.hasOwnProperty('name')){
            dir = dir+''+item.address[0].province.name+' ';
        }

        if(typeof item.address[0].region === 'object' && item.address[0].region.hasOwnProperty('name')){
            dir = dir+''+item.address[0].region.name+' ';
        }
    }

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                Stock de productos
            </h1>
            <Row>
                <Col md="12">
                    <Card>
                        <div className="p-3">
                            <CardTitle>
                                <i className="mdi mdi-border-all mr-2"></i>
                                Consultar stock de:
                            </CardTitle>
                        </div>
                        <CardBody className="border-top">
                            <button disabled={type === 'product'} onClick={() => changeType('product')} className="btn btn-primary">
                                Un producto
                            </button>
                            <button disabled={type === 'service'} onClick={() => changeType('service')} className="btn btn-info ml-2">
                                Un servicio
                            </button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {(type === 'service') && 
                <ServicesStock />
            }

            {(type === 'product') &&
                <div>
                    {type === 'product' &&
                        <form action="">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Stock por producto
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col xs="12">
                                        <div className="form-group">
                                            <label htmlFor="">Seleccione un producto</label>
                                            <ProductSelect value={product} onChange={getStock} />
                                        </div>
                                    </Col>
                                    <Col xs="12">
                                        {(search) &&
                                            <div className="py-5">
                                                <InlineSpinner />
                                            </div>
                                        }

                                        {(Array.isArray(stock) && stock.length ===0 && !search) &&
                                            <div className="alert alert-warning">
                                                Ningun lote registrado para este producto
                                            </div>
                                        }

                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <div>
                        {(Array.isArray(stock) && stock.length > 0 && !search) &&
                            <div className="row">
                                <div className="col col-lg-12">
                                    <Card>
                                        <CardBody>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="text-center">
                                                            <div className={'stock-circle mb-3 '+Borderclass}>
                                                                <span className={statusclass}><i className={statusicon}></i></span>
                                                            </div>
                                                            <h4 className={statusclass +' font-weight-bold h3'}>{dataProduct.statusStock.message}</h4>
                                                            <h4 className="d-none"><span className="h4 font-weight-bold">Precio Actual:</span><span className="font-weight-light ml-2">{moneyFormatter(dataProduct.price)}</span></h4>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="text-center">
                                                            <div className="text-center">
                                                                <h5 className="h3 font-weight-bold">Stock Actual</h5> 
                                                                <div className="stock-circle mb-3">
                                                                    <div>
                                                                        <span className="font-weight-bold">{dataProduct.currentStock}</span>
                                                                        <h5 className="h6 font-weight-bold">Unidades</h5>
                                                                    </div>
                                                                </div>
                                                                <h4><span className="h4 font-weight-bold">Stock Mínimo:</span> <span className="font-weight-light ml-2">{dataProduct.minStock}</span></h4> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className="col col-lg-12">
                                    <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        <i className="mdi mdi-border-all mr-2"></i>Lotes
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <Row>
                                        <Col>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            ID
                                                        </th>
                                                        <th>
                                                            Nombre del almacen
                                                        </th>
                                                        <th>
                                                            Fecha
                                                        </th>
                                                        <th>
                                                            Cantidad
                                                        </th>
                                                        <th>
                                                            Variaciones
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(stock.length > 0 && stock.map((item, key) => {

                                                        return (
                                                            <tr key={key}>
                                                                <td>
                                                                    {item.id}
                                                                </td>
                                                                <td>
                                                                    <button onClick={(e) => showwarehouse(e, item.Warehouse.id)} className="btn btn-sm btn-link font-weight-bold">
                                                                        {item.Warehouse.name}
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                    {item.createdAt.split('T')[0]}
                                                                </td>
                                                                <td>
                                                                    {item.quantity}
                                                                </td>
                                                                <td>
                                                                    {
                                                                    (item.variation === null) ? 
                                                                        'Sin variaciones' : 
                                                                        <button type="button" onClick={(e) => showVariation(e, item.id, item.variation)} className="btn btn-sm btn-outline-primary font-weight-bold"><i className="fa fa-paint-brush mr-2"></i>Lista de variaciones</button>
                                                                    }
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
                            </div>
                        }
                    </div>
                </form>
                    }
                </div>
            }

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Almacen: {(datawarehouse !== null) ? <strong>{datawarehouse.name}</strong> : ''}
                </ModalHeader>
                <ModalBody>
                   {searchdatawarehouse &&
                        <InlineSpinner />
                   }
                   {(datawarehouse !== null && !searchdatawarehouse) &&
                        <div>
                            <h6>
                                <span className="font-weight-bold mr-1">
                                    <i className="fa mr-2 fa-map-marker-alt"></i>
                                    Dirección:</span><span>{dir}</span>
                                </h6>
                            <h6>
                                <span className="font-weight-bold mr-1">
                                    <i className="fa mr-2 fa-phone"></i>
                                    Teléfono:</span><span>{phone}</span>
                                </h6>
                        </div>
                   }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            
            <Modal isOpen={variationsmodal} toggle={variationsmodaltoggle}>
                <ModalHeader toggle={variationsmodaltoggle}>
                    Lista de variaciones para el lote: {(variationsList !== null) ? variationsList.lote : ''}
                </ModalHeader>
                <ModalBody>
                    {(variationsList !== null) &&
                        <div>
                            {variationsList.hasOwnProperty('list') && variationsList.list.map((item, key) => {
                                return (
                                    <p key={key} className="my-2">
                                        <span className="mb-1  mr-2 h6"><span>Talla:</span><span className="ml-2 font-weight-bold">{item.size}</span></span>
                                        /<span className="mb-1 ml-2 mr-2 h6"><span>Descuento:</span><span className="ml-2 font-weight-bold">{item.discount}%</span></span>
                                        /<span className="mb-1 ml-2 mr-2 h6"><span>Cantidad:</span><span className="ml-2 font-weight-bold">{item.quantity}</span></span>
                                        /<span className="mb-1 ml-2 mr-2 h6"><span>color:</span><span style={{display: 'inline-block', border: '2px solid #606060', width: '14px', height:'14px', backgroundColor: ((item.color !== null)? item.color : '#fff')}} className="ml-2 font-weight-bold"></span></span>
                                    </p>
                                )
                            })}
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={variationsmodaltoggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default StockMonitorSeller
