import React, {useState, useEffect} from 'react'
import AddProductSeller from './AddProductSeller'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CustomInput,
    Table
} from 'reactstrap';
import axios from 'axios'
import ProductSelect from '../../../components/selects/ProductSelect';
import InlineSpinner from '../../spinner/InlineSpinner';

function PriceUpdate() {

    const [search,          setsearch]          = useState(false);
    const [sending,         setsending]         = useState(false);
    const [errormessage,    seterrormessage]    = useState('');
    const [successmessage,  setsuccessmessage]  = useState('');

    const [product,         setproduct]         = useState(null);
    const [price,           setprice]           = useState('');
    const [data,            setdata]            = useState(null);

    let urlGetUpdate = '/sku/';

    const changeProduct = (data) => {
        console.log(data);
        setsearch(true);
        setproduct(data);

        axios(urlGetUpdate+data.value)
        .then((res) => {
            console.log(res.data);
            setdata(res.data.rows[0]);
            setsearch(false);
        }).catch((err) => {
            console.error(err);
            setsearch(false);
        });
    }

    const GoUpdatePrice = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let urlUpdatePrice = '/seller/inventory/price/edit/';
        
        setsending(true);
        let data = {
            skuId:product.value,
            price
        }

        axios({
            method: 'put',
            url: urlUpdatePrice,
            data
        }).then((res) => {
            console.log(res.data);
            if(res.data.data.result){
                setsuccessmessage(res.data.data.message);
            }
            setsending(false);
        }).catch((err) => {
            console.error(err);
            setsending(false);
        });
    }

    return (
        <div className="actualizar-lote">
            <h1 className="h4 mb-3 font-weight-bold">
                Actualizar Precios
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

            {(search) &&
                <InlineSpinner />
            }

            {(product !== null && data !== null && !search) &&
                <form onSubmit={(e) => GoUpdatePrice(e)} action="">
                    <Col md="12">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Datos
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Precio actual del producto</label>
                                            <input 
                                                type="number" 
                                                value={price}
                                                onChange={(e) => setprice(e.target.value)}
                                                min="0"
                                                placeholder="Precio"
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="12">
                        <div className="py-2 text-right">
                            <button disabled={sending} type="submit" className="btn btn-warning px-4 font-weight-bold">
                                {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : 'Actualizar precio'}
                            </button>
                        </div>
                    </Col>
                </form>
            }
        </div>
    )
}

export default PriceUpdate
