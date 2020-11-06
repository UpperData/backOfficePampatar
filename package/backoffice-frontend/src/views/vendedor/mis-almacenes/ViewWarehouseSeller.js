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

function ViewWarehouseSeller() {

    const [loading, setloading] = useState(true)
    const [search, setsearch] = useState(true);
    const [sending, setsending] = useState(false);
    const [data, setdata] = useState(null);

    const [errormessage, seterrormessage] = useState('');
    const [successmessage, setsuccessmessage] = useState('');

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
                    <h1 className="h4 mb-3 font-weight-bold">Listar almacenes</h1>
    
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
                                        <i className="mdi mdi-border-all mr-2"></i>Almacenes disponibles
                                    </CardTitle>
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
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(data.values.length > 0 && data.values.map((item, key) => {

                                                            let phone = ((item.phone !== null) ? item.phone[0] : null);

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
                                                                </tr>
                                                            )
                                                        }))}
                                                    </tbody>
                                                </Table>
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
                <h1 className="h4 mb-3 font-weight-bold">Listar almacenes</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default ViewWarehouseSeller
