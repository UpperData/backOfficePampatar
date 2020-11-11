import React, {useState, useEffect, useRef, Fragment} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    UncontrolledTooltip,
    Breadcrumb, 
    BreadcrumbItem,
    FormGroup,
    Input,
    Table
} from 'reactstrap';
import InlineSpinner from '../../spinner/InlineSpinner';

function ViewProducts() {

    const [loading, setloading] = useState(true)
    const [search, setsearch] = useState(true);
    const [sending, setsending] = useState(false);
    const [data, setdata] = useState(null);

    const [errormessage, seterrormessage] = useState('');
    const [successmessage, setsuccessmessage] = useState('');

    let url = '/sku/myList';

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);

                axios.get(url).then((res) => {
                    console.log(res.data.data);
                    if(res.data.data.result){
                        setdata(res.data.data);
                        setloading(false);
                    }
                }).catch((err) => {
                    console.error(err);
                    setloading(false);
                });
            }
        }
    }, []);
    
    if(!loading){
        return (
            <div>
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Listar productos</h1>
    
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
                                        <i className="mdi mdi-border-all mr-2"></i>Productos disponibles
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                        <Row>
                                            <Col xs="12">
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Nombre del producto
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(data.sku.length > 0 && data.sku.map((item, key) => {
                                                            return (
                                                                <tr key={key}>
                                                                    <td>
                                                                        {item.name}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }))}
                                                    </tbody>
                                                </Table>
                                                {(data.sku.length === 0) && 
                                                    <p className="text-center">
                                                        Sin productos disponibles en este momento.
                                                    </p>  
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
                <h1 className="h4 mb-3 font-weight-bold">Listar productos</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default ViewProducts
