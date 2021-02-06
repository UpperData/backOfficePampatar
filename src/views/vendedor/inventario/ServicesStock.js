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
    const [stock,   setstock]  = useState(null);
    const [dataProduct,   setdataProduct]  = useState(null);

    const [modal, setModal] = useState(false);
    const [datawarehouse, setdatawarehouse]     = useState(null);
    const [searchdatawarehouse, setseachdatawarehouse]     = useState(false);

    const [variationsmodal, setvariationsModal] = useState(false);
    const [variationsList,  setvariationsList]  = useState(null);
    const [type,      settype]      = useState('service');

    const getStock = (data) => {
        setservice(data);
        
        let urlprice    = '/seller/inventory/stock/sku/'+data.value+'/'+type;
        setsearch(true);

        axios.get(urlprice).then((res) => {
            console.log(res.data);
            //let stock = res.data.stock;
            setstock(res.data.data.rsInventoryService);
            setsearch(false);
        }).catch((err) => {
            console.error(err);
            setsearch(false);
        });

    }

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                Stock de servicios
            </h1>
            {(type !== '') &&
                <div>
                    {type === 'service' &&
                        <form action="">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Stock de servicios
                                </CardTitle>
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
                                <div className="p-3">
                                    <CardTitle>
                                        <i className="mdi mdi-border-all mr-2"></i> Stock
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
                                                            Precio
                                                        </th>
                                                        <th>
                                                            Cupos disponibles
                                                        </th>
                                                        <th>
                                                            Tipo de servicio
                                                        </th>
                                                        <th>
                                                            Desde
                                                        </th>
                                                        <th>
                                                            Hasta
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
                                                                    {moneyFormatter(item.price)}
                                                                </td>
                                                                <td>
                                                                    {item.quantity}
                                                                </td>
                                                                <td>
                                                                    {item.serviceType.name}
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
