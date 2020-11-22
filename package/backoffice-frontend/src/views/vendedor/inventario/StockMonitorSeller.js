import React, {useState} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CustomInput,
} from 'reactstrap';
import ProductSelect from '../../../components/selects/ProductSelect';

function StockMonitorSeller() {

    const [product, setproduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search,  setsearch]  = useState(true);

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
                            <Col>
                                <div className="form-group">
                                    <label htmlFor="">Seleccione un producto</label>
                                    <ProductSelect value={product} onChange={setproduct} />
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </form>
        </div>
    )
}

export default StockMonitorSeller
