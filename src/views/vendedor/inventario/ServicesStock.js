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

import moment from 'moment'
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import { moneyFormatter } from '../../../utils/helpers';
import ServicesSelect from '../../../components/selects/servicesSelect';

function ServicesStock() {

    const [product, setproduct] = useState(null);
    const [service, setservice] = useState(null);
    const [search,  setsearch]  = useState(false);
    const [stock,   setstock]   = useState(null);
    const [data,    setdata]    = useState(null);
    const [dataService,   setdataService]  = useState(null);

    const [modal, setModal] = useState(false);
    const [datawarehouse, setdatawarehouse]     = useState(null);
    const [searchdatawarehouse, setseachdatawarehouse]     = useState(false);

    const [variationsmodal, setvariationsModal] = useState(false);
    const [variationsList,  setvariationsList]  = useState(null);
    const [type,      settype]      = useState('service');

    const getStock = (data) => {
        setservice(data);
        
        let url = '/getPriceCurrent/Inventory/sku/'+data.value+'/service';
        let urlprice    = '/seller/serVice/StoCk/get/'+data.value;
        setsearch(true);

        axios.get(urlprice).then((res) => {
            console.log(res.data);
            //let stock = res.data.stock;
            setdata(res.data.stock);
            setstock(res.data.items);
            axios.get(url).then((res) => {
                console.log(res.data);
                setdataService(res.data);
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

    console.log(dataService);

    let statusclass = '';
    let statusicon = '';
    let Borderclass = '';

    if(Array.isArray(stock) && stock.length > 0 && data !== null && !search){
        console.log(data);

        if(data.statusStock.status === 'Insuficiente'){
            statusclass = 'text-primary';
            Borderclass = 'border-primary';
            statusicon = 'fa fa-bell';
        }else if(data.statusStock.status === 'Alarmante'){
            statusclass = 'text-warning';
            Borderclass = 'border-warning';
            statusicon = 'fa fa-exclamation-triangle';;
        }else if(data.statusStock.status === 'Holgado'){
            statusclass = 'text-success';
            Borderclass = 'border-success';
            statusicon = 'fa fa-check';
        }
    }

    return (
        <div>
            {(type !== '') &&
                <div>
                    {type === 'service' &&
                        <form action="">
                        <Card>
                            <div className="p-3">
                                Stock de servicios
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col xs="12">
                                        <div className="form-group">
                                            <label htmlFor="">Seleccione un servicio</label>
                                            <ServicesSelect value={service} onChange={getStock} />
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
                                                Sin stock disponible para este servicio
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
                                                            <h4 className={statusclass +' font-weight-bold h3'}>{data.statusStock.message}</h4>
                                                            {(dataService.hasOwnProperty("data") && dataService.data.result === false) 
                                                            ?
                                                                <div>
                                                                    <h4 className="font-weight-bold">
                                                                        {dataService.data.message}
                                                                    </h4> 
                                                                </div>
                                                            :
                                                                <h4>
                                                                    <span className="h4 font-weight-bold">Precio Actual:</span>
                                                                    <span className="font-weight-light ml-2">
                                                                        {moneyFormatter(dataService.endPrice)}
                                                                    </span>
                                                                </h4>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="text-center">
                                                            <div className="text-center">
                                                                <h5 className="h3 font-weight-bold">Stock Actual</h5> 
                                                                <div className="stock-circle mb-3">
                                                                    <div>
                                                                        <span className="font-weight-bold">{data.currentStock}</span>
                                                                        <h5 className="h6 font-weight-bold">Disponibles</h5>
                                                                    </div>
                                                                </div>
                                                                <h4><span className="h4 font-weight-bold">Stock Mínimo:</span> <span className="font-weight-light ml-2">{data.minStock}</span></h4> 
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
                                        Stock
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
                                                            Tipo de servicio
                                                        </th>
                                                        <th>
                                                            Cupos disponibles
                                                        </th>
                                                        <th>
                                                            Inicio
                                                        </th>
                                                        <th>
                                                            Fin
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(stock.length > 0 && stock.map((item, key) => {
                                                        console.log(item);

                                                        return (
                                                            <tr key={key}>
                                                                <td className="font-weight-bold">
                                                                    {item.id}
                                                                </td>
                                                                <td>
                                                                    {item.serviceType.name}
                                                                </td>
                                                                <td>
                                                                    {item.quantity}
                                                                </td>
                                                                <td>
                                                                    {moment(item.timetable.dateStart, 'DD-MM-YYYY').format('DD-MM-YYYY')}
                                                                </td>
                                                                <td>
                                                                    {moment(item.timetable.dateEnd, 'DD-MM-YYYY').format('DD-MM-YYYY')}
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
        </div>
    )
}

export default ServicesStock
