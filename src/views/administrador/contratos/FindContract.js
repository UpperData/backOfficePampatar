import React, {useState, useEffect} from 'react'
import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
} from 'reactstrap';
//import moment from 'moment'
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link} from 'react-router-dom'

function FindContract() {
    const [loading, setloading]             = useState(true);
    const [search,  setSearch]              = useState(true);
    //const [sending, setsending]             = useState(false);
    const [data,    setData]                = useState([]);

    let url = '/setting/seller/shop/all';

    //const [seeItem, setSeeItem]             = useState(null);
    //const [errormessage, seterrormessage]   = useState('');
    //const [successmessage, setsuccessmessage]   = useState('');
    const getData = () => {
        axios.get(url)
        .then((res) => {
            console.log(res.data);
            setData(res.data.data.rsShopAll);
            setloading(false);
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        if(loading){
            if(search){
                setSearch(false);
                getData();
            }
        }
    }, []);

    if(!loading){
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Consulta de contratos</h1>
                <Row>
                    <Col md="12">
                        <Card>
                            <div className="p-3">
                                <CardTitle><i className="mdi mdi-border-all mr-2"></i>Listado de tiendas con contratos activos en pampatar</CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre de la tienda</th>
                                            <th>Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(data.length > 0 && data.map((item, key) => {
                                            //let date = item.createdAt.split(' ');
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <strong>{item.name}</strong>
                                                    </td>
                                                    <td>
                                                        {item.Status.name}
                                                    </td>
                                                    <td className="text-right">
                                                        <Link to={'/findContract/shop/'+item.id} className="btn btn-primary btn-sm">
                                                            ver contratos
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        }))}
                                    </tbody>
                                </Table>
                                {(data.length === 0) &&
                                    <p colSpan="5">
                                        Sin resultados encontrados
                                    </p>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Consulta de contratos</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default FindContract
