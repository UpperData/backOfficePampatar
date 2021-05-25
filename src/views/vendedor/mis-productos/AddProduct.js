import React, {useState} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap';

import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import ProductsSelect from '../../../components/selects/productsSelect';
import SkuTypeSelect from '../../../components/selects/SkuTypeSelect';
import {Link} from "react-router-dom"

function AddProduct(props) {

    const [loading, setloading] = useState(false);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const [errors, seterrors] = useState({});

    const [name,            setname]            = useState('');
    const [skuTypeId,       setskuTypeId]       = useState(null);
    const [product,         setproduct]         = useState(null);

    const [searchservice, setsearchservice] = useState(false);
    const [loadingservice, setloadingservice] = useState(true);

    const reset = () => {
        setloading(false);
        setname('');
        setproduct(null);
        setskuTypeId(null);
        window.scrollTo({top: 10, behavior: 'smooth'});
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
                setskuTypeId({value: data.skuTypeId});

                setsearchservice(false);
                setloadingservice(false);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    var regex = new RegExp("^[a-zA-Z0-9áéíóú_ \-]+$");

    const onlyTextAndNumbers = (e) => {
        var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(key)) {
          e.preventDefault();
          return false;
       }
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
        }else if(!regex.test(name)){
            thiserrors.name = 'El nombre del producto contiene caracteres no permitidos';
            errorsCount++;
        }

        if(skuTypeId === null){
            thiserrors.skuTypeId = 'Debe seleccionar un tipo de producto';
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
                        setloading(true);
                        setsuccessmessage('¡Producto actualizado satisfactoriamente!')
                        reset();

                        setTimeout(() => {
                            setsuccessmessage("");
                        }, 5000);
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
                    name,
                    skuTypeId: skuTypeId.value
                }

                axios({
                    url,
                    method: 'post',
                    data
                }).then((res) => {
                    console.log(res);
                    setsending(false);
                    if(res.data.data.result){
                        //setloading(true);
                        setsuccessmessage('¡Producto creado satisfactoriamente!');
                        reset();

                        setTimeout(() => {
                            setsuccessmessage("");
                        }, 5000);
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

    if(loading){
        return (
            <div>
                {props.Edit
                ?
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis Productos</a></BreadcrumbItem>
                        <BreadcrumbItem active>Actualizar producto</BreadcrumbItem>
                    </Breadcrumb>
                :
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis Productos</a></BreadcrumbItem>
                        <BreadcrumbItem active>Nuevo producto</BreadcrumbItem>
                    </Breadcrumb>
                }

                <h1 className="h4 mb-3 font-weight-bold">
                    {props.Edit ? 'Actualizar producto' : 'Nuevo producto'}
                </h1>

                {(errormessage !== '') &&
                    <div className="alert alert-warning">
                        {errormessage}
                    </div>
                }

                {(successmessage !== '') &&
                    <div className="alert alert-success">
                        {successmessage}
                    </div>
                }

                <InlineSpinner />
            </div>
        )
    }else{
        return (
            <div>
                    {props.Edit
                    ?
                        <Breadcrumb listClassName="px-0">
                            <BreadcrumbItem><a href="##">Mis Productos</a></BreadcrumbItem>
                            <BreadcrumbItem active>Actualizar servicio</BreadcrumbItem>
                        </Breadcrumb>
                    :
                        <Breadcrumb listClassName="px-0">
                            <BreadcrumbItem><a href="##">Mis Productos</a></BreadcrumbItem>
                            <BreadcrumbItem active>Nuevo producto</BreadcrumbItem>
                        </Breadcrumb>
                    }
                    <div className="row align-items-center justify-content-between mb-3">
                            <div className="col col-lg-auto">
                                <h1 className="h4 mb-0 font-weight-bold">
                                    {props.Edit ? 'Actualizar producto' : 'Nuevo producto'}
                                </h1>
                            </div>
                            {!props.Edit &&
                                <div className="col col-lg-auto">
                                    <Link to="/viewProducts" className="btn btn-info">
                                        Listado de productos
                                    </Link>
                                </div>
                            }
                    </div>

                    {(errormessage !== '') &&
                        <div className="alert alert-warning">
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
                                <Col md="12">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                Seleccione un producto.
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
                                <Col md="12">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                Datos del producto
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                                <Row>
                                                    <Col xs="6">
                                                        <div className="form-group">
                                                            <label htmlFor="product-name">Nombre del producto:</label>
                                                            <input 
                                                                type="text"
                                                                id="product-name"
                                                                onKeyPress={(e) => onlyTextAndNumbers(e)}
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
                                                    <Col xs="6">
                                                        <div className="form-group">
                                                            <label htmlFor="product-name">Tipo del producto:</label>
                                                            <SkuTypeSelect isOnlyForProducts value={skuTypeId} onChange={(value) => setskuTypeId(value)} />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('skuTypeId')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.skuTypeId}
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
                                    <p className="text-right">
                                        <button type="submit" disabled={sending} className="btn btn-lg font-weight-bold btn-warning">
                                            {(sending) ? <span>Cargando<i className="fa fa-spin fa-spinner ml-2"></i></span> : 'Actualizar producto'}
                                        </button>
                                    </p>
                                    :
                                    <p className="text-right">
                                        <button type="submit" disabled={sending} className="btn btn-lg font-weight-bold btn-primary">
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
}

export default AddProduct
