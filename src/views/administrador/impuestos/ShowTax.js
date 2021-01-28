import React, {useState, useEffect} from 'react'
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import {withRouter} from 'react-router-dom'
import {Card,CardBody,Row,Col, Table, CardTitle} from 'reactstrap'

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
                <h1 className="h4 mb-3 font-weight-bold">
                    Ver impuesto
                </h1>
                <Card>
                    <div className="p-3">
                        <CardTitle>
                            <i className="mdi mdi-border-all mr-2"></i>Datos del impuesto 
                        </CardTitle>
                    </div>
                    <CardBody className="border-top">
                        <Row>
                            <Col md="12">
                                <h3 className="font-weight-bold mb-3">{data.name}</h3>
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
                                                            <td className="text-right font-weight-bold text-primary">{item.value}{(data.name === 'IVA'?'%':'')}</td>
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
                <h1 className="h4 mb-3 font-weight-bold">
                    Datos del impuesto
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default withRouter(ShowTax);
