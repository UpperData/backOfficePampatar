import React, {useState, useEffect} from 'react'
//import {useSelector} from 'react-redux'
import axios from 'axios'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table
} from 'reactstrap';
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link} from 'react-router-dom'

function ViewServices() {

    const [loading, setloading] = useState(true)
    const [search, setsearch] = useState(true);
    //const [sending, setsending] = useState(false);
    const [data, setdata] = useState(null);

    const errormessage = '';
    const successmessage = '';

    let url = '/services/myList';


    useEffect(() => {
        if(loading){
            if(search){
                const getData = () => {
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

                getData();
            }
        }
    }, [loading,search,url]);
    
    if(!loading){
        return (
            <div>
                <div>
                    <div className="row pb-3">
                        <div className="col-md-6">
                            <h1 className="h4 mb-3 font-weight-bold">Listar servicios</h1>
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-right">
                                <Link to="/addService" className="btn btn-info btn-sm">
                                    Nuevo servicio
                                </Link>
                            </div>
                        </div>
                    </div>
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
                                        <i className="mdi mdi-border-all mr-2"></i>Servicios disponibles
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                        <Row>
                                            <Col xs="12">
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Nombre del servicio
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
                                                        Sin servicios disponibles en este momento.
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
                <h1 className="h4 mb-3 font-weight-bold">Listar servicios</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default ViewServices
