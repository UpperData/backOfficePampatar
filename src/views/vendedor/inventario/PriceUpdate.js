import React, {useState, Fragment} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    InputGroupText,
    InputGroupAddon,
    InputGroup
} from 'reactstrap';
import axios from 'axios'
import ProductSelect from '../../../components/selects/ProductSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import { moneyFormatter } from '../../../utils/helpers';

function PriceUpdate() {

    const [search,          setsearch]          = useState(false);
    const [sending,         setsending]         = useState(false);

    /*
        const [loading,         setloading]         = useState(true);
        const [searchdata,      setsearchdata]      = useState(true);
    */

    const [errormessage,    seterrormessage]    = useState('');
    const [successmessage,  setsuccessmessage]  = useState('');

    const [product,         setproduct]         = useState(null);
    const [price,           setprice]           = useState('');
    const [oldPrice,        setoldPrice]        = useState(null);
    const [priceMessage,    setPriceMessage]    = useState('');
    const [data,            setdata]            = useState(null);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    let urlGetUpdate = '/getPriceCurrent/Inventory/sku/';

    const changeProduct = (data) => {
        console.log(data);
        setsearch(true);
        setproduct(data);

        axios(urlGetUpdate+data.value)
        .then((res) => {
            console.log(res.data);
            if(res.data && res.data.hasOwnProperty('price')){
                setdata(res.data);
                let money = moneyFormatter(res.data.price);
                setoldPrice(money);
                setsearch(false);
                setPriceMessage('');
            }else{
                console.log('error');
                setdata(null);
                setoldPrice('');
                setPriceMessage(res.data.data.message);
                setsearch(false);
            }
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
                setoldPrice(price);
                setPriceMessage('');
                setsuccessmessage(res.data.data.message);
                setproduct(null);
                setprice('');
                setModal(false);
                window.scrollTo({top: 10, behavior: 'smooth'});
            }else{
                seterrormessage(res.data.data.message);
                window.scrollTo({top: 10, behavior: 'smooth'});
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
            {(priceMessage !== '') &&
                <div className="alert alert-info">
                    {priceMessage}
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

                {(search) &&
                    <div className="py-2">
                        <InlineSpinner />
                    </div>
                }

            {(product !== null && (data !== null || priceMessage !== '') && !search) &&
                <form onSubmit={(e) => GoUpdatePrice(e)} action="">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Datos <span className="text-muted">{(data !== null) ? 'Actualizado por ultima vez el '+data.createdAt.split('T')[0] : ''}</span>
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col md="6">
                                         <div className="form-group">
                                            <label htmlFor="">Ingresar precio nuevo</label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                <InputGroupText>$</InputGroupText>
                                                </InputGroupAddon>
                                                <input 
                                                    type="number" 
                                                    value={price}
                                                    onChange={(e) => setprice(e.target.value)}
                                                    min="0"
                                                    placeholder="Precio"
                                                    className="form-control"
                                                />
                                            </InputGroup>
                                            {(Number(price) > 0) &&
                                                <div>
                                                    {(data !== null) &&
                                                        <Fragment>
                                                            <hr/>
                                                            <h5 className="h6">
                                                                <span className="mr-2 text-success"><i className="mdi mdi-equal"></i></span> <span className="font-weight-bold ml-2">{moneyFormatter(Number(price)+(Number(data.tax) * Number(price) / 100)+(Number(data.comission) * Number(price) / 100))}</span> (mas impuestos y comisiones)
                                                            </h5>
                                                        </Fragment>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    {(errormessage === '' && data !== null) &&
                                        <Col md="6">
                                            <h3 className="font-weight-bold h4">Precio actual de venta</h3>
                                            <h2 className="font-weight-bold h1">{moneyFormatter(data.endPrice)}</h2>
                                            <div>
                                                <h5 className="h6">Precio del producto: <span className="font-weight-bold">{moneyFormatter(data.price)}</span></h5>
                                                <hr/>
                                                <h5 className="h6"><span className="mr-2 text-success"><i className="fa fa-plus"></i></span>Impuestos: <span className="font-weight-bold">{data.tax+'%'}</span></h5>
                                                <h5 className="h6"><span className="mr-2 text-success"><i className="fa fa-plus"></i></span>Comisión de Pampatar: <span className="font-weight-bold">{data.comission+'%'}</span></h5>
                                            </div>
                                        </Col>
                                    }
                                </Row>
                            </CardBody>
                        </Card>
                    
                        <div className="py-2 text-right">
                            <button disabled={sending || (price === '' && Number(price) === 0)} type="button" onClick={() => toggle()} className="btn btn-lg btn-warning px-4 font-weight-bold">
                                {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : <span><i className="far fa-edit mr-3"></i>Actualizar precio</span>}
                            </button>
                        </div>
                </form>
            }
            </Col>
            </Row>

            {product !== null &&
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader className="h3 font-weight-bold" toggle={toggle}>
                        Actualizar precio del producto
                    </ModalHeader>
                    <ModalBody>
                        <h5>¿Actualizar el precio de <span className="font-weight-bold">{product.label}</span> a <span className="font-weight-bold text-success">CLP ${price}</span>?</h5>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="info" onClick={(e) => GoUpdatePrice(e)}>
                    {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : <span><i className="fa fa-check mr-2"></i>confirmar</span>}
                    </Button>
                    <Button color="primary" onClick={toggle}><i className="fa fa-times mr-2"></i>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            }
        </div>
    )
}

export default PriceUpdate
