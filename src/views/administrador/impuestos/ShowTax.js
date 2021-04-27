import React, {useState, useEffect} from 'react'
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link, withRouter} from 'react-router-dom'
import {Card,CardBody,Row,Col, Table, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap'

function ShowTax(props) {

    let url = '/setting/taxes/admin/tax/HistOry/get/';

    const [loading, setloading] = useState(true);
    const [search, setsearch]   = useState(true);
    const [data, setdata]       = useState(null);

    useEffect(() => {
        if(loading){
            const getData = () => {
                if(search){
                    setsearch(false);
        
                    axios.get(url+props.match.params.id).then((res) => {
                        console.log(res.data);
                        setdata(res.data[0]);
                        setloading(false);
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            }

            getData();
        }
    }, [loading, search, url, props.match.params.id]);

    if(!loading){
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Impuestos</a></BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/tax/LIST/admin">
                            Impuestos actuales
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Ver impuesto</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    <Link to="/tax/LIST/admin" className="mr-3 text-info">
                        <i className="fa fa-angle-left"></i>
                    </Link>
                    Ver impuesto
                </h1>
                <Card>
                    <div className="p-3">
                        <CardTitle>
                            <h6 className="font-weight-bold">
                                Datos del impuesto 
                            </h6>
                            <h3 className="font-weight-bold h2 mb-3">{data.name}</h3>
                        </CardTitle>
                    </div>
                    <CardBody className="border-top">
                        <Row>
                            <Col md="12">
                                {data.taxValues.length > 0 && 
                                    <div>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th className="text-left">
                                                        Fecha de creación
                                                    </th>
                                                    <th className="text-right">
                                                        Valor
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.taxValues.map((item, key) => {
                                                    return (       
                                                        <tr key={key}>
                                                            <td className="text-left">{item.createdAt.split('T')[0]}</td>
                                                            <td className="text-right font-weight-bold text-primary">
                                                                {item.value}
                                                                <i className="fa fa-percent"></i>
                                                            </td>
                                                        </tr>       
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }else{
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Impuestos</a></BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/tax/LIST/admin">
                            Impuestos actuales
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Ver impuesto</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    Datos del impuesto
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default withRouter(ShowTax);
