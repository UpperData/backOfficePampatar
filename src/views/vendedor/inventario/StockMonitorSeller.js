import React, {useState} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CustomInput,
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

function StockMonitorSeller() {

    const [product, setproduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search,  setsearch]  = useState(false);
    const [stock,   setstock]  = useState(null);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const getStock = (data) => {
        setproduct(data);
        let url = '/seller/inventory/stock/sku/'+data.value;
        setsearch(true);

        axios.get(url).then((res) => {
            console.log(res.data);
            setsearch(false);
            setstock(res.data.data.rsBySku);
        }).catch((err) => {
            console.error(err);
            setsearch(false);
        });
    }

    let finaltotal = 0;

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                Monitor de stock
            </h1>
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
                                    <div className="alert alert-danger">
                                        Ningun lote registrado para este producto
                                    </div>
                                }

                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {(Array.isArray(stock) && stock.length > 0 && !search) &&
                    <Card>
                        <div className="p-3">
                            <CardTitle>
                                <i className="mdi mdi-border-all mr-2"></i>Stock
                            </CardTitle>
                        </div>
                        <CardBody className="border-top">
                            <Row>
                                <Col>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Nombre del almacen
                                                </th>
                                                <th>
                                                    Dirección
                                                </th>
                                                <th>
                                                    Teléfono
                                                </th>
                                                <th className="text-right">
                                                    Existencias
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(stock.length > 0 && stock.map((items, key) => {
                                                let item = items.Warehouse;
                                                finaltotal =+ items.total;

                                                let phone = ((item.phone !== null) ? item.phone[0] : null);

                                                let dir = '';
                                                if(typeof item.address[0].comuna === 'object' && item.address[0].comuna.hasOwnProperty('name')){
                                                    dir = dir+''+item.address[0].comuna.name+' ';
                                                }
                                                if(typeof item.address[0].calle !== null && item.address[0].calle !== undefined){
                                                    dir = dir+''+item.address[0].calle+' ';
                                                }
                                                if(typeof item.address[0].numero !== null && item.address[0].numero !== undefined){
                                                    dir = dir+''+item.address[0].numero+' ';
                                                }
                                                if(typeof item.address[0].local !== null && item.address[0].local !== undefined){
                                                    dir = dir+''+item.address[0].local+' ';
                                                }
                                                if(typeof item.address[0].province === 'object' && item.address[0].province.hasOwnProperty('name')){
                                                    dir = dir+''+item.address[0].province.name+' ';
                                                }
                                                if(typeof item.address[0].region === 'object' && item.address[0].region.hasOwnProperty('name')){
                                                    dir = dir+''+item.address[0].region.name+' ';
                                                }

                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                            {item.name}
                                                        </td>
                                                        <td>
                                                            {dir}
                                                        </td>
                                                        <td>
                                                            {phone.number}
                                                        </td>
                                                        <td className="text-right">
                                                            {items.total}
                                                        </td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="4" className="text-right">
                                                    <strong>Total de existencias:</strong> <span className="ml-2">{finaltotal}</span>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                }
            </form>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default StockMonitorSeller
