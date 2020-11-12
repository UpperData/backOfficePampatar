import React, {useState, useEffect, useRef, Fragment} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem,
    FormGroup,
    Input
} from 'reactstrap';
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import ProductsSelect from '../../../components/selects/productsSelect';

function AddProduct(props) {

    const [loading, setloading] = useState(false);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const [errors, seterrors] = useState({});

    const [name,     setname]     = useState('');
    const [product, setproduct] = useState(null);

    const [searchservice, setsearchservice] = useState(false);
    const [loadingservice, setloadingservice] = useState(true);

    const reset = () => {
        setname('');
        setproduct(null);
    }

    const changeService = (data) => {
        setsearchservice(true);
        setloadingservice(true);
        setsuccessmessage('');
        seterrormessage('');
        setproduct(data);
        let url = '/sku/'+data.value;
        console.log(url);

        axios.get(url).then((res) => {
            console.log(res.data);
            if(res.data.count > 0){
                let data = res.data.rows[0];
                setname(data.name);

                setsearchservice(false);
                setloadingservice(false);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    const validate = () => {
        let errorsCount = 0;
        let thiserrors = {};

        //name
        if(name.trim() === ''){
            thiserrors.name = 'Debe ingresar un nombre para el producto';
            errorsCount++;
        }else if(name.trim().length < 6){
            thiserrors.name = 'El nombre del producto ingresado es demasiado corto';
            errorsCount++;
        }else if(name.trim().length > 40){
            thiserrors.name = 'El nombre del producto ingresado es demasiado largo';
            errorsCount++;
        }

        if(errorsCount > 0){
            seterrors(thiserrors);
            return false;
        }

        return true;
    }

    const addWarehouse = (e) => {
        e.preventDefault();
        e.stopPropagation();

        seterrors({});
        setsuccessmessage('');
        seterrormessage('');

        let validation = validate();

        if(validation){
            setsending(true);

            if(props.Edit){

                let url = '/sku/edit';
                let data = {
                    id: product.value,
                    name,
                }

                axios({
                    url,
                    method: 'put',
                    data
                }).then((res) => {
                    console.log(res);
                    setsending(false);
                    if(res.data.data.result){
                        setsuccessmessage('¡Producto editado satisfactoriamente!')
                        reset();
                    }else{
                        seterrormessage(res.data.data.message);
                        reset();
                    }
                }).catch((err) => {
                    console.error(err);
                    setsending(false);
                })
            }else{
                
                let url = '/sku/add';
                let data = {
                    name
                }

                axios({
                    url,
                    method: 'post',
                    data
                }).then((res) => {
                    console.log(res);
                    setsending(false);
                    if(res.data.data.result){
                        setsuccessmessage('¡Producto creado satisfactoriamente!');
                        reset();
                    }else{
                        seterrormessage(res.data.data.message);
                        reset();
                    }
                }).catch((err) => {
                    console.error(err);
                    setsending(false);
                })
            }

        }
    }

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                {props.Edit ? 'Editar producto' : 'crear nuevo producto'}
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

                {props.Edit &&
                    <div>
                        <Row>
                            <Col md="6">
                                <Card>
                                    <div className="p-3">
                                        <CardTitle>
                                            <i className="mdi mdi-border-all mr-2"></i>Seleccione un producto.
                                        </CardTitle>
                                    </div>
                                    <CardBody className="border-top">
                                        <ProductsSelect 
                                            value={product} 
                                            onChange={changeService} 
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                }

                {((!props.Edit) || (props.Edit && product !== null && !loadingservice)) &&
                    <form onSubmit={(e) => addWarehouse(e)} action="">
                        <Row>
                            <Col md="7">
                                <Card>
                                    <div className="p-3">
                                        <CardTitle>
                                            <i className="mdi mdi-border-all mr-2"></i>Datos del producto
                                        </CardTitle>
                                    </div>
                                    <CardBody className="border-top">
                                            <Row>
                                                <Col xs="12">
                                                    <div className="form-group">
                                                        <label htmlFor="product-name">Nombre del producto:</label>
                                                        <input 
                                                            type="text"
                                                            id="product-name"
                                                            min="0" 
                                                            value={name}
                                                            onChange={(e) => setname(e.target.value)}
                                                            placeholder="Ingrese el nombre del producto" 
                                                            className={((typeof errors === 'object' && errors.hasOwnProperty('name') ? 'is-invalid' : '') +' form-control')}
                                                        />
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('name')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.name}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                    </CardBody>
                                </Card>
                                {(props.Edit) 
                                ?
                                <p>
                                    <button type="submit" disabled={sending} className="btn btn-warning">
                                        {(sending) ? <span>Cargando<i className="fa fa-spin fa-spinner ml-2"></i></span> : 'Editar producto'}
                                    </button>
                                </p>
                                :
                                <p>
                                    <button type="submit" disabled={sending} className="btn btn-primary">
                                        {(sending) ? <span>Cargando<i className="fa fa-spin fa-spinner ml-2"></i></span> : 'Añadir producto'}
                                    </button>
                                </p>
                                }
                            </Col>
                        </Row>
                    </form>
                }

                {(props.Edit && searchservice) &&
                    <InlineSpinner />
                }
        </div>
    )
}

export default AddProduct
