import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    UncontrolledTooltip,
    Table,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap';
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link} from 'react-router-dom'

function ViewWarehouseSeller() {

    const [loading, setloading] = useState(true)
    const [search, setsearch]   = useState(true);
    const [data, setdata]       = useState(null);
    //const [sending, setsending] = useState(false);

    const [errormessage, seterrormessage]  = useState('');

    const successmessage    = '';

    let url = '/myWarehouse';

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);

                axios.get(url).then((res) => {
                    console.log(res.data.data);
                    if(res.data.data.result){
                        setdata(res.data.data);
                        setloading(false);
                        if(res.data.data.hasOwnProperty('values') && res.data.data.values !== undefined && Array.isArray(res.data.data.values)){

                        }else{
                            seterrormessage(res.data.data.message);
                        }
                    }else{
                        setloading(false);
                    }
                }).catch((err) => {
                    console.error(err);
                    setloading(false);
                });
            }
        }
    }, [loading,search,url]);
    
    if(!loading){
        return (
            <div>
                <div>
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis almacenes</a></BreadcrumbItem>
                        <BreadcrumbItem active>Listar almacenes</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row align-items-center pb-3 mb-3">
                        <div className="col-md-6">
                            <h1 className="h4 mb-0 font-weight-bold">Listar almacenes</h1>
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-right">
                                <Link to="/addWarehouseSeller" className="btn btn-info">
                                    Nuevo almacen
                                </Link>
                            </div>
                        </div>
                    </div>
    
                    {(errormessage !== '') &&
                        <div className="alert d-none alert-warning">
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
                                    Almacenes disponibles
                                </div>
                                <CardBody className="border-top">
                                        <Row>
                                            <Col xs="12">
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Nombre del almacen
                                                            </th>
                                                            <th className="text-center">
                                                                Dirección
                                                            </th>
                                                            <th className="text-center">
                                                                Teléfono
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(errormessage === '' && data !== null && data.hasOwnProperty('values') && data.values.length > 0 && data.values.map((item, key) => {

                                                            let phone = ((item.phone !== null) ? item.phone[0] : null);

                                                            let dir = '';
                                                            if(Array.isArray(item.address)){
                                                                if(item.address[0].comuna !== null && typeof item.address[0].comuna === 'object' && item.address[0].comuna.hasOwnProperty('name')){
                                                                    if(item.address[0].comuna.name !== undefined){
                                                                        dir = dir+''+item.address[0].comuna.name+' '; 
                                                                    }
                                                                }
                                                                if(item.address[0].calle !== null && item.address[0].calle !== undefined){
                                                                    dir = dir+''+item.address[0].calle+' ';
                                                                }
                                                                if(item.address[0].numero !== null && item.address[0].numero !== undefined){
                                                                    dir = dir+''+item.address[0].numero+' ';
                                                                }
                                                                if(item.address[0].local !== null && item.address[0].local !== undefined){
                                                                    dir = dir+''+item.address[0].local+' ';
                                                                }
                                                                if(typeof item.address[0].province === 'object' && item.address[0].province.hasOwnProperty('name')){
                                                                    if(item.address[0].province.name !== undefined){
                                                                        dir = dir+''+item.address[0].province.name+' ';
                                                                    }
                                                                }
                                                                if(typeof item.address[0].region === 'object' && item.address[0].region.hasOwnProperty('name')){
                                                                    if(item.address[0].region.name !== undefined){
                                                                        dir = dir+''+item.address[0].region.name+' ';
                                                                    }
                                                                }
                                                            }

                                                            return (
                                                                <tr key={key}>
                                                                    <td>
                                                                        <span href="#" id={`tooltip-warehouse-name-${item.id}`}>
                                                                            {item.name}
                                                                        </span>
                                                                        {(phone !== null) &&
                                                                            <UncontrolledTooltip placement="right" target={`tooltip-warehouse-name-${item.id}`}>
                                                                                {phone.number}
                                                                            </UncontrolledTooltip>
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {(item.address !== null ? dir : "--")}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {(item.phone !== null ? phone.number : "--")}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }))}
                                                    </tbody>
                                                </Table>
                                                {(errormessage !== '') &&
                                                    <p className="mb-3 text-center">{errormessage}</p>
                                                }
                                            </Col>
                                        </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Mis almacenes</a></BreadcrumbItem>
                    <BreadcrumbItem active>Listar almacenes</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">Listar almacenes</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default ViewWarehouseSeller
